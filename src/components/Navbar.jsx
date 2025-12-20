import React, { useState } from "react";
import { AppBar, Toolbar, Box, IconButton, Typography, InputBase, Badge, Button, Menu, MenuItem, Drawer } from "@mui/material";
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

const NAV_CATS = [
  { key: "engine", sub: ["Filters", "Belts", "Spark Plugs", "Fuel System", "Cooling"] },
  { key: "tyres", sub: ["Street", "Touring", "Off-road"] },
  { key: "accessories", sub: ["Lights", "Body Kits", "Phone Mounts", "Seats"] },
  { key: "lights", sub: ["LED", "Indicators", "Headlamps"] },
  { key: "spares", sub: ["Brakes", "Electrical", "Suspension", "Transmission"] },
  { key: "service", sub: ["Oil Change", "Brakes", "Alignment", "Detailing"] },
  { key: "others", sub: ["Helmets", "Riding Gear", "Care & Cleaning"] }
];

export default function Navbar() {
  const { cartCount } = useCart();
  const { t, lang, setLang, direction } = useLanguage();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuCat, setMenuCat] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState(null);
  const navigate = useNavigate();

  const openMenu = (e, cat) => {
    setAnchorEl(e.currentTarget);
    setMenuCat(cat);
  };
  const closeMenu = () => {
    setAnchorEl(null);
    setMenuCat(null);
  };

  const toggleLang = () => setLang(lang === "en" ? "ar" : "en");

  return (
    <AppBar position="fixed" color="default" elevation={0} sx={{ borderBottom: "1px solid #ddd" }}>
      {/* Top Bar */}
      <Toolbar sx={{ display: "flex", alignItems: "center", gap: 1, py: 1 }}>
        <Box component={Link} to="/" sx={{ textDecoration: "none" }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#e00000", fontSize: { xs: "1.2rem", sm: "1.5rem" } }}>CarGear</Typography>
        </Box>

        {/* Search Bar - Hidden on Mobile */}
        <Box sx={{ flex: 1, mx: { xs: 1, sm: 2 }, display: { xs: "none", sm: "flex" }, alignItems: "center", border: "1px solid #ccc", px: 1, borderRadius: 1 }}>
          <SearchIcon sx={{ mr: 1 }} />
          <InputBase
            fullWidth
            placeholder={t("nav.search")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/products")}
          />
        </Box>

        {/* Icons and Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
          <IconButton size="small" sx={{ display: { xs: "flex", sm: "none" } }}><SearchIcon /></IconButton>
          <IconButton size="small"><FavoriteBorderIcon /></IconButton>
          <IconButton size="small" component={Link} to="/cart">
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton size="small" component={Link} to="/auth"><PersonOutlineIcon /></IconButton>
          <Button variant="outlined" size="small" onClick={toggleLang} sx={{ display: { xs: "none", md: "flex" }, fontSize: "0.75rem" }}>
            {lang === "en" ? "العربية" : "English"}
          </Button>
          <IconButton size="small" onClick={() => setMobileMenuOpen(true)} sx={{ display: { xs: "flex", md: "none" } }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Categories Toolbar - Hidden on Mobile */}
      <Toolbar sx={{ display: { xs: "none", md: "flex" }, gap: 1.5, background: "#f7f7f7", minHeight: 44, overflowX: "auto" }}>
        <Button component={Link} to="/" color="inherit" sx={{ whiteSpace: "nowrap" }}>{t("nav.home")}</Button>
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
        transformOrigin={{ horizontal: direction === "rtl" ? "right" : "left", vertical: "top" }}
        anchorOrigin={{ horizontal: direction === "rtl" ? "right" : "left", vertical: "bottom" }}
        MenuListProps={{ sx: { width: 280 } }}
      >
        {menuCat?.sub?.map((item) => (
          <MenuItem key={item} onClick={() => { closeMenu(); navigate("/products"); }}>
            {item}
          </MenuItem>
        ))}
      </Menu>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box sx={{ width: 280, p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Menu</Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Button fullWidth component={Link} to="/" color="inherit" onClick={() => setMobileMenuOpen(false)} sx={{ mb: 1, justifyContent: "flex-start" }}>
            {t("nav.home")}
          </Button>
          {NAV_CATS.map((c) => (
            <Box key={c.key} sx={{ mb: 1 }}>
              <Button 
                fullWidth 
                color="inherit" 
                onClick={() => setExpandedMobileMenu(expandedMobileMenu === c.key ? null : c.key)}
                sx={{ justifyContent: "space-between", fontWeight: 600, textTransform: "none" }}
                endIcon={<KeyboardArrowDownIcon sx={{ transform: expandedMobileMenu === c.key ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }} />}
              >
                {t(`nav.${c.key}`)}
              </Button>
              {expandedMobileMenu === c.key && (
                <Box sx={{ pl: 2, display: "flex", flexDirection: "column", gap: 0.5, mt: 0.5 }}>
                  {c.sub.map((item) => (
                    <Button 
                      key={item} 
                      fullWidth 
                      color="inherit" 
                      onClick={() => { navigate("/products"); setMobileMenuOpen(false); setExpandedMobileMenu(null); }}
                      sx={{ justifyContent: "flex-start", fontSize: "0.9rem" }}
                    >
                      {item}
                    </Button>
                  ))}
                </Box>
              )}
            </Box>
          ))}
          <Button fullWidth variant="outlined" onClick={() => { toggleLang(); setMobileMenuOpen(false); }} sx={{ mt: 2 }}>
            {lang === "en" ? "العربية" : "English"}
          </Button>
        </Box>
      </Drawer>

      <Box sx={{ background: "#e00000", color: "#fff", py: 0.6, textAlign: "center" }}>
        <Typography variant="body2">{t("strip")}</Typography>
      </Box>
    </AppBar>
  );
}
