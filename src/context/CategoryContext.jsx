import { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Engine Oil", type: "Original", price: 120, stock: 10, status: "Active" },
    { id: 2, name: "Spark Plugs", type: "Local", price: 25, stock: 0, status: "Inactive" }
  ]);

  const addCategory = (category) => {
    const stockNum = Number(category.stock) || 0;
    setCategories((prev) => [
      { ...category, id: Date.now(), stock: stockNum, status: stockNum === 0 ? "Inactive" : "Active" },
      ...prev
    ]);
  };

  const deleteCategory = (id) => setCategories((prev) => prev.filter((c) => c.id !== id));
  const updateCategory = (id, data) => {
    const stockNum = Number(data.stock) || 0;
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data, stock: stockNum, status: stockNum === 0 ? "Inactive" : "Active" } : c))
    );
  };
  const viewCategory = (id) => categories.find((c) => c.id === id);

  return (
    <CategoryContext.Provider value={{ categories, addCategory, deleteCategory, updateCategory, viewCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error("useCategory must be used inside CategoryProvider");
  return ctx;
};
