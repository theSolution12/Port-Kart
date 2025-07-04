import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/orders/orders.services";
import { QUERY_KEYS } from "@/utils/constants";

export const useGetMyOrders = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDERS],
    queryFn: () => getOrders(userId),
    enabled: !!userId,
  });
};