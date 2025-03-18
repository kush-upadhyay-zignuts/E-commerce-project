import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleQuantityChange = (id, amount) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 2 }}>
      <div style={{ display: "flex" }}>
        <Typography variant="h4" gutterBottom>
          🛒 Your Cart
        </Typography>
        <Button
          sx={{ ml: "18rem", height: "3rem" }}
          variant="contained"
          size=""
          href="/home"
          color="success"
        >
          Home
        </Button>
      </div>

      {cart.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        cart.map((item) => (
          <Card key={item.id} sx={{ mb: 2 }}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2">${item.price} each</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleQuantityChange(item.id, -1)}
                >
                  -
                </Button>
                <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleQuantityChange(item.id, 1)}
                >
                  +
                </Button>
                <IconButton
                  onClick={() => handleRemoveItem(item.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
      {cart.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5">Total: ${totalPrice.toFixed(2)}</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} fullWidth>
            Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
