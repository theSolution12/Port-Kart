import { useQuery } from "@tanstack/react-query";
import { getMyProducts } from "@/services/seller/seller.services";

const useGetMyProducts = (sellerId: string) => {
  return useQuery({
    queryKey: ["my-products", sellerId],
    queryFn: () => getMyProducts(sellerId),
    enabled: !!sellerId,
  });
};

export default useGetMyProducts;
