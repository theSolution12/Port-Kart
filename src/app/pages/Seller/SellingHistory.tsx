"use client"

import { useAuth } from "@/hooks/auth/use-auth"
import { useGetSellingHistory } from "@/hooks/api/seller/use-get-selling-history"
import { useNavigate } from "react-router-dom"

const SellerOrderHistory = () => {
  const { user, role, loading } = useAuth()
  const navigate = useNavigate()

  const sellerId = user?.id ?? ""
  const { data: orders = [], isLoading, error } = useGetSellingHistory(sellerId)

  if (loading)
    return (
      <div className="min-h-screen bg-yellow-300 p-8 font-mono">
        <div className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-8 text-center">
          <h1 className="text-4xl font-black">LOADING...</h1>
        </div>
      </div>
    )

  if (!user || role !== "seller") {
    navigate("/unauthorized")
    return null
  }

  if (isLoading)
    return (
      <div className="min-h-screen bg-cyan-300 p-8 font-mono">
        <div className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-8 text-center">
          <h1 className="text-4xl font-black">LOADING SALES DATA...</h1>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen bg-red-300 p-8 font-mono">
        <div className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-8 text-center">
          <h1 className="text-4xl font-black">ERROR: {error.message.toUpperCase()}</h1>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-lime-300 p-8 font-mono">
      <div className="max-w-5xl mx-auto">
        <div className="bg-black text-white p-6 mb-8 border-8 border-black shadow-[8px_8px_0px_0px_#ffffff]">
          <h1 className="text-5xl font-black text-center">🧾 YOUR SALES HISTORY</h1>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-8 text-center">
            <h2 className="text-3xl font-black mb-4">NO SALES YET!</h2>
            <p className="text-xl font-bold">TIME TO START SELLING!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="bg-cyan-300 border-4 border-black p-3 mb-4">
                      <h2 className="text-2xl font-black">{order.products?.title?.toUpperCase()}</h2>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-green-200 border-2 border-black p-2">
                        <span className="font-black">PRICE:</span> ₹{order.products?.price}
                      </div>
                      <div className="bg-yellow-200 border-2 border-black p-2">
                        <span className="font-black">QUANTITY:</span> {order.quantity}
                      </div>
                      <div className="bg-pink-200 border-2 border-black p-2">
                        <span className="font-black">TOTAL EARNED:</span> ₹
                        {(order.products?.price || 0) * order.quantity}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-orange-300 border-4 border-black p-3 mb-4">
                      <h3 className="text-xl font-black">ORDER DETAILS</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-purple-200 border-2 border-black p-2">
                        <span className="font-black">DELIVERY:</span> {order.address}
                      </div>
                      <div className="bg-blue-200 border-2 border-black p-2">
                        <span className="font-black">SOLD ON:</span> {new Date(order.created_at).toLocaleString()}
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
  )
}

export default SellerOrderHistory
