import { useState } from "react"
import { useAuth } from "@/hooks/auth/use-auth"
import useGetProducts from "@/hooks/api/products/use-get-products"
import useGetCartItems from "@/hooks/api/cart/use-get-cart-items"
import useUpdateCartQuantity from "@/hooks/api/cart/use-update-cart-quantity"
import useRemoveFromCart from "@/hooks/api/cart/use-remove-from-cart"
import useAddToCart from "@/hooks/api/cart/use-add-to-cart"
import useCheckout from "@/hooks/api/checkout/use-checkout"
import { useDebounce } from "@/hooks/debounce/use-debounce" 
import toast from "react-hot-toast"

const ProductsWithCart = () => {
  const { user } = useAuth();
  const userId = user?.id ?? "";

  const { data: products = [], isLoading, error } = useGetProducts();
  const { data: cartItems = [] } = useGetCartItems(userId);
  const { mutate: addToCart } = useAddToCart();
  const { mutate: updateQuantity } = useUpdateCartQuantity();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const { mutate: checkout } = useCheckout();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const [cartOpen, setCartOpen] = useState(true);
  const [address, setAddress] = useState("");
  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (!address.trim()) {
      toast.error("Please enter your delivery address")
      return
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    checkout(
      { userId, address },
      {
        onSuccess: (response) => {
          toast.success(response.message)
          setAddress("")
        },
        onError: (error) => {
          toast.error(error.message || "Checkout failed")
        },
      },
    )
  }

  if (isLoading)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Loading products...</h2>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-destructive">Error: {error.message}</h2>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 px-4">
        <div className="flex gap-6">
          {/* Product List */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Products</h1>
              <p className="text-muted-foreground">Discover our amazing products</p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              {debouncedSearchQuery && (
                <p className="text-sm text-muted-foreground mt-2">
                  Found {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} matching "
                  {debouncedSearchQuery}"
                </p>
              )}
            </div>

            <div className="grid gap-2 grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 xl:grid-cols-16">
              {filteredProducts.map((product) => (
                <div key={product.id} className="rounded border bg-card text-card-foreground shadow-sm">
                  {product.image_url && (
                    <div className="aspect-square overflow-hidden rounded-t">
                      <img
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.title}
                        className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-1">
                    <h3 className="font-semibold leading-none tracking-tight mb-1 text-lg line-clamp-2">{product.title}</h3>
                    <p className="text-xs text-muted-foreground mb-1">Stock: {product.stock}</p>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold">₹{product.price}</span>
                    </div>

                    <button
                      onClick={() => {
                        if (!user) {
                          toast.error("Please log in to add items to cart")
                          return
                        }

                        if (product.stock <= 0) {
                          toast.error("Product is out of stock")
                          return
                        }

                        addToCart(
                          { userId, productId: product.id },
                          {
                            onSuccess: () => toast.success("Added to cart!"),
                            onError: (err) => toast.error(`Failed: ${err.message}`),
                          },
                        )
                      }}
                      className="inline-flex items-center justify-center rounded text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-primary/90 h-7 px-3 py-1.5 w-full border border-2 border-secondary hover:border-primary/90"
                    >
                      Add to Cart
                    </button>

                    {product.seller?.name && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">Sold by: {product.seller.name}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          {user && cartOpen && (
            <div className="w-80 rounded-lg border bg-card text-card-foreground shadow-sm h-fit sticky top-16">
              <div className="flex flex-col space-y-1.5 p-6 relative">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Your Cart</h3>
                <button
                  className="absolute top-4 right-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                  onClick={() => setCartOpen(false)}
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
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 pt-0">
                <div className="max-h-96 overflow-y-auto mb-4">
                  {cartItems.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.product.title}</h4>
                            <p className="text-sm text-muted-foreground">₹{item.product.price} each</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    { userId, productId: item.product_id, quantity: item.quantity - 1 },
                                    {
                                      onSuccess: () => toast.success("Quantity updated"),
                                      onError: (err) => toast.error(`Error: ${err.message}`),
                                    },
                                  )
                                }
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8"
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    { userId, productId: item.product_id, quantity: item.quantity + 1 },
                                    {
                                      onSuccess: () => toast.success("Quantity updated"),
                                      onError: (err) => toast.error(`Error: ${err.message}`),
                                    },
                                  )
                                }
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8"
                              >
                                +
                              </button>
                              <button
                                onClick={() =>
                                  removeFromCart(
                                    { userId, productId: item.product_id },
                                    {
                                      onSuccess: () => toast.success("Item removed"),
                                      onError: (err) => toast.error(`Error: ${err.message}`),
                                    },
                                  )
                                }
                                className="ml-auto text-sm text-destructive hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">₹{item.product.price * item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold mb-4">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Delivery Address
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your delivery address..."
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      rows={3}
                    />
                  </div>

                  <button
                    className="inline-flex items-center mt-4 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full border border-2 border-primary hover:border-primary/90"
                    disabled={cartItems.length === 0 || !address.trim()}
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Floating cart button if cart closed */}
          {user && !cartOpen && (
            <button
              className="fixed right-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-14 w-14 shadow-lg z-50"
              onClick={() => setCartOpen(true)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-4.8" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsWithCart;
