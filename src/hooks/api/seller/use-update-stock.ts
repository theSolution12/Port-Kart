import { useMutation } from "@tanstack/react-query";
import { updateProductStock } from "@/services/products.services";

const useUpdateStock = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: updateProductStock,
    onSuccess: () => {
      onSuccess?.(); // refetch from dashboard
    },
    onError: (err) => {
      console.error("Failed to update stock", err);
      alert("Arrr! Couldn’t change the stock.");
    },
  });
};

export default useUpdateStock;
