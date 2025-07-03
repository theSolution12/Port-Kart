import toast from "react-hot-toast";

export const checkoutOrder = async ({
  userId,
  address,
}: {
  userId: string;
  address: string;
}) => {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, address }),
  });
  if (!res.ok) {
    const error = await res.json();
    toast.error(error.error || 'Checkout failed');
    throw new Error(error.error || 'Checkout failed');
  }
  return res.json();
};
