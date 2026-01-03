import { X, Facebook, Twitter, Mail } from "lucide-react";

const wishlistItems = [
  {
    id: 1,
    name: "Front Fairing Panel For TVS NTORQ 125",
    images: [
      "/images/black.png",
      "/images/red.png",
      "/images/white.png",
      "/images/yellow.png",
    ],
    price: "Free!",
    stock: "In Stock",
  },
];

export default function Wishlist() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">My wishlist</h1>

      {/* Table Header */}
      <div className="grid grid-cols-12 border-b pb-3 text-sm font-semibold text-gray-600">
        <div className="col-span-6">PRODUCT NAME</div>
        <div className="col-span-3 text-center">UNIT PRICE</div>
        <div className="col-span-3 text-right">STOCK STATUS</div>
      </div>

      {/* Wishlist Items */}
      {wishlistItems.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-12 items-center py-6 border-b"
        >
          {/* Product */}
          <div className="col-span-6 flex items-center gap-4">
            <button className="text-gray-400 hover:text-red-500">
              <X size={18} />
            </button>

            <div className="flex gap-2">
              {item.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="product"
                  className="w-10 h-10 object-contain border rounded"
                />
              ))}
            </div>

            <p className="text-sm font-medium">{item.name}</p>
          </div>

          {/* Price */}
          <div className="col-span-3 text-center text-sm">
            {item.price}
          </div>

          {/* Stock */}
          <div className="col-span-3 text-right text-sm text-green-600">
            {item.stock}
          </div>
        </div>
      ))}

      {/* Share Section */}
      <div className="flex items-center gap-4 mt-6 text-sm text-gray-600">
        <span>Share on:</span>
        <button className="p-2 border rounded-full hover:bg-gray-100">
          <Facebook size={16} />
        </button>
        <button className="p-2 border rounded-full hover:bg-gray-100">
          <Twitter size={16} />
        </button>
        <button className="p-2 border rounded-full hover:bg-gray-100">
          <Mail size={16} />
        </button>
      </div>
    </div>
  );
}
