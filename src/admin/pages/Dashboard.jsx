import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Box } from "@mui/material";
import { useSeller } from "../../context/SellerContext";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const { sellers } = useSeller();
  const navigate = useNavigate();

  const totalSellers = sellers.length;
  const newSellers = sellers.filter(
    (s) => s.createdAt && (Date.now() - new Date(s.createdAt)) / 86400000 < 7
  ).length;

  return (
    <>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={4}>
          <StatCard title="Total Sellers" value={totalSellers} trend="+1500% vs last Month" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Total Offers" value={19} trend="+26.67% vs last Month" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="New Sellers" value={newSellers} trend="-100% vs last Month" />
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Recently Added Sellers</Typography>
            <Box display="flex" gap={1}>
              <Button variant="contained" onClick={() => navigate("/admin/sellers/add")}>+ Add Seller</Button>
              <Button variant="outlined" onClick={() => navigate("/admin/sellers")}>View Sellers</Button>
            </Box>
          </Box>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sellers.slice(0, 10).map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
