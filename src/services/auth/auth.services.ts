import api, { saveSessionTokens, clearSessionTokens } from "@/lib/api/client";

export const signUpWithEmail = async (email: string, password: string) => {
  return api.post<{ user: { id: string; email?: string } }>(
    "/api/auth/signup", 
    { email, password }, 
    { requireAuth: false }
  );
};

export const loginWithEmail = async (email: string, password: string) => {
  const data = await api.post<{ session?: { access_token?: string; refresh_token?: string } }>(
    "/api/auth/login",
    { email, password },
    { requireAuth: false }
  );
  saveSessionTokens(data?.session);
  return data;
};

export const getCurrentUser = async (): Promise<{ id: string; email?: string }> => {
  return api.get<{ id: string; email?: string }>("/api/auth/me");
};

export const logout = async () => {
  await api.post("/api/auth/logout", undefined, { requireAuth: false });
  clearSessionTokens();
};
