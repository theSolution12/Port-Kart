import { useMutation } from "@tanstack/react-query";
import { addToCart } from "@/services/cart/cart.services";
import { QUERY_KEYS } from "@/utils/constants";
import { queryClient } from "@/lib/tanstack/client";

const { CART } = QUERY_KEYS;

const useAddToCart = () => {
  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART] });
    },
  });
};

export default useAddToCart;