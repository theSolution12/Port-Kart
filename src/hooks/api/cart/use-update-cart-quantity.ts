import { useMutation } from "@tanstack/react-query";
import { updateCartQuantity } from "@/services/cart/cart.services";
import { QUERY_KEYS } from "@/utils/constants";
import { queryClient } from "@/lib/tanstack/client";

const { CART } = QUERY_KEYS;

  const useUpdateCartQuantity = () => {
  return useMutation({
    mutationFn: updateCartQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART] });
    },
  });
};

export default useUpdateCartQuantity;