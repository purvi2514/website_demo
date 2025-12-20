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
import { useLanguage } from "../context/LanguageContext";
import { formatSAR } from "../utils/currency";

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, addToWishlist } = useCart();
  const { t, lang } = useLanguage();

  return (
    <Card sx={{ height: 380, display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="200"
        image={product.img}
        alt={product.title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {t(`products.${product.id}`, { defaultValue: t(`products.${product.title}`, { defaultValue: product.title }) })}
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
            onClick={() => addToCart(product, 1)}
          >
            Add to Cart
          </Button>
          <IconButton size="small" onClick={() => addToWishlist(product)}>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton size="small" onClick={() => onQuickView(product)}>
            <VisibilityIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
