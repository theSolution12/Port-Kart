import { useMutation } from "@tanstack/react-query";
import { updateProductStock } from "@/services/products/products.services";
import { queryClient } from "@/lib/tanstack/client";
import { QUERY_KEYS } from "@/utils/constants";

const useUpdateStock = (onSuccess?: () => void) => {
  const {PRODUCTS} = QUERY_KEYS;
  return useMutation({
    mutationFn: updateProductStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS] });
      onSuccess?.(); // refetch from dashboard
    },
    onError: (err) => {
      console.error("Failed to update stock", err);
      alert("Arrr! Couldn’t change the stock.");
    },
  });
};

export default useUpdateStock;
