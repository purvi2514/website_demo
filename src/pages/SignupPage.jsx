import React from "react";
import { Container, Box } from "@mui/material";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Signup from "./Signup";   // ✅ same folder

export default function SignupPage() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Navbar />
      <Container sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", py: { xs: 4, md: 8 } }}>
        <Signup />
      </Container>
    </Box>
  );
}
