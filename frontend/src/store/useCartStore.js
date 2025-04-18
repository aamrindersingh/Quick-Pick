import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useCartStore = create((set, get) => ({
  cartItems: [],
  loading: false,
  error: null,

  fetchCartItems: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/cart`);
      set({ cartItems: response.data.data, error: null });
    } catch (err) {
      console.error("Error fetching cart items:", err);
      set({ error: "Failed to fetch cart items", cartItems: [] });
    } finally {
      set({ loading: false });
    }
  },

  addToCart: async (productId, quantity = 1) => {
    set({ loading: true });
    try {
      const response = await axios.post(`${BASE_URL}/api/cart`, { productId, quantity });
      await get().fetchCartItems(); // Refresh cart items
      toast.success("Product added to cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add product to cart");
    } finally {
      set({ loading: false });
    }
  },

  updateCartItem: async (id, quantity) => {
    set({ loading: true });
    try {
      await axios.put(`${BASE_URL}/api/cart/${id}`, { quantity });
      await get().fetchCartItems(); // Refresh cart items
      toast.success("Cart updated");
    } catch (err) {
      console.error("Error updating cart item:", err);
      toast.error("Failed to update cart");
    } finally {
      set({ loading: false });
    }
  },

  removeFromCart: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/cart/${id}`);
      await get().fetchCartItems(); // Refresh cart items
      toast.success("Item removed from cart");
    } catch (err) {
      console.error("Error removing from cart:", err);
      toast.error("Failed to remove item from cart");
    } finally {
      set({ loading: false });
    }
  },

  clearCart: async () => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/cart`);
      set({ cartItems: [] });
      toast.success("Cart cleared");
    } catch (err) {
      console.error("Error clearing cart:", err);
      toast.error("Failed to clear cart");
    } finally {
      set({ loading: false });
    }
  },

  getTotalItems: () => {
    return get().cartItems.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().cartItems.reduce((total, item) => {
      return total + (item.Product.price * item.quantity);
    }, 0);
  }
})); 