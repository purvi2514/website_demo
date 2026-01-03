import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Modal,
  CircularProgress,
  Paper,
  Divider
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { API } from "../../utils/api";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Category form state
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [img, setImg] = useState("");
  const [editingId, setEditingId] = useState(null);

  // SubProduct modal state
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subName, setSubName] = useState("");
  const [subPrice, setSubPrice] = useState(0);
  const [subType, setSubType] = useState("Local");
  const [subImg, setSubImg] = useState("");
  const [editingSubId, setEditingSubId] = useState(null);

  // Ensure only logged-in users access
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }
    loadCategories();
  }, []);
 


  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await API.get("/topcategories");
      setCategories(res.data || []);
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setter(reader.result);
    reader.readAsDataURL(file);
  };

  const resetCategoryForm = () => {
    setName("");
    setCount(0);
    setImg("");
    setEditingId(null);
  };

  const handleSaveCategory = async () => {
    try {
      const payload = { name, count, img };
      if (editingId) {
        await API.put(`/topcategories/${editingId}`, payload);
      } else {
        await API.post("/topcategories", payload);
      }
      resetCategoryForm();
      await loadCategories();
    } catch (err) {
      console.error("Failed to save category:", err);
      alert("Failed to save category. Please ensure you are logged in and your token is valid.");
    }
  };

  const handleEditCategory = (cat) => {
    setName(cat.name || "");
    setCount(Number(cat.count) || 0);
    setImg(cat.img || "");
    setEditingId(cat._id);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await API.delete(`/topcategories/${id}`);
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Failed to delete category:", err);
      alert("Failed to delete category.");
    }
  };

  const openSubModal = (cat) => {
    setSelectedCategory(cat);
    setEditingSubId(null);
    setSubName("");
    setSubPrice(0);
    setSubType("Local");
    setSubImg("");
  };

  const closeSubModal = () => {
    setSelectedCategory(null);
    setEditingSubId(null);
    setSubName("");
    setSubPrice(0);
    setSubType("Local");
    setSubImg("");
  };

  const handleSaveSubProduct = async () => {
    try {
      const payload = { name: subName, price: subPrice, type: subType, image: subImg };
      if (editingSubId) {
        await API.put(`/topcategories/${selectedCategory._id}/subproducts/${editingSubId}`, payload);
      } else {
        await API.post(`/topcategories/${selectedCategory._id}/subproducts`, payload);
      }
      await loadCategories();
      // Refresh selectedCategory from latest list so modal shows updated data
      const updated = categories.find((c) => c._id === selectedCategory._id);
      openSubModal(updated || selectedCategory);
    } catch (err) {
      console.error("Failed to save subproduct:", err);
      alert("Failed to save subproduct. Please ensure you are logged in and your token is valid.");
    }
  };

  const handleEditSubProduct = (sp) => {
    setEditingSubId(sp._id);
    setSubName(sp.name || "");
    setSubPrice(Number(sp.price) || 0);
    setSubType(sp.type || "Local");
    setSubImg(sp.image || "");
  };

  const handleDeleteSubProduct = async (subId) => {
    try {
      await API.delete(`/topcategories/${selectedCategory._id}/subproducts/${subId}`);
      await loadCategories();
      const updated = categories.find((c) => c._id === selectedCategory._id);
      openSubModal(updated || selectedCategory);
    } catch (err) {
      console.error("Failed to delete subproduct:", err);
      alert("Failed to delete subproduct.");
    }
  };

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Manage Categories
      </Typography>

      {/* Category Form */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          {editingId ? "Edit Category" : "Add Category"}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ minWidth: 240 }}
          />
          <TextField
            label="Count"
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            sx={{ width: 140 }}
          />
          <Button variant="contained" component="label" sx={{ backgroundColor: "#e00000" }}>
            Upload Image
            <input type="file" hidden onChange={(e) => handleImageUpload(e, setImg)} />
          </Button>
          {img && (
            <img
              src={img}
              alt="preview"
              style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6 }}
            />
          )}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="contained" onClick={handleSaveCategory}>
              {editingId ? "Update Category" : "Add Category"}
            </Button>
            {editingId && (
              <Button variant="outlined" color="secondary" onClick={resetCategoryForm}>
                Cancel
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Category Table */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={1} sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Image</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No categories found.
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((cat) => (
                  <TableRow key={cat._id}>
                    <TableCell>
                      <Button onClick={() => openSubModal(cat)}>{cat.name}</Button>
                    </TableCell>
                    <TableCell>
                      {cat.count === 0 ? (
                        <Typography color="error" fontWeight={600}>
                          Out of Stock
                        </Typography>
                      ) : (
                        `${cat.count} products`
                      )}
                    </TableCell>
                    <TableCell>
                      {cat.img && (
                        <img
                          src={cat.img}
                          alt={cat.name}
                          style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6 }}
                        />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => handleEditCategory(cat)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteCategory(cat._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* SubProduct Modal */}
      <Modal open={!!selectedCategory} onClose={closeSubModal}>
        <Box
          sx={{
            p: 0,
            background: "#fff",
            borderRadius: 2,
            maxWidth: 720,
            mx: "auto",
            mt: 8,
            display: "flex",
            flexDirection: "column",
            maxHeight: "80vh",           // modal height
            overflow: "hidden",          // clip outer; inner panes control scroll
            border: "1px solid #eee"
          }}
        >
          {/* Modal header */}
          <Box sx={{ p: 2, borderBottom: "1px solid #eee", display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              {selectedCategory?.name} SubProducts
            </Typography>
            <Box sx={{ ml: "auto" }}>
              <Button variant="outlined" color="secondary" onClick={closeSubModal}>
                Close
              </Button>
            </Box>
          </Box>

          {/* Modal content split: left list scroll, right form fixed */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>
            {/* List area scrollable */}
            <Box sx={{ p: 2, overflowY: "auto" }}>
              {selectedCategory?.subProducts?.length ? (
                selectedCategory.subProducts.map((sp) => (
                  <Paper key={sp._id} elevation={0} sx={{ p: 2, mb: 2, border: "1px solid #eee", borderRadius: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                      {sp.image && (
                        <img
                          src={sp.image}
                          alt={sp.name}
                          style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6 }}
                        />
                      )}
                      <Box sx={{ minWidth: 200 }}>
                        <Typography fontWeight={600}>{sp.name}</Typography>
                        <Typography variant="body2">
                          {sp.price === 0 ? "Out of Stock" : `SAR ${sp.price}`}
                        </Typography>
                        <Typography variant="body2">Type: {sp.type}</Typography>
                      </Box>
                      <Box sx={{ ml: "auto" }}>
                        <IconButton color="primary" onClick={() => handleEditSubProduct(sp)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDeleteSubProduct(sp._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Paper>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No subproducts yet.
                </Typography>
              )}
            </Box>

            <Divider />

            {/* Add/Edit form — always visible, not hidden, sticky footer */}
            <Box sx={{ p: 2, background: "#fafafa" }}>
              <Typography variant="subtitle1" fontWeight={600} mb={2}>
                {editingSubId ? "Edit SubProduct" : "Add New SubProduct"}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <TextField
                  label="Name"
                  value={subName}
                  onChange={(e) => setSubName(e.target.value)}
                  sx={{ minWidth: 220 }}
                />
                <TextField
                  label="Price"
                  type="number"
                  value={subPrice}
                  onChange={(e) => setSubPrice(Number(e.target.value))}
                  sx={{ width: 140 }}
                />
                <TextField
                  label="Type"
                  value={subType}
                  onChange={(e) => setSubType(e.target.value)}
                  sx={{ width: 160 }}
                />
                <Button variant="contained" component="label" sx={{ backgroundColor: "#e00000" }}>
                  Upload SubProduct Image
                  <input type="file" hidden onChange={(e) => handleImageUpload(e, setSubImg)} />
                </Button>
                {subImg && (
                  <img
                    src={subImg}
                    alt="sub preview"
                    style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6 }}
                  />
                )}
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button variant="contained" onClick={handleSaveSubProduct}>
                    {editingSubId ? "Update SubProduct" : "Add SubProduct"}
                  </Button>
                  {editingSubId && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setEditingSubId(null);
                        setSubName("");
                        setSubPrice(0);
                        setSubType("Local");
                        setSubImg("");
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
