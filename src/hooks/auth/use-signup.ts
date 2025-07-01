import { useMutation } from "@tanstack/react-query";
import { signUpWithEmail } from "@/services/auth/auth.services";
import { createUserProfile } from "@/services/auth/profile.services";

type SignUpPayload = {
  name: string;
  email: string;
  password: string;
  role: "customer" | "seller";
};

const useSignUp = () => {
  return useMutation({
    mutationFn: async ({ name, email, password, role }: SignUpPayload) => {
      const { user } = await signUpWithEmail(email, password);
      if (!user) throw new Error("Failed to sign up");
      await createUserProfile({ id: user.id, name, email, role });
    },
  });
};

export default useSignUp;
