import { useState, useEffect } from "react";

// LocalStorage key
const KEY = "bestSellers";

export function useBestSellers() {
  const [bestSellers, setBestSellers] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) {
      setBestSellers(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(bestSellers));
  }, [bestSellers]);

  const addBestSeller = (product) => {
    setBestSellers((prev) => [...prev, product]);
  };

  const removeBestSeller = (id) => {
    setBestSellers((prev) => prev.filter((p) => p.id !== id));
  };

  return { bestSellers, addBestSeller, removeBestSeller };
}
