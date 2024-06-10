
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./data/database");
const authRoutes = require("./routes/authRoutes");

const port = process.env.PORT;



const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", authRoutes);  // routes, login, register. 

connectDB();


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });





