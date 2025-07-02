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
