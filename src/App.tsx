import './App.css'
import AddProducts from './app/pages/Products/AddProducts'
import SignupForm from './components/auth/SignupForm'
import LoginForm from './components/auth/LoginForm'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './app/pages/Dashboard/Dashboard'
import SellerDashboard from './app/pages/Seller/Dashboard'
import ProductsWithCart from './app/pages/Products/ProductsWithCart'
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { queryClient } from '@/lib/tanstack/client';
import { QUERY_KEYS } from '@/utils/constants';
import { Toaster } from 'react-hot-toast'

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
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProducts />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/products" element={<ProductsWithCart />} />
      </Routes>
        <Toaster position='bottom-right' reverseOrder={false} toastOptions={{ duration: 2000 }}/>
    </BrowserRouter>
  )
}

export default App
