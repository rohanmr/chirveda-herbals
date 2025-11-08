import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";
import ProductPage from "./pages/ProductPage";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUsPage";
import Footer from "./components/Footer/Footer";
// import CartPage from "./pages/CartPage";   <-- REMOVE THIS
import CheckoutPage from "./pages/CheckoutPage";
import AuthPage from "./pages/AuthPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

import CartDrawer from "./components/CartDrawer"; // ADD THIS

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      {/* pass open function to navbar */}
      <Navbar onOpenCart={() => setCartOpen(true)} />

      {/* DRAWER OUTSIDE NAVBAR */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <main className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/order-confirmation"
            element={<OrderConfirmationPage />}
          />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/detail-page/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
