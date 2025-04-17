const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const sequelize = require('./config/db');
const User = require('./models/user'); 

dotenv.config();

const app = express()
const PORT = process.env.PORT

app.use("/",(req,res)=>{

    res.send("hello")

})



sequelize
  .sync({ force: true })
  .then(() => {
    console.log('✅ Database synced using Promises');

    return User.create({ username: 'promise_user' });
  })
  .then(user => {
    console.log('👤 User created:', user.toJSON());
  })
  .catch(err => {
    console.error('❌ Error syncing DB or creating user:', err);
  });


app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });