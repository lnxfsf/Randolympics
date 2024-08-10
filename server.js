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

const Campaign = db.campaign;
const User = db.users;
const Statscampaign = db.statscampaign;



const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



app.use(cors());




// Webhook endpoint to handle Stripe events
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  
  async function updatePaymentStatus(paymentIntentId, status, amount) {
    // Replace this with your actual database update logic
    // Example: await db.query('UPDATE payments SET status = ? WHERE payment_intent_id = ?', [status, paymentIntentId]);
    // TODO, so also update amount how much was updated. eh, this is what I wanted. no FE work for this. secure 100%



    // make campaign as confirmed (so we keep it) // ! , e ako je ostavio za kasnije, vidis, isto mora da potvrdi ga 
    // on uvek dobija "campaignId" btw. tako da... prvo ides taj donacije 3 lice ! pa onda ovo .. 
    const oneCampaign = await Campaign.findOne({
      where: { payment_id: paymentIntentId },
    });

    // znaci ako je prazan, onda pogledaj u toj drugoj tabeli, (da li ima paymentId !! )
    // oneCampaignThirdParty, znaci neko drugo, osim originalni koji je napravio campaign.
    if(!oneCampaign){

      // znaci da nadje, onaj, koji ima Stats sa tom paymentId, (koji je sada uplatio neko vec..)
      const oneCampaignThirdParty = await Statscampaign.findOne({
        where: { payment_id: paymentIntentId },
      });



      console.log("paymentIntentId je: "+paymentIntentId)
      console.log("--------------oneCampaignThirdParty je--------------")
      console.log(oneCampaignThirdParty)

      // i treba amount da upise za tog supportera, i onda znamo kolko je taj supporter uplatio tacno.. 

      try {
        await oneCampaignThirdParty.update({ payment_status: status, amount: amount }); // azurira status paymenta, za tog supportera (eto, treba da ima okej..)
      } catch (error) {
        console.log(error.stack);
      }





      
    // we update value in that athlete (it's campaign for one athlete..)
    //  ovde pravi error ti, za konfirmaciju sada ! ,  


    // i naravno, treba da uveca amount u taj Athlete (e sad, nebitno je odakle uzima, ali dobije email, sto treba ionako.. )
    // ! da, za ovaj, trebace preko Id, da nadje email od tog athlete-a ? (jer ima samo "athleteId")
    // ! on ce ici ovako (prvo ce proveriti da li je oneCampaign, prazan ? (il da koristis tu nekako ) )

    // ! aha, da ipak ovde mozes direktno preko "athleteId" , da nadjes athlete koji je
  
    const oneAthlete = await User.findOne({
      where: { userId: oneCampaignThirdParty.athleteId },
    }); 


 
    console.log(" on moze naci oneAthlete")
   // console.log(oneAthlete)

    // now you increase how much got donated (yes, in cents keep it so we get 2 decimal values there )
    try {
     // await oneAthlete.update({ donatedAmount: amount}); // azurira samo taj
      await oneAthlete.increment('donatedAmount', { by: amount });  // add (+) za toliko amount za taj athlete

    } catch (error) {
      console.log(error.stack);
    }




    // e i za tu campaign, ako je prvi supporter koji to bio napravio, nije uplatio, neko drugi moze da uplati i onda ce nastaviti da bude aktivan ovaj !

    
    
      const oneCampaign = await Campaign.findOne({
        where: { campaignId: oneCampaignThirdParty.campaignId },
      });

       // ne mozes ovo da diras ako je oneCampaign prazan. ne mozes ovako pristupit (al pristupice i dalje, onaj normalan.. )
       try {
        await oneCampaign.update({ payment_status: status}); // azurira samo taj
      } catch (error) {
        console.log(error.stack);
      }












    } else {

      
      // ne mozes ovo da diras ako je oneCampaign prazan. ne mozes ovako pristupit (al pristupice i dalje, onaj normalan.. )
        try {
          await oneCampaign.update({ payment_status: status}); // azurira samo taj
        } catch (error) {
          console.log(error.stack);
        }


        
    // we update value in that athlete (it's campaign for one athlete..)
    //  ovde pravi error ti, za konfirmaciju sada ! ,  


    // i naravno, treba da uveca amount u taj Athlete (e sad, nebitno je odakle uzima, ali dobije email, sto treba ionako.. )
    // da, za ovaj, trebace preko Id, da nadje email od tog athlete-a ? (jer ima samo "athleteId")
    // on ce ici ovako (prvo ce proveriti da li je oneCampaign, prazan ? (il da koristis tu nekako ) )
    const oneAthlete = await User.findOne({
      where: { email: oneCampaign.friendEmail },
    });


 
    console.log(" on moze naci oneAthlete")
    console.log(oneAthlete)

    // now you increase how much got donated (yes, in cents keep it so we get 2 decimal values there )
    try {
     // await oneAthlete.update({ donatedAmount: amount}); // azurira samo taj
      await oneAthlete.increment('donatedAmount', { by: amount });  // add (+) za toliko amount za taj athlete

    } catch (error) {
      console.log(error.stack);
    }



    }












  }


  const sig = req.headers['stripe-signature'];

  let event;

  try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
      console.log(`  Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  


  // Handle the event
  switch (event.type) {
      case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          console.log('PaymentIntent was successful!');

          console.log(paymentIntent.id) // evo, on ga pogadja i nalazi u database koji ima za campaign... 

          await updatePaymentStatus(paymentIntent.id, 'succeeded', paymentIntent.amount);
         
          console.log(event.data.object)  // drzi ga u centima da, nema sta da konvertujes ipak ! 
          // 10030  , je 100.30 $ ! zadnja dve cifre su broj

          // You can update your database, notify the user, etc.
           //  You can perform additional actions such as updating your database here
        //  Example: await updatePaymentStatus(paymentIntent.id, 'succeeded');
        // TOO, znaci ovde, on dobije obavestenje, ako je uplatio. (znaci, neces blokirati tog user-a da ide dalje u kreiranju toga)


            /// TDO Store the Payment Intent ID: Save the Payment Intent ID in your database when you create the payment intent. This allows you to associate it with other records.
        // ZNACI, on webhook, proveri ZA KOJI PAYMENT INTENT U BAZI JE TO ! 
        // i na njega samo obrnes isto klik "paymentConfirmed !"

        // da, ja msm, da ovde i trebalo bi to... 

        // al, kad ide na proceed, on kreira to te stvari kao znas. (jer payment, moze traziti da prodje neko vreme ili nesto.. )

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
