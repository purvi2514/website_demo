import React, { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Drive the Future",
    subtitle: "Luxury • Performance • Comfort",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1920&q=80",
    cta: "Explore Cars",
  },
  {
    id: 2,
    title: "Unmatched Performance",
    subtitle: "Power that excites every journey",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80",
    cta: "View Models",
  },
  {
    id: 3,
    title: "Built for the Road",
    subtitle: "Style, safety & innovation",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1920&q=80",
    cta: "Book Test Drive",
  },
];

function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === current
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
            <div className="max-w-3xl px-6 md:px-16 text-white">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                {slide.title}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-200">
                {slide.subtitle}
              </p>

              <button className="mt-6 px-8 py-3 bg-red-600 hover:bg-red-700 transition rounded-full text-lg font-semibold">
                {slide.cta}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-4 h-1 rounded-full transition-all ${
              current === index
                ? "bg-red-600 w-8"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;
