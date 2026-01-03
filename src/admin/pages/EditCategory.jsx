// src/admin/pages/EditCategory.jsx
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Button,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useCategory } from "../../context/CategoryContext";

export default function EditCategory() {
  const { id } = useParams();
  const { categories, updateCategory } = useCategory();
  const navigate = useNavigate();

  const category = categories.find((c) => c.id === Number(id));

  const [form, setForm] = useState({
    name: "",
    type: "Local",
    price: "",
    stock: ""
  });

  const [successOpen, setSuccessOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name,
        type: category.type,
        price: category.price,
        stock: category.stock
      });
    }
  }, [category]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleUpdate = () => {
    const stockNum = Number(form.stock);
    const status = stockNum === 0 ? "Inactive" : "Active";

    updateCategory(category.id, { ...form, stock: stockNum, status });
    setSuccessOpen(true);
    setToastOpen(true);
  };

  return (
    <Card sx={{ maxWidth: 560, margin: "auto" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Edit Category
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField label="Name" value={form.name} onChange={handleChange("name")} />
          <Select value={form.type} onChange={handleChange("type")} fullWidth>
            <MenuItem value="Local">Local</MenuItem>
            <MenuItem value="Original">Original</MenuItem>
          </Select>
          <TextField label="Price" type="number" value={form.price} onChange={handleChange("price")} />
          <TextField label="Stock" type="number" value={form.stock} onChange={handleChange("stock")} />

          <Button variant="contained" onClick={handleUpdate}>
            Update Category
          </Button>
        </Box>
      </CardContent>

      {/* Success popup */}
      <Dialog open={successOpen} onClose={() => setSuccessOpen(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography>Category updated successfully</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setSuccessOpen(false);
              navigate("/admin/categories");
            }}
            variant="contained"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast notification */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" onClose={() => setToastOpen(false)}>
          Category updated successfully
        </Alert>
      </Snackbar>
    </Card>
  );
}
