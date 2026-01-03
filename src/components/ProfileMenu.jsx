import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    // call API logout then clear local storage
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + '/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).finally(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/auth/login");
    });
  };

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Avatar sx={{ bgcolor: "#e00000", width: 32, height: 32 }}>
          {user?.name?.[0]?.toUpperCase()}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem disabled>{user?.name}</MenuItem>
        <MenuItem disabled>{user?.email}</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
