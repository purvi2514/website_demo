import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { formatSAR } from "../utils/currency";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, subtotal } = useCart();
  const { t, lang } = useLanguage();

  return (
    <>
      <Header />

      {/* MAIN WRAPPER */}
      <Container maxWidth="xl" sx={{ mt: 12, mb: 6 }}>
        <Box maxWidth="1200px" mx="auto">
          <Typography variant="h5" fontWeight={800} mb={3}>
            {t("cart.title")} ({cart.length})
          </Typography>

          {cart.length === 0 ? (
            <Box textAlign="center" py={8}>
              <Typography>{t("cart.empty")}</Typography>
              <Button
                component={Link}
                to="/products"
                variant="contained"
                sx={{ mt: 2 }}
              >
                {t("cart.shopProducts")}
              </Button>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {/* LEFT – CART ITEMS */}
              <Grid item xs={12} md={8}>
                {cart.map((item) => (
                  <Paper
                    key={item.id}
                    sx={{
                      p: 2,
                      mb: 2,
                      width: "100%",
                      borderRadius: 1,
                      boxShadow: "none",
                      borderBottom: "1px solid #e5e5e5",
                    }}
                  >
                    <Grid
                      container
                      alignItems="center"
                      spacing={2}
                      wrap="nowrap"
                    >
                      {/* IMAGE */}
                      <Grid item>
                        <Box
                          component="img"
                          src={item.img}
                          alt={item.title}
                          sx={{
                            width: 90,
                            height: 90,
                            objectFit: "contain",
                          }}
                        />
                      </Grid>

                      {/* PRODUCT NAME */}
                      <Grid item xs>
                        <Typography fontWeight={700} noWrap>
                          {t(`products.${item.id}`, {
                            defaultValue: item.title,
                          })}
                        </Typography>
                      </Grid>

                      {/* QTY */}
                      <Grid item>
                        <Typography color="text.secondary">
                          Qty: {item.qty}
                        </Typography>
                      </Grid>

                      {/* PRICE EACH */}
                      <Grid item>
                        <Typography color="text.secondary">
                          {formatSAR(item.price, lang)}
                        </Typography>
                      </Grid>

                      {/* TOTAL */}
                      <Grid item>
                        <Typography fontWeight={700}>
                          {formatSAR(item.price * item.qty, lang)}
                        </Typography>
                      </Grid>

                      {/* ACTIONS */}
                      <Grid item>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => removeFromCart(item.id)}
                          sx={{ textTransform: "uppercase", mr: 1 }}
                        >
                          Remove
                        </Button>

                        <Button
                          variant="outlined"
                          size="small"
                          disabled
                          sx={{ textTransform: "uppercase" }}
                        >
                          Edit
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}

                <Button
                  variant="text"
                  color="error"
                  onClick={clearCart}
                  size="small"
                >
                  {t("cart.clearCart")}
                </Button>
              </Grid>

              {/* RIGHT – SUMMARY */}
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Paper
                  sx={{
                    p: 3,
                    width: "100%",
                    maxWidth: 380,
                    borderRadius: 1,
                    boxShadow: "none",
                    border: "1px solid #e5e5e5",
                    position: "sticky",
                    top: 96,
                  }}
                >
                  <Typography variant="h6" fontWeight={700}>
                    {t("cart.cartTotals")}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>{t("cart.subtotal")}</Typography>
                    <Typography fontWeight={600}>
                      {formatSAR(subtotal, lang)}
                    </Typography>
                  </Box>

                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>{t("cart.shipping")}</Typography>
                    <Typography color="text.secondary">
                      {t("cart.shippingCalc")}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box display="flex" justifyContent="space-between">
                    <Typography fontWeight={700}>{t("cart.total")}</Typography>
                    <Typography fontWeight={700}>
                      {formatSAR(subtotal, lang)}
                    </Typography>
                  </Box>

                  <Button
                    component={Link}
                    to="/checkout"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3, py: 1.2, textTransform: "uppercase" }}
                  >
                    {t("cart.checkout")}
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
}
