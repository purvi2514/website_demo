import React, { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSearch,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

import axios from "../helpers/axios";
import endpoints from "../helpers/endpoints";
import { getSession, clearSession } from "../helpers/dataLake";

const menu = [
  {
    title: "Spares",
    items: ["Brake Pads", "Filters", "Belts", "Bearings", "Clutch Plates"],
  },
  {
    title: "Helmets",
    items: ["Full Face", "Modular", "Open Face", "Off Road", "Riding Gear"],
  },
  {
    title: "Tyres",
    items: ["Street", "Off-Road", "Performance", "Tubeless", "All Season"],
  },
  {
    title: "Accessories",
    items: ["Lights", "Body Kits", "Levers", "Mirrors", "Guards"],
  },
  {
    title: "Service",
    items: ["Oil Change", "Brake Service", "Seat Customization", "Wash"],
  },
  {
    title: "Others",
    items: ["Cleaning", "Lubricants", "Tools", "Merchandise"],
  },
];

const Nav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [session, setSession] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef(null);

  /* ================= SESSION ================= */
  useEffect(() => {
    setSession(getSession());

    const onStorage = () => setSession(getSession());
    window.addEventListener("storage", onStorage);

    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const handleLogout = async () => {
    try {
      if (session?.token) {
        await axios.post(endpoints.auth.logout);
      }
    } catch (err) {}
    clearSession();
    setSession(null);
    navigate("/");
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="bg-black text-white w-full relative z-50">
        {/* Top Bar */}
        <div className="hidden md:flex justify-between px-6 py-2 text-sm border-b border-white/10">
          <div className="flex gap-4 text-white/80">
            <span>🚚 Free Shipping Above ₹9999</span>
            <span>|</span>
            <span>💳 Easy EMI</span>
            <span>|</span>
            <span>🔒 Secure Payments</span>
          </div>
          <span className="text-white/80">✉ care@topgearauto.in</span>
        </div>

        {/* Main Bar */}
        <div className="flex items-center justify-between px-6 max-w-6xl mx-auto h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-30 object-contain" />
          </Link>

          {/* Search Desktop */}
          <div className="hidden md:flex flex-1 mx-10 relative">
            <input
              className="w-full border border-white/30 bg-black py-2 px-4 pr-10 text-sm focus:outline-none"
              placeholder="Search..."
            />
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70" />
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-5">
            <Link to="/wishlist"><FaHeart /></Link>
            <Link to="/cart"><FaShoppingCart /></Link>

            {!session && (
              <div className="flex gap-3">
                <Link to="/login" className="border px-3 py-1 rounded">Login</Link>
                <Link to="/signup" className="bg-red-600 px-3 py-1 rounded">Signup</Link>
              </div>
            )}

            {session && (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 border px-2 py-1 rounded"
                >
                  <FaUser />
                  <span>{session.user?.name || "Account"}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-black border">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-white/10">
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-white/10"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-xl">
            <FaBars />
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 px-6 py-3 border-t border-white/10 text-sm">
          {menu.map((m) => (
            <div key={m.title} className="relative group">
              <div className="flex items-center gap-1 cursor-pointer hover:text-red-500">
                {m.title}
                <FaChevronDown />
              </div>
              <div className="absolute left-0 top-full mt-3 w-56 bg-black border opacity-0 invisible group-hover:visible group-hover:opacity-100">
                {m.items.map((item) => (
                  <div key={item} className="px-4 py-2 hover:bg-red-600">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </header>

      {/* ================= BACKDROP ================= */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40"
        />
      )}

      {/* ================= MOBILE SIDEBAR ================= */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-black text-white z-50 transform transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <span className="font-bold">Menu</span>
          <button onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <div className="px-4 py-4 space-y-6">
          {/* Mobile Search */}
          <div className="relative">
            <input className="w-full border px-4 py-2 bg-black" placeholder="Search..." />
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Cart & Wishlist */}
          <div className="flex gap-3">
            <Link to="/wishlist" className="flex-1 border px-3 py-2 text-center">Wishlist</Link>
            <Link to="/cart" className="flex-1 border px-3 py-2 text-center">Cart</Link>
          </div>

          {/* Auth */}
          {!session ? (
            <div className="flex gap-3">
              <Link to="/login" className="flex-1 border py-2 text-center">Login</Link>
              <Link to="/signup" className="flex-1 bg-red-600 py-2 text-center">Signup</Link>
            </div>
          ) : (
            <div className="space-y-2">
              <Link to="/profile" className="block border px-3 py-2">Profile</Link>
              <button onClick={handleLogout} className="w-full border px-3 py-2 text-left">
                Logout
              </button>
            </div>
          )}

          {/* Categories */}
          <div className="pt-4 border-t space-y-2">
            {menu.map((m, i) => (
              <div key={m.title}>
                <button
                  onClick={() => setActive(active === i ? null : i)}
                  className="flex justify-between w-full py-2"
                >
                  {m.title}
                  <FaChevronDown className={active === i ? "rotate-180" : ""} />
                </button>
                {active === i && (
                  <div className="pl-4 text-sm text-white/80 space-y-1">
                    {m.items.map((item) => (
                      <div key={item}>{item}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Nav;
