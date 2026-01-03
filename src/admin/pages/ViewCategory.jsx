// src/admin/pages/ViewCategory.jsx
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Select,
  MenuItem,
  Chip,
  Button
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useCategory } from "../../context/CategoryContext";

export default function ViewCategory() {
  const { id } = useParams();
  const { viewCategory } = useCategory();
  const navigate = useNavigate();

  const category = viewCategory(Number(id));

  if (!category) {
    return (
      <Typography color="error" align="center" mt={4}>
        Category not found
      </Typography>
    );
  }

  return (
    <Card sx={{ maxWidth: 560, margin: "auto" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          View Category
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField label="Name" value={category.name} InputProps={{ readOnly: true }} />
          <Select value={category.type} fullWidth disabled>
            <MenuItem value="Local">Local</MenuItem>
            <MenuItem value="Original">Original</MenuItem>
          </Select>
          <TextField label="Price" value={category.price} InputProps={{ readOnly: true }} />
          <TextField label="Stock" value={category.stock} InputProps={{ readOnly: true }} />
          <Chip
            label={category.status}
            color={category.status === "Active" ? "success" : "default"}
            size="small"
          />

          <Button variant="outlined" onClick={() => navigate("/admin/categories")}>
            Back to Categories
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
