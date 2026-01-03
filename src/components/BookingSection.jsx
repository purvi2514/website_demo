import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Paper
} from "@mui/material";

export default function BookingSection() {
  const [formData, setFormData] = useState({ name: "", number: "", service: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking request submitted!");
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="stretch">
          {/* Left side form */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                height: "100%",
                p: { xs: 3, md: 5 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
                Request a Booking
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
              >
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Your Number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  select
                  label="Regular Service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="">—Please choose an option—</MenuItem>
                  <MenuItem value="general">General Car Service</MenuItem>
                  <MenuItem value="performance">Performance Part Installation</MenuItem>
                  <MenuItem value="custom">Custom Modifications</MenuItem>
                  <MenuItem value="accident">Accident Repair & Modifications</MenuItem>
                  <MenuItem value="tyre-brake">Tyre & Brake Services</MenuItem>
                  <MenuItem value="electrical">Electrical & Diagnostic Services</MenuItem>
                </TextField>
                <Button type="submit" variant="contained" color="primary">
                  Book Now
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Right side image */}
          <Grid item xs={12} md={6}>
           <Box
  sx={{
    height: { xs: 240, md: "100%" },
    borderRadius: 2,
    overflow: "hidden",
    boxShadow: 3,
    backgroundImage: `url("./booking.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: { xs: "center", md: "top" }
  }}
/>

          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
