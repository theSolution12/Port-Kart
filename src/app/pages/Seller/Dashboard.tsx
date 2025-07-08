import { useAuth } from "@/hooks/auth/use-auth"
import useGetMyProducts from "@/hooks/api/seller/use-get-my-products"
import useUpdateStock from "@/hooks/api/seller/use-update-stock"
import useDeleteProduct from "@/hooks/api/seller/use-delete-product"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const SellerDashboard = () => {
  const { user, role, loading } = useAuth()
  const navigate = useNavigate()
  const { data: products = [], refetch } = useGetMyProducts(user?.id || "")
  const { mutate: updateStock } = useUpdateStock(refetch)
  const { mutate: deleteProduct } = useDeleteProduct(refetch)

  if (loading)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Loading...</h2>
        </div>
      </div>
    )

  if (!user || role !== "seller") {
    navigate("/unauthorized");
    return null;
  }

  const handleStock = (productId: string, change: number) => {
    const direction = change > 0 ? "increased" : "decreased"
    const promise = new Promise<void>((resolve, reject) => {
      updateStock(
        { productId, change },
        {
          onSuccess: () => resolve(),
          onError: (err) => reject(err),
        }
      );
    });

    toast.promise(promise, {
      loading: `Updating stock...`,
      success: `Stock ${direction} successfully!`,
      error: (err) => `Failed: ${err.message}`,
    })
  }

  const handleDelete = (productId: string) => {
    const confirmed = confirm("Are you sure you want to delete this product?")
    if (!confirmed) return

    const promise = new Promise<void>((resolve, reject) => {
      deleteProduct(productId, {
        onSuccess: () => resolve(),
        onError: (err) => reject(err),
      });
    });

    toast.promise(promise, {
      loading: "Deleting product...",
      success: "Product deleted successfully!",
      error: (err) => `Couldn't delete: ${err.message}`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Store</h1>
            <p className="text-muted-foreground">Manage your products and inventory</p>
          </div>
          <button
            onClick={() => navigate("/add-product")}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Add New Product
          </button>
        </div>

        {products.length === 0 ? (
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 text-center">
            <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">No products yet</h3>
            <p className="text-sm text-muted-foreground mb-4">{"You haven't added any products to your store yet."}</p>
            <button
              onClick={() => navigate("/add-product")}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Price:</span>
                      <span className="text-sm font-medium">₹{product.price}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Stock:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStock(product.id, -1)}
                          disabled={product.stock <= 0}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        >
                          -
                        </button>
                        <span className="w-12 text-center text-sm font-medium">{product.stock}</span>
                        <button
                          onClick={() => handleStock(product.id, 1)}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SellerDashboard;
