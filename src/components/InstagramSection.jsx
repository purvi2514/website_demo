import React from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";

export default function InstagramSection() {
  const posts = [
    "https://www.instagram.com/p/C-JoHihoZSX/embed",
    "https://www.instagram.com/p/BxLq6DPHaD9/embed",
    "https://www.instagram.com/p/BjNznY9H99T/embed",
  ];

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", py: 6 }}>
      <Container>
        {/* Heading */}
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, mb: 2, textAlign: "center" }}
        >
          Stay Updated — Follow Us on Instagram
        </Typography>

        {/* Follow Us button (merged from FollowUs.jsx) */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Button
            variant="contained"
            color="secondary"
            href="https://instagram.com/yourcarshop"
            target="_blank"
          >
            Follow Us
          </Button>
        </Box>

        {/* Instagram posts with hover effect */}
        <Grid container spacing={3} justifyContent="center">
          {posts.map((url, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Box
                sx={{
                  overflow: "hidden",
                  borderRadius: 2,
                  boxShadow: 2,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <iframe
                  src={url}
                  width="100%"
                  height="400"
                  frameBorder="0"
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title={`Instagram Post ${idx + 1}`}
                ></iframe>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
