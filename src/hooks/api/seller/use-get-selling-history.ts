import { useQuery } from "@tanstack/react-query";
import { getSellingHistory } from "@/services/seller/seller.services";
import { QUERY_KEYS } from "@/utils/constants";
import type { OrderItems } from "@/types/order-items";

export const useGetSellingHistory = (sellerId: string) => {
  return useQuery<OrderItems[]>({
    queryKey: [QUERY_KEYS.SELLING_HISTORY],
    queryFn: () => getSellingHistory(sellerId),
    enabled: !!sellerId,
  });
};