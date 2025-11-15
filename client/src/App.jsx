import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";
import ProductPage from "./pages/ProductPage";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUsPage";
import CheckoutPage from "./pages/CheckoutPage";
import AuthPage from "./pages/AuthPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminPage from "./pages/AdminPage";
import AddressPage from "./pages/AddressPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

import CartDrawer from "./components/CartDrawer";
import ScrollToTop from "./utils/ScrollToTop";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import ReturnsPage from "./pages/ReturnsPage";
import ShippingPage from "./pages/ShippingPage";
function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation(); // Get current route

  // Hide Navbar/Footer for any admin route
  const shouldHideLayout = location.pathname.startsWith("/admin");

  return (
    <>
      {!shouldHideLayout && (
        <Navbar
          onOpenCart={() => setCartOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}

      <ScrollToTop />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <main className="pt-20">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          theme="colored"
          pauseOnHover
        />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/admin-page" element={<AdminPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/forget-password" element={<ForgotPasswordPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/detail-page/:id" element={<ProductDetailPage />} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
        </Routes>
      </main>

      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default App;
