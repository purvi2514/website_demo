import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Button
} from "@mui/material";

export default function OrdersPage() {
  // Example static data — replace with API call later
  const orders = [
    {
      id: "ORD123",
      date: "2025-12-20",
      status: "Completed",
      items: [
        { name: "Apex Carbon Fiber Helmet - XL", qty: 1, price: 11996 },
        { name: "Tail Tidy for MT-15", qty: 1, price: 477 }
      ]
    },
    {
      id: "ORD124",
      date: "2025-12-22",
      status: "Pending",
      items: [
        { name: "Apollo Tubeless Tyre 90/90-17", qty: 1, price: 1200 }
      ]
    }
  ];

  return (
    <>
      {/* Top Tabs */}
      <Box sx={{ background: "#333", color: "#fff", py: 1 }}>
        <Container sx={{ display: "flex", gap: 4 }}>
          <Typography sx={{ opacity: 0.6 }}>Shopping Cart</Typography>
          <Typography sx={{ opacity: 0.6 }}>Checkout Details</Typography>
          <Typography sx={{ fontWeight: 600 }}>Order History</Typography>
        </Container>
      </Box>

      {/* Red Banner */}
      <Box sx={{ background: "#e00000", color: "#fff", py: 1, textAlign: "center" }}>
        <Typography variant="body2">
          Free Shipping Above SAR 999 | Easy EMI | Secure Payments
        </Typography>
      </Box>

      {/* Orders Content */}
      <Container sx={{ pt: { xs: 10, md: 12 }, pb: 6 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>My Orders</Typography>

        {orders.map(order => {
          const subtotal = order.items.reduce((sum, i) => sum + i.price * i.qty, 0);
          return (
            <Paper key={order.id} sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography><b>Order ID:</b> {order.id}</Typography>
                <Typography><b>Date:</b> {order.date}</Typography>
                <Typography><b>Status:</b> {order.status}</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />

              {/* Items */}
              <Box sx={{ display: "flex", fontWeight: 600, mb: 1 }}>
                <Box sx={{ flex: 2 }}>Product</Box>
                <Box sx={{ flex: 1, textAlign: "center" }}>Qty</Box>
                <Box sx={{ flex: 1, textAlign: "center" }}>Unit Price</Box>
                <Box sx={{ flex: 1, textAlign: "right" }}>Total</Box>
              </Box>
              {order.items.map((item, idx) => (
                <Box key={idx} sx={{ display: "flex", mb: 1 }}>
                  <Box sx={{ flex: 2 }}>{item.name}</Box>
                  <Box sx={{ flex: 1, textAlign: "center" }}>{item.qty}</Box>
                  <Box sx={{ flex: 1, textAlign: "center" }}>SAR {item.price}</Box>
                  <Box sx={{ flex: 1, textAlign: "right" }}>SAR {item.price * item.qty}</Box>
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

              <Button variant="outlined">View Details</Button>
            </Paper>
          );
        })}
      </Container>
    </>
  );
}
