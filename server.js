const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");


//! on ovde poveze znaci..
//const connectDB = require("./data/database");

/* const path = require('path');
const multer = require('multer'); */
const { upload, getFilename } = require("./routes/profilePicture");

const authRoutes = require("./routes/authRoutes");
const captchaRoutes = require("./routes/captchaRoutes");
const multerConfig = require("./routes/profilePicture");

const db = require("./models/index");


const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// we separated every route in it's file
// we use separate routes, for them
app.use("/captcha", captchaRoutes);


app.use("/auth", authRoutes); // routes, login, register.


app.use("/profile_photo", multerConfig);

//! on ovde poveze znaci..
//connectDB();


// ! ovako treba, da on zna da ima konekciju prvo sa database...
db.sequelize.sync().then(() => {

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });

});