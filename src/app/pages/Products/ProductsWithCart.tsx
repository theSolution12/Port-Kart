import { useState } from "react";
import { useAuth } from "@/hooks/auth/use-auth";
import useGetProducts from "@/hooks/api/products/use-get-products";
import useGetCartItems from "@/hooks/api/cart/use-get-cart-items";
import useUpdateCartQuantity from "@/hooks/api/cart/use-update-cart-quantity";
import useRemoveFromCart from "@/hooks/api/cart/use-remove-from-cart";
import useAddToCart from "@/hooks/api/cart/use-add-to-cart";

const ProductsWithCart = () => {
  const { user } = useAuth();
  const userId = user?.id ?? "";

  const { data: products = [], isLoading, error } = useGetProducts();
  const { data: cartItems = [] } = useGetCartItems(userId);
  const { mutate: addToCart } = useAddToCart();
  const { mutate: updateQuantity } = useUpdateCartQuantity();
  const { mutate: removeFromCart } = useRemoveFromCart();

  const [cartOpen, setCartOpen] = useState(true);

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!userId){
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-100 font-sans py-10 px-4 flex gap-6 relative">
        <h1 className="text-2xl font-bold text-gray-900">Please login to view products</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 font-sans py-10 px-4 flex gap-6 relative">
      {/* Product List */}
      <div className="flex-1">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight text-center drop-shadow-sm">Discover Products</h1>
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-3 flex flex-col border border-slate-100 hover:shadow-2xl transition-shadow duration-300 group relative overflow-hidden max-w-[280px] mx-auto"
              style={{ minWidth: 0 }}
            >
              {product.image_url && (
                <div className="w-full aspect-[3/2] mb-2 rounded-lg overflow-hidden border border-slate-200">
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h2 className="text-base font-semibold text-gray-900 mb-1 truncate">{product.title}</h2>
              <p className="text-gray-500 mb-1 text-xs line-clamp-1">Stock: {product.stock}</p>
              <div className="mt-auto flex flex-col gap-1">
                <span className="text-indigo-700 font-bold text-base">₹{product.price}</span>
                <button
                  onClick={() => addToCart({ userId, productId: product.id })}
                  className="mt-1 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-3 py-1.5 rounded-lg font-semibold shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm flex items-center gap-1 justify-center"
                >
                  {/* Cart icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437m0 0L7.2 15.607a2.25 2.25 0 002.2 1.743h7.2a2.25 2.25 0 002.2-1.743l1.174-6.607a1.125 1.125 0 00-1.1-1.357H6.272m-1.166 0L4.5 6.75m0 0h15.75" />
                  </svg>
                  Add to Cart
                </button>
              </div>
              {product.seller?.name && (
                <div className="mt-2 text-xs text-gray-400">
                  Sold by: <span className="font-medium text-gray-600">{product.seller.name}</span>
                </div>
              )}
              <div className="absolute inset-0 pointer-events-none rounded-xl border border-transparent group-hover:border-indigo-200 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar or Floating Button */}
      {cartOpen ? (
        <div
          className="relative transition-all duration-300 w-80 bg-white/60 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl flex flex-col sticky top-8 h-[80vh] min-h-[400px]"
          style={{ minWidth: 320 }}
        >
          {/* Cart Toggle Button */}
          <button
            className="absolute -left-5 top-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10 transition-transform border-4 border-white"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
          >
            {/* Shopping cart icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437m0 0L7.2 15.607a2.25 2.25 0 002.2 1.743h7.2a2.25 2.25 0 002.2-1.743l1.174-6.607a1.125 1.125 0 00-1.1-1.357H6.272m-1.166 0L4.5 6.75m0 0h15.75" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
          <div className="p-6 flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <span className="inline-block align-middle">Your Cart</span>
            </h2>
            <div className="flex-1 overflow-y-auto pr-1">
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center mt-16">Your cart is empty.</p>
              ) : (
                <ul className="space-y-5 divide-y divide-slate-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="pt-2 first:pt-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-800 truncate max-w-[120px]">{item.product.title}</span>
                        <span className="font-semibold text-indigo-700">₹{item.product.price * item.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() =>
                            updateQuantity({
                              userId,
                              productId: item.product_id,
                              quantity: item.quantity - 1,
                            })
                          }
                          className="px-2 bg-gray-200 hover:bg-gray-300 rounded text-lg font-bold transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          –
                        </button>
                        <span className="font-semibold text-gray-700 w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity({
                              userId,
                              productId: item.product_id,
                              quantity: item.quantity + 1,
                            })
                          }
                          className="px-2 bg-gray-200 hover:bg-gray-300 rounded text-lg font-bold transition-colors"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart({ userId, productId: item.product_id })}
                          className="ml-auto text-red-500 hover:underline text-xs font-medium px-2 py-1 rounded transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mt-8 border-t border-slate-200 pt-4">
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <button
                className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-lg"
                disabled
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Floating cart button when collapsed
        <button
          className="fixed right-6 top-1/7 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl z-50 transition-transform border-4 border-white"
          onClick={() => setCartOpen(true)}
          aria-label="Open cart"
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437m0 0L7.2 15.607a2.25 2.25 0 002.2 1.743h7.2a2.25 2.25 0 002.2-1.743l1.174-6.607a1.125 1.125 0 00-1.1-1.357H6.272m-1.166 0L4.5 6.75m0 0h15.75" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
};

export default ProductsWithCart;
