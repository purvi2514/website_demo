import React, { useState, useEffect } from "react";
import {
  FiHome,
  FiPlusCircle,
  FiShoppingBag,
  FiBell,
  FiHelpCircle,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);

    // lock body scroll when drawer open
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const menu = [
    { name: "Dashboard", icon: <FiHome />, path: "/admin" },
    { name: "Categories", icon: <FiPlusCircle />, path: "/admin/categories" },
    { name: "Products", icon: <FiShoppingBag />, path: "/admin/products" },
    { name: "Banners", icon: <FiPlusCircle />, path: "/admin/banners" },
    { name: "Top Categories", icon: <FiPlusCircle />, path: "/admin/topcategories" },
    { name: "Sub Categories", icon: <FiPlusCircle />, path: "/admin/subcategories" },
  ];

  const SidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 text-2xl font-bold text-teal-600 flex items-center">
        <img src={logo} alt="Admin Logo" className="h-10 w-auto" />
        <span className="ml-2">Admin Panel</span>
        <button
          className="ml-auto md:hidden p-2 text-gray-600 rounded hover:bg-gray-100"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <FiX />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 space-y-1" role="navigation" aria-label="Admin menu">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
              ${
                isActive
                  ? "bg-gray-100 text-teal-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-6">
        <button
          onClick={() => { console.log("Logout"); setOpen(false); }}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar with toggle (fixed) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b p-2 flex items-center h-12">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="p-2 text-gray-700"
        >
          <FiMenu />
        </button>
        <img src={logo} alt="Admin Logo" className="h-8 ml-2" />
        <span className="ml-2 font-bold text-teal-600">Admin</span>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 h-screen bg-white border-r flex-col">
        {SidebarContent}
      </aside>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 md:hidden ${open ? '' : 'pointer-events-none'}`}>
        <div
          className={`fixed inset-0 bg-black transition-opacity ${open ? 'opacity-50' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
          aria-hidden
        />

        <div className={`fixed top-12 bottom-0 left-0 w-64 bg-white border-r transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
          {SidebarContent}
        </div>
      </div>
    </>
  );
}
