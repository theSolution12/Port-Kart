import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../lib/supabase-client'; // Adjust path as needed
import { render } from '@react-email/components';
import OrderEmail from '../../src/emails/order-email'; // Adjust path as needed
import { resend } from '../lib/resend-client'
import type { CartItem } from "../../src/types/cart-items";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, address } = req.body;

  try {
    // Step 1: Fetch cart items with product info
    const { data: cartItems, error: cartError } = (await supabase
      .from("cart_items")
      .select("quantity, product: products(id, title, price, stock, seller_id)")
      .eq("user_id", userId)) as { data: CartItem[] | null; error: any };

    if (cartError) throw new Error(cartError.message);
    if (!cartItems || cartItems.length === 0)
      return res.status(400).json({ error: "No items in cart" });

    // Step 2: Group items by seller
    const groupedBySeller: Record<string, typeof cartItems> = {};
    for (const item of cartItems) {
      const sellerId = item.product.seller_id;
      if (!groupedBySeller[sellerId]) groupedBySeller[sellerId] = [];
      groupedBySeller[sellerId].push(item);
    }

    // Step 3: Fetch seller emails
    const sellerIds = Object.keys(groupedBySeller);
    const { data: sellers, error: sellerError } = await supabase
      .from("profiles")
      .select("id, email")
      .in("id", sellerIds);

    if (sellerError) throw new Error(sellerError.message);

    // Step 4: Send emails and update stock
    await Promise.all(
      sellers.map(async (seller) => {
        const items = groupedBySeller[seller.id];
        const html = await render(
          OrderEmail({
            address,
            items,
          })
        );

        const emailResult = await resend.emails.send({
          from: "PortKart <onboarding@resend.dev>",
          to: ["delivered@resend.dev"],
          subject: "🏴‍☠️ New Order on PortKart",
          html,
        });

        if (emailResult.error) {
          throw new Error(`Failed to send email: ${emailResult.error.message || emailResult.error}`);
        }

        // Only update stock if email sent successfully
        for (const item of items) {
          const newStock = item.product.stock - item.quantity;
          await supabase
            .from("products")
            .update({ stock: newStock })
            .eq("id", item.product.id);
        }
      })
    );

    // Step 5: Clear cart
    await supabase.from("cart_items").delete().eq("user_id", userId);

    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Unknown error" });
  }
}

