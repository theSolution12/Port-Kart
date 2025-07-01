import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, getUserProfile } from "@/services/auth/profile.services";
import { QUERY_KEYS } from "@/utils/constants";

export const useAuth = () => {

  const { USER, CURRENT_USER } = QUERY_KEYS;

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: [CURRENT_USER],
    queryFn: getCurrentUser,
  });

  const userId = user?.id;
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: [USER, userId],
    queryFn: () => getUserProfile(userId!),
    enabled: !!userId,
  });

  return {
    user,
    role: profile?.role ?? null,
    loading: userLoading || profileLoading,
    name: profile?.name ?? null,
  };
};



