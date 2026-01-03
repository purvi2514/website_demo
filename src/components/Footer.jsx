import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  Button,
  Collapse,
  IconButton
} from "@mui/material";


import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Footer() {

  const [showTiming, setShowTiming] = useState(false);

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #111 0%, #000 100%)",
        color: "#eee",
        mt: 6,
        pt: 6,
        pb: 3
      }}
    >
      <Container maxWidth="md">
        <Grid
          container
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{
            px: { xs: 2, md: 6 }
          }}
        >
          {/* ===== LEFT : BRAND ===== */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                maxWidth: 260,
                mx: "auto",
                textAlign: "left"
              }}
            >
              <Box
                component="img"
                src="/logo.png"
                alt="Rakan Tazweed"
                sx={{ height: 48, mb: 1 }}
              />

              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Rakan Tazweed
              </Typography>

              <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
                Riyadh, Saudi Arabia
              </Typography>

              <Box sx={{ display: "flex", gap: 2 }}>
                <IconButton
                  href="https://www.instagram.com/tazweeed_car_decor"
                  target="_blank"
                  sx={{ color: "#eee" }}
                >
                  <InstagramIcon />
                </IconButton>

                <IconButton
                  href="https://wa.me/966566279029"
                  target="_blank"
                  sx={{ color: "#eee" }}
                >
                  <WhatsAppIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* ===== CENTER : QUICK LINKS ===== */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                maxWidth: 260,
                mx: "auto",
                textAlign: "left"
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Quick Links
              </Typography>

              {[
                "About Us",
                "Contact",
                "Privacy Policy",
                "Shipping & Delivery",
                "Terms & Conditions"
              ].map((item) => (
                <MuiLink
                  key={item}
                  href="#"
                  underline="hover"
                  color="inherit"
                  sx={{
                    display: "block",
                    mb: 1,
                    opacity: 0.8,
                    "&:hover": { opacity: 1 }
                  }}
                >
                  {item}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* ===== RIGHT : SUPPORT ===== */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                maxWidth: 260,
                mx: "auto",
                textAlign: "left"
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Support
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">care@yourshop.sa</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">Call</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  mb: 1
                }}
                onClick={() => setShowTiming(!showTiming)}
              >
                <Typography variant="body2">Open Hours</Typography>
                {showTiming ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Box>

              <Collapse in={showTiming}>
                <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
                  Sun – Thu : 9:30 – 19:00
                </Typography>
              </Collapse>

              <Button
                variant="contained"
                color="error"
                size="small"
                href="https://www.google.com/maps"
                target="_blank"
              >
                GET DIRECTIONS
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* ===== BOTTOM ===== */}
        <Box
          sx={{
            mt: 5,
            pt: 2,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            textAlign: "center"
          }}
        >
          <Typography variant="caption" sx={{ opacity: 0.6 }}>
            © {new Date().getFullYear()} Rakan Tazweed. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
