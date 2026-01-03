import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardActionArea, CardMedia, Collapse, Chip } from "@mui/material";
import { API } from "../utils/api";

export default function TopCategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/topcategories");
        console.log("Top categories:", res.data);
        setCategories(res.data || []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const toggleExpand = (id) => setExpanded(expanded === id ? null : id);

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Top Categories</Typography>
      <Grid container spacing={2}>
        {categories.filter(c => c.active).map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c._id}>
            <Card>
              <CardActionArea onClick={() => toggleExpand(c._id)}>
                {c.img && <CardMedia component="img" height="140" image={c.img} alt={c.name} />}
                <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="subtitle1">{c.name}</Typography>
                  <Chip label={`${c.count}`} size="small" />
                </Box>
              </CardActionArea>

              <Collapse in={expanded === c._id} timeout="auto" unmountOnExit>
                <Box sx={{ p: 2 }}>
                  {(!c.subProducts || c.subProducts.length === 0) ? (
                    <Typography variant="body2">No sub products</Typography>
                  ) : (
                    c.subProducts.filter(sp => sp.active).map((sp) => (
                      <Box key={sp._id} sx={{ display: "flex", alignItems: "center", gap: 2, py: 1 }}>
                        {sp.image && <Box component="img" src={sp.image} sx={{ width: 48, height: 48, objectFit: "cover", borderRadius: 1 }} />}
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2">{sp.name}</Typography>
                          <Typography variant="caption">Type: {sp.type} • Price: SAR {sp.price}</Typography>
                        </Box>
                      </Box>
                    ))
                  )}
                </Box>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
