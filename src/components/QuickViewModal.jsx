import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box,
  IconButton,
  TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { formatSAR } from "../utils/currency";

export default function QuickViewModal({ open, onClose, product }) {
  const { addToCart, addToWishlist } = useCart();
  const { t, lang } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box
        sx={{
          background: "#111",
          color: "#fff",
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {t(`products.${product.id}`, { defaultValue: t(`products.${product.title}`, { defaultValue: product.title }) })}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <img
            src={product.img}
            alt={product.title}
            style={{
              width: "100%",
              maxHeight: 320,
              objectFit: "cover",
              borderRadius: 8
            }}
          />
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
            {formatSAR(product.price, lang)}
          </Typography>
          <TextField
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            inputProps={{ min: 1 }}
            label="Quantity"
            sx={{ mt: 2, width: 120 }}
          />
          <Box
            sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center" }}
          >
            <Button
              variant="contained"
              onClick={() => {
                addToCart(product, quantity);
                onClose();
              }}
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                addToWishlist(product);
                onClose();
              }}
            >
              Add to Wishlist
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
