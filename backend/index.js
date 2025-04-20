const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const sequelize = require('./config/db');
const Product = require('./models/product');
const Cart = require('./models/cart');
const app = express()
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
// CONFIGURATION  
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// CORS


const allowedOrigins = [
  'http://localhost:5173',
  'https://superlative-zuccutto-a66642.netlify.app',
  'https://heroic-gecko-e8e4a4.netlify.app' 
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// ROUTES
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);



const PORT = process.env.PORT || 3000;
// DATABASE SYNC
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('✅ Database synced successfully!');
  }).catch(err => {
    console.error('❌ Error syncing DB or creating user:', err);
  });
// SERVER LISTEN
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});