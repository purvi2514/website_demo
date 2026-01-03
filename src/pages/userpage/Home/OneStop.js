import React from "react";
import {
  FaTools,
  FaLightbulb,
  FaWrench,
} from "react-icons/fa";
import { GiCarWheel, GiFullMotorcycleHelmet } from "react-icons/gi";

function OneStop() {
  return (
    <div className="bg-gradient-to-b from-black via-[#0d0d0d] to-black text-white py-20 px-6 md:px-16">
      
      {/* Heading */}
      <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-14 leading-tight">
        Your One-Stop Destination for <br />
        Motorcycle Needs
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        
        {/* Card */}
        <div className="bg-red-600 p-8 rounded-xl hover:scale-105 transition">
          <FaTools className="text-4xl mb-6" />
          <h3 className="text-xl font-bold mb-3">Spares</h3>
          <p className="text-sm leading-relaxed">
            Brake pads, filters, belts, bearings
          </p>
        </div>

        <div className="bg-red-600 p-8 rounded-xl hover:scale-105 transition">
          <GiCarWheel className="text-4xl mb-6" />
          <h3 className="text-xl font-bold mb-3">Tyres</h3>
          <p className="text-sm leading-relaxed">
            All-season, performance & off-road
          </p>
        </div>

        <div className="bg-red-600 p-8 rounded-xl hover:scale-105 transition">
          <GiFullMotorcycleHelmet className="text-4xl mb-6" />
          <h3 className="text-xl font-bold mb-3">Helmets</h3>
          <p className="text-sm leading-relaxed">
            ISI & ECE cert. helmets, riding gears & more
          </p>
        </div>

        <div className="bg-red-600 p-8 rounded-xl hover:scale-105 transition">
          <FaLightbulb className="text-4xl mb-6" />
          <h3 className="text-xl font-bold mb-3">Accessories</h3>
          <p className="text-sm leading-relaxed">
            Lights, body kits, lever sets & more
          </p>
        </div>

        <div className="bg-red-600 p-8 rounded-xl hover:scale-105 transition">
          <FaWrench className="text-4xl mb-6" />
          <h3 className="text-xl font-bold mb-3">Service</h3>
          <p className="text-sm leading-relaxed">
            Oil change, brakes, seats & more
          </p>
        </div>

      </div>
    </div>
  );
}

export default OneStop;
