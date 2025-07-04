import './App.css'
import AddProducts from './app/pages/Products/AddProducts'
import SignupForm from './components/auth/SignupForm'
import LoginForm from './components/auth/LoginForm'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './app/pages/Dashboard/Dashboard'
import SellerDashboard from './app/pages/Seller/Dashboard'
import ProductsWithCart from './app/pages/Products/ProductsWithCart'
import { Toaster } from 'react-hot-toast'
import OrdersPage from './app/pages/User/Orders'
import SellingHistory from './app/pages/Seller/SellingHistory'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProducts />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/products" element={<ProductsWithCart />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/seller/selling-history" element={<SellingHistory />} />
      </Routes>
        <Toaster position='bottom-right' reverseOrder={false} toastOptions={{ duration: 2500 }}/>
    </BrowserRouter>
  )
}

export default App
