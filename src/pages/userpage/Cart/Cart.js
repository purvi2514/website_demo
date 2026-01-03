import React, { useState } from "react";

const Cart = () => {
  const [qty, setQty] = useState(1);

  const price = 2555;
  const platformFee = 25;
  const subtotal = price * qty;
  const total = subtotal + platformFee;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Steps */}
      <div className="flex justify-center gap-8 text-lg mb-10">
        <span className="font-semibold">Shopping Cart</span>
        <span className="text-gray-400">Checkout details</span>
        <span className="text-gray-400">Order Complete</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: CART TABLE */}
        <div className="lg:col-span-2">
          <div className="border-b pb-3 grid grid-cols-12 text-sm font-semibold text-gray-600">
            <div className="col-span-6">PRODUCT</div>
            <div className="col-span-2">PRICE</div>
            <div className="col-span-2">QUANTITY</div>
            <div className="col-span-2">SUBTOTAL</div>
          </div>

          {/* Product Row */}
          <div className="grid grid-cols-12 items-center py-6 border-b gap-2">
            <div className="col-span-6 flex gap-4 items-center">
              <button className="text-gray-400 text-xl">×</button>
              <img
                src="https://via.placeholder.com/80"
                alt="product"
                className="w-20 h-20 object-cover border"
              />
              <p className="text-blue-600 text-sm">
                Front Fender Matt Black For Honda Activa 6g
              </p>
            </div>

            <div className="col-span-2 font-medium">₹{price}.00</div>

            <div className="col-span-2">
              <div className="flex border w-max">
                <button
                  className="px-3 py-1"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  -
                </button>
                <span className="px-4 py-1 border-x">{qty}</span>
                <button
                  className="px-3 py-1"
                  onClick={() => setQty(qty + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="col-span-2 font-medium">
              ₹{subtotal}.00
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button className="border border-red-600 text-red-600 px-6 py-2 text-sm">
              ← Continue shopping
            </button>
            <button className="bg-red-500 text-white px-6 py-2 text-sm">
              Update cart
            </button>
          </div>
        </div>

        {/* RIGHT: CART TOTALS */}
        <div className="border p-6 h-max">
          <h3 className="font-semibold mb-4">CART TOTALS</h3>

          <div className="flex justify-between py-2 border-b text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal}.00</span>
          </div>

          <div className="flex justify-between py-2 border-b text-sm">
            <span>Platform fee</span>
            <span>₹{platformFee}.00</span>
          </div>

          <div className="flex justify-between py-3 font-semibold">
            <span>Total</span>
            <span>₹{total}.00</span>
          </div>

          <button className="w-full bg-black text-white py-3 mt-4">
            Proceed to checkout
          </button>

          {/* Coupon */}
          <div className="mt-6">
            <p className="font-medium mb-2">Coupon</p>
            <input
              type="text"
              placeholder="Coupon code"
              className="w-full border px-3 py-2 mb-3"
            />
            <button className="w-full border py-2 text-gray-600">
              Apply coupon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
