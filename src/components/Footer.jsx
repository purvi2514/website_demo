import React from "react";
import { Box, Container, Grid, Typography, Link as MuiLink, Button } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <Box sx={{ background: "#111", color: "#eee", mt: 4, pt: 4, pb: 2 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>CarGear</Typography>
            <Typography variant="body2">{t("footer.address")}</Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>{t("footer.quickLinks")}</Typography>
            <MuiLink href="#" color="inherit" underline="hover" sx={{ display: "block", mb: 0.5 }}>About Us</MuiLink>
            <MuiLink href="#" color="inherit" underline="hover" sx={{ display: "block", mb: 0.5 }}>Contact Us</MuiLink>
            <MuiLink href="#" color="inherit" underline="hover" sx={{ display: "block", mb: 0.5 }}>Privacy Policy</MuiLink>
            <MuiLink href="#" color="inherit" underline="hover" sx={{ display: "block", mb: 0.5 }}>Shipping & Delivery</MuiLink>
            <MuiLink href="#" color="inherit" underline="hover" sx={{ display: "block", mb: 0.5 }}>Terms & Conditions</MuiLink>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>{t("footer.support")}</Typography>
            <Typography variant="body2">{t("footer.email")}</Typography>
            <Typography variant="body2">{t("footer.open")}</Typography>
            <Button variant="contained" sx={{ mt: 1 }}>{t("footer.directions")}</Button>
          </Grid>
        </Grid>

        <Typography variant="caption" sx={{ display: "block", mt: 3, textAlign: "center", color: "#bbb" }}>
          © {new Date().getFullYear()} CarGear. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}
