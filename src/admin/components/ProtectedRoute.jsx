import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, expired, loading } = useAuth();

  if (loading) return null;
  if (!user || expired) return <Navigate to="/admin/login" replace />;

  return children;
}
