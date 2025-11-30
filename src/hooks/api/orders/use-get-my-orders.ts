import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/orders/orders.services";
import { QUERY_KEYS } from "@/utils/constants";
import type { Order } from "@/types/order";

export const useGetMyOrders = (userId: string) => {
  return useQuery<Order[]>({
    queryKey: [QUERY_KEYS.ORDERS],
    queryFn: () => getOrders(userId),
    enabled: !!userId,
  });
};