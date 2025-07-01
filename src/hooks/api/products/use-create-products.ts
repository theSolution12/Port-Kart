import { useMutation } from "@tanstack/react-query";
import { createProduct } from "@/services/products.services";
import { QUERY_KEYS } from "@/utils/constants";
import { queryClient } from "@/lib/tanstack/client";
import { useNavigate } from "react-router-dom";

const {PRODUCTS} = QUERY_KEYS;

export const useCreateProduct = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS] });
      navigate("/seller/dashboard");
    }
  });
};
