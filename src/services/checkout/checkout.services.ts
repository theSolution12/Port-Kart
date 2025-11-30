import api from "@/lib/api/client";

export const dummyCheckout = async ({
    userId,
    address,
  }: {
    userId: string;
    address: string;
  }) => {
    const data = await api.post<{ success: boolean; message: string }>(
      "/api/checkout/checkout",
      { userId, address },
      { requireAuth: true }
    );
    return data;
  };
  