// src/pages/SuccessPage.jsx
import React from "react";
import { Container, Typography, Box, Paper, Button, Divider } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { formatSAR } from "../utils/currency";

export default function SuccessPage() {
  const location = useLocation();
  const { shipping, paymentMethod, subtotal, cartCount } = location.state || {};

  const { lang } = useLanguage();

  // Generate order number & date
  const orderNumber = Math.floor(Math.random() * 1000000);
  const orderDate = new Date().toDateString();

  return (
    <Container sx={{ mt: 12, mb: 6 }}>
      {/* Heading */}
      <Typography
        variant="h4"
        color="success.main"
        sx={{ fontWeight: 800, mb: 3, textAlign: "center" }}
      >
        🎉 Thank You! Your Order is Complete
      </Typography>

      {/* Styled Card */}
      <Paper
        sx={{
          p: 4,
          maxWidth: 600,
          mx: "auto",
          borderRadius: 3,
          boxShadow: 6,
          background: "#fafafa"
        }}
      >
        {/* Order Details */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Order Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ mb: 2 }}>
          <Typography>Order Number: #{orderNumber}</Typography>
          <Typography>Date: {orderDate}</Typography>
          <Typography>Items: {cartCount}</Typography>
          <Typography>Total: {formatSAR(subtotal, lang)}</Typography>
          <Typography>Payment Method: {paymentMethod}</Typography>
        </Box>

        {/* Shipping Info */}
        {shipping && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Shipping Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography>Name: {shipping.name}</Typography>
            <Typography>Address: {shipping.address}</Typography>
            <Typography>Phone: {shipping.phone}</Typography>
          </Box>
        )}
      </Paper>

      {/* Continue Shopping Button */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          color="primary"
        >
          Continue Shopping
        </Button>
      </Box>
    </Container>
  );
}
