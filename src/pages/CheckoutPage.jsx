import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  Divider
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { formatSAR } from "../utils/currency";

export default function CheckoutPage() {
  const { cart, subtotal, cartCount, updateQty, removeFromCart, clearCart } = useCart();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({ name: "", address: "", phone: "" });
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  // ✅ Razorpay integration trigger
  const handleRazorpay = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY", // replace with your Razorpay key
      amount: subtotal * 100, // amount in paise
      currency: "SAR",
      name: "TopGear Auto",
      description: "Order Payment",
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        clearCart();
        navigate("/success", { state: { shipping, paymentMethod, subtotal, cartCount } });
      },
      prefill: {
        name: shipping.name,
        email: "customer@example.com",
        contact: shipping.phone,
      },
      theme: { color: "#3399cc" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleConfirm = () => {
    if (!shipping.name || !shipping.address || !shipping.phone) {
      alert("Please fill in all shipping details.");
      return;
    }

    if (paymentMethod === "Razorpay") {
      handleRazorpay();
    } else {
      clearCart();
      navigate("/success", { state: { shipping, paymentMethod, subtotal, cartCount } });
    }
  };

  return (
    <Container sx={{ mt: 12, mb: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
        Checkout
      </Typography>

      {cart.length === 0 ? (
        <Typography>Your cart is empty. Please add items before checkout.</Typography>
      ) : (
        <Grid container spacing={3}>
          {/* Left Column: Items */}
          <Grid item xs={12} md={8}>
            <Box sx={{ border: "1px solid #eee", borderRadius: 2, p: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Order Items
              </Typography>
              {cart.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #f0f0f0",
                    py: 1
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <img
                      src={item.img}
                      alt={item.title}
                      style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {t(`products.${item.id}`, { defaultValue: t(`products.${item.title}`, { defaultValue: item.title }) })}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatSAR(item.price, lang)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* + / - buttons */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => updateQty(item.id, (item.qty || 1) - 1)}
                    >
                      -
                    </Button>
                    <Typography>{item.qty || 1}</Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => updateQty(item.id, (item.qty || 1) + 1)}
                    >
                      +
                    </Button>
                  </Box>

                  {/* Delete button */}
                  <IconButton color="error" onClick={() => removeFromCart(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Right Column: Summary + Shipping Form */}
          <Grid item xs={12} md={4}>
            <Box sx={{ border: "1px solid #eee", borderRadius: 2, p: 3, background: "#fafafa" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 1 }}>
                Items: {cartCount}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Subtotal: {formatSAR(subtotal, lang)}
              </Typography>

              {/* Shipping Info */}
              <TextField fullWidth label="Full Name" name="name" value={shipping.name} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Address" name="address" value={shipping.address} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Phone Number" name="phone" value={shipping.phone} onChange={handleChange} sx={{ mb: 2 }} />

              {/* Payment Method Dropdown */}
              <TextField
                select
                fullWidth
                label="Payment Method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                sx={{ mb: 2 }}
              >
                <MenuItem value="COD">Cash on Delivery</MenuItem>
                <MenuItem value="Mada">Mada Debit Card</MenuItem>
                <MenuItem value="Visa">Visa/Mastercard</MenuItem>
                <MenuItem value="STC">STC Pay</MenuItem>
                <MenuItem value="ApplePay">Apple Pay</MenuItem>
                <MenuItem value="Razorpay">Razorpay</MenuItem>
              </TextField>

              <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }} onClick={handleConfirm}>
                Confirm Order
              </Button>
              <Button variant="outlined" color="error" fullWidth onClick={clearCart}>
                Clear Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
