import { Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingCart from '@/components/ui/FloatingCart'
import Home from '@/pages/Home'
import Products from '@/pages/Products'
import ProductDetails from '@/pages/ProductDetails'
import Cart from '@/pages/Cart'
import Checkout from '@/pages/Checkout'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Premium from '@/pages/Premium'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

import DarkModeToggle from '@/components/ui/DarkModeToggle'
import MobileNav from '@/components/layout/MobileNav'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <DarkModeToggle />
      <Navbar />
      <main className="min-h-[calc(100vh-200px)] pb-16 lg:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/premium" element={<Premium />} />
        </Routes>
      </main>
      <Footer />
      <FloatingCart className="hidden lg:flex" />
      <MobileNav />
      <Toaster />
    </div>
  )
}

export default App

