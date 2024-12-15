

const https = require("https");
const fs = require("fs");


 require('log-timestamp')(function () {
  // Create a timestamp formatted for Europe/Belgrade
  const options = {
    timeZone: 'Europe/Belgrade',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', options);
  return `[${dateTimeFormatter.format(new Date())}]`;
}); 





const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
var cookieParser = require('cookie-parser')


const authRoutes = require("./routes/authRoutes");
const captchaRoutes = require("./routes/captchaRoutes");
const imageUpload = require("./routes/imageUpload");
const blogRoutes = require("./routes/blogRoutes");
const listsData = require("./routes/listsData");
const votingRoutes = require("./routes/votingRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const webhookRoute = require("./routes/webhookRoutes")

const db = require("./models/database");
const port = process.env.PORT;
const app = express();

const Campaign = db.campaign;
const User = db.users;
const Statscampaign = db.statscampaign;
const Couponcodes = db.couponcode;


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



var isProduction = process.env.PRODUCTION;



if(isProduction === "true"){

  var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/randolympics.games/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/randolympics.games/fullchain.pem'),
  };


}





app.use(cors({
  origin: process.env.BASE_URL, // Your frontend URL
  credentials: true, // Allows cookies to be sent
}));


app.use('/webhook', webhookRoute);






app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser())


// we separated every route in it's file
// we use separate routes, for them
app.use("/captcha", captchaRoutes);
app.use("/auth", authRoutes); // routes, login, register.

//for images
app.use("/imageUpload", imageUpload);

// routes for editing users, ranking... 
app.use("/listsData", listsData);
app.use("/voting", votingRoutes);


app.use("/user", userRoutes);

// this is for blog and news, that users add to..
app.use("/blog", blogRoutes);


app.use("/payment", paymentRoutes);


db.sequelize.authenticate().then(() => {
 
 
  if(isProduction  === "true"){
    https.createServer(options, app)
        .listen(port, function () {
            console.log(`HTTPS Server running on port: ${port}`);
        });
  } else {
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  }
 



});
