import { useAuth } from "@/hooks/auth/use-auth";
import useGetMyProducts from "@/hooks/api/seller/use-get-my-products";
import useUpdateStock from "@/hooks/api/seller/use-update-stock";
import useDeleteProduct from "@/hooks/api/seller/use-delete-product";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SellerDashboard = () => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();
  const { data: products = [], refetch } = useGetMyProducts(user?.id || "");
  const { mutate: updateStock } = useUpdateStock(refetch);
  const { mutate: deleteProduct } = useDeleteProduct(refetch);

  if (loading) return <div className="text-center mt-10">Loading authentication...</div>;
  if (!user || role !== "seller") {
    navigate("/unauthorized");
    return null;
  }

  const handleStock = (productId: string, change: number) => {
    const direction = change > 0 ? "increased" : "decreased";
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
    });
  };

  const handleDelete = (productId: string) => {
    const confirmed = confirm("Ye sure want to delete this fine treasure?");
    if (!confirmed) return;

    const promise = new Promise<void>((resolve, reject) => {
      deleteProduct(productId, {
        onSuccess: () => resolve(),
        onError: (err) => reject(err),
      });
    });

    toast.promise(promise, {
      loading: "Tossing item overboard...",
      success: "Product deleted, Cap’n!",
      error: (err) => `Couldn’t delete: ${err.message}`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">☠️ Your Merchant Deck</h1>
        <button
          onClick={() => navigate("/add-product")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
        >
          + Add New Product
        </button>
      </div>

      {products.length === 0 ? (
        <p>Ye haven’t listed a single item, Cap’n. Start now!</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p) => (
            <li key={p.id} className="bg-white shadow-md p-4 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
              <p className="text-gray-700">💰 Price: ₹{p.price}</p>
              <div className="flex items-center mt-4 space-x-4">
                <button
                  onClick={() => handleStock(p.id, -1)}
                  disabled={p.stock <= 0}
                  className="bg-gray-200 text-black px-2 rounded disabled:opacity-50"
                >
                  ➖
                </button>
                <span className="font-mono w-6 text-center">{p.stock}</span>
                <button
                  onClick={() => handleStock(p.id, 1)}
                  className="bg-gray-200 text-black px-2 rounded"
                >
                  ➕
                </button>
              </div>
              <div className="mt-4 text-right">
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SellerDashboard;
