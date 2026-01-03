import React, { useState, useEffect } from "react";
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
import WhyShop from "../components/WhyShop";
import BookingSection from "../components/BookingSection";
import CarNeeds from "../components/CarNeeds";
import InstagramSection from "../components/InstagramSection";

import { API } from "../utils/api";
import { useLanguage } from "../context/LanguageContext";
import { formatSAR } from "../utils/currency";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"; // ✅ use global wishlist

export default function Home() {
  const { t, lang } = useLanguage();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist } = useWishlist(); // ✅ consume context

  const [bestSellers, setBestSellers] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [index, setIndex] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlistOpen, setWishlistOpen] = useState(false); // ✅ keep modal local only

  /* ✅ Load Best Sellers */
  useEffect(() => {
    API.get("/products/bestsellers")
      .then((res) => {
        setBestSellers(res.data.products || []);
        localStorage.setItem("bestSellers", JSON.stringify(res.data.products || []));
      })
      .catch((err) => {
        console.error("Failed to load best sellers:", err);
        const saved = localStorage.getItem("bestSellers");
        if (saved) setBestSellers(JSON.parse(saved));
      });
  }, []);

  /* ✅ Load Top Categories */
  useEffect(() => {
    API.get("/topcategories")
      .then((res) => {
        setTopCategories(res.data || []);
        localStorage.setItem("categories", JSON.stringify(res.data || []));
      })
      .catch((err) => {
        console.error("Failed to load categories:", err);
        const savedCats = localStorage.getItem("categories");
        if (savedCats) setTopCategories(JSON.parse(savedCats));
      });
  }, []);

  const visibleCount = 5;
  const maxIndex = Math.ceil(bestSellers.length / visibleCount) - 1;

  const handleQuickView = (product) => setQuickViewProduct(product);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setQuickViewProduct(null);
  };

  return (
    <Box sx={{ mt: 12 }}>
      {/* Banner */}
      <HeroCarousel />

      {/* Best Sellers */}
        <Container sx={{ py: 4, mb: 6 }}>
           <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, textAlign: "center" }}> 
            {t("sections.bestSellers") || "Best Sellers"} 
            </Typography>

        <Box sx={{ position: "relative" }}>
          <Box sx={{ display: "flex", gap: 2, overflow: "hidden" }}>
            {bestSellers
              .slice(index * visibleCount, (index + 1) * visibleCount)
              .map((p) => (
                <Box key={p.id || p._id} sx={{ minWidth: 220 }}>
                  <ProductCard
                    product={p}
                    onQuickView={handleQuickView}
                    onAddToWishlist={(prod) => {
                      addToWishlist(prod); // ✅ use context
                      setWishlistOpen(true); // open modal
                    }}
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

      {/* Top Categories */}
      <Container sx={{ py: 4,  mb: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, textAlign: "center" }}>
          {t("sections.topCategories") || "Top Categories"}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
          {topCategories.map((cat) => (
            <Button
              key={cat._id}
              variant="outlined"
              sx={{
                width: 160,
                height: 160,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                p: 2,
                background: "#fff",
                boxShadow: 1
              }}
              onClick={() =>
                (window.location.href = `/category/${encodeURIComponent(cat.name)}`)
              }
            >
              <img
                src={cat.img}
                alt={cat.name}
                style={{ width: 80, height: 80, objectFit: "cover", marginBottom: 8 }}
              />
              <Typography variant="subtitle1" fontWeight={600}>
                {cat.name}
              </Typography>
              <Typography
                variant="caption"
                color={cat.count === 0 ? "error" : "text.secondary"}
                sx={{ fontWeight: 500 }}
              >
                {cat.count === 0 ? "Out of Stock" : `${cat.count} products`}
              </Typography>
            </Button>
          ))}
        </Box>
      </Container>

      {/* Wishlist Modal (uses global wishlist) */}
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
                key={item.id || item._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #eee",
                  py: 1
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6 }}
                  />
                  <Typography>{item.name}</Typography>
                </Box>
                <Typography>{formatSAR(item.price, lang)}</Typography>
              </Box>
            ))
          )}

          <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => setWishlistOpen(false)}>
            Close
          </Button>
        </Box>
      </Modal>

      {/* Extra Sections */}
      <WhyShop />
      <BookingSection />
      <CarNeeds />
      <InstagramSection />
    </Box>
  );
}
