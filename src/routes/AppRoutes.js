import React from "react";
import { Routes, Route } from "react-router-dom";

import Nav from "../common_components/Nav";
import Footer from "../common_components/Footer";
import Home from "../pages/userpage/Home/Home";
import Cart from "../pages/userpage/Cart/Cart";
import Wishlist from "../pages/userpage/wishlist/Wishlist";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ProductList from "../pages/userpage/Product/ProductList";
import ProductDetail from "../pages/userpage/Product/ProductDetail";

export default function AppRoutes() {

  return (
    <div className="">
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/product" element={<ProductList/>} />
        <Route path="/product-detail" element={<ProductDetail/>} />
      </Routes>
      <Footer />
    </div>
  );
}
