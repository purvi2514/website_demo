import React, { useState } from "react";
import { Grid, Container, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import { BESTSELLERS } from "../data";

export default function Bestseller() {
  const [quickProduct, setQuickProduct] = useState(null);
  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, mb: 2, textAlign: "center" }}
      >
        Best Sellers
      </Typography>
      <Grid container spacing={2}>
        {BESTSELLERS.map((p) => (
          <Grid item xs={6} sm={4} md={3} key={p.id}>
            <ProductCard product={p} onQuickView={setQuickProduct} />
          </Grid>
        ))}
      </Grid>
      <QuickViewModal
        open={Boolean(quickProduct)}
        onClose={() => setQuickProduct(null)}
        product={quickProduct}
      />
    </Container>
  );
}
