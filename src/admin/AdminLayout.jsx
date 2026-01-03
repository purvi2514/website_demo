import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f7f7f8">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box flex={1} display="flex" flexDirection="column">
        <AdminHeader onMenu={() => setSidebarOpen(true)} />
        <Box p={{ xs: 2, md: 3 }} flex={1}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
