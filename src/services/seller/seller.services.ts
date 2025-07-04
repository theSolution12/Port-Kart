import { supabase } from "@/lib/supabase/client";

export const getMyProducts = async (sellerId: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("seller_id", sellerId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const getSellingHistory = async (sellerId: string) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*, products(title, price)")
    .eq("seller_id", sellerId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

