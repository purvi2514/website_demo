// import React from "react";
// import { Container, Typography, Grid, Box, IconButton, Button } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useCart } from "../context/CartContext";
// import { Link } from "react-router-dom";

// export default function Cart() {
//   const { cart, removeFromCart, updateQty, subtotal, clearCart } = useCart();

//   return (
//     <Container sx={{ mt: 14, mb: 4 }}>
//       <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Shopping Cart</Typography>
//       {cart.length === 0 ? (
//         <Box sx={{ textAlign: "center", py: 8 }}>
//           <Typography>Your cart is empty.</Typography>
//           <Button component={Link} to="/products" variant="contained" sx={{ mt: 2 }}>Shop Products</Button>
//         </Box>
//       ) : (
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={8}>
//             {cart.map((item) => (
//               <Box key={item.id} sx={{ display: "grid", gridTemplateColumns: "80px 1fr auto auto", gap: 2, alignItems: "center", borderBottom: "1px solid #eee", py: 2 }}>
//                 <Box sx={{ width: 80, height: 80, backgroundImage: `url(${item.img})`, backgroundSize: "cover", borderRadius: 1 }} />
//                 <Box>
//                   <Typography sx={{ fontWeight: 700 }}>{item.title}</Typography>
//                   <Typography color="primary">SAR {Number(item.price).toFixed(2)}</Typography>
//                 </Box>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <Button variant="outlined" size="small" onClick={() => updateQty(item.id, (item.qty || 1) - 1)}>-</Button>
//                   <Typography>{item.qty || 1}</Typography>
//                   <Button variant="outlined" size="small" onClick={() => updateQty(item.id, (item.qty || 1) + 1)}>+</Button>
//                 </Box>
//                 <IconButton color="error" onClick={() => removeFromCart(item.id)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             ))}
//             <Button variant="text" color="error" onClick={clearCart} sx={{ mt: 1 }}>Clear Cart</Button>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Box sx={{ border: "1px solid #eee", borderRadius: 2, p: 2 }}>
//               <Typography variant="h6" sx={{ mb: 1 }}>Cart totals</Typography>
//               <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//                 <Typography>Subtotal</Typography>
//                 <Typography>SAR {subtotal.toFixed(2)}</Typography>
//               </Box>
//               <Button component={Link} to="/checkout" variant="contained" fullWidth sx={{ mt: 2 }}>Proceed to checkout</Button>
//             </Box>
//           </Grid>
//         </Grid>
//       )}
//     </Container>
//   );
// }
