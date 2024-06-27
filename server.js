const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");


const authRoutes = require("./routes/authRoutes");
const captchaRoutes = require("./routes/captchaRoutes");
const imageUpload = require("./routes/imageUpload");
const blogRoutes = require("./routes/blogRoutes");

const listsRanking = require("./routes/listsRanking");

const db = require("./models/database");
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// we separated every route in it's file
// we use separate routes, for them
app.use("/captcha", captchaRoutes);
app.use("/auth", authRoutes); // routes, login, register.


//for images
app.use("/imageUpload", imageUpload);

// routes for editing users, ranking... 
app.use("/listsRanking", listsRanking)


// this is for blog and news, that users add to..
app.use("/blog", blogRoutes);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
