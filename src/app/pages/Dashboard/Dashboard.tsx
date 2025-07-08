import useGetProducts from "@/hooks/api/products/use-get-products"
import useGetTotalUsers from "@/hooks/api/user/use-get-total-users"
import { useAuth } from "@/hooks/auth/use-auth"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const { name } = useAuth()
  const { data: products } = useGetProducts()
  const productCount = products?.length ?? 0
  const navigate = useNavigate();
  const { data: totalUsers } = useGetTotalUsers();
  const userCount = totalUsers?.length ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {name}!</h1>
          <p className="text-muted-foreground">{"Here's a quick overview of your store's performance today."}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate("/products")}
          >
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Total Products</h3>
              <svg
                className="h-4 w-4 text-muted-foreground"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              </svg>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{productCount}</div>
              <p className="text-xs text-muted-foreground">Products in the store</p>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Total Users</h3>
              <svg
                className="h-4 w-4 text-muted-foreground"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{userCount}</div>
              <p className="text-xs text-muted-foreground">Total users</p>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Total Sales</h3>
              <svg
                className="h-4 w-4 text-muted-foreground"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">₹2,340</div>
              <p className="text-xs text-muted-foreground">Revenue this month</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Recent Activity</h3>
            <p className="text-sm text-muted-foreground">Latest updates from your store</p>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">New product added</p>
                  <p className="text-sm text-muted-foreground">Wireless Headphones was added to your store</p>
                </div>
                <div className="text-sm text-muted-foreground">2 mins ago</div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">New user registration</p>
                  <p className="text-sm text-muted-foreground">John Doe signed up for an account</p>
                </div>
                <div className="text-sm text-muted-foreground">10 mins ago</div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Order completed</p>
                  <p className="text-sm text-muted-foreground">Order #1234 has been completed</p>
                </div>
                <div className="text-sm text-muted-foreground">30 mins ago</div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Stock updated</p>
                  <p className="text-sm text-muted-foreground">Smart Watch inventory was updated</p>
                </div>
                <div className="text-sm text-muted-foreground">1 hour ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
