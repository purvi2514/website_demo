import React from "react";

const products = [
  {
    id: 1,
    title: "FlashX for Hero Xpulse 200 Hazard Flasher Module",
    category: "Accessories",
    image:
      "https://via.placeholder.com/300x220?text=Hazard+Flasher",
    price: 1999,
    salePrice: 1299,
    sale: true,
  },
  {
    id: 2,
    title: "Fog Light Clamp for Classic 650",
    category: "Accessories",
    image:
      "https://via.placeholder.com/300x220?text=Fog+Clamp",
    price: 4480,
    salePrice: null,
    sale: false,
  },
  {
    id: 3,
    title: "HJG Mini Drive LED Fog Light (White, Yellow)",
    category: "Accessories",
    image:
      "https://via.placeholder.com/300x220?text=HJG+Mini+Drive",
    price: 1499,
    salePrice: 999,
    sale: true,
  },
  {
    id: 4,
    title:
      "HJG Red Devil Eye Mini Drive LED Fog Light (White, Yellow & Red)",
    category: "Accessories",
    image:
      "https://via.placeholder.com/300x220?text=Red+Devil+Eye",
    price: 1999,
    salePrice: 1299,
    sale: true,
  },
];

export default function ProductList() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">Accessories</h1>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden relative"
            >
              {/* Sale Badge */}
              {product.sale && (
                <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full z-10">
                  Sale!
                </span>
              )}

              {/* Image */}
              <div className="bg-gray-100 flex items-center justify-center h-48">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain h-full"
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <p className="text-xs text-gray-400 uppercase">
                  {product.category}
                </p>

                <h2 className="text-sm font-medium text-gray-800 line-clamp-2">
                  {product.title}
                </h2>

                {/* Price */}
                <div className="flex items-center gap-2">
                  {product.salePrice ? (
                    <>
                      <span className="text-gray-400 line-through text-sm">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-black font-semibold">
                        ₹{product.salePrice.toLocaleString()}
                      </span>
                    </>
                  ) : (
                    <span className="text-black font-semibold">
                      ₹{product.price.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
