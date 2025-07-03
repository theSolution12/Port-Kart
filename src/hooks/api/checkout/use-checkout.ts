import { useMutation } from "@tanstack/react-query";
import { checkoutOrder } from "@/services/checkout/checkout.services";
import { QUERY_KEYS } from "@/utils/constants";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useCheckout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: checkoutOrder,
    onSuccess: () => {
      toast.success('Order placed successfully!');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.PRODUCTS]})
    },
    onError: (err: Error) => {
      toast.error(`Error: ${err.message}`);
    }
  });
};

export default useCheckout;