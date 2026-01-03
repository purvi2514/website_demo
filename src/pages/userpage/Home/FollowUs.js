import React from "react";

function FollowUs() {
  const posts = [
    "https://www.instagram.com/p/C-JoHihoZSX/embed",
    "https://www.instagram.com/p/BxLq6DPHaD9/embed",
    "https://www.instagram.com/p/BjNznY9H99T/embed",
  ];

  return (
    <section className="bg-[#f5f5f5] py-20 px-6 md:px-16">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Stay Updated — Follow Us on Instagram
        </h2>

        <a
          href="https://instagram.com/yourcarshop"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-red-600 text-white px-8 py-3 font-semibold tracking-wide hover:bg-red-700 transition"
        >
          Follow Us
        </a>
      </div>

      {/* Instagram Embeds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {posts.map((url, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <iframe
              src={url}
              className="w-full h-[400px]"
              frameBorder="0"
              scrolling="no"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title={`Instagram Post ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default FollowUs;
