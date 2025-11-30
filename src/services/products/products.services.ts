import type { Product } from "../../types/product";
import api from "@/lib/api/client";
import type { ProductFormValues } from "@/types/product-form-values";

export const getProducts = async (): Promise<Product[]> => {
  const data = await api.get<Product[]>(
    "/api/products/get-products",
    { requireAuth: false }
  );
  return data ?? [];
};

export const createProduct = async (payload: ProductFormValues) => {
  const data = await api.post(
    "/api/products/create-product",
    payload,
    { requireAuth: true }
  );
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
  const data = await api.post(
    "/api/products/update-product-stock",
    { productId, change },
    { requireAuth: true }
  );
  return data;
};

// ☠️ Delete product
export const deleteProduct = async (productId: string) => {
  const data = await api.post(
    "/api/products/delete-product",
    { productId },
    { requireAuth: true }
  );
  return data;
};
