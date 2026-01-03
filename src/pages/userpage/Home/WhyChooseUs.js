import React from "react";

function WhyChooseUs() {
  return (
    <div className="bg-gradient-to-r from-black via-[#111] to-black text-white py-20 px-6 md:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Why Shop with Top Gear?
          </h2>

          <p className="text-gray-300 mb-5 leading-relaxed">
            At <span className="font-semibold text-white">Top Gear</span>, we offer a carefully curated range of
            <span className="font-semibold text-white">
              {" "}premium helmets, tyres, auto care products, lubricants, additives,
            </span>{" "}
            and both genuine and high-quality aftermarket spares & accessories — all tested
            to perform in real-world riding conditions.
            <span className="font-semibold text-white"> Driven by your satisfaction.</span>
          </p>

          <p className="text-gray-300 leading-relaxed">
            We offer <span className="font-semibold text-white">easy EMI options</span> and
            value-packed bundle deals, along with
            <span className="font-semibold text-white"> fast, reliable delivery across India</span> —
            with complete coverage of all locations in the
            <span className="font-semibold text-white"> Andaman & Nicobar Islands</span>,
            ensuring riders never compromise on quality, no matter where they are.
          </p>
        </div>

        {/* RIGHT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-[#1c1c1c] p-6 text-center">
            <div className="mb-4 flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/808/808439.png"
                alt="Genuine"
                className="w-12 h-12"
              />
            </div>
            <h3 className="font-bold text-lg mb-3">Genuine & Trusted</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Whether genuine or high-grade aftermarket, every product we offer meets
              strict quality standards. We ensure you receive safe, reliable gear and
              accessories you can trust on the road.
            </p>
          </div>

          {/* Card 2 (Highlighted) */}
          <div className="bg-red-600 p-6 text-center">
            <div className="mb-4 flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/679/679720.png"
                alt="Delivery"
                className="w-12 h-12"
              />
            </div>
            <h3 className="font-bold text-lg mb-3">
              Island-wide Delivery
            </h3>
            <p className="text-white text-sm leading-relaxed">
              We offer quick and secure delivery across the entire islands, ensuring
              your products arrive safely and on time without any inconvenience.
              Andaman’s Moto Powerhouse.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1c1c1c] p-6 text-center">
            <div className="mb-4 flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
                alt="Support"
                className="w-12 h-12"
              />
            </div>
            <h3 className="font-bold text-lg mb-3">Shopping Assistance</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              From recommending the right products to handling purchases and shipping,
              we make your shopping effortless. Can’t find a part? We’ll arrange
              unlisted items on order. Your satisfaction is our priority.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
