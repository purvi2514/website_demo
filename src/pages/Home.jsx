import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Modal
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import HeroCarousel from "../components/HeroCarousel";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import CategoriesScroller from "../components/CategoriesScroller";   
import WhyShop from "../components/WhyShop";                 
import BookingSection from "../components/BookingSection";   
import CarNeeds from "../components/CarNeeds";             
import InstagramSection from "../components/InstagramSection";  // ✅ new import
import Footer from "../components/Footer";

import { useLanguage } from "../context/LanguageContext";
import { formatSAR } from "../utils/currency";
import { useCart } from "../context/CartContext";

const BEST = [
  { id: 101, title: "Engine Flush", price: 120, img: "https://images.unsplash.com/photo-1619458367400-0f7c1f5fbaf9?q=80&w=1200&auto=format" },
  { id: 102, title: "STP", price: 85, img: "https://images.unsplash.com/photo-1583142308222-8a1e0f3b4666?q=80&w=1200&auto=format" },
  { id: 103, title: "Liqui Moly 10W-50", price: 450, oldPrice: 475, img: "https://images.unsplash.com/photo-1607861859557-87e4a9d6e7a3?q=80&w=1200&auto=format" },
  { id: 104, title: "Liqui Moly 10W-40", price: 420, oldPrice: 460, img: "https://images.unsplash.com/photo-1618586610611-7c8e0d4a5c5b?q=80&w=1200&auto=format" },
  { id: 105, title: "Motul 300V", price: 500, img: "https://images.unsplash.com/photo-1625641853818-4d81f1da443e?q=80&w=1200&auto=format" },
  { id: 106, title: "Castrol Power1", price: 380, img: "https://images.unsplash.com/photo-1520095972714-909e91b512cf?q=80&w=1200&auto=format" },
  { id: 107, title: "Shell Advance", price: 360, img: "https://images.unsplash.com/photo-1471479913413-c3d3b1f3d63a?q=80&w=1200&auto=format" },
  { id: 108, title: "Mobil Super", price: 340, img: "https://images.unsplash.com/photo-1613587752134-23dba3dbf99b?q=80&w=1200&auto=format" },
  { id: 109, title: "Motul Chain Lube", price: 150, img: "https://images.unsplash.com/photo-1607860108855-c8b62b962b1f?q=80&w=1200&auto=format" },
  { id: 110, title: "WD-40 Cleaner", price: 90, img: "https://images.unsplash.com/photo-1587370560942-0a444d2aa1e0?q=80&w=1200&auto=format" }
];

export default function Home() {
  const { t, lang } = useLanguage();
  const { addToCart } = useCart();
  const [index, setIndex] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const visibleCount = 5;
  const maxIndex = Math.ceil(BEST.length / visibleCount) - 1;

  const handleQuickView = (product) => setQuickViewProduct(product);
  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setQuickViewProduct(null);
  };
  const handleAddToWishlist = (product) => {
    if (!wishlist.find((p) => p.id === product.id)) {
      setWishlist((prev) => [...prev, product]);
    }
    setWishlistOpen(true);
  };

  return (
    <Box sx={{ mt: 12 }}>
      {/* Banner */}
      <HeroCarousel />

      {/* Best Sellers */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, textAlign: "center" }}>
          {t("sections.bestSellers") || "Best Sellers"}
        </Typography>

        <Box sx={{ position: "relative" }}>
          <Box sx={{ display: "flex", gap: 2, overflow: "hidden" }}>
            {BEST.slice(index * visibleCount, (index + 1) * visibleCount).map((p) => (
              <Box key={p.id} sx={{ minWidth: 220 }}>
                <ProductCard
                  product={p}
                  onQuickView={handleQuickView}
                  onAddToWishlist={handleAddToWishlist}
                />
              </Box>
            ))}
          </Box>

          {/* Arrows */}
          <IconButton
            onClick={() => setIndex((i) => Math.max(i - 1, 0))}
            sx={{ position: "absolute", top: "50%", left: -20, transform: "translateY(-50%)" }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            onClick={() => setIndex((i) => Math.min(i + 1, maxIndex))}
            sx={{ position: "absolute", top: "50%", right: -20, transform: "translateY(-50%)" }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        {/* Quick View Modal */}
        <QuickViewModal
          open={!!quickViewProduct}
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      </Container>

      {/* Wishlist Modal */}
      <Modal open={wishlistOpen} onClose={() => setWishlistOpen(false)}>
        <Box sx={{ p: 4, background: "#fff", borderRadius: 2, maxWidth: 600, mx: "auto", mt: 10 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            My Wishlist
          </Typography>
          {wishlist.length === 0 ? (
            <Typography>No items in wishlist.</Typography>
          ) : (
            wishlist.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #eee",
                  py: 1,
                  mb: 1
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6 }}
                  />
                  <Typography variant="subtitle1">{t(`products.${item.id}`, { defaultValue: t(`products.${item.title}`, { defaultValue: item.title }) })}</Typography>
                </Box>
                <Typography>{formatSAR(item.price, lang)}</Typography>
              </Box>
            ))
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setWishlistOpen(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>

      {/* Categories */}
      <CategoriesScroller />

      {/* Why Shop with Top Gear */}
      <WhyShop />

      {/* Booking Section */}
      <BookingSection />

      {/* Car Needs Section */}
      <CarNeeds />

      {/* Instagram Section */}
      <InstagramSection />

      {/* Footer
      <Footer /> */}
    </Box>
  );
}
