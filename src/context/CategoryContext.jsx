import { createContext, useContext, useState, useEffect } from "react";
import { API } from "../utils/api";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        const res = await API.get("/categories");
        if (isMounted) setCategories(res.data || []);
      } catch (err) {
        if (isMounted) {
          console.error("Category fetch failed:", err);
          setError("Failed to load categories");
        }
      }
    };

    fetchCategories();
    return () => { isMounted = false; };
  }, []);

  const addCategory = async (category) => {
    try {
      const res = await API.post("/categories", category);
      setCategories(res.data || []);
    } catch (err) {
      console.error("Add category failed:", err);
      setError("Failed to add category");
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await API.delete(`/categories/${id}`);
      setCategories(res.data || []);
    } catch (err) {
      console.error("Delete category failed:", err);
      setError("Failed to delete category");
    }
  };

  const updateCategory = async (id, data) => {
    try {
      const res = await API.put(`/categories/${id}`, data);
      setCategories(res.data || []);
    } catch (err) {
      console.error("Update category failed:", err);
      setError("Failed to update category");
    }
  };

  const viewCategory = (id) => categories.find((c) => c._id === id);

  return (
    <CategoryContext.Provider
      value={{ categories, addCategory, deleteCategory, updateCategory, viewCategory, error }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error("useCategory must be used inside CategoryProvider");
  return ctx;
};
