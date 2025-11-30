import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "@/services/products/products.services";

const useDeleteProduct = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (err) => {
      console.error("Failed to delete product", err);
      alert("Couldn’t throw that product overboard, Cap’n!");
    },
  });
};

export default useDeleteProduct;
