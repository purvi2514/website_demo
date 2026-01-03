import React, { useState } from "react";
import {
  FaHeart,
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
  FaPinterestP,
  FaLinkedinIn,
} from "react-icons/fa";

export default function ProductDetail() {
  const [qty, setQty] = useState(1);
  const price = 4480;

  return (
    <div className="bg-white min-h-screen px-4 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* LEFT: IMAGE */}
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/500x400?text=Fog+Light+Clamp"
            alt="Fog Light Clamp"
            className="max-w-full object-contain"
          />
        </div>

        {/* RIGHT: DETAILS */}
        <div>
          {/* Breadcrumb */}
          <p className="text-sm text-gray-400 mb-2">
            Home / Accessories / Lighting
          </p>

          {/* Title */}
          <h1 className="text-2xl font-semibold mb-3">
            FOG LIGHT CLAMP FOR CLASSIC 650
          </h1>

          {/* Price */}
          <p className="text-2xl font-bold mb-4">₹{price.toLocaleString()}</p>

          {/* EMI Box */}
          <div className="border rounded-md p-4 mb-6 text-sm">
            <div className="flex justify-between items-center">
              <p>EMI from ₹158/month</p>
              <a href="#" className="text-blue-600 text-sm font-medium">
                View plans
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Secured by Razorpay
            </p>
          </div>

          {/* Quantity & Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex border">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-2"
              >
                −
              </button>
              <span className="px-4 py-2 border-x">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-2"
              >
                +
              </button>
            </div>

            <button className="bg-black text-white px-8 py-3 hover:bg-gray-800">
              Add to cart
            </button>
          </div>

          {/* Wishlist */}
          <button className="flex items-center gap-2 text-gray-600 mb-6">
            <FaHeart /> Add to wishlist
          </button>

          {/* Categories */}
          <p className="text-sm mb-6">
            <span className="font-medium">Categories:</span>{" "}
            Accessories, Lighting
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 text-gray-500">
            {[FaFacebookF, FaTwitter, FaEnvelope, FaPinterestP, FaLinkedinIn].map(
              (Icon, i) => (
                <span
                  key={i}
                  className="border rounded-full p-2 hover:text-black cursor-pointer"
                >
                  <Icon size={14} />
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-7xl mx-auto mt-16">
        <div className="border-b flex gap-8 text-sm font-medium">
          <button className="pb-3 border-b-2 border-red-600">
            Description
          </button>
          <button className="pb-3 text-gray-400">
            Reviews (0)
          </button>
        </div>

        {/* Description */}
        <div className="mt-6 text-gray-600 leading-relaxed max-w-4xl">
          <p>
            A Fog Light Clamp for the Classic 650 is a mounting accessory
            designed to securely attach fog lights to the motorcycle. It ensures
            stable installation while maintaining proper alignment and
            vibration resistance, making it suitable for long rides and rough
            terrains.
          </p>
        </div>
      </div>
    </div>
  );
}
