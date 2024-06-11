const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./data/database");

const authRoutes = require("./routes/authRoutes");
const captchaRoutes = require("./routes/captchaRoutes");

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// we separated every route in it's file
// we use separate routes, for them
app.use("/captcha", captchaRoutes);
app.use("/auth", authRoutes); // routes, login, register.

connectDB();

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
