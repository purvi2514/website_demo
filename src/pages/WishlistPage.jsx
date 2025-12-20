// src/pages/WishlistPage.jsx
import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  IconButton,
  Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { formatSAR } from "../utils/currency";   // ✅ fixed import

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useCart();
  const { t, lang } = useLanguage();

  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Your Wishlist
        </Typography>
        {wishlist.length === 0 ? (
          <Typography>No items in wishlist</Typography>
        ) : (
          <Grid container spacing={2}>
            {wishlist.map((item) => (
              <Grid item xs={12} md={6} key={item.id}>
                <Paper sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <img
                      src={item.img}
                      alt={item.title}
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 8
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ fontWeight: 600 }}>
                        {t(`products.${item.id}`, { defaultValue: t(`products.${item.title}`, { defaultValue: item.title }) })}
                      </Typography>
                      <Typography color="text.secondary">
                        {formatSAR(item.price, lang)}
                      </Typography>
                    </Box>
                    <IconButton onClick={() => removeFromWishlist(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      onClick={() => addToCart(item, 1)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}
