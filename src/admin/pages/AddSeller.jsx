import { useState } from "react";
import { Card, CardContent, Typography, TextField, Box, Button } from "@mui/material";
import { useSeller } from "../../context/SellerContext";
import { useNavigate } from "react-router-dom";

export default function AddSeller() {
  const { addSeller } = useSeller();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", contact: "" });

  const submit = () => {
    addSeller({ ...form, createdAt: new Date().toISOString() });
    navigate("/admin");
  };

  return (
    <Card sx={{ maxWidth: 560, margin: "auto" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Add Seller</Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Enter your details below to continue
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <TextField label="Contact Number" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={() => navigate("/admin/sellers")}>Cancel</Button>
            <Button variant="contained" onClick={submit}>Add Seller</Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
