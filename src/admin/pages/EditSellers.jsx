// src/admin/pages/EditSeller.jsx
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
import { useSeller } from "../../context/SellerContext";

export default function EditSeller() {
  const { id } = useParams();
  const { sellers, updateSeller } = useSeller();
  const navigate = useNavigate();

  const seller = sellers.find((s) => s.id === Number(id));

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    status: "Active"
  });

  const [successOpen, setSuccessOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (seller) {
      setForm({
        name: seller.name,
        email: seller.email,
        contact: seller.contact || "",
        status: seller.status
      });
    }
  }, [seller]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleUpdate = () => {
    updateSeller(seller.id, form); // ✅ seller update karega
    setSuccessOpen(true);          // ✅ success dialog
    setToastOpen(true);            // ✅ snackbar toast
  };

  return (
    <Card sx={{ maxWidth: 560, margin: "auto" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Edit Seller
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField label="Name" value={form.name} onChange={handleChange("name")} />
          <TextField label="Email" value={form.email} onChange={handleChange("email")} />
          <TextField label="Phone Number" value={form.contact} onChange={handleChange("contact")} />
          <Select value={form.status} onChange={handleChange("status")} fullWidth>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>

          <Button variant="contained" onClick={handleUpdate}>
            Update Seller
          </Button>
        </Box>
      </CardContent>

      {/* Success popup */}
      <Dialog open={successOpen} onClose={() => setSuccessOpen(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography>Seller updated successfully</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setSuccessOpen(false);
              navigate("/admin/sellers");
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
          Seller updated successfully
        </Alert>
      </Snackbar>
    </Card>
  );
}
