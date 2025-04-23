import React from "react";
import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Styles
import './App.css';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from "./pages/NotFound";
import Dashboard from './pages/Dashboard';
import AdminUsers from './pages/admin/Users';

// Customer Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminProducts from './pages/admin/Products';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AdminRoute from './components/AdminRoute';

const App: React.FC = () => (
  <AuthProvider>
    <CartProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="users" element={<AdminUsers />} />
            {/* More admin routes will go here */}
            <Route path="*" element={<NotFound />} />
          </Route>
          
          {/* Customer Routes */}
          <Route path="/" element={
            <>
              <Navbar />
              <main>
                <Home />
              </main>
              <Footer />
            </>
          } />
          <Route path="*" element={
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } />
                  <Route path="/order-success" element={
                    <ProtectedRoute>
                      <OrderSuccess />
                    </ProtectedRoute>
                  } />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </AuthProvider>
);

export default App;
