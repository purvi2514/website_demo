import React from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Box, Typography, Button } from "@mui/material";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { formatSAR } from "../utils/currency";

export default function SingleProduct() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { lang } = useLanguage();

  const product = {
    id: Number(id),
    title: "Premium Engine Oil 10W40",
    price: 120,
    img: "https://images.unsplash.com/photo-1619458367400-0f7c1f5fbaf9?q=80&w=1200&auto=format",
    desc: "High performance synthetic engine oil suitable for modern engines. Ensures smooth operation and longevity."
  };

  return (
    <Container sx={{ mt: 14, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: 360, borderRadius: 2, border: "1px solid #eee", backgroundImage: `url(${product.img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>{product.title}</Typography>
          <Typography sx={{ my: 1 }}>{product.desc}</Typography>
          <Typography color="primary" sx={{ fontWeight: 700, mb: 2 }}>{formatSAR(product.price, lang)}</Typography>
          <Button variant="contained" onClick={() => addToCart(product, 1)}>Add to cart</Button>
        </Grid>
      </Grid>
    </Container>
  );
}
