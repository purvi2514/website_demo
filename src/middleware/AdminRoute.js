import React from 'react';
import { Navigate } from 'react-router-dom';
import { getSession } from '../helpers/dataLake';

export default function AdminRoute({ children }) {
  const session = getSession();
  if (!session || !session.token || !session.user || session.user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
}
