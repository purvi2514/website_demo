import React from "react";
import { Container, Typography } from "@mui/material";

export default function WhyShop() {
  return (
    <Container sx={{ py: 6 }}>
      {/* Heading */}
      <Typography
        variant="h5"
        sx={{ fontWeight: 800, mb: 3, textAlign: "center" }}
      >
        Why Shop with Top Gear?
      </Typography>

      {/* Intro paragraph */}
      <Typography
        variant="body1"
        sx={{ mb: 5, textAlign: "center", maxWidth: 1200, mx: "auto" }}
      >
        At Top Gear, we offer a carefully curated range of premium helmets,
        tyres, auto care products, lubricants, additives, and both genuine and
        high‑quality aftermarket spares & accessories — all tested to perform in
        real‑world riding conditions. Driven by your satisfaction.
        <br />
        <br />
        We provide easy EMI options and value‑packed bundle deals, along with
        fast, reliable delivery across India — with complete coverage of all
        locations in the Andaman & Nicobar Islands, ensuring riders never have
        to compromise on quality, no matter where they are.
      </Typography>

      {/* Cards row inside same section */}
      {/* <Grid container spacing={3} columns={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={1} sm={1} md={1}>
          <Paper
            sx={{
              p: 3,
              minHeight: 220,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              border: "2px solid transparent",
              transition: "border-color 0.3s, box-shadow 0.3s",
              "&:hover": {
                borderColor: "primary.main",
                boxShadow: 3,
              },
            }}
          >
            <Box sx={{ mb: 2 }}>
              <SecurityIcon sx={{ fontSize: 40, color: "primary.main" }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Genuine & Trusted
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Whether genuine or high‑grade aftermarket, every product we offer
              meets strict quality standards. We ensure you receive safe,
              reliable gear and accessories you can trust on the road.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={1} sm={1} md={1}>
          <Paper
            sx={{
              p: 3,
              minHeight: 220,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
              border: "2px solid transparent",
              transition: "border-color 0.3s, box-shadow 0.3s",
              "&:hover": {
                borderColor: "success.main",
                boxShadow: 3,
              },
            }}
          >
            <Box sx={{ mb: 2 }}>
              <LocalShippingIcon sx={{ fontSize: 40, color: "success.main" }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Island‑wide Delivery
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We offer quick and secure delivery across the entire islands,
              ensuring your products arrive safely and on time without any
              inconvenience. Andaman’s Moto Powerhouse.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={1} sm={1} md={1}>
          <Paper
            sx={{
              p: 3,
              minHeight: 220,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              textAlign: "center",
              border: "2px solid transparent",
              transition: "border-color 0.3s, box-shadow 0.3s",
              "&:hover": {
                borderColor: "warning.main",
                boxShadow: 3,
              },
            }}
          >
            <Box sx={{ mb: 2 }}>
              <HeadsetMicIcon sx={{ fontSize: 40, color: "warning.main" }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Shopping Assistance
            </Typography>
            <Typography variant="body2" color="text.secondary">
              From recommending the right products to handling purchases and
              shipping, we make your shopping effortless. Can’t find a part?
              We’ll arrange unlisted items on order. Your satisfaction remains
              our top priority.
            </Typography>
          </Paper>
        </Grid>
      </Grid> */}
    </Container>
  );
}
