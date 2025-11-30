import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "@/services/cart/cart.services";
import { QUERY_KEYS } from "@/utils/constants";
import type { CartItem } from "@/types/cart-items";

const { CART } = QUERY_KEYS;

const useGetCartItems = (userId: string) => {
  return useQuery<CartItem[]>({
    queryKey: [CART, userId],
    queryFn: () => getCartItems(userId),
    enabled: !!userId,
  });
};

export default useGetCartItems;
