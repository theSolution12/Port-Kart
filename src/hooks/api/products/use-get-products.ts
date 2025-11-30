import { useQuery } from "@tanstack/react-query";
// CONSTANTS
import { QUERY_KEYS } from "../../../utils/constants";
// TYPES
import type { Product } from "../../../types/product";
// SERVICES
import { getProducts } from "../../../services/products/products.services";

const useGetProducts = () => {
  const { PRODUCTS } = QUERY_KEYS;
  return useQuery<Product[]>({
    queryKey: [PRODUCTS],
    queryFn: getProducts,
  });
};

export default useGetProducts;