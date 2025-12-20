import React, { useState, useEffect, useCallback } from "react";
import { Box, IconButton, Button, Typography, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLanguage } from "../context/LanguageContext";

const slides = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1604671801909-f1eab46eb47c?q=80&w=1920&auto=format&fit=crop",
    text: {
      title: "Performance in Every Detail",
      subtitle: "Premium parts. Fair prices.",
      cta: "Shop Now"
    },
    variant: "dark"
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1592578629292-9df9f463703b?q=80&w=1920&auto=format&fit=crop",
    text: {
      eyebrow: "Helmets That Speak Your Style",
      titleBold: "Engineered for safety, styled for riders",
      cta: "Shop Now"
    },
    variant: "light"
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1920&auto=format&fit=crop",
    text: {
      title: "From Tyre to Tail Light",
      subtitle: "Full range of parts and accessories.",
      cta: "Shop Now"
    },
    variant: "dark"
  }
];

export default function HeroCarousel() {
  const { lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const isRtl = lang === "ar";

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

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
        {slides.map((s) => (
          <Box
            key={s.id}
            sx={{
              flex: `0 0 ${100 / slides.length}%`,
              position: "relative",
              height: { xs: 280, sm: 360, md: 420 }
            }}
          >
            <img
              src={s.img}
              alt={s.text.title || s.text.titleBold}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block"
              }}
            />

            {/* Overlay content */}
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
              {s.variant === "dark" ? (
                <Box sx={{ color: "#fff", maxWidth: 600 }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, textShadow: "0 10px 30px rgba(0,0,0,.45)" }}>
                    {s.text.title}
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.95, mb: 2 }}>
                    {s.text.subtitle}
                  </Typography>
                  <Button variant="contained" color="primary">{s.text.cta}</Button>
                </Box>
              ) : (
                <Box sx={{ color: "#000", maxWidth: 700, background: "rgba(255,255,255,0.85)", p: 2, borderRadius: 1 }}>
                  <Typography sx={{ color: "#e00000", fontWeight: 700, fontSize: 18 }}>
                    {s.text.eyebrow}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5 }}>
                    {s.text.titleBold}
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 1 }}>{s.text.cta}</Button>
                </Box>
              )}
            </Box>
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
            key={s.id}
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
