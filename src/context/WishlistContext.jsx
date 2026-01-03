import { createContext, useContext, useState, useEffect } from "react";
import { API } from "../utils/api";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchWishlist = async () => {
      try {
        const res = await API.get("/wishlist");
        if (isMounted) setWishlist(res.data || []);
      } catch (err) {
        if (isMounted) {
          console.error("Wishlist fetch failed:", err);
          setError("Failed to load wishlist");
        }
      }
    };

    fetchWishlist();
    return () => { isMounted = false; };
  }, []);

  const addToWishlist = async (item) => {
    try {
      const res = await API.post("/wishlist", item);
      setWishlist(res.data || []);
    } catch (err) {
      console.error("Add to wishlist failed:", err);
      setError("Failed to add item");
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      const res = await API.delete(`/wishlist/${id}`);
      setWishlist(res.data || []);
    } catch (err) {
      console.error("Remove from wishlist failed:", err);
      setError("Failed to remove item");
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, error }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
};
