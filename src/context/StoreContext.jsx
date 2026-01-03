import { createContext, useContext, useState, useEffect } from "react";
import { API } from "../utils/api";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          API.get("/products").catch(() => ({ data: [] })),
          API.get("/orders").catch(() => ({ data: [] }))
        ]);
        if (isMounted) {
          setProducts(productsRes.data || []);
          setOrders(ordersRes.data || []);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Data fetch failed:", err);
          setError("Failed to load data");
        }
      }
    };
    
    fetchData();
    return () => { isMounted = false; };
  }, []);

  return (
    <StoreContext.Provider value={{ products, orders, error }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
};
