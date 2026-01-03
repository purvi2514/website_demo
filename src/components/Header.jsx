import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { formatSAR } from "../utils/currency";
import ProfileMenu from "./ProfileMenu";
export default function Header() {
  const navigate = useNavigate();
  const {
    cart = [],
    cartCount = 0,
    removeFromCart,
    wishlist = [],
    removeFromWishlist
  } = useCart();
  const { lang, t } = useLanguage();

  const [cartOpen, setCartOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const token = localStorage.getItem("token");
  

  return (
    <>
      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            TopGear Clone
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Link to="/category/accessories" className="nav-link">Accessories</Link>
            <Link to="/category/helmets" className="nav-link">Helmets</Link>
            <Link to="/category/oils-fluids" className="nav-link">Oils & Fluids</Link>
            <Link to="/category/bike-care" className="nav-link">Bike Care</Link>
            {token ? <ProfileMenu /> : <Link to="/auth/login">Login</Link>}
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton onClick={() => setWishOpen(true)}>
              <Badge badgeContent={Array.isArray(wishlist) ? wishlist.length : 0} color="secondary">
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>
            <IconButton onClick={() => setCartOpen(true)}>
              <Badge badgeContent={cartCount || 0} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Wishlist Drawer */}
      <Drawer anchor="right" open={wishOpen} onClose={() => setWishOpen(false)}>
        <Box sx={{ width: 320, p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Wishlist
          </Typography>
          {Array.isArray(wishlist) && wishlist.length === 0 ? (
            <ListItem>No items in wishlist</ListItem>
          ) : (
            <List>
              {Array.isArray(wishlist) &&
                wishlist.map((item) => (
                  <ListItem
                    key={item.id}
                    secondaryAction={
                      <Button size="small" onClick={() => removeFromWishlist(item.id)}>
                        Remove
                      </Button>
                    }
                  >
                    <ListItemText
                      primary={t(`products.${item.id}`, {
                        defaultValue: t(`products.${item.title}`, { defaultValue: item.title })
                      })}
                      secondary={formatSAR(item.price, lang)}
                    />
                  </ListItem>
                ))}
            </List>
          )}
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => {
              setWishOpen(false);
              navigate("/wishlist");
            }}
          >
            Go to Wishlist
          </Button>
        </Box>
      </Drawer>

      {/* Cart Drawer */}
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Box sx={{ width: 320, p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Cart
          </Typography>
          {Array.isArray(cart) && cart.length === 0 ? (
            <ListItem>No items in cart</ListItem>
          ) : (
            <List>
              {Array.isArray(cart) &&
                cart.map((item) => (
                  <ListItem
                    key={item.id}
                    secondaryAction={
                      <Button size="small" onClick={() => removeFromCart(item.id)}>
                        Remove
                      </Button>
                    }
                  >
                    <ListItemText
                      primary={`${t(`products.${item.id}`, {
                        defaultValue: t(`products.${item.title}`, { defaultValue: item.title })
                      })} x${item.qty}`}
                      secondary={formatSAR(item.price, lang)}
                    />
                  </ListItem>
                ))}
            </List>
          )}
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => {
              setCartOpen(false);
              navigate("/cart");
            }}
          >
            Go to Cart
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
