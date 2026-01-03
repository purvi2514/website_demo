import React, { useState } from "react";
import {
  Container, Typography, Grid, TextField, Button, Paper, Box,
  Divider, RadioGroup, FormControlLabel, Radio
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const [billing, setBilling] = useState({
    firstName: "", lastName: "", address: "", city: "", state: "",
    phone: "", email: ""
  });

  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const validateFields = () => {
    const newErrors = {};
    Object.entries(billing).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "Required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!isLoggedIn) {
      alert("Please login or create an account before placing order.");
      return;
    }
    if (!validateFields()) return;

    console.log("Order placed:", { billing, cartItems, paymentMethod });
    clearCart();
    navigate("/order-success");
  };

  return (
    <>
      {/* Top Tabs */}
      <Box sx={{ background: "#333", color: "#fff", py: 1 }}>
        <Container sx={{ display: "flex", gap: 4 }}>
          <Typography sx={{ opacity: 0.6 }}>Shopping Cart</Typography>
          <Typography sx={{ fontWeight: 600 }}>Checkout Details</Typography>
          <Typography sx={{ opacity: 0.6 }}>Order Complete</Typography>
        </Container>
      </Box>

      {/* Red Banner */}
      <Box sx={{ background: "#e00000", color: "#fff", py: 1, textAlign: "center" }}>
        <Typography variant="body2">
          Free Shipping Above SAR 999 | Easy EMI | Secure Payments
        </Typography>
      </Box>

      {/* Checkout Content */}
      <Container sx={{ pt: { xs: 10, md: 12 }, pb: 6 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Checkout Details</Typography>

        <Grid container spacing={4}>
          {/* Billing Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Billing Details</Typography>
              <Grid container spacing={2}>
                {["firstName", "lastName", "address", "city", "state", "phone", "email"].map((field) => (
                  <Grid item xs={field === "address" ? 12 : 6} key={field}>
                    <TextField
                      label={`${field.charAt(0).toUpperCase() + field.slice(1)} *`}
                      fullWidth
                      value={billing[field]}
                      onChange={(e) => setBilling({ ...billing, [field]: e.target.value })}
                      error={!!errors[field]}
                      helperText={errors[field]}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={5}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Your Order</Typography>
              <Divider sx={{ mb: 2 }} />
              {cartItems.map((item) => (
                <Box key={item.id} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography>{item.name} × {item.qty}</Typography>
                  <Typography>SAR {item.price * item.qty}</Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography>SAR {subtotal}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography><b>Total:</b></Typography>
                <Typography><b>SAR {subtotal}</b></Typography>
              </Box>

              {/* Payment Options */}
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Payment Method</Typography>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
                <FormControlLabel value="mada" control={<Radio />} label="Mada Debit Card" />
                <FormControlLabel value="stcpay" control={<Radio />} label="STC Pay" />
                <FormControlLabel value="applepay" control={<Radio />} label="Apple Pay" />
                <FormControlLabel value="card" control={<Radio />} label="Visa/Mastercard" />
                <FormControlLabel value="razorpay" control={<Radio />} label="Pay by Razorpay" />
                <FormControlLabel value="paytabs" control={<Radio />} label="PayTabs (Saudi Gateway)" />
              </RadioGroup>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
