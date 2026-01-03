import React from "react";

const categories = [
  {
    id: 1,
    name: "ACCESSORIES",
    count: "56 PRODUCTS",
    image:
      "https://images.unsplash.com/photo-1583267746897-2cf415887172?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "HELMETS",
    count: "52 PRODUCTS",
    image:
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "BEST SELLERS",
    count: "1 PRODUCT",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "LIGHTING",
    count: "8 PRODUCTS",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "BODY PARTS",
    count: "2 PRODUCTS",
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c4?auto=format&fit=crop&w=600&q=80",
  },
];

function TopCategory() {
  return (
    <div className=" py-16 px-6 md:px-16">
      {/* Title */}
      <h2 className="text-center text-4xl font-extrabold mb-14 tracking-wide">
        TOP CATEGORIES
      </h2>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="text-center group cursor-pointer"
          >
            {/* Image */}
            <div className="h-44 flex items-center justify-center mb-6">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full object-contain group-hover:scale-110 transition"
              />
            </div>

            {/* Text */}
            <h3 className="font-bold text-sm tracking-widest">
              {cat.name}
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              {cat.count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopCategory;
