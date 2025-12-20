// // src/data.js
// export const CATEGORIES = [
//   { slug: "tyres", title: "Tyres", count: 20 },
//   { slug: "lights", title: "Lights", count: 5 },
//   { slug: "stickers", title: "Stickers", count: 6 },
//   { slug: "helmets", title: "Helmets", count: 10 },
//   { slug: "oils-fluids", title: "Oils & Fluids", count: 15 }
// ];

// export const PRODUCTS = [
//   { id: "l1", title: "LED Headlight", price: 2999, img: "https://picsum.photos/600/400?random=301", category: "lights" },
//   { id: "l2", title: "Fog Lamp", price: 1999, img: "https://picsum.photos/600/400?random=302", category: "lights" },
//   { id: "l3", title: "Tail Light", price: 1499, img: "https://picsum.photos/600/400?random=303", category: "lights" },
//   { id: "l4", title: "Indicator Set", price: 999, img: "https://picsum.photos/600/400?random=304", category: "lights" },
//   { id: "l5", title: "Projector Lamp", price: 3999, img: "https://picsum.photos/600/400?random=305", category: "lights" },
//   // similarly add tyres, stickers, etc.
// ];

// src/data.js

export const CATEGORIES = [
  { slug: "tyres", title: "Tyres", count: 20, image: "https://picsum.photos/600/400?random=401" },
  { slug: "lights", title: "Lights", count: 5, image: "https://picsum.photos/600/400?random=402" },
  { slug: "stickers", title: "Stickers", count: 6, image: "https://picsum.photos/600/400?random=403" },
  { slug: "helmets", title: "Helmets", count: 10, image: "https://picsum.photos/600/400?random=404" },
  { slug: "oils-fluids", title: "Oils & Fluids", count: 15, image: "https://picsum.photos/600/400?random=405" }
];

// ✅ Add PRODUCTS here
export const PRODUCTS = [
  { id: 201, title: "Cap Fuel Tank", category: "spares", price: 5000, img: "https://images.unsplash.com/photo-1619458367400-0f7c1f5fbaf9?q=80&w=1200&auto=format" },
  { id: 202, title: "Carburettor A102", category: "spares", price: 2611, img: "https://images.unsplash.com/photo-1583142308222-8a1e0f3b4666?q=80&w=1200&auto=format" },
  { id: 203, title: "Front Fender", category: "spares", price: 2555, img: "https://images.unsplash.com/photo-1607861859557-87e4a9d6e7a3?q=80&w=1200&auto=format" },
  { id: 204, title: "Jack Shaft", category: "spares", price: 202, img: "https://images.unsplash.com/photo-1618586610611-7c8e0d4a5c5b?q=80&w=1200&auto=format" },

  // Example lights category
  { id: 301, title: "LED Headlight", category: "lights", price: 2999, img: "https://picsum.photos/600/400?random=301" },
  { id: 302, title: "Fog Lamp", category: "lights", price: 1999, img: "https://picsum.photos/600/400?random=302" },
  { id: 303, title: "Tail Light", category: "lights", price: 1499, img: "https://picsum.photos/600/400?random=303" },
  { id: 304, title: "Indicator Set", category: "lights", price: 999, img: "https://picsum.photos/600/400?random=304" },
  { id: 305, title: "Projector Lamp", category: "lights", price: 3999, img: "https://picsum.photos/600/400?random=305" }
];
