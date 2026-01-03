import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Button,
  Menu,
  MenuItem,
  Drawer,
  Popover,
  Divider
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import ProfileMenu from "./ProfileMenu";

const NAV_CATS = [
  { key: "bumper", sub: ["Filters", "Belts", "Spark Plugs", "Fuel System", "Cooling"] },
  { key: "filters", sub: ["Street", "Touring", "Off-road"] },
  { key: "masura", sub: ["Lights", "Body Kits", "Phone Mounts", "Seats"] },
  { key: "khath", sub: ["LED", "Indicators", "Headlamps"] },
  { key: "mirrors", sub: ["Brakes", "Electrical", "Suspension", "Transmission"] },
  { key: "others", sub: ["Helmets", "Riding Gear", "Care & Cleaning"] }
];

export default function Navbar() {
  const { t, lang, setLang, direction } = useLanguage();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuCat, setMenuCat] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState(null);
  const [anchorCart, setAnchorCart] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const timerRef = useRef(null);
  const { cartItems, cartCount, subtotal } = useCart();
  const navigate = useNavigate();

  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!searchQuery || searchQuery.trim().length === 0) {
      setSuggestions([]);
      setSuggestOpen(false);
      return;
    }
    // debounce
    timerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products/search?q=${encodeURIComponent(searchQuery)}&limit=6`);
        const json = await res.json();
        if (json && json.success) {
          setSuggestions(json.products || []);
          setSuggestOpen((json.products || []).length > 0);
        } else {
          setSuggestions([]);
          setSuggestOpen(false);
        }
      } catch (err) {
        setSuggestions([]);
        setSuggestOpen(false);
      }
    }, 350);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [searchQuery]);

  const openMenu = (e, cat) => {
    setAnchorEl(e.currentTarget);
    setMenuCat(cat);
  };
  const closeMenu = () => {
    setAnchorEl(null);
    setMenuCat(null);
  };

  const handleCartHover = (e) => setAnchorCart(e.currentTarget);
  const handleCartClose = () => setAnchorCart(null);

  const toggleLang = () => setLang(lang === "en" ? "ar" : "en");

  return (
    <AppBar position="fixed" color="default" elevation={0} sx={{ borderBottom: "1px solid #ddd", zIndex: 1300 }}>
      {/* Top Bar */}
      <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 1 }}>
        {/* Logo */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            pl: 1,
            textDecoration: "none"
          }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="Ruken Tazweed"
            sx={{
              height: 100,
              width: "500",
              paddingLeft: 15,
              objectFit: "contain",
              filter: "drop-shadow(0 0 4px rgba(224,0,0,0.4))"
            }}
          />
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            position: 'relative',
            flexGrow: 1,
            mx: { xs: 1, sm: 2 },
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            border: "1px solid #ccc",
            px: 1,
            borderRadius: 1,
            maxWidth: 400
          }}
        >
          <SearchIcon sx={{ mr: 1 }} />
          <InputBase
            fullWidth
            placeholder={t("nav.search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
                setSuggestOpen(false);
              }
            }}
            onFocus={() => { if (suggestions.length) setSuggestOpen(true); }}
          />
          {suggestOpen && suggestions.length > 0 && (
            <Box sx={{ position: 'absolute', mt: 6, width: 400, bgcolor: 'background.paper', boxShadow: 2, zIndex: 1400 }}>
              {suggestions.map((p) => (
                <Box key={p._id || p.id} sx={{ px: 2, py: 1, borderBottom: '1px solid #eee', cursor: 'pointer' }} onClick={() => { navigate(`/products?q=${encodeURIComponent(p.name || p.title || '')}`); setSuggestOpen(false); }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700 }}>{p.name || p.title}</Typography>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>SAR {p.price}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
          <IconButton size="small" sx={{ display: { xs: "flex", sm: "none" } }}>
            <SearchIcon />
          </IconButton>
          <IconButton size="small"><FavoriteBorderIcon /></IconButton>

          {/* Cart with hover preview */}
          <Box onMouseEnter={handleCartHover} onMouseLeave={handleCartClose}>
            <IconButton size="small">
              <Badge badgeContent={cartCount || 0} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Popover
              open={Boolean(anchorCart)}
              anchorEl={anchorCart}
              onClose={handleCartClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              disableRestoreFocus
              PaperProps={{ sx: { p: 2, width: 300 } }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Cart Preview</Typography>
              {cartItems.length === 0 ? (
                <Typography>No items in cart.</Typography>
              ) : (
                <>
                  {cartItems.map(item => (
                    <Box key={item.id} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography>{item.name} × {item.qty}</Typography>
                      <Typography>SAR {item.price * item.qty}</Typography>
                    </Box>
                  ))}
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography><b>Subtotal:</b></Typography>
                    <Typography><b>SAR {subtotal}</b></Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="small"
                    sx={{ mb: 1 }}
                    component={Link}
                    to="/cart"
                  >
                    View Cart
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    size="small"
                    component={Link}
                    to="/checkout"
                  >
                    Checkout
                  </Button>
                </>
              )}
            </Popover>
          </Box>

          {localStorage.getItem("token") ? (
            <ProfileMenu />
          ) : (
            <IconButton size="small" component={Link} to="/auth/login">
              <PersonOutlineIcon />
            </IconButton>
          )}

          <Button
            variant="outlined"
            size="small"
            onClick={toggleLang}
            sx={{ display: { xs: "none", md: "flex" }, fontSize: "0.75rem" }}
          >
            {lang === "en" ? "العربية" : "English"}
          </Button>
          <IconButton
            size="small"
            onClick={() => setMobileMenuOpen(true)}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Categories Toolbar - Hidden on Mobile */}
      <Toolbar
        sx={{
          display: { xs: "none", md: "flex" },
          gap: 1.5,
          background: "#f7f7f7",
          minHeight: 44,
          overflowX: "auto",
          pl: { md: 10 }
        }}
      >
        <Button component={Link} to="/" color="inherit" sx={{ whiteSpace: "nowrap" }}>
          {t("nav.home")}
        </Button>
        {NAV_CATS.map((c) => (
          <Button
            key={c.key}
            color="inherit"
            endIcon={<KeyboardArrowDownIcon />}
            onMouseEnter={(e) => openMenu(e, c)}
            onClick={(e) => openMenu(e, c)}
            sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
          >
            {t(`nav.${c.key}`)}
          </Button>
        ))}
      </Toolbar>

      {/* Desktop Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        transformOrigin={{
          horizontal: direction === "rtl" ? "right" : "left",
          vertical: "top"
        }}
        anchorOrigin={{
          horizontal: direction === "rtl" ? "right" : "left",
          vertical: "bottom"
        }}
        MenuListProps={{ sx: { width: 280 } }}
      >
        {menuCat?.sub?.map((item) => (
          <MenuItem
            key={item}
            onClick={() => {
              closeMenu();
              navigate("/products");
            }}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>

     
      {/* Mobile Drawer Menu */}
      <Drawer anchor="right" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <Box sx={{ width: 280, p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Menu
            </Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Button
            fullWidth
            component={Link}
            to="/"
            color="inherit"
            onClick={() => setMobileMenuOpen(false)}
            sx={{ mb: 1, justifyContent: "flex-start" }}
          >
            {t("nav.home")}
          </Button>
          {NAV_CATS.map((c) => (
            <Box key={c.key} sx={{ mb: 1 }}>
              <Button
                fullWidth
                color="inherit"
                onClick={() =>
                  setExpandedMobileMenu(expandedMobileMenu === c.key ? null : c.key)
                }
                sx={{
                  justifyContent: "space-between",
                  fontWeight: 600,
                  textTransform: "none"
                }}
                endIcon={
                  <KeyboardArrowDownIcon
                    sx={{
                      transform:
                        expandedMobileMenu === c.key ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "0.3s"
                    }}
                  />
                }
              >
                {t(`nav.${c.key}`)}
              </Button>

              {expandedMobileMenu === c.key && (
                <Box
                  sx={{
                    pl: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                    mt: 0.5
                  }}
                >
                  {c.sub.map((item) => (
                    <Button
                      key={item}
                      fullWidth
                      color="inherit"
                      onClick={() => {
                        navigate("/products");
                        setMobileMenuOpen(false);
                        setExpandedMobileMenu(null);
                      }}
                      sx={{ justifyContent: "flex-start", fontSize: "0.9rem" }}
                    >
                      {item}
                    </Button>
                  ))}
                </Box>
              )}
            </Box>
          ))}
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              toggleLang();
              setMobileMenuOpen(false);
            }}
            sx={{ mt: 2 }}
          >
            {lang === "en" ? "العربية" : "English"}
          </Button>
        </Box>
      </Drawer>

      {/* Bottom Strip */}
      <Box sx={{ background: "#e00000", color: "#fff", py: 0.6, textAlign: "center" }}>
        <Typography variant="body2">{t("strip")}</Typography>
      </Box>
    </AppBar>
  );
}
