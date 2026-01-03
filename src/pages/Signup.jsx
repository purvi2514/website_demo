import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
  Typography
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useState } from "react";
import { API } from "../utils/api";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Normal signup
  const handleSignup = async () => {
    try {
      const name = `${firstName} ${lastName}`.trim();
      const res = await API.post("/auth/signup", { name, email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Signup successful!");
      navigate("/auth/login"); // redirect to login page
    } catch (err) {
      alert("Signup failed!");
    }
  };

  // ✅ Google signup/login
  const handleGoogleSignup = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google decoded:", decoded);

      const res = await API.post("/auth/google-login", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Google signup successful!");
      navigate("/");
    } catch (err) {
      alert("Google signup failed");
    }
  };

  // ✅ Apple signup/login
  const handleAppleSignup = async () => {
    try {
      const res = await API.post("/auth/apple-login");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Apple signup successful!");
      navigate("/");
    } catch (err) {
      alert("Apple signup failed");
    }
  };

  return (
    <AuthLayout>
      <Typography variant="h4" fontWeight={800} mb={1}>
        Create an account
      </Typography>

      <Typography variant="body2" mb={3}>
        Already have an account? <Link to="/auth/login">Login</Link>
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <TextField label="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <TextField label="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </Box>

      <TextField fullWidth label="Email" sx={{ mt: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField fullWidth label="Password" type="password" sx={{ mt: 2 }} value={password} onChange={(e) => setPassword(e.target.value)} />

      <FormControlLabel
        sx={{ mt: 1 }}
        control={<Checkbox />}
        label={
          <Typography variant="body2">
            I agree to the{" "}
            <span style={{ color: "#e00000", fontWeight: 600 }}>
              Terms & Conditions
            </span>
          </Typography>
        }
      />

      <Button
        fullWidth
        variant="contained"
        sx={{ py: 1.2, mt: 2, backgroundColor: "#e00000", "&:hover": { backgroundColor: "#c00000" } }}
        onClick={handleSignup}
      >
        CREATE ACCOUNT
      </Button>

      <Divider sx={{ my: 3 }}>or register with</Divider>

      <Box sx={{ display: "flex", gap: 2 }}>
        <GoogleLogin
          onSuccess={handleGoogleSignup}
          onError={() => alert("Google signup error")}
        />
        <Button fullWidth variant="outlined" onClick={handleAppleSignup}>
          APPLE
        </Button>
      </Box>
    </AuthLayout>
  );
}
