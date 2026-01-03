import React from "react";
import Sidebar from "./adminpage/Sidebar/Sidebar";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 bg-gray-50">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-600 mt-2">Use the sidebar to manage categories and products.</p>
        </div>
      </main>
    </div>
  );
}
