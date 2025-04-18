const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const sequelize = require('./config/db');
const User = require('./models/product'); 
const app = express()
const productRoutes = require("./routes/productRoutes")

dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors());
app.use("/api/products", productRoutes);

// Optional: move or remove this catch-all route
// app.use("/",(req,res)=>{
//     res.send("hello")
// })

const PORT = process.env.PORT || 3000;

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('✅ Database synced successfully!');
  }).catch(err => {
    console.error('❌ Error syncing DB or creating user:', err);
  });

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});