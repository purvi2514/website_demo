import { createContext, useContext, useState } from "react";

const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
  const [sellers, setSellers] = useState([]);

  const addSeller = (seller) => {
    setSellers((prev) => [
      { id: Date.now(), status: "Active", createdAt: new Date().toISOString(), ...seller },
      ...prev
    ]);
  };

  const deleteSeller = (id) => {
    setSellers((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleStatus = (id) => {
    setSellers((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" } : s
      )
    );
  };

  // ✅ New updateSeller function
  const updateSeller = (id, data) => {
    setSellers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...data } : s))
    );
  };

  return (
    <SellerContext.Provider
      value={{ sellers, addSeller, deleteSeller, toggleStatus, updateSeller }}
    >
      {children}
    </SellerContext.Provider>
  );
};

export const useSeller = () => {
  const ctx = useContext(SellerContext);
  if (!ctx) throw new Error("useSeller must be used inside SellerProvider");
  return ctx;
};
