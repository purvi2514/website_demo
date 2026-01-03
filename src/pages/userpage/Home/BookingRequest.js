import React from "react";

function BookingRequest() {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT – FORM */}
            <div className="flex items-center justify-center px-6 md:px-16 bg-white">
                <div className="w-full max-w-xl">
                    <h2 className="text-3xl font-bold mb-8">Request a Booking</h2>

                    {/* Name */}
                    <div className="mb-5">
                        <label className="block font-semibold mb-2">
                            Your name
                        </label>
                        <input
                            type="text"
                            placeholder=""
                            className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                        />
                    </div>

                    {/* Number */}
                    <div className="mb-5">
                        <label className="block font-semibold mb-2">
                            Your number
                        </label>
                        <input
                            type="tel"
                            placeholder=""
                            className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                        />
                    </div>

                    {/* Service */}
                    <div className="mb-8">
                        <label className="block font-semibold mb-2">
                            Select Service
                        </label>
                        <select className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black">
                            <option>—Please choose an option—</option>
                            <option>Bike Servicing</option>
                            <option>Oil Change</option>
                            <option>Accessories Installation</option>
                            <option>Test Ride Booking</option>
                        </select>
                    </div>

                    {/* Button */}
                    <button className="w-full bg-black text-white py-4 font-bold tracking-wide hover:bg-gray-900 transition">
                        BOOK NOW
                    </button>
                </div>
            </div>

            {/* RIGHT – IMAGE */}
            <div className="hidden lg:block relative">
                <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80"
                    alt="Bike Service"
                    onError={(e) => {
                        e.target.src =
                            "https://via.placeholder.com/800x600?text=Bike+Service";
                    }}
                    className="absolute inset-0 w-full h-full object-cover"
                />

            </div>

        </div>
    );
}

export default BookingRequest;
