import type { Product } from "../types/product";
import { supabase } from "@/utils/supabase/server";
import type { ProductFormValues } from "@/types/product-form-values";

export const getProducts = async () : Promise<Product[]> => {
  const { data, error } = await supabase.from('products').select('*');

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
