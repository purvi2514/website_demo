import {
  Box,
  Button,
  Divider,
  TextField,
  Typography
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useState } from "react";
import { API } from "../utils/api";
import { GoogleLogin } from "@react-oauth/google"; 
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Normal login
  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful!");
      // Redirect based on role
      if (res.data.user && res.data.user.role === 'admin') navigate('/admin');
      else navigate("/");
    } catch {
      alert("Login failed!");
    }
  };

  // ✅ Google login
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google decoded:", decoded);

      const res = await API.post("/auth/google-login", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Google login successful!");
      if (res.data.user && res.data.user.role === 'admin') navigate('/admin');
      else navigate('/');
    } catch (err) {
      alert("Google login failed");
    }
  };

  // ✅ Apple login
  const handleAppleLogin = async () => {
    try {
      const res = await API.post("/auth/apple-login");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Apple login successful!");
      if (res.data.user && res.data.user.role === 'admin') navigate('/admin');
      else navigate('/');
    } catch (err) {
      alert("Apple login failed");
    }
  };

  return (
    <AuthLayout>
      <Typography variant="h4" fontWeight={800} mb={1}>
        Welcome back
      </Typography>

      <Typography variant="body2" mb={3}>
        Don’t have an account? <Link to="/auth/signup">Create one</Link>
      </Typography>

      <TextField fullWidth label="Email" sx={{ mb: 2 }}
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField fullWidth label="Password" type="password" sx={{ mb: 2 }}
        value={password} onChange={(e) => setPassword(e.target.value)} />

      <Button fullWidth variant="contained" sx={{ py: 1.2, mt: 1, backgroundColor: "#e00000" }}
        onClick={handleLogin}>
        LOGIN
      </Button>

      <Divider sx={{ my: 3 }}>or login with</Divider>

      <Box sx={{ display: "flex", gap: 2 }}>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => alert("Google login error")}
        />
        <Button fullWidth variant="outlined" onClick={handleAppleLogin}>
          APPLE
        </Button>
      </Box>
    </AuthLayout>
  );
}
