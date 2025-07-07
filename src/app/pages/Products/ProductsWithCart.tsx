"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/auth/use-auth"
import useGetProducts from "@/hooks/api/products/use-get-products"
import useGetCartItems from "@/hooks/api/cart/use-get-cart-items"
import useUpdateCartQuantity from "@/hooks/api/cart/use-update-cart-quantity"
import useRemoveFromCart from "@/hooks/api/cart/use-remove-from-cart"
import useAddToCart from "@/hooks/api/cart/use-add-to-cart"
import { useCheckout } from "@/hooks/checkout/use-checkout"
import { useDebounce } from "@/hooks/debounce/use-debounce"
import toast from "react-hot-toast"

const ProductsWithCart = () => {
  const { user } = useAuth()
  const userId = user?.id ?? ""

  const { data: products = [], isLoading, error } = useGetProducts()
  const { data: cartItems = [] } = useGetCartItems(userId)
  const { mutate: addToCart } = useAddToCart()
  const { mutate: updateQuantity } = useUpdateCartQuantity()
  const { mutate: removeFromCart } = useRemoveFromCart()
  const { mutate: checkout } = useCheckout()
  const [cartOpen, setCartOpen] = useState(true)
  const [address, setAddress] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
  )

  const handleCheckout = () => {
    if (!address.trim()) {
      toast.error("ENTER DELIVERY ADDRESS!")
      return
    }
    if (cartItems.length === 0) {
      toast.error("CART IS EMPTY!")
      return
    }

    checkout(
      { userId, address },
      {
        onSuccess: (response) => {
          toast.success(response.message.toUpperCase())
          setAddress("")
        },
        onError: (error) => {
          toast.error(error.message?.toUpperCase() || "CHECKOUT FAILED!")
        },
      },
    )
  }

  if (isLoading)
    return (
      <div className="min-h-screen bg-yellow-300 p-8 font-mono">
        <div className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-8 text-center">
          <h1 className="text-4xl font-black">LOADING PRODUCTS...</h1>
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
    <div className="min-h-screen bg-cyan-300 font-mono p-8 flex gap-8">
      {/* Product List */}
      <div className="flex-1">
        <div className="bg-black text-white p-6 mb-8 border-8 border-black shadow-[8px_8px_0px_0px_#ffffff]">
          <h1 className="text-5xl font-black text-center">🛍️ PRODUCTS</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-4">
            <input
              type="text"
              placeholder="SEARCH PRODUCTS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 border-4 border-black bg-yellow-200 text-black font-bold placeholder-black text-xl focus:outline-none focus:bg-yellow-300"
            />
            {debouncedSearchQuery && (
              <div className="mt-4 bg-lime-200 border-4 border-black p-2 text-center font-bold">
                FOUND {filteredProducts.length} PRODUCTS MATCHING "{debouncedSearchQuery.toUpperCase()}"
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-4">
              {product.image_url && (
                <div className="w-full aspect-square mb-4 border-4 border-black overflow-hidden">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="bg-pink-300 border-4 border-black p-2 mb-2">
                <h2 className="text-lg font-black truncate">{product.title.toUpperCase()}</h2>
              </div>

              <div className="bg-orange-200 border-2 border-black p-2 mb-2">
                <p className="font-bold">STOCK: {product.stock}</p>
              </div>

              <div className="bg-green-300 border-4 border-black p-2 mb-4">
                <span className="text-2xl font-black">₹{product.price}</span>
              </div>

              <button
                onClick={() => {
                  if (!user) {
                    toast.error("LOGIN REQUIRED!")
                    return
                  }

                  if (product.stock <= 0) {
                    toast.error("OUT OF STOCK!")
                    return
                  }

                  addToCart(
                    { userId, productId: product.id },
                    {
                      onSuccess: () => toast.success("ADDED TO CART!"),
                      onError: (err) => toast.error(`FAILED: ${err.message.toUpperCase()}`),
                    },
                  )
                }}
                className="w-full bg-black text-white p-3 border-4 border-black font-black text-lg hover:bg-gray-800 active:shadow-none shadow-[4px_4px_0px_0px_#ef4444]"
              >
                ADD TO CART
              </button>

              {product.seller?.name && (
                <div className="mt-2 bg-blue-200 border-2 border-black p-1 text-center">
                  <span className="font-bold text-sm">SOLD BY: {product.seller.name.toUpperCase()}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      {user && cartOpen && (
        <div className="w-80 bg-white border-8 border-black shadow-[8px_8px_0px_0px_#000000] p-6 sticky top-8 h-fit">
          <div className="bg-black text-white p-4 -m-6 mb-6 border-b-8 border-black">
            <h2 className="text-3xl font-black text-center">🛒 CART</h2>
            <button
              className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 border-2 border-white font-black"
              onClick={() => setCartOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto mb-6">
            {cartItems.length === 0 ? (
              <div className="bg-gray-200 border-4 border-black p-4 text-center">
                <p className="font-black">CART IS EMPTY!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-yellow-200 border-4 border-black p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-black text-sm truncate">{item.product.title.toUpperCase()}</span>
                      <span className="font-black">₹{item.product.price * item.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            { userId, productId: item.product_id, quantity: item.quantity - 1 },
                            {
                              onSuccess: () => toast.success("UPDATED!"),
                              onError: (err) => toast.error(`ERROR: ${err.message.toUpperCase()}`),
                            },
                          )
                        }
                        className="bg-red-500 text-white w-8 h-8 border-2 border-black font-black"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="font-black w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            { userId, productId: item.product_id, quantity: item.quantity + 1 },
                            {
                              onSuccess: () => toast.success("UPDATED!"),
                              onError: (err) => toast.error(`ERROR: ${err.message.toUpperCase()}`),
                            },
                          )
                        }
                        className="bg-green-500 text-white w-8 h-8 border-2 border-black font-black"
                      >
                        +
                      </button>
                      <button
                        onClick={() =>
                          removeFromCart(
                            { userId, productId: item.product_id },
                            {
                              onSuccess: () => toast.success("REMOVED!"),
                              onError: (err) => toast.error(`ERROR: ${err.message.toUpperCase()}`),
                            },
                          )
                        }
                        className="ml-auto bg-red-600 text-white px-2 py-1 border-2 border-black font-bold text-xs"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t-8 border-black pt-4">
            <div className="bg-green-300 border-4 border-black p-3 mb-4 text-center">
              <span className="text-2xl font-black">TOTAL: ₹{total}</span>
            </div>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="DELIVERY ADDRESS..."
              className="w-full p-3 border-4 border-black bg-orange-200 text-black font-bold placeholder-black resize-none focus:outline-none focus:bg-orange-300"
              rows={3}
            />

            <button
              className="w-full mt-4 bg-black text-white p-4 border-4 border-black font-black text-xl hover:bg-gray-800 active:shadow-none shadow-[4px_4px_0px_0px_#22c55e] disabled:opacity-50"
              disabled={cartItems.length === 0 || !address.trim()}
              onClick={handleCheckout}
            >
              CHECKOUT NOW!
            </button>
          </div>
        </div>
      )}

      {/* Floating cart button if cart closed */}
      {user && !cartOpen && (
        <button
          className="fixed right-8 top-1/2 -translate-y-1/2 bg-black text-white w-16 h-16 border-8 border-white shadow-[8px_8px_0px_0px_#000000] font-black text-2xl z-50"
          onClick={() => setCartOpen(true)}
        >
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-black w-6 h-6 border-2 border-white flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      )}
    </div>
  )
}

export default ProductsWithCart
