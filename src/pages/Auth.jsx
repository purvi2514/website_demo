import React, { useState } from "react";
import { Container, Grid, Box, Typography, Button } from "@mui/material";

export default function Auth() {
  const [mode, setMode] = useState("signup");

  return (
    <Container sx={{ mt: 14, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ borderRadius: 2, overflow: "hidden", border: "1px solid #eee" }}>
            <Box sx={{ height: 360, backgroundImage: "url(https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1920&auto=format)", backgroundSize: "cover" }} />
            <Box sx={{ p: 2 }}>
              <Typography variant="h6">Capture the road. Create memories.</Typography>
              <Typography variant="body2">Join to track orders and manage wishlist.</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ border: "1px solid #eee", borderRadius: 2, p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
              {mode === "signup" ? "Create an account" : "Sign in"}
            </Typography>
            <Box sx={{ display: "grid", gap: 2 }}>
              {mode === "signup" && (
                <>
                  <input placeholder="First name" style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }} />
                  <input placeholder="Last name" style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }} />
                </>
              )}
              <input placeholder="Email" style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }} />
              <input placeholder="Password" type="password" style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }} />
              <Button variant="contained">{mode === "signup" ? "Create account" : "Sign in"}</Button>
              <Button variant="text" onClick={() => setMode(mode === "signup" ? "signin" : "signup")}>
                {mode === "signup" ? "Already have an account? Sign in" : "New here? Create an account"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
