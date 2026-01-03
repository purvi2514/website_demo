import React, { useState, useEffect, useCallback } from "react";
import { Box, IconButton, Button, Typography, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLanguage } from "../context/LanguageContext";
import { API } from "../utils/api";

export default function HeroCarousel() {
  const { lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const isRtl = lang === "ar";

  // ✅ Fetch banners from backend
  useEffect(() => {
    API.get("/banner")
      .then((res) => setSlides(res.data.banners || []))
      .catch((err) => console.error("Failed to load banners:", err));
  }, []);

  const next = useCallback(() => {
    if (slides.length > 0) setIndex((i) => (i + 1) % slides.length);
  }, [slides]);

  const prev = useCallback(() => {
    if (slides.length > 0) setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [slides]);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  if (slides.length === 0) return null;

  return (
    <Box sx={{ position: "relative", width: "100%", height: { xs: 280, sm: 360, md: 420 }, overflow: "hidden", background: "#000" }}>
      {/* Image track */}
      <Box
        sx={{
          display: "flex",
          width: `${slides.length * 100}%`,
          transform: `translateX(-${index * (100 / slides.length)}%)`,
          transition: "transform .6s ease"
        }}
      >
        {slides.map((s, idx) => (
          <Box
            key={s._id || idx}
            sx={{
              flex: `0 0 ${100 / slides.length}%`,
              position: "relative",
              height: { xs: 280, sm: 360, md: 420 }
            }}
          >
            <img
              src={s.imageUrl}
              alt={`Banner ${idx + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block"
              }}
            />

            {/* Overlay content (optional: if you store text in banner object) */}
            {s.text && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  px: { xs: 2, md: 5 }
                }}
              >
                <Box sx={{ color: "#fff", maxWidth: 600 }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, textShadow: "0 10px 30px rgba(0,0,0,.45)" }}>
                    {s.text.title}
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.95, mb: 2 }}>
                    {s.text.subtitle}
                  </Typography>
                  <Button variant="contained" color="primary">{s.text.cta}</Button>
                </Box>
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {/* Arrows */}
      <IconButton
        onClick={isRtl ? next : prev}
        sx={{
          position: "absolute",
          top: "50%",
          left: 12,
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.45)",
          color: "#fff",
          "&:hover": { background: "rgba(0,0,0,0.65)" }
        }}
        aria-label="Previous"
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        onClick={isRtl ? prev : next}
        sx={{
          position: "absolute",
          top: "50%",
          right: 12,
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.45)",
          color: "#fff",
          "&:hover": { background: "rgba(0,0,0,0.65)" }
        }}
        aria-label="Next"
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Dots */}
      <Stack direction="row" spacing={1} sx={{ position: "absolute", bottom: 12, width: "100%", justifyContent: "center" }}>
        {slides.map((s, i) => (
          <Box
            key={s._id || i}
            onClick={() => setIndex(i)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: i === index ? "#e00000" : "#ddd",
              cursor: "pointer",
              transition: ".3s",
              "&:hover": { background: i === index ? "#d00000" : "#ccc" }
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
