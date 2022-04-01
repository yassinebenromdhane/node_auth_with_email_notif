const express = require("express");
require('dotenv').config() 
const cors = require("cors");
const app = express();

const connectDB = require('./config/connectDB');


//DB Connexion
connectDB();
//create new route
// middleware routing body parser 
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.use("/api/user",require("./routes/user.router"));
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});