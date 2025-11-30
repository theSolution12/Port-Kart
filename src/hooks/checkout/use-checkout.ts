import { useMutation } from "@tanstack/react-query";
import { dummyCheckout } from "@/services/checkout/checkout.services";
import { queryClient } from "@/lib/tanstack/client";
import { QUERY_KEYS } from "@/utils/constants";

export const useCheckout = () => {
  return useMutation<{ success: boolean; message: string }, Error, { userId: string; address: string }>({
    mutationFn: dummyCheckout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SELLING_HISTORY] });
    },
  });
};