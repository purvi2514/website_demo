// src/admin/pages/AddCategory.jsx
import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Button,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../context/CategoryContext";

export default function AddCategory() {
  const { addCategory } = useCategory();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    type: "Local",
    price: "",
    stock: "",
  });

  const [toastOpen, setToastOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.price.trim()) {
      alert("Name and Price are required");
      return;
    }

    setLoading(true);
    const stockNum = Number(form.stock) || 0;

    try {
      await addCategory({
        name: form.name.trim(),
        type: form.type,
        price: Number(form.price),
        stock: stockNum,
      });
      setToastOpen(true);
      setTimeout(() => navigate("/admin/categories"), 1500);
    } catch (err) {
      console.error("Failed to add category:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 560, margin: "auto" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Add Category
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Enter category details below
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Name"
            value={form.name}
            onChange={handleChange("name")}
            required
          />

          <Select value={form.type} onChange={handleChange("type")} fullWidth>
            <MenuItem value="Local">Local</MenuItem>
            <MenuItem value="Original">Original</MenuItem>
          </Select>

          <TextField
            label="Price"
            type="number"
            value={form.price}
            onChange={handleChange("price")}
            required
          />

          <TextField
            label="Stock"
            type="number"
            value={form.stock}
            onChange={handleChange("stock")}
          />

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="outlined"
              onClick={() => navigate("/admin/categories")}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Category"}
            </Button>
          </Box>
        </Box>
      </CardContent>

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" onClose={() => setToastOpen(false)}>
          Category added successfully
        </Alert>
      </Snackbar>
    </Card>
  );
}
