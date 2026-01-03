// src/admin/pages/Sellers.jsx
import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
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
  Pagination,
  Snackbar,
  Alert
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSeller } from "../../context/SellerContext";
import { useNavigate } from "react-router-dom";

export default function Sellers() {
  const { sellers, deleteSeller } = useSeller();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, target: null });
  const [toastOpen, setToastOpen] = useState(false);

  // Filtered sellers
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return sellers.filter((s) => {
      const matchesTerm =
        !term ||
        s.name?.toLowerCase().includes(term) ||
        s.email?.toLowerCase().includes(term);
      const matchesStatus =
        statusFilter === "All" ? true : s.status === statusFilter;
      return matchesTerm && matchesStatus;
    });
  }, [sellers, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleApplyFilters = () => {
    setPage(1); // ✅ warning solved
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPerPage(5);
    setPage(1);
  };

  const openDelete = (seller) => setDeleteDialog({ open: true, target: seller });
  const closeDelete = () => setDeleteDialog({ open: false, target: null });
  const confirmDelete = () => {
    if (deleteDialog.target) {
      deleteSeller(deleteDialog.target.id);
      setToastOpen(true); // ✅ snackbar toast
    }
    closeDelete();
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Sellers</Typography>
          <Box display="flex" gap={1}>
            <Button variant="contained" onClick={() => navigate("/admin/sellers/add")}>
              + Add Seller
            </Button>
            <Button variant="outlined" onClick={() => navigate("/admin")}>
              View Dashboard
            </Button>
          </Box>
        </Box>

        {/* Filters */}
        <Box display="flex" gap={2} mb={2} flexWrap="wrap">
          <TextField
            placeholder="Search by name, email..."
            value={search}
            onChange={handleSearchChange}
            size="small"
          />
          <Select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))} size="small">
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} size="small">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
          <Button onClick={handleApplyFilters} variant="contained" size="small">
            Apply
          </Button>
          <Button onClick={handleResetFilters} variant="outlined" size="small">
            Reset
          </Button>
        </Box>

        {/* Table */}
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>
                  <Chip
                    label={s.status}
                    color={s.status === "Active" ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    aria-label="edit"
                    onClick={() => navigate(`/admin/sellers/edit/${s.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    aria-label="delete"
                    color="error"
                    onClick={() => openDelete(s)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography color="text.secondary">No sellers found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, p) => setPage(p)}
            color="primary"
            size="small"
          />
        </Box>
      </CardContent>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialog.open} onClose={closeDelete}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>
            Delete seller '{deleteDialog.target?.name}'?
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
          Seller deleted successfully
        </Alert>
      </Snackbar>
    </Card>
  );
}
