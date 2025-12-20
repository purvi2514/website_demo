// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("shop_cart")) || []; } catch { return []; }
  });
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("shop_wishlist")) || []; } catch { return []; }
  });

  useEffect(() => localStorage.setItem("shop_cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("shop_wishlist", JSON.stringify(wishlist)), [wishlist]);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id);
      if (found) {
        return prev.map(p => p.id === product.id ? { ...p, qty: (p.qty || 1) + qty } : p);
      }
      return [...prev, { ...product, qty }];
    });
  };
  const removeFromCart = id => setCart(prev => prev.filter(item => item.id !== id));
  const updateQty = (id, qty) => setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, qty) } : item));
  const clearCart = () => setCart([]);
  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.qty || 1), 0);
  const cartCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  const addToWishlist = product => setWishlist(prev => prev.some(p => p.id === product.id) ? prev : [...prev, product]);
  const removeFromWishlist = id => setWishlist(prev => prev.filter(item => item.id !== id));
  const clearWishlist = () => setWishlist([]);

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQty, clearCart, subtotal, cartCount,
      wishlist, addToWishlist, removeFromWishlist, clearWishlist
    }}>
      {children}
    </CartContext.Provider>
  );
}
