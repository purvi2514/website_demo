import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API } from "../../utils/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/admin-login", { email, password });
      const body = res.data;

      if (!body || !body.success) {
        throw new Error(body?.message || "Login failed");
      }

      const token = body.data?.token;
      const user = body.data?.user;

      if (!token || !user) {
        throw new Error("Invalid response from server");
      }

      // ✅ Store admin token with required key
      localStorage.setItem("taz_admin", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Redirect to admin dashboard
      navigate("/admin");
    } catch (err) {
      alert(
        "Admin login failed: " +
          (err.response?.data?.message || err.message || "Unknown error")
      );
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h4" fontWeight={800} mb={2}>
        Admin Login
      </Typography>

      <TextField
        fullWidth
        label="Email"
        sx={{ mb: 2 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        sx={{ mb: 2 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{ py: 1.2, mt: 1, backgroundColor: "#e00000" }}
        onClick={handleLogin}
      >
        LOGIN
      </Button>
    </Box>
  );
}
