import './App.css'
import ListProducts from './app/pages/Products/ListProducts'
import AddProducts from './app/pages/Products/AddProducts'
import SignupForm from './components/auth/SignupForm'
import LoginForm from './components/auth/LoginForm'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './app/pages/Dashboard/Dashboard'
import SellerDashboard from './app/pages/Seller/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProducts />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/products" element={<ListProducts />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
