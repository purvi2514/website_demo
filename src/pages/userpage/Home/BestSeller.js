import React from "react";

const products = [
  {
    id: 1,
    title: "Digital Tyre Inflator with Gauge",
    category: "CAR ACCESSORIES",
    image:
      "https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?auto=format&fit=crop&w=800&q=80",
    price: 1299,
    oldPrice: 1799,
    sale: true,
  },
  {
    id: 2,
    title: "Premium Leather Car Seat Cover Set",
    category: "CAR ACCESSORIES",
    image:
      "https://images.unsplash.com/photo-1549927681-0b673b8243ab?auto=format&fit=crop&w=800&q=80",
    price: 4599,
    oldPrice: 5999,
    sale: true,
  },
  {
    id: 3,
    title: "HD Car Dash Camera with Night Vision",
    category: "CAR ACCESSORIES",
    image:
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80",
    price: 3299,
    sale: false,
  },
  {
    id: 4,
    title: "Magnetic Car Mobile Holder",
    category: "CAR ACCESSORIES",
    image:
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=800&q=80",
    price: 499,
    oldPrice: 799,
    sale: true,
  },
  {
    id: 5,
    title: "Portable Car Vacuum Cleaner",
    category: "CAR ACCESSORIES",
    image:
      "https://images.unsplash.com/photo-1549927681-0b673b8243ab?auto=format&fit=crop&w=800&q=80",
    price: 1899,
    sale: false,
  },
];

function BestSeller() {
  return (
    <div className="px-6 md:px-16 py-14 bg-white">
      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <p className="text-red-600 font-semibold">
            Because Your Ride Deserves The Best!
          </p>
          <h2 className="text-4xl font-extrabold mt-1">Best Sellers</h2>
        </div>

        <button className="bg-red-600 hover:bg-red-700 transition text-white px-6 py-3 font-semibold flex items-center gap-2">
          Shop Now →
        </button>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {products.map((product) => (
          <div key={product.id} className="relative group cursor-pointer">
            {/* Sale badge */}
            {product.sale && (
              <span className="absolute top-3 left-3 bg-black text-white text-sm px-3 py-1 rounded-full z-10">
                Sale!
              </span>
            )}

            {/* Image */}
            <div className="h-56 flex items-center justify-center mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="h-full object-contain group-hover:scale-105 transition"
              />
            </div>

            {/* Content */}
            <p className="text-gray-400 text-xs tracking-wide mb-1">
              {product.category}
            </p>

            <h3 className="font-semibold text-sm leading-snug mb-2">
              {product.title}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2">
              {product.oldPrice && (
                <span className="text-gray-400 line-through">
                  ₹{product.oldPrice}.00
                </span>
              )}
              <span className="font-bold text-lg">
                ₹{product.price}.00
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
