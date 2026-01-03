import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  TextField,
  Divider
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, updateQty, removeItem, subtotal } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {/* ✅ Top Tabs */}
      <Box sx={{ background: "#333", color: "#fff", py: 1 }}>
        <Container sx={{ display: "flex", gap: 4 }}>
          <Typography sx={{ fontWeight: 600 }}>Shopping Cart</Typography>
          <Typography sx={{ opacity: 0.6 }}>Checkout Details</Typography>
          <Typography sx={{ opacity: 0.6 }}>Order Complete</Typography>
        </Container>
      </Box>

      {/* ✅ Red Banner */}
      <Box sx={{ background: "#e00000", color: "#fff", py: 1, textAlign: "center" }}>
        <Typography variant="body2">
          Free Shipping Above SAR 999 | Easy EMI | Secure Payments
        </Typography>
      </Box>

      {/* ✅ Cart Content */}
      <Container sx={{ pt: { xs: 10, md: 12 }, pb: 6 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Shopping Cart</Typography>

        {cartItems.length === 0 ? (
          <Typography>No items in cart.</Typography>
        ) : (
          <Grid container spacing={3}>
            {/* Left side: Items */}
            <Grid item xs={12} md={8}>
              {/* ✅ Table Headers */}
              <Box sx={{ display: "flex", px: 2, py: 1, background: "#f5f5f5", fontWeight: 600 }}>
                <Box sx={{ width: 80 }}></Box>
                <Box sx={{ width : 200 }}>Product</Box>
                <Box sx={{ width: 100 }}>Price</Box>
                <Box sx={{ width: 100 }}>Quantity</Box>
                <Box sx={{ width: 120 }}>Subtotal</Box>
                <Box sx={{ width: 80 }}></Box>
              </Box>

              {cartItems.map(item => (
                <Paper key={item.id} sx={{ p: 2, mb: 2, display: "flex", alignItems: "center" }}>
                  {/* Image */}
                  <Box
                    component="img"
                    src={item.img}
                    alt={item.name}
                    sx={{ width: 80, height: 80, objectFit: "cover", mr: 2 }}
                  />
                  {/* Name */}
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
                  </Box>
                  {/* Price */}
                  <Box sx={{ width: 100 }}>
                    <Typography>SAR {item.price}</Typography>
                  </Box>
                  {/* Quantity */}
                  <Box sx={{ width: 100 }}>
                    <TextField
                      type="number"
                      size="small"
                      value={item.qty}
                      onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                      inputProps={{ min: 1 }}
                      sx={{ width: 60 }}
                    />
                  </Box>
                  {/* Subtotal */}
                  <Box sx={{ width: 120 }}>
                    <Typography>SAR {item.price * item.qty}</Typography>
                  </Box>
                  {/* Remove */}
                  <Box sx={{ width: 80 }}>
                    <Button color="error" onClick={() => removeItem(item.id)}>Remove</Button>
                  </Box>
                </Paper>
              ))}

              {/* ✅ Continue + Update buttons */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Button component={Link} to="/products" variant="outlined" color="inherit">
                  ← Continue Shopping
                </Button>
                <Button variant="contained" color="secondary" onClick={() => console.log("Cart updated")}>
                  Update Cart
                </Button>
              </Box>
            </Grid>

            {/* Right side: Coupon + Totals */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Coupon</Typography>
                <TextField label="Coupon Code" fullWidth size="small" sx={{ mb: 2 }} />
                <Button variant="outlined">Apply Coupon</Button>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Cart Totals</Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography>Subtotal:</Typography>
                  <Typography>SAR {subtotal}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography><b>Total:</b></Typography>
                  <Typography><b>SAR {subtotal}</b></Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}
