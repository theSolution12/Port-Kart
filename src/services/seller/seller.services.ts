import api from "@/lib/api/client";
import type { Product } from "@/types/product";
import type { OrderItems } from "@/types/order-items";

export const getMyProducts = async (sellerId: string): Promise<Product[]> => {
  const data = await api.post<Product[]>(
    "/api/seller/get-my-products",
    { sellerId },
    { requireAuth: true }
  );
  return data;
};

export const getSellingHistory = async (sellerId: string): Promise<OrderItems[]> => {
  const data = await api.post<OrderItems[]>(
    "/api/seller/get-selling-history",
    { sellerId },
    { requireAuth: true }
  );
  return data;
};

