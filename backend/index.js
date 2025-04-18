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

dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // if you're using cookies or HTTP authentication
}));

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Optional: move or remove this catch-all route
// app.use("/",(req,res)=>{
//     res.send("hello")
// })

const PORT = process.env.PORT || 3000;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('✅ Database synced successfully!');
  }).catch(err => {
    console.error('❌ Error syncing DB or creating user:', err);
  });

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});