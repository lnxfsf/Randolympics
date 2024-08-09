const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");


const authRoutes = require("./routes/authRoutes");
const captchaRoutes = require("./routes/captchaRoutes");
const imageUpload = require("./routes/imageUpload");
const blogRoutes = require("./routes/blogRoutes");

const listsData = require("./routes/listsData");
const votingRoutes = require("./routes/votingRoutes");

const userRoutes = require("./routes/userRoutes")




const db = require("./models/database");
const port = process.env.PORT;
const app = express();


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



app.use(cors());




// Webhook endpoint to handle Stripe events
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  
   

  const sig = req.headers['stripe-signature'];

  let event;

  try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
      case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          console.log('PaymentIntent was successful!');
          // You can update your database, notify the user, etc.
          break;
      // Add other event types here if needed
      default:
          console.log(`Unhandled event type ${event.type}`);
  }

  res.send({ received: true });


});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// we separated every route in it's file
// we use separate routes, for them
app.use("/captcha", captchaRoutes);
app.use("/auth", authRoutes); // routes, login, register.

//for images
app.use("/imageUpload", imageUpload);

// routes for editing users, ranking... 
app.use("/listsData", listsData);
app.use("/voting", votingRoutes);


app.use("/user", userRoutes)

// this is for blog and news, that users add to..
app.use("/blog", blogRoutes);




db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
