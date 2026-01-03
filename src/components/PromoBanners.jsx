import React from "react";
import { Container, Grid, Paper, Box, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

export default function PromoBanners() {
  return (
    <Container sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <LocalShippingIcon color="primary" />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Free Shipping Above ₹9999
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fast, reliable delivery across Saudi
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <CreditCardIcon color="secondary" />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Easy EMI
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Simple payment options for every purchase
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <VerifiedUserIcon color="success" />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Secure Payments
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Safe checkout and trusted partners
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
