import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Typography,
  Fab,
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
  Switch,
  CircularProgress
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { API } from "../../utils/api";

export default function AdminBestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [form, setForm] = useState({ title: "", price: "", img: "" });
  const [preview, setPreview] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info"
  });

  const showMessage = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  /* ----------------------------
     FETCH BEST SELLERS
  ----------------------------- */
  const fetchBestSellers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/products/bestsellers");
      setProducts(res.data.products || []);
    } catch (err) {
      showMessage("Failed to load best sellers", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBestSellers();
  }, [fetchBestSellers]);

  /* ----------------------------
     DELETE PRODUCT
  ----------------------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product from Best Sellers?")) return;
    try {
      await API.delete(`/products/${id}`);
      await fetchBestSellers();
      showMessage("Product deleted successfully", "success");
    } catch (err) {
      showMessage("Failed to delete product", "error");
    }
  };

  /* ----------------------------
     OPEN ADD
  ----------------------------- */
  const handleOpenAdd = () => {
    setForm({ title: "", price: "", img: "" });
    setPreview(null);
    setEditProduct(null);
    setViewMode(false);
    setOpen(true);
  };

  /* ----------------------------
     OPEN EDIT
  ----------------------------- */
  const handleOpenEdit = (product) => {
    const firstImage = Array.isArray(product.images)
      ? product.images[0]
      : product.images;

    setForm({
      title: product.name || "",
      price: product.price || "",
      img: firstImage || ""
    });
    setPreview(firstImage || "");
    setEditProduct(product);
    setViewMode(false);
    setOpen(true);
  };

  /* ----------------------------
     OPEN VIEW
  ----------------------------- */
  const handleOpenView = (product) => {
    const firstImage = Array.isArray(product.images)
      ? product.images[0]
      : product.images;

    setForm({
      title: product.name || "",
      price: product.price || "",
      img: firstImage || ""
    });
    setPreview(firstImage || "");
    setEditProduct(product);
    setViewMode(true);
    setOpen(true);
  };

  /* ----------------------------
     SAVE / UPDATE PRODUCT
  ----------------------------- */
  const handleSubmit = async () => {
    if (!form.title || !form.price || !preview) {
      showMessage("Please fill all required fields", "warning");
      return;
    }

    try {
      // Step 1: upload image
      const imageRes = await API.post(`/products/${editProduct?._id || "temp"}/images`, {
        image: preview
      });
      const imageUrl = imageRes.data?.product?.images?.[0];
      if (!imageUrl) throw new Error("Image upload failed");

      // Step 2: save product
      const payload = {
        name: form.title.trim(),
        price: parseFloat(form.price),
        images: [imageUrl],
        bestSeller: true
      };

      if (editProduct) {
        await API.put(`/products/${editProduct._id}`, payload);
      } else {
        await API.post("/products", payload);
      }

      await fetchBestSellers();
      showMessage("Saved successfully", "success");
      setOpen(false);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to save product";
      showMessage(msg, "error");
    }
  };

  /* ----------------------------
     TOGGLE BEST SELLER
  ----------------------------- */
  const toggleBestSeller = async (product) => {
    try {
      await API.put(`/products/${product._id}`, {
        bestSeller: !product.bestSeller
      });
      await fetchBestSellers();
      showMessage("Best Seller status updated", "success");
    } catch (err) {
      showMessage("Failed to toggle best seller", "error");
    }
  };

  /* ----------------------------
     IMAGE UPLOAD
  ----------------------------- */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>
          Manage Best Sellers
        </Typography>
        <Fab color="primary" onClick={handleOpenAdd}>
          <AddIcon />
        </Fab>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Image</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Price</b></TableCell>
              <TableCell><b>Best Seller</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => {
              const img = Array.isArray(p.images) ? p.images[0] : p.images;
              return (
                <TableRow key={p._id}>
                  <TableCell>
                    <Box component="img" src={img} sx={{ width: 60 }} />
                  </TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.price}</TableCell>
                  <TableCell>
                    <Switch
                      checked={Boolean(p.bestSeller)}
                      onChange={() => toggleBestSeller(p)}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenView(p)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleOpenEdit(p)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(p._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {viewMode ? "View Product" : editProduct ? "Edit Product" : "Add Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={form.title}
            disabled={viewMode}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="normal"
            value={form.price}
            disabled={viewMode}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          {!viewMode && (
            <>
              <Button component="label" variant="outlined" sx={{ mt: 2 }}>
                Upload Image
                <input hidden type="file" accept="image/*" onChange={handleImageUpload} />
              </Button>
              {preview && (
                <Box component="img" src={preview} sx={{ width: 120, mt: 2 }} />
              )}
            </>
          )}

           

          {!viewMode && (
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button variant="contained" onClick={handleSubmit}>
                {editProduct ? "Update" : "Save"}
              </Button>
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}
