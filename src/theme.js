import { createTheme } from "@mui/material/styles";

export const makeAppTheme = (direction = "ltr") =>
  createTheme({
    direction,
    palette: {
      primary: { main: "#e00000" }, // bold red for CTAs
      secondary: { main: "#006400" }, // deep green
      background: { default: "#f5f0e6" }, // desert beige
      accent: { main: "#d4af37" }, // gold accent
      text: {
        primary: "#111",
        secondary: "#333"
      }
    },
    typography: {
      fontFamily:
        direction === "rtl"
          ? "Tajawal, Cairo, Arial, sans-serif"
          : "Inter, Arial, sans-serif",
      h1: { fontWeight: 700 },
      h2: { fontWeight: 600 },
      body1: { fontSize: "1rem" },
      body2: { fontSize: "0.9rem", color: "#555" }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "#f5f0e6", // desert beige
            direction, // apply RTL/LTR globally
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500
          }
        }
      }
    }
  });
