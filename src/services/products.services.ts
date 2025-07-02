import type { Product } from "../types/product";
import { supabase } from "@/lib/supabase/client";
import type { ProductFormValues } from "@/types/product-form-values";

export const getProducts = async () : Promise<Product[]> => {
  const { data, error } = await supabase.from('products').select('*, seller: profiles(name)').order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Supabase error: ${error.message}`);
  }

  return data ?? [];
};

export const createProduct = async (payload: ProductFormValues) => {
  const { data, error } = await supabase
    .from("products")
    .insert([payload])

  if (error) throw new Error(error.message);
  return data;
};

// 🧮 Update stock
export const updateProductStock = async ({
  productId,
  change,
}: {
  productId: string;
  change: number;
}) => {
  // First, fetch the current stock
  const { data: current, error: fetchError } = await supabase
    .from("products")
    .select("stock")
    .eq("id", productId)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  const newStock = (current?.stock ?? 0) + change;

  const { data, error } = await supabase
    .from("products")
    .update({ stock: newStock })
    .eq("id", productId);

  if (error) throw new Error(error.message);
  return data;
};

// ☠️ Delete product
export const deleteProduct = async (productId: string) => {
  const { data, error } = await supabase.from("products").delete().eq("id", productId);

  if (error) throw new Error(error.message);
  return data;
};
