import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"; // ✅ correct context
import { useLanguage } from "../context/LanguageContext";
import { formatSAR } from "../utils/currency";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist(); // ✅ use wishlist context
  const { lang } = useLanguage();
  const navigate = useNavigate();

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardMedia
        component="img"
        height="200"
        image={product.img || "/assets/placeholder.png"} // ✅ fallback
        alt={product.title}
        sx={{ objectFit: "contain", p: 1 }} // ✅ prevent clipping
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {product.title}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, alignItems: "baseline", mt: 0.5 }}>
          <Typography variant="h6">{formatSAR(product.price, lang)}</Typography>
          {product.compareAtPrice && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              {formatSAR(product.compareAtPrice, lang)}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Button
            variant="contained"
            size="small"
            sx={{ borderRadius: 2 }}
            onClick={() => {
              addToCart(product, 1);
              navigate("/cart"); // ✅ redirect to cart
            }}
          >
            Add to Cart
          </Button>

          <IconButton
            size="small"
            onClick={() => addToWishlist(product)}
            sx={{ borderRadius: 2 }}
          >
            <FavoriteBorderIcon />
          </IconButton>

          <IconButton
            size="small"
            onClick={() => onQuickView(product)}
            sx={{ borderRadius: 2 }}
          >
            <VisibilityIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
