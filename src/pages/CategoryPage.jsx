import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent
} from "@mui/material";
import { API } from "../utils/api";

export default function CategoryPage() {
  const { name } = useParams(); // e.g. /category/Bumper
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/topcategories");
        console.log("URL param:", name);
        console.log("API categories:", res.data);

        const match = res.data.find(
          (c) => c.name?.toLowerCase() === decodeURIComponent(name).toLowerCase()
        );

        console.log("Matched category:", match);
        setCategory(match || null);
      } catch (err) {
        console.error("Failed to load category:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [name]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!category) {
    return (
      <Container sx={{ mt: 6 }}>
        <Typography variant="h6">Category not found</Typography>
      </Container>
    );
  }

  const subProducts = category.subProducts || [];

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        {category.name}
      </Typography>

      {/* ✅ Category level Out of Stock */}
      {category.count === 0 ? (
        <Typography color="error" sx={{ fontWeight: 600 }}>
          Out of Stock
        </Typography>
      ) : subProducts.length === 0 ? (
        <Typography>No sub products available.</Typography>
      ) : (
        <Grid container spacing={3}>
          {subProducts.map((sp) => (
            <Grid item xs={12} sm={6} md={4} key={sp._id}>
              <Card sx={{ height: "100%" }}>
                {sp.image && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={sp.image}
                    alt={sp.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {sp.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Type: {sp.type || "N/A"}
                  </Typography>

                  {/* ✅ SubProduct level Out of Stock */}
                  {sp.price === 0 ? (
                    <Typography variant="body2" color="error" sx={{ fontWeight: 500 }}>
                      Out of Stock
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Price: SAR {sp.price}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
