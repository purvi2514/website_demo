// src/App.jsx
import React, { useMemo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Contexts (✅ all lowercase 'context' folder, named exports only)
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CategoryProvider } from "./context/CategoryContext";

import { GoogleOAuthProvider } from "@react-oauth/google";

// Admin
import AdminLayout from "./admin/AdminLayout";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import Dashboard from "./admin/pages/Dashboard";
import ProductsAdmin from "./admin/pages/Products";
import AddProducts from "./admin/pages/AddProducts";
import Categories from "./admin/pages/Categories";
import AddCategory from "./admin/pages/AddCategory";
import Orders from "./admin/pages/Orders";
import Sellers from "./admin/pages/Sellers";
import AddSeller from "./admin/pages/AddSeller";
import Users from "./admin/pages/Users";
import AdminBestSellers from "./admin/pages/AdminBestSellers";
import AdminCategories from "./admin/pages/AdminCategories";
import AdminBanner from "./admin/pages/AdminBanner";
import AdminLogin from "./admin/pages/AdminLogin";

// Public Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess";
import CategoryPage from "./pages/CategoryPage";
import WishlistPage from "./pages/WishlistPage";

// Auth Pages
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

/* 🔹 Public layout wrapper */
function PublicLayout({ children }) {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth");
  return (
    <>
      {!isAuthPage && <Navbar />}
      {children}
      {!isAuthPage && <Footer />}
    </>
  );
}

function ThemedApp() {
  const { lang, direction } = useLanguage();

  const theme = useMemo(
    () =>
      createTheme({
        direction,
        palette: {
          primary: { main: "#e00000" },
          secondary: { main: "#111" },
          background: { default: "#fff" }
        },
        typography: {
          fontFamily:
            lang === "ar"
              ? "Tajawal, Arial, sans-serif"
              : "Inter, Arial, sans-serif"
        }
      }),
    [direction, lang]
  );

  const cache = useMemo(
    () =>
      createCache({
        key: direction === "rtl" ? "muirtl" : "mui",
        stylisPlugins: direction === "rtl" ? [rtlPlugin] : []
      }),
    [direction]
  );

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <CategoryProvider>
                <Routes>
                  {/* 🌍 PUBLIC */}
                  <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
                  <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
                  <Route path="/product/:id" element={<PublicLayout><SingleProduct /></PublicLayout>} />
                  <Route path="/category/:name" element={<PublicLayout><CategoryPage /></PublicLayout>} />
                  <Route path="/cart" element={<PublicLayout><CartPage /></PublicLayout>} />
                  <Route path="/checkout" element={<PublicLayout><CheckoutPage /></PublicLayout>} />
                  <Route path="/order-success" element={<PublicLayout><OrderSuccess /></PublicLayout>} />
                  <Route path="/wishlist" element={<PublicLayout><WishlistPage /></PublicLayout>} />

                  {/* 🔐 AUTH */}
                  <Route path="/auth/signup" element={<SignupPage />} />
                  <Route path="/auth/login" element={<LoginPage />} />

                  {/* 🛠 ADMIN AUTH */}
                  <Route path="/admin/login" element={<AdminLogin />} />

                  {/* 🛠 ADMIN DASHBOARD */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<ProductsAdmin />} />
                    <Route path="products/add" element={<AddProducts />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="categories/add" element={<AddCategory />} />
                    <Route path="bestsellers" element={<AdminBestSellers />} />
                    <Route path="admincategories" element={<AdminCategories />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="sellers" element={<Sellers />} />
                    <Route path="sellers/add" element={<AddSeller />} />
                    <Route path="users" element={<Users />} />
                    <Route path="banner" element={<AdminBanner />} />
                  </Route>
                </Routes>
              </CategoryProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <ThemedApp />
      </GoogleOAuthProvider>
    </LanguageProvider>
  );
}
