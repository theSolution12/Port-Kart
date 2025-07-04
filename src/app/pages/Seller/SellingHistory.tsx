import { useAuth } from "@/hooks/auth/use-auth";
import { useGetSellingHistory } from "@/hooks/api/seller/use-get-selling-history";
import { useNavigate } from "react-router-dom";

const SellerOrderHistory = () => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();

  const sellerId = user?.id ?? "";
  const { data: orders = [], isLoading, error } = useGetSellingHistory(sellerId);

  if (loading) return <div className="text-center mt-10">Loading yer ship’s papers...</div>;
  if (!user || role !== "seller") {
    navigate("/unauthorized");
    return null;
  }

  if (isLoading) return <div className="text-center mt-10">Charting the orders...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">⚠️ {error.message}</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">🧾 Yer Sold Treasures</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">No booty’s been sold yet, Cap’n.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="bg-white shadow border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between"
            >
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-indigo-700">{order.products?.title}</h2>
                <p className="text-sm text-gray-500 mt-1">💰 Price: ₹{order.products?.price}</p>
                <p className="text-sm text-gray-500">📦 Quantity: {order.quantity}</p>
                <p className="text-sm text-gray-500">📮 Address: {order.address}</p>
              </div>
              <div className="mt-3 md:mt-0 text-sm text-gray-400">
                <p>🧭 Ordered on:</p>
                <p className="font-mono">{new Date(order.created_at).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SellerOrderHistory;
