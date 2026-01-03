import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function AdminHeader({ onMenu }) {
  const nav = useNavigate();
  const logout = () => {
    fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + '/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).finally(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      nav("/admin/login");
    });
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar sx={{ gap: 2 }}>
        <IconButton edge="start" onClick={onMenu} sx={{ display: { md: "none" } }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Admin Panel
        </Typography>
        <Button variant="outlined" color="error" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
