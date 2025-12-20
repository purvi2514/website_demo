// src/pages/CategoryPage.jsx
import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import { PRODUCTS } from "../data";   // ✅ use central data.js

export default function CategoryPage() {
  const { category } = useParams();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // ✅ filter products by category slug
  const filtered = useMemo(
    () => PRODUCTS.filter((p) => p.category.toLowerCase() === category.toLowerCase()),
    [category]
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, mb: 2, textTransform: "capitalize" }}
      >
        {category.replace("-", " ")}
      </Typography>

      <Grid container spacing={2}>
        {filtered.map((p) => (
          <Grid item xs={6} sm={4} md={3} key={p.id}>
            <ProductCard product={p} onQuickView={setQuickViewProduct} />
          </Grid>
        ))}
      </Grid>

      {/* ✅ Quick View Modal */}
      <QuickViewModal
        open={!!quickViewProduct}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </Container>
  );
}
