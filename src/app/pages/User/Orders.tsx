// OrdersPage.tsx
import { useAuth } from "@/hooks/auth/use-auth";
import { useGetMyOrders } from "@/hooks/api/orders/use-get-my-orders";

const OrdersPage = () => {
  const { user } = useAuth();
  const { data: orders = [], isLoading, error } = useGetMyOrders(user?.id || "");

  if (!user) return <div className="text-center py-10">Please log in to view yer orders!</div>;
  if (isLoading) return <div className="text-center py-10">Loading yer order log...</div>;
  if (error) return <div className="text-center text-red-600 py-10">Arrr! Trouble fetchin' orders: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📦 Yer Orders</h1>
      {orders.length === 0 ? (
        <p>Ye haven’t ordered any loot yet, matey.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li key={order.id} className="bg-white p-4 shadow-md rounded-lg border">
              <h2 className="font-semibold">🧾 Order ID: {order.id}</h2>
              <p className="text-gray-600">📍 Address: {order.address}</p>
              <p className="text-gray-600">🕰️ Placed on: {new Date(order.created_at).toLocaleString()}</p>
              <div className="mt-3">
                <p className="font-medium mb-1">Item:</p>
                <ul className="list-disc ml-5">
                  <li>
                    Product Name: {order.product_name} × {order.quantity} – ₹{order.total_price}
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;