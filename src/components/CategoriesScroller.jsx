import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

export default function CategoriesScroller() {
  const [index, setIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // ✅ Load categories from localStorage (admin panel)
  useEffect(() => {
    const savedCats = localStorage.getItem("categories");
    if (savedCats) {
      setCategories(JSON.parse(savedCats));
    }
  }, []);

  const visibleCount = 5;
  const maxIndex = Math.ceil(categories.length / visibleCount) - 1;

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 800, mb: 2, textAlign: "center" }}
      >
        Top Categories
      </Typography>

      <Box sx={{ position: "relative" }}>
        <Box sx={{ display: "flex", gap: 2, overflow: "hidden" }}>
          {categories
            .slice(index * visibleCount, (index + 1) * visibleCount)
            .map((cat) => (
              <Card
                key={cat.id}
                sx={{ minWidth: 220, cursor: "pointer" }}
                onClick={() =>
                  navigate(`/category/${encodeURIComponent(cat.title)}`)
                }
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={cat.img}
                  alt={cat.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {cat.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cat.count} products
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </Box>

        {/* Arrows */}
        <IconButton
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          sx={{
            position: "absolute",
            top: "50%",
            left: -20,
            transform: "translateY(-50%)"
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          onClick={() => setIndex((i) => Math.min(i + 1, maxIndex))}
          sx={{
            position: "absolute",
            top: "50%",
            right: -20,
            transform: "translateY(-50%)"
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Container>
  );
}
