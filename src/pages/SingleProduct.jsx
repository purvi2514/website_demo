import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Box, Typography, Button, CircularProgress } from "@mui/material";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { formatSAR } from "../utils/currency";
import { API } from "../utils/api";

export default function SingleProduct() {
  const { id } = useParams(); // ✅ product id from URL
  const { addToCart } = useCart();
  const { lang } = useLanguage();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch product details from backend with token header
  useEffect(() => {
    const token = localStorage.getItem("token"); // get token from localStorage

    API.get(`/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}` // send token in Authorization header
      }
    })
      .then((res) => {
        setProduct(res.data); // ✅ store API response in state
      })
      .catch((err) => {
        console.error("Failed to load product:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container sx={{ mt: 14, mb: 4 }}>
        <Typography variant="h6">Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 14, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: 360,
              borderRadius: 2,
              border: "1px solid #eee",
              backgroundImage: `url(${product.img})`, // ✅ image from API
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            {product.title} {/* ✅ title from API */}
          </Typography>
          <Typography sx={{ my: 1 }}>
            {product.desc} {/* ✅ description from API */}
          </Typography>
          <Typography color="primary" sx={{ fontWeight: 700, mb: 2 }}>
            {formatSAR(product.price, lang)} {/* ✅ price from API */}
          </Typography>
          <Button variant="contained" onClick={() => addToCart(product, 1)}>
            Add to cart
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
