import { useQuery } from "@tanstack/react-query";
import { getSellingHistory } from "@/services/seller/seller.services";
import { QUERY_KEYS } from "@/utils/constants";

export const useGetSellingHistory = (sellerId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SELLING_HISTORY],
    queryFn: () => getSellingHistory(sellerId),
    enabled: !!sellerId,
  });
};