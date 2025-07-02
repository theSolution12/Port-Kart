import { useMutation } from "@tanstack/react-query";
import { removeFromCart } from "@/services/cart/cart.services";
import { QUERY_KEYS } from "@/utils/constants";
import { queryClient } from "@/lib/tanstack/client";

const { CART } = QUERY_KEYS;

const useRemoveFromCart = () => {
  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART] });
    },
  });
};

export default useRemoveFromCart;