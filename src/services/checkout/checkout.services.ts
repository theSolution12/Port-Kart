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

  let data;
  try {
    data = await res.json();
  } catch {
    // If not JSON, get text for debugging
    const text = await res.text();
    throw new Error(text || 'Server returned invalid response');
  }

  if (!res.ok) {
    throw new Error(data?.error || 'Checkout failed');
  }
  return data;
};
