import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import Navbar from "./components/navbar/Navbar"
import Dashboard from "./app/pages/Dashboard/Dashboard"
import SignupForm from "./components/auth/SignupForm"
import LoginForm from "./components/auth/LoginForm"
import ProductsWithCart from "./app/pages/Products/ProductsWithCart"
import OrdersPage from "./app/pages/User/Orders"
import AddProducts from "./app/pages/Products/AddProducts"
import SellerDashboard from "./app/pages/Seller/Dashboard"
import SellerOrderHistory from "./app/pages/Seller/SellingHistory"
import "./App.css"
import { Toaster } from "react-hot-toast"

function App() {
  useEffect(() => {
    const { CURRENT_USER, USER } = QUERY_KEYS;
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      queryClient.invalidateQueries({ queryKey: [CURRENT_USER] });
      queryClient.invalidateQueries({ queryKey: [USER] });
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);
  return (
    <ThemeProvider defaultTheme="system" storageKey="portcart-theme">
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/products" element={<ProductsWithCart />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/add-product" element={<AddProducts />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/seller/selling-history" element={<SellerOrderHistory />} />
          </Routes>
          <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
