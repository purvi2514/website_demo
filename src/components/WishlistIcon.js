// WishlistIcon.js
import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { IconButton, Drawer, List, ListItem } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const WishlistIcon = () => {
  const { wishlistItems } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        color="error"
        onClick={() => setOpen(true)}
        sx={{ position: "absolute", top: 10, right: 60 }}
      >
        <FavoriteIcon />
      </IconButton>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 250 }}>
          {wishlistItems.length === 0 ? (
            <ListItem>No items in wishlist</ListItem>
          ) : (
            wishlistItems.map((item, idx) => (
              <ListItem key={idx}>{item.name}</ListItem>
            ))
          )}
        </List>
      </Drawer>
    </>
  );
};

export default WishlistIcon;
