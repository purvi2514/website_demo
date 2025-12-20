// import React from "react";
// import { Container, Typography, Grid, Box, Button } from "@mui/material";
// import { useCart } from "../context/CartContext";

// export default function Checkout() {
//   const { cart, subtotal, clearCart } = useCart();

//   const placeOrder = () => {
//     alert("Order placed successfully!");
//     clearCart();
//   };

//   return (
//     <Container sx={{ mt: 14, mb: 4 }}>
//       <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Checkout</Typography>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={8}>
//           <Box sx={{ border: "1px solid #eee", borderRadius: 2, p: 2 }}>
//             <Typography variant="h6">Billing Details</Typography>
//             <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
//               <input placeholder="Full Name" style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }} />
//               <input placeholder="Phone Number" style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }} />
//               <input placeholder="Address" style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }} />
//             </Box>
//           </Box>

//           <Box sx={{ border: "1px solid #eee", borderRadius: 2, p: 2, mt: 2 }}>
//             <Typography variant="h6">Order Summary</Typography>
//             {cart.map((it) => (
//               <Box key={it.id} sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: "1px solid #eee" }}>
//                 <Typography>{it.title} x {it.qty || 1}</Typography>
//                 <Typography>SAR {(Number(it.price) * (it.qty || 1)).toFixed(2)}</Typography>
//               </Box>
//             ))}
//             <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: 700, mt: 1 }}>
//               <Typography>Total</Typography>
//               <Typography>SAR {subtotal.toFixed(2)}</Typography>
//             </Box>
//             <Button variant="contained" sx={{ mt: 2 }} onClick={placeOrder}>Place Order (COD)</Button>
//           </Box>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Box sx={{ border: "1px solid #eee", borderRadius: 2, p: 2 }}>
//             <Typography variant="h6">Payment</Typography>
//             <Typography variant="body2" sx={{ mt: 1 }}>Cash on Delivery</Typography>
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }
