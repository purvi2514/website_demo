import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box
} from "@mui/material";
import { useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Jay",
      email: "jay.tyagi@ascuretech.com",
      contact: "7777777777",
      lastLogin: "29/10/2025, 10:34:58",
      createdBy: "Super Admin",
      role: "Admin",
      status: "Active",
      isActive: false
    },
    {
      id: 2,
      name: "Super Admin",
      email: "safal.goyal@ascuretech.com",
      contact: "9999999999",
      lastLogin: "19/12/2025, 18:18:04",
      createdBy: "system",
      role: "Admin",
      status: "Active",
      isActive: true
    }
  ]);

  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleAdd = () => {
    setEditUser({ id: Date.now(), name: "", email: "", contact: "", role: "Admin", status: "Active", isActive: true });
    setOpen(true);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setOpen(true);
  };

  const handleSave = () => {
    setUsers((prev) => {
      const exists = prev.some((u) => u.id === editUser.id);
      if (exists) return prev.map((u) => (u.id === editUser.id ? editUser : u));
      return [editUser, ...prev];
    });
    setOpen(false);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Users</Typography>
            <Button variant="contained" onClick={handleAdd}>+ Add User</Button>
          </Box>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Last Login</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Is Active</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.contact}</TableCell>
                  <TableCell>{u.lastLogin}</TableCell>
                  <TableCell>{u.createdBy}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell><Chip label={u.status} color="success" size="small" /></TableCell>
                  <TableCell>{u.isActive ? "Active" : "Inactive"}</TableCell>
                  <TableCell align="right">
                    <Button size="small" onClick={() => handleEdit(u)}>Edit</Button>
                    <Button size="small" color="error" onClick={() => setUsers((prev) => prev.filter((x) => x.id !== u.id))}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editUser?.name ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField label="Name" value={editUser?.name || ""} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
            <TextField label="Email" value={editUser?.email || ""} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
            <TextField label="Contact" value={editUser?.contact || ""} onChange={(e) => setEditUser({ ...editUser, contact: e.target.value })} />
            <TextField label="Role" value={editUser?.role || ""} onChange={(e) => setEditUser({ ...editUser, role: e.target.value })} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
