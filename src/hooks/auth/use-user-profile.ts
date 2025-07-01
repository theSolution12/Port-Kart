import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/services/auth/profile.services";
import { useAuth } from "./use-auth";

const useUserProfile = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["user-profile", user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error("No user ID");
      return getUserProfile(user.id);
    },
    enabled: !!user?.id,
  });
};

export default useUserProfile;
