// src/admin/pages/Categories.jsx
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../context/CategoryContext"; // ✅ Corrected import
import { useState } from "react";

export default function Categories() {
  const { categories, deleteCategory } = useCategory();
  const navigate = useNavigate();

  const [deleteDialog, setDeleteDialog] = useState({ open: false, target: null });
  const [toastOpen, setToastOpen] = useState(false);

  const openDelete = (category) => setDeleteDialog({ open: true, target: category });
  const closeDelete = () => setDeleteDialog({ open: false, target: null });
  const confirmDelete = () => {
    if (deleteDialog.target) {
      deleteCategory(deleteDialog.target.id);
      setToastOpen(true);
    }
    closeDelete();
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Categories</Typography>
          <Button variant="contained" onClick={() => navigate("/admin/categories/add")}>
            + Add Category
          </Button>
        </Box>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((cat) => {
              const status = cat.stock === 0 ? "Inactive" : "Active";
              return (
                <TableRow key={cat.id}>
                  <TableCell>{cat.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={status}
                      color={status === "Active" ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/admin/categories/view/${cat.id}`)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/admin/categories/edit/${cat.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => openDelete(cat)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
            {categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography color="text.secondary">No categories found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialog.open} onClose={closeDelete}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>
            Delete category '{deleteDialog.target?.name}'?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDelete} variant="contained" color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Yes, delete!
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
          Category deleted successfully
        </Alert>
      </Snackbar>
    </Card>
  );
}
