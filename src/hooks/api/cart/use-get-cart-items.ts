import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "@/services/cart/cart.services";
import { QUERY_KEYS } from "@/utils/constants";

const { CART } = QUERY_KEYS;

const useGetCartItems = (userId: string) => {
  return useQuery({
    queryKey: [CART, userId],
    queryFn: () => getCartItems(userId),
    enabled: !!userId,
  });
};

export default useGetCartItems;
