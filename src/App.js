import React, { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import CategoryPage from "./pages/CategoryPage";
import WishlistPage from "./pages/WishlistPage";
import Auth from "./pages/Auth";

import { CartProvider } from "./context/CartContext";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";

function ThemedApp() {
  const { lang, direction } = useLanguage();

  // Theme setup
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

  // RTL/LTR cache
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
        <BrowserRouter>
          <CartProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<SingleProduct />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
            <Footer />
          </CartProvider>
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemedApp />
    </LanguageProvider>
  );
}
