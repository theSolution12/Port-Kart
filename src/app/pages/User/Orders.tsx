import { useAuth } from "@/hooks/auth/use-auth";
import { useGetMyOrders } from "@/hooks/api/orders/use-get-my-orders";

const OrdersPage = () => {
  const { user } = useAuth();
  const { data: orders = [], isLoading, error } = useGetMyOrders(user?.id || "");

  if (!user) return (
    <div className="min-h-screen bg-red-300 p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-8 text-center">
          <h1 className="text-4xl font-black mb-4">ACCESS DENIED</h1>
          <p className="text-2xl font-bold">LOGIN REQUIRED TO VIEW ORDERS!</p>
        </div>
      </div>
    </div>
  );

  if (isLoading) return (
    <div className="min-h-screen bg-yellow-300 p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-8 text-center">
          <h1 className="text-4xl font-black">LOADING ORDERS...</h1>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-red-300 p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-8 text-center">
          <h1 className="text-4xl font-black mb-4">ERROR!</h1>
          <p className="text-xl font-bold">{error.message.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-lime-300 p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black text-white p-6 mb-8 border-8 border-black shadow-[8px_8px_0px_0px_#ffffff]">
          <h1 className="text-5xl font-black text-center">📦 YOUR ORDERS</h1>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-8 text-center">
            <h2 className="text-3xl font-black mb-4">NO ORDERS YET!</h2>
            <p className="text-xl font-bold">TIME TO START SHOPPING!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="bg-cyan-300 border-4 border-black p-3 mb-4">
                      <h2 className="text-2xl font-black">ORDER #{order.id}</h2>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-yellow-200 border-2 border-black p-2">
                        <span className="font-black">PRODUCT:</span> {order.product_name}
                      </div>
                      <div className="bg-pink-200 border-2 border-black p-2">
                        <span className="font-black">QUANTITY:</span> {order.quantity}
                      </div>
                      <div className="bg-green-200 border-2 border-black p-2">
                        <span className="font-black">TOTAL:</span> ₹{order.total_price}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-orange-300 border-4 border-black p-3 mb-4">
                      <h3 className="text-xl font-black">DELIVERY INFO</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-purple-200 border-2 border-black p-2">
                        <span className="font-black">ADDRESS:</span> {order.address}
                      </div>
                      <div className="bg-blue-200 border-2 border-black p-2">
                        <span className="font-black">ORDERED:</span> {new Date(order.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
