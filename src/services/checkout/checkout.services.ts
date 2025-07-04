import { supabase } from "@/lib/supabase/client";

export const dummyCheckout = async ({
    userId,
    address,
  }: {
    userId: string;
    address: string;
  }) => {
    const { data: cartItems, error: cartError } = await supabase
      .from("cart_items")
      .select("product_id, quantity, products(stock, price, title, seller_id)")
      .eq("user_id", userId);
  
    if (cartError) throw new Error(cartError.message);
    if (!cartItems || cartItems.length === 0) {
      throw new Error("Ye can't checkout an empty cart, Sailor!");
    }

    const orderInserts = cartItems.map((item) => ({
      user_id: userId,
      product_id: item.product_id,
      quantity: item.quantity,
      total_price: (item.products as any).price * item.quantity,
      address,
      product_name: (item.products as any).title,
      seller_id: (item.products as any).seller_id,
    }));
  
    const { error: orderError } = await supabase.from("orders").insert(orderInserts);
    if (orderError) throw new Error("Failed to place order: " + orderError.message);
  
    // 🛠 Update stock
    for (const item of cartItems) {
      const newStock = (item.products as any).stock - item.quantity;
      await supabase
        .from("products")
        .update({ stock: newStock })
        .eq("id", item.product_id);
    }
  
    // 🧹 Clear cart
    await supabase.from("cart_items").delete().eq("user_id", userId);
  
    // ✅ Return confirmation
    return {
      success: true,
      message: `Order placed! We be sailin' to ${address}.`,
    };
  };
  