import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";

export default function CategoryCard({ title, img }) {
  return (
    <Card
      sx={{
        border: "1px solid #eee",
        transition: "all .2s",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 3 },
        textAlign: "center"
      }}
    >
      {/* ✅ Use CardMedia instead of backgroundImage */}
      <CardMedia
        component="img"
        height="140"
        image={img || "/assets/default-category.png"} // fallback if no image
        alt={title}
        sx={{ objectFit: "contain", p: 1 }} // prevent clipping
      />

      <CardContent>
        <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
      </CardContent>
    </Card>
  );
}
