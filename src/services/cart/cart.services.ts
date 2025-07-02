import { supabase } from "@/lib/supabase/client";

  // Add item or increment quantity
  export const addToCart = async ({
    userId,
    productId,
  }: {
    userId: string;
    productId: string;
  }) => {
    const { data, error } = await supabase.rpc("add_to_cart", {
      uid: userId,
      pid: productId,
    });
  
    if (error) throw new Error(error.message);
    return data;
  };
  
  
  
  // Fetch current cart
  export const getCartItems = async (userId: string) => {
    const { data, error } = await supabase
      .from("cart_items")
      .select("*, product: products(title, price)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
  
    if (error) throw new Error(error.message);
    return data;
  };
  
  
  
  // Update quantity
  export const updateCartQuantity = async ({
    userId,
    productId,
    quantity,
  }: {
    userId: string;
    productId: string;
    quantity: number;
  }) => {
    const { data, error } = await supabase.rpc("update_cart_quantity", {
      uid: userId,
      pid: productId,
      qty: quantity,
    });
  
    if (error) throw new Error(error.message);
    return data;
  };
  
  
  
  
  // Remove from cart
  export const removeFromCart = async ({
    userId,
    productId,
  }: {
    userId: string;
    productId: string;
  }) => {
    const { data, error } = await supabase.rpc("remove_from_cart", {
      uid: userId,
      pid: productId,
    });
    
  
    if (error) throw new Error(error.message);
    return data;
  };
  
  
  