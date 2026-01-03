import React from 'react';
import { Navigate } from 'react-router-dom';
import { getSession } from '../helpers/dataLake';

export default function ProtectedRoute({ children }) {
  const session = getSession();
  if (!session || !session.token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
