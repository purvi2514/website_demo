import { Box, Paper } from "@mui/material";

export default function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f4f4f4",
        px: 2
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 1100,
          height: { xs: "auto", md: 560 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          borderRadius: 3,
          overflow: "hidden"
        }}
      >
        {/* LEFT IMAGE (hidden on mobile) */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "flex-end",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1400)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            p: 3,
            color: "#fff"
          }}
        >
          <Box sx={{ fontSize: 28, fontWeight: 800 }}>
            Capture the road.
          </Box>
          <Box sx={{ opacity: 0.9 }}>Create memories.</Box>
        </Box>

        {/* RIGHT FORM */}
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          {children}
        </Box>
      </Paper>
    </Box>
  );
}
