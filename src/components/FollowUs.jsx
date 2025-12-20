import React from "react";
import { Container, Typography, Button } from "@mui/material";

export default function FollowUs() {
  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Stay Updated — Follow Us on Instagram
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        href="https://instagram.com/yourcarshop"
        target="_blank"
      >
        Follow Us
      </Button>
    </Container>
  );
}
