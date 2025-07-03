import { useQuery } from "@tanstack/react-query";
import { getTotalUsers } from "@/services/auth/profile.services";
import { QUERY_KEYS } from "@/utils/constants";


const useGetTotalUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TOTAL_USERS],
    queryFn: getTotalUsers,
  });
};

export default useGetTotalUsers;