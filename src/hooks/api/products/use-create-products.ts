import { useMutation } from "@tanstack/react-query";
import { createProduct } from "@/services/products.services";
import { QUERY_KEYS } from "@/utils/constants";
import { queryClient } from "@/utils/tanstack/client";

const {PRODUCTS} = QUERY_KEYS;

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS] });
    }
  });
};
