// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { API } from "../utils/api"; // ✅ FIX: import API wrapper

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Load cart from backend
  useEffect(() => {
    let isMounted = true;
    const fetchCart = async () => {
      try {
        const res = await API.get("/cart");
        if (isMounted) setCartItems(res.data || []);
      } catch (err) {
        if (isMounted) console.error("Failed to load cart:", err);
      }
    };

    fetchCart();
    return () => { isMounted = false; };
  }, []);

  // ✅ Add item
  const addToCart = async (item, qty = 1) => {
    try {
      const res = await API.post("/cart", { ...item, qty });
      setCartItems(res.data || []);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  // ✅ Update quantity
  const updateQty = async (id, qty) => {
    try {
      const res = await API.put(`/cart/${id}`, { qty });
      setCartItems(res.data || []);
    } catch (err) {
      console.error("Failed to update cart:", err);
    }
  };

  // ✅ Remove item
  const removeItem = async (id) => {
    try {
      const res = await API.delete(`/cart/${id}`);
      setCartItems(res.data || []);
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  // ✅ Clear cart
  const clearCart = async () => {
    try {
      await API.delete("/cart");
      setCartItems([]);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQty, removeItem, clearCart, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
