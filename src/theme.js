import { createTheme } from "@mui/material/styles";

export const makeAppTheme = (direction = "ltr") =>
  createTheme({
    direction,
    palette: {
      primary: { main: "#e00000" },
      secondary: { main: "#111" }
    },
    typography: {
      fontFamily: direction === "rtl" ? "Tajawal, Arial, sans-serif" : "Inter, Arial, sans-serif"
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { backgroundColor: "#fff" }
        }
      }
    }
  });
