import { useQuery } from "@tanstack/react-query";
import { getMyProducts } from "@/services/seller/seller.services";
import type { Product } from "@/types/product";

const useGetMyProducts = (sellerId: string) => {
  return useQuery<Product[]>({
    queryKey: ["my-products", sellerId],
    queryFn: () => getMyProducts(sellerId),
    enabled: !!sellerId,
  });
};

export default useGetMyProducts;
