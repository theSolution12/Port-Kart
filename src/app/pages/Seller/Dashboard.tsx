"use client"

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

  const handleStock = (productId: string, change: number) => {
    const direction = change > 0 ? "INCREASED" : "DECREASED"
    const promise = new Promise<void>((resolve, reject) => {
      updateStock(
        { productId, change },
        {
          onSuccess: () => resolve(),
          onError: (err) => reject(err),
        },
      )
    })

    toast.promise(promise, {
      loading: `UPDATING STOCK...`,
      success: `STOCK ${direction} SUCCESSFULLY!`,
      error: (err) => `FAILED: ${err.message.toUpperCase()}`,
    })
  }

  const handleDelete = (productId: string) => {
    const confirmed = confirm("DELETE THIS PRODUCT?")
    if (!confirmed) return

    const promise = new Promise<void>((resolve, reject) => {
      deleteProduct(productId, {
        onSuccess: () => resolve(),
        onError: (err) => reject(err),
      })
    })

    toast.promise(promise, {
      loading: "DELETING PRODUCT...",
      success: "PRODUCT DELETED!",
      error: (err) => `COULDN'T DELETE: ${err.message.toUpperCase()}`,
    })
  }

  return (
    <div className="min-h-screen bg-purple-300 p-8 font-mono">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="bg-black text-white p-6 border-8 border-black shadow-[8px_8px_0px_0px_#ffffff]">
            <h1 className="text-4xl font-black">☠️ YOUR STORE</h1>
          </div>
          <button
            onClick={() => navigate("/add-product")}
            className="bg-green-400 text-black px-6 py-4 border-8 border-black font-black text-xl hover:bg-green-300 shadow-[8px_8px_0px_0px_#000000] active:shadow-none"
          >
            + ADD PRODUCT
          </button>
        </div>

        {products.length === 0 ? (
          <div className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-8 text-center">
            <h2 className="text-3xl font-black mb-4">NO PRODUCTS YET!</h2>
            <p className="text-xl font-bold">START ADDING PRODUCTS TO YOUR STORE!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-6">
                <div className="bg-cyan-300 border-4 border-black p-3 mb-4">
                  <h2 className="text-xl font-black truncate">{p.title.toUpperCase()}</h2>
                </div>

                <div className="bg-green-200 border-2 border-black p-2 mb-4">
                  <p className="font-bold">💰 PRICE: ₹{p.price}</p>
                </div>

                <div className="bg-yellow-200 border-4 border-black p-3 mb-4">
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => handleStock(p.id, -1)}
                      disabled={p.stock <= 0}
                      className="bg-red-500 text-white w-10 h-10 border-4 border-black font-black text-xl disabled:opacity-50 hover:bg-red-400"
                    >
                      -
                    </button>
                    <div className="bg-white border-4 border-black px-4 py-2">
                      <span className="font-black text-2xl">{p.stock}</span>
                    </div>
                    <button
                      onClick={() => handleStock(p.id, 1)}
                      className="bg-green-500 text-white w-10 h-10 border-4 border-black font-black text-xl hover:bg-green-400"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-center font-bold mt-2">STOCK</p>
                </div>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="w-full bg-red-600 text-white p-3 border-4 border-black font-black text-lg hover:bg-red-500 shadow-[4px_4px_0px_0px_#000000] active:shadow-none"
                >
                  🗑️ DELETE
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SellerDashboard
