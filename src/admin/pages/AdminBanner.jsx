import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  Fab,
  Tooltip
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { API } from "../../utils/api";

export default function AdminBanner() {
  const [banners, setBanners] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editBanner, setEditBanner] = useState(null);
  const [form, setForm] = useState({ imageUrl: "" });
  const [preview, setPreview] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const showMessage = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const fetchBanners = async () => {
    try {
      const res = await API.get("/banner");
      setBanners(res.data.banners || []);
    } catch (err) {
      console.error("Failed to load banners:", err);
      showMessage("Failed to load banners", "error");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleOpenAdd = () => {
    setForm({ imageUrl: "" });
    setPreview(null);
    setEditBanner(null);
    setViewMode(false);
    setOpen(true);
  };

  const handleOpenEdit = (banner) => {
    setForm({ imageUrl: banner.imageUrl });
    setPreview(banner.imageUrl);
    setEditBanner(banner);
    setViewMode(false);
    setOpen(true);
  };

  const handleOpenView = (banner) => {
    setForm({ imageUrl: banner.imageUrl });
    setPreview(banner.imageUrl);
    setEditBanner(banner);
    setViewMode(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this banner image?")) return;
    try {
      await API.delete(`/banner/${id}`);
      setBanners((prev) => prev.filter((b) => b._id !== id));
      showMessage("Banner deleted", "success");
    } catch (err) {
      console.error("Delete failed:", err);
      showMessage("Failed to delete banner", "error");
    }
  };

  const handleSubmit = async () => {
    if (!preview) {
      showMessage("Please provide an image", "warning");
      return;
    }

    const payload = { imageUrl: preview };

    try {
      let res;
      if (editBanner) {
        res = await API.put(`/banner/${editBanner._id}`, payload);
        setBanners((prev) =>
          prev.map((b) => (b._id === editBanner._id ? res.data.banner : b))
        );
      } else {
        res = await API.post("/banner", payload);
        setBanners((prev) => [...prev, res.data.banner]);
      }
      showMessage("Saved successfully", "success");
      setOpen(false);
    } catch (err) {
      console.error("Submit failed:", err);
      showMessage("Failed to save banner", "error");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>
          Manage Banner Images
        </Typography>
        <Fab color="primary" size="medium" onClick={handleOpenAdd}>
          <AddIcon />
        </Fab>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Preview</b></TableCell>
            <TableCell><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {banners.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2}>No banners found.</TableCell>
            </TableRow>
          ) : (
            banners.map((b) => (
              <TableRow key={b._id}>
                <TableCell>
                  <Box
                    component="img"
                    src={b.imageUrl}
                    alt="Banner"
                    sx={{ width: "100%", maxWidth: 300, height: "auto", objectFit: "cover", borderRadius: 1 }}
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="View">
                    <IconButton onClick={() => handleOpenView(b)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleOpenEdit(b)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => handleDelete(b._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {viewMode ? "View Banner" : editBanner ? "Edit Banner" : "Add Banner"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Image URL"
              fullWidth
              value={form.imageUrl}
              onChange={(e) => {
                setForm({ imageUrl: e.target.value });
                setPreview(e.target.value);
              }}
              disabled={viewMode}
            />

            {!viewMode && (
              <Button variant="outlined" component="label">
                Browse Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreview(reader.result);
                        setForm({ imageUrl: reader.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Button>
            )}

            {preview && (
              <Box
                component="img"
                src={preview}
                alt="Preview"
                sx={{
                  width: "100%",
                  maxWidth: 400,
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: 1,
                  border: "1px solid #eee"
                }}
              />
            )}

            {!viewMode && (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="contained" onClick={handleSubmit}>
                  {editBanner ? "Update" : "Save"}
                </Button>
                <Button variant="outlined" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
