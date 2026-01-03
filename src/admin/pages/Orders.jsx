import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import { useStore } from "../../context/StoreContext";

export default function Orders() {
  const { orders = [] } = useStore(); // Orders not in your context; kept for compatibility

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Orders
        </Typography>

        {orders.length === 0 ? (
          <Typography color="text.secondary">No orders found</Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={order.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>₹{order.total}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
