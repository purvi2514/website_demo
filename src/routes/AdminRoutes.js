import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import AdminLayout from "../pages/adminpage/AdminLayout";
import AdminRoute from "../middleware/AdminRoute";
import CategoryList from "../pages/adminpage/Categories/CategoryList";
import CategoryForm from "../pages/adminpage/Categories/CategoryForm";
import ProductList from "../pages/adminpage/Products/ProductList";
import ProductForm from "../pages/adminpage/Products/ProductForm";
import BannerList from "../pages/adminpage/Banners/BannerList";
import BannerForm from "../pages/adminpage/Banners/BannerForm";
import TopCategoryList from "../pages/adminpage/TopCategories/TopCategoryList";
import TopCategoryForm from "../pages/adminpage/TopCategories/TopCategoryForm";
import SubCategoryList from "../pages/adminpage/SubCategories/SubCategoryList";
import SubCategoryForm from "../pages/adminpage/SubCategories/SubCategoryForm";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />

      {/* Layout route wraps children with Sidebar */}
      <Route path="/" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<AdminDashboard />} />

        <Route path="categories" element={<CategoryList />} />
        <Route path="categories/new" element={<CategoryForm />} />
        <Route path="categories/:id/edit" element={<CategoryForm />} />

        <Route path="products" element={<ProductList />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/:id/edit" element={<ProductForm />} />

        <Route path="banners" element={<BannerList />} />
        <Route path="banners/new" element={<BannerForm />} />
        <Route path="banners/:id/edit" element={<BannerForm />} />

        <Route path="topcategories" element={<TopCategoryList />} />
        <Route path="topcategories/new" element={<TopCategoryForm />} />
        <Route path="topcategories/:id/edit" element={<TopCategoryForm />} />

        <Route path="subcategories" element={<SubCategoryList />} />
        <Route path="subcategories/new" element={<SubCategoryForm />} />
        <Route path="subcategories/:id/edit" element={<SubCategoryForm />} />
      </Route>
    </Routes>
  );
}
