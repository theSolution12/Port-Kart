import type { User } from "@/types/user";
import api from "@/lib/api/client";

export const createUserProfile = async ({
  id,
  name,
  email,
  role = "customer",
  sellerCode,
}: User & { sellerCode?: string }) => {
  const data = await api.post(
    "/api/profile/create-user-profile",
    {id, name, email, role, sellerCode},
    {requireAuth: false}
  );

  return data;
};

// Get user profile (already exists)
export const getUserProfile = async (userId: string): Promise<{ name: string; role: string }> => {
  const data = await api.post<{ name: string; role: string }>(
    "/api/profile/get-user-profile",
    {userId},
    {requireAuth: true}
  )
  return data;
}

export const getTotalUsers = async (): Promise<unknown[]> => {
  const data = await api.get<unknown[]>("/api/profile/get-total-users", { requireAuth: false })
  return data;
};