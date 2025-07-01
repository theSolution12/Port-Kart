import { useMutation } from "@tanstack/react-query";
import { logout } from "@/services/auth/auth.services";

const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};

export default useLogout;
