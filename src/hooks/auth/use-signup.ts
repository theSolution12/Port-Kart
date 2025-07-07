import { useMutation } from "@tanstack/react-query";
import { signUpWithEmail } from "@/services/auth/auth.services";
import { createUserProfile } from "@/services/auth/profile.services";
import { queryClient } from "@/lib/tanstack/client";
import { useNavigate } from "react-router-dom";
import { QUERY_KEYS } from "@/utils/constants";

type SignUpPayload = {
  name: string;
  email: string;
  password: string;
  role: "customer" | "seller";
};

const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ name, email, password, role }: SignUpPayload) => {
      const { user } = await signUpWithEmail(email, password);
      if (!user) throw new Error("Failed to sign up");
      await createUserProfile({ id: user.id, name, email, role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TOTAL_USERS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
      navigate("/login");
    },
  });
};

export default useSignUp;
