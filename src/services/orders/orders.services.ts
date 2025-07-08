import { supabase } from "@/lib/supabase/client";

export const getOrders = async (userId: string) => {
  const { data, error } = await supabase.from("orders").select("*").eq("user_id", userId);
  if (error) throw error;
  return data;
};