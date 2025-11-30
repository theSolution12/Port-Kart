import api from "@/lib/api/client";
import type { Order } from "@/types/order";

export const getOrders = async (userId: string): Promise<Order[]> => {
  const data = await api.post<Order[]>(
    "/api/orders/get-orders",
    { userId },
    { requireAuth: true }
  );
  return data;
};