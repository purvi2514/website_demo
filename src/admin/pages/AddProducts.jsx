import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { useStore } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const { addProduct } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    type: "Local",
    bestSeller: false,
    topCategory: false
  });

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    addProduct(form);
    navigate("/admin/products");
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Add Product
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Enter product details below to continue
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Product Name"
            variant="outlined"
            value={form.name}
            onChange={handleChange("name")}
            fullWidth
          />
          <TextField
            label="Price"
            variant="outlined"
            value={form.price}
            onChange={handleChange("price")}
            fullWidth
          />
          <TextField
            label="Stock"
            variant="outlined"
            value={form.stock}
            onChange={handleChange("stock")}
            fullWidth
          />
          <Select
            value={form.type}
            onChange={handleChange("type")}
            fullWidth
          >
            <MenuItem value="Local">Local</MenuItem>
            <MenuItem value="Original">Original</MenuItem>
          </Select>

          <FormControlLabel
            control={
              <Checkbox
                checked={form.bestSeller}
                onChange={handleChange("bestSeller")}
              />
            }
            label="Best Seller"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.topCategory}
                onChange={handleChange("topCategory")}
              />
            }
            label="Top Category"
          />

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={() => navigate("/admin/products")}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Add Product
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
