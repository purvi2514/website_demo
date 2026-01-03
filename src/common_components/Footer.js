import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      
      {/* Main Footer */}
      <div className="px-6 md:px-20 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* LEFT – BRAND */}
        <div>
          <img
            src="/logo.png" // replace with your logo path
            alt="Top Gear Automotives"
            className="w-40 mb-6"
          />

          <h3 className="text-xl font-bold mb-2">
            Top Gear Automotives
          </h3>

          <p className="text-sm text-gray-300 mb-4">
            GSTIN: 35BLZPG2927D1ZX
          </p>

          <p className="text-sm text-gray-300 leading-relaxed">
            MB-68, Aberdeen Bazar,<br />
            Sri Vijay Puram – 744101,<br />
            Andaman & Nicobar Island
          </p>
        </div>

        {/* CENTER – QUICK LINKS */}
        <div>
          <h3 className="text-xl font-bold mb-6">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-300 text-sm">
            <li><Link to="/about" className="hover:text-white">About us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/careers" className="hover:text-white">Careers / Join Us</Link></li>
            <li><Link to="/shipping" className="hover:text-white">Shipping & Delivery</Link></li>
            <li><Link to="/refund" className="hover:text-white">Cancellation & Refund</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms and Conditions</Link></li>
          </ul>
        </div>

        {/* RIGHT – SUPPORT */}
        <div>
          <h3 className="text-xl font-bold mb-6">
            Support
          </h3>

          <p className="text-sm text-gray-300 mb-2">
            Call: <span className="text-white">+91 9933232200</span>
          </p>

          <p className="text-sm text-gray-300 mb-2">
            Email: <span className="text-white">care@topgearauto.in</span>
          </p>

          <p className="text-sm text-gray-300 mb-6">
            Open: Mon–Sat 9:30–19:00
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              Get Directions
            </a>

            <a
              href="https://instagram.com/yourcarshop"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-[#1f2937] hover:bg-gray-700 transition"
            >
              <FaInstagram size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-400">
        © 2025 Top Gear Automotives. All rights reserved.
      </div>
    </footer>
  );
}
