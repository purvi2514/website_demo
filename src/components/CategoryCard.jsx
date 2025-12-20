import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function CategoryCard({ title, img }) {
  return (
    <Card sx={{ border: "1px solid #eee", transition: "all .2s", "&:hover": { transform: "translateY(-4px)", boxShadow: 3 } }}>
      <Box sx={{ height: 120, backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <CardContent>
        <Typography align="center" sx={{ fontWeight: 700 }}>{title}</Typography>
      </CardContent>
    </Card>
  );
}
