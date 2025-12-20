import React from "react";
import { Container, Grid, Box, Typography, Chip } from "@mui/material";
import ProductCard from "../components/ProductCard";

const PRODUCTS = Array.from({ length: 12 }).map((_, i) => ({
  id: 200 + i,
  title: ["Air Filter", "Clutch Plate", "Spark Plug", "Chain Kit"][i % 4] + ` #${i + 1}`,
  price: [49, 199, 29, 399][i % 4],
  img: [
    "https://images.unsplash.com/photo-1625641853818-4d81f1da443e?q=80&w=1200&auto=format",
    "https://images.unsplash.com/photo-1587370560942-0a444d2aa1e0?q=80&w=1200&auto=format",
    "https://images.unsplash.com/photo-1618586610611-7c8e0d4a5c5b?q=80&w=1200&auto=format",
    "https://images.unsplash.com/photo-1607861859557-87e4a9d6e7a3?q=80&w=1200&auto=format"
  ][i % 4]
}));

export default function Products() {
  return (
    <Container sx={{ mt: 14, mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Products</Typography>
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Chip label="All" clickable />
        <Chip label="Engine" clickable />
        <Chip label="Spares" clickable />
        <Chip label="Accessories" clickable />
      </Box>
      <Grid container spacing={2}>
        {PRODUCTS.map((p) => (
          <Grid key={p.id} item xs={6} sm={4} md={3}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
