import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Grid } from "@mui/material";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data";

export default function ProductListPage() {
  const { slug } = useParams();

  const filtered = useMemo(
    () => PRODUCTS.filter((p) => p.category === slug),
    [slug]
  );

  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, mb: 2, textTransform: "capitalize" }}
        >
          {slug.replace(/-/g, " ")}
        </Typography>
        <Grid container spacing={2}>
          {filtered.map((p) => (
            <Grid item xs={6} sm={4} md={3} key={p.id}>
              <ProductCard product={p} onQuickView={() => {}} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
