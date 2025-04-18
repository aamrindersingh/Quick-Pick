const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartControllers");

// Get all cart items
router.get("/", cartController.getCartItems);

// Add item to cart
router.post("/", cartController.addToCart);

// Update cart item quantity
router.put("/:id", cartController.updateCartItem);

// Remove item from cart
router.delete("/:id", cartController.removeFromCart);

// Clear cart
router.delete("/", cartController.clearCart);

module.exports = router; 