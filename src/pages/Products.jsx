import React, { useEffect, useState } from "react";
import { Container, Grid, Box, Typography, Chip, CircularProgress } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { API } from "../utils/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products from backend with token header
  useEffect(() => {
    const token = localStorage.getItem("token"); // get token from localStorage

    API.get("/products", {
      headers: {
        Authorization: `Bearer ${token}` // send token in Authorization header
      }
    })
      .then((res) => {
        setProducts(res.data || []); // store API response in state
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 14, mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
        Products
      </Typography>

      {/* ✅ Category filter UI (frontend only, no API yet) */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Chip label="All" clickable />
        <Chip label="Engine" clickable />
        <Chip label="Spares" clickable />
        <Chip label="Accessories" clickable />
      </Box>

      {/* ✅ Rendering product cards from API response */}
      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid key={p._id || p.id} item xs={6} sm={4} md={3}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
