import React from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data";

export default function CategoriesGrid() {
  const navigate = useNavigate();
  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, mb: 2, textAlign: "center" }}
      >
        Top Categories
      </Typography>
      <Grid container spacing={2}>
        {CATEGORIES.map((cat) => (
          <Grid item xs={6} sm={4} md={3} key={cat.slug}>
            <Card
              sx={{ cursor: "pointer", height: 260 }}
              onClick={() => navigate(`/category/${cat.slug}`)}
            >
              <CardMedia
                component="img"
                height="160"
                image={cat.image}
                alt={cat.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {cat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
