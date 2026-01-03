import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Box
} from "@mui/material";
import { NavLink } from "react-router-dom";
import React from "react";

const navItems = [
  { text: "Dashboard", path: "/admin" },
  { text: "Products", path: "/admin/products" },
  { text: "Categories", path: "/admin/categories" },
  { text: "Orders", path: "/admin/orders" },
  { text: "Sellers", path: "/admin/sellers" },
  { text: "Users", path: "/admin/users" },
  { text: "Best Sellers", path: "/admin/bestsellers" },
  { text: "Admin Categories", path: "/admin/admincategories" },
  { text: "Banner", path: "/admin/banner" } // ✅ NEW ITEM
];

export default function AdminSidebar({ open, onClose }) {
  const drawerWidth = 240;

  const content = (
    <Box sx={{ width: drawerWidth }}>
      <Toolbar>
        <Typography variant="h6" fontWeight={700}>
          CarGear Admin
        </Typography>
      </Toolbar>
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.path}
            onClick={onClose}
            sx={{
              "&.active": {
                bgcolor: "action.selected"
              }
            }}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {content}
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" }
        }}
      >
        {content}
      </Drawer>
    </>
  );
}
