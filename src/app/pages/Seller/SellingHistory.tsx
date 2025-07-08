
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Loading...</h2>
        </div>
      </div>
    )

  if (!user || role !== "seller") {
    navigate("/unauthorized")
    return null
  }

  if (isLoading)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Loading sales history...</h2>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-950">
          <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2 text-red-800 dark:text-red-200">
            Error
          </h3>
          <p className="text-sm text-red-800 dark:text-red-200">{error.message}</p>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Sales History</h1>
          <p className="text-muted-foreground">Track your product sales and revenue</p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 text-center">
            <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">No sales yet</h3>
            <p className="text-sm text-muted-foreground">
              {"You haven't made any sales yet. Keep promoting your products!"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{order.products?.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Sold on {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">₹{(order.products?.price || 0) * order.quantity}</p>
                      <p className="text-sm text-muted-foreground">Total earned</p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-2">Product Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Price per unit:</span>
                          <span className="text-sm">₹{order.products?.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Quantity sold:</span>
                          <span className="text-sm">{order.quantity}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Customer Information</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-muted-foreground">Delivery address:</span>
                          <p className="text-sm mt-1">{order.address}</p>
                        </div>
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
