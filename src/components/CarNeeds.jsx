import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";

export default function CarNeeds() {
  const items = [
    { title: "Spares", desc: "Brake pads, filters, belts, bearings" },
    { title: "Tyres", desc: "All-season, performance & off-road" },
    { title: "Helmets", desc: "ISI & ECE cert. helmets, riding gears & more" },
    { title: "Accessories", desc: "Lights, body kits, lever sets & more" },
    { title: "Service", desc: "Oil change, brakes, seats & more" },
  ];

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", py: 6 }}>
      <Container>
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, mb: 4, textAlign: "center" }}
        >
          Your One‑Stop Destination for Car Needs
        </Typography>

        {/* ✅ Flexbox row for 5 cards */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "nowrap", overflowX: "auto" }}>
          {items.map((item, idx) => (
            <Paper
              key={idx}
              sx={{
                flex: "1 1 0",
                minWidth: "200px",
                p: 3,
                textAlign: "center"
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.desc}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
