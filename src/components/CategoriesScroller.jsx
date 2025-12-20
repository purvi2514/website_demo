import React, { useState } from "react";
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
import { CATEGORIES } from "../data";
import { useNavigate } from "react-router-dom";

export default function CategoriesScroller() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const visibleCount = 5;
  const maxIndex = Math.ceil(CATEGORIES.length / visibleCount) - 1;

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 800, mb: 2, textAlign: "center" }}
      >
        Top Categories
      </Typography>

      {/* Categories scroller */}
      <Box sx={{ position: "relative" }}>
        <Box sx={{ display: "flex", gap: 2, overflow: "hidden" }}>
          {CATEGORIES.slice(index * visibleCount, (index + 1) * visibleCount).map((cat) => (
            <Card
              key={cat.slug}
              sx={{ minWidth: 220, cursor: "pointer" }}
              onClick={() => navigate(`/category/${cat.slug}`)} // ✅ navigate to category page
            >
              <CardMedia
                component="img"
                height="140"
                image={cat.image}
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
