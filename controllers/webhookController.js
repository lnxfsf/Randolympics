const db = require("../models/database");
const Traffic = db.traffic;
const Op = db.Sequelize.Op;
const Campaign = db.campaign;
const User = db.users;
const Statscampaign = db.statscampaign;
const Couponcodes = db.couponcode;

const Sequelize = db.Sequelize;
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// ? ovo ovde je za email confirmation

const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var path = require("path");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/* const webhookController = async (req, res) =>  */

const calculateNewAmountWithDiscountCode = async (
  amountOriginal,
  couponDonationCode,
  country
) => {
  const t1 = await db.sequelize.transaction();

  // on nadje koji ima..
  const oneCoupon = await Couponcodes.findOne({
    where: { couponCode: couponDonationCode, isCouponActive: 1 },

    lock: true,
    transaction: t1,
  });

  // prvo, ako nema, razlike, ako coupon se ne matchuje, onda vracas original amount odma vec.. jer nije nasao nista u database
  if (!oneCoupon) {
    console.log("coupon code is not valid");

    await t1.rollback();

    return amountOriginal;
  }

  // da ga odma sad vratis..
  if (oneCoupon.isCouponActive === 0) {
    console.log("coupon code is not active");
    await t1.rollback();
    return amountOriginal;
  }

  // i sada, PRVO gleda jel "GLOBAL" (pa onda za national)  (znaci, mora da ima amountOriginal !)
  if (oneCoupon.country === "GLOBAL") {
    // e sada, ovde ces da definises , sta on radi ovde jos..

    //
    // proveris da li je kupon validan

    // po datumu
    const currentDate = new Date();
    const expiryDate = new Date(oneCoupon.expiryDate); //iz database, kolko moze max..

    // because this is going by %, we take in consideration, a new value, we add as well, so it don't overflow it. so someone with 100€, can't use it, because it's going to be spent completelly..
    // maybe to try with lesser amount, so they get that discout..

    // so, calculate how much % up, it goes (that's add, that much %, to payment they gave). if they paid 20€, and coupon is 20%, then we do 20€+20%=24
    // for "GLOBAL", in couponValue is stored as "0.05", so we use it as % for that. so this would be 5 , it need to be % now
    let newAmount = amountOriginal + amountOriginal * oneCoupon.couponValue; // this is new amount we get when we apply coupon

    let newSpentAmount = newAmount + oneCoupon.spentAmount; // this is if we add our new value and previous spentAmount, so we don't go over what's allowed

    /*  console.log("currentDate")
      console.log(currentDate)
  
      console.log("expiryDate")
      console.log(expiryDate)
      console.log(currentDate <= expiryDate)
  
      console.log("newSpentAmount")
      console.log(newSpentAmount)
  
      console.log("oneCoupon. maxSpentLimit")
      console.log(oneCoupon.maxSpentLimit)
      console.log(newSpentAmount < oneCoupon.maxSpentLimit)
  
      console.log("oneCoupon.couponTimesUsed")
      console.log(oneCoupon.couponTimesUsed)
  
      console.log("oneCoupon.maxCouponTimesUsed")
      console.log(oneCoupon.maxCouponTimesUsed) */
    /* 
      console.log(oneCoupon.couponTimesUsed <= oneCoupon.maxCouponTimesUsed)
   */

    if (
      currentDate <= expiryDate &&
      newSpentAmount < oneCoupon.maxSpentLimit &&
      oneCoupon.couponTimesUsed <= oneCoupon.maxCouponTimesUsed
    ) {
      // ! you need to update
      // couponTimesUsed
      // spentAmount  (dodaj taj novi sto ima, + newAmount)

      try {
        await oneCoupon.update(
          {
            couponTimesUsed: oneCoupon.couponTimesUsed + 1,
            spentAmount: newSpentAmount,
          },
          { transaction: t1 }
        ); // azurira samo taj
        await t1.commit();
      } catch (error) {
        await t1.rollback();
        console.log(error.stack);
      }

      // we then, return with discount (we calculated and got it above)
      return newAmount;
    } else {
      try {
        // then it's expired, just set it so, so we don't check it anymore..
        await oneCoupon.update({ isCouponActive: 0 }, { transaction: t1 });
        await t1.commit();
      } catch (e) {
        await t1.rollback();
        console.log(e.stack);
      }

      return amountOriginal;
    }
  } else {
    // ovo je za sve ostale drzave (da  , on pusta ovde, ali takodje, filtira po drzavi)

    // TODO drzavu, dobijes po country koji placa u sami payment ! (e, eto, jer ima on u payment, data, da izvuces, odakle , sa koje country placa, i to je taj onda.., country code.. ) (ionako karticu mora da matchuje sa drzavom)ž

    /*   2 | 32SU5DOIZT |              1 | GB      | 2024-09-09 |          10 |         10000 |               0 | 2024-08-10 22:37:41 | 2024-08-10 22:37:41
   
  
  
    --> kod national coupon, njegov couponValue je "fixed" price koliko se nadodaje na to sto on dodaje !
    --> 
  
    */

    // first, you need to match, if it's matching value that's provided (goes by country..)
    if (oneCoupon.country === country) {
      // po datumu
      const currentDate = new Date();
      const expiryDate = new Date(oneCoupon.expiryDate); //iz database, kolko moze max..

      // this is fixed amount addition ! (so not by percent), yes..
      let newAmount = amountOriginal + oneCoupon.couponValue;

      console.log("unutar drzave je");
      console.log("amountOriginal: " + amountOriginal);
      console.log("oneCoupon.couponValue: " + oneCoupon.couponValue);

      let newSpentAmount = newAmount + oneCoupon.spentAmount;

      if (
        currentDate <= expiryDate &&
        newSpentAmount < oneCoupon.maxSpentLimit &&
        oneCoupon.couponTimesUsed <= oneCoupon.maxCouponTimesUsed
      ) {
        //  you need to update
        // couponTimesUsed
        // spentAmount  (dodaj taj novi sto ima, + newAmount)

        try {
          await oneCoupon.update(
            {
              couponTimesUsed: oneCoupon.couponTimesUsed + 1,
              spentAmount: newSpentAmount,
            },
            { transaction: t1 }
          ); // azurira samo taj
          await t1.commit();
        } catch (error) {
          await t1.rollback();
          console.log(error.stack);
        }

        // we then, return with discount (we calculated and got it above)
        return newAmount;
      } else {
        await t1.rollback();
        console.log("da vraca ovde");
        return amountOriginal;
      }
    } else {
      try {
        // then it's expired, just set it so, so we don't check it anymore..
        await oneCoupon.update({ isCouponActive: 0 }, { transaction: t1 });
        await t1.commit();
      } catch (e) {
        await t1.rollback();
        console.log(e.stack);
      }

      return amountOriginal;
    }
  }
};

const webhookController = async (req, res) => {
  async function updatePaymentStatus(paymentIntentId, status, amountOriginal) {
    // Replace this with your actual database update logic
    // Example: await db.query('UPDATE payments SET status = ? WHERE payment_intent_id = ?', [status, paymentIntentId]);
    // TODO, so also update amount how much was updated. eh, this is what I wanted. no FE work for this. secure 100%

    const t2 = await db.sequelize.transaction();

    // make campaign as confirmed (so we keep it) // ! , e ako je ostavio za kasnije, vidis, isto mora da potvrdi ga
    // on uvek dobija "campaignId" btw. tako da... prvo ides taj donacije 3 lice ! pa onda ovo ..
    const oneCampaign = await Campaign.findOne({
      where: { payment_id: paymentIntentId },
      lock: true,
      transaction: t2,
    });

    // znaci ako je prazan, onda pogledaj u toj drugoj tabeli, (da li ima paymentId !! )
    // oneCampaignThirdParty, znaci neko drugo, osim originalni koji je napravio campaign.
    if (!oneCampaign) {
      // so we release lock for "Campaign", on this row, as we're gonna use another..
      console.log("THIS ROOLBACK IS NORMAL. It means, we're adding as supporter, that's not creator ! | so we release lock for 'Campaign', on this row, as we're gonna use another..")
      await t2.rollback();

      const t5 = await db.sequelize.transaction();

      // znaci da nadje, onaj, koji ima Stats sa tom paymentId, (koji je sada uplatio neko vec..)
      const oneCampaignThirdParty = await Statscampaign.findOne({
        where: { payment_id: paymentIntentId },
        lock: true,
        transaction: t5,
      });

      if(oneCampaignThirdParty){
          try {
            // ovde azurira amount, po discount code koji ima.
            if (oneCampaignThirdParty.couponDonationCode) {
              // znaci ako ima neki coupon
              var amount = await calculateNewAmountWithDiscountCode(
                amountOriginal,
                oneCampaignThirdParty.couponDonationCode,
                oneCampaignThirdParty.countryAthleteIsIn
              );
              console.log("novi amount sa discount: " + amount);
            } else {
              // ako nema nijedan discount code upisan u tabeli, nece ni proveravat nista.. ide dalje onda..
              var amount = amountOriginal;
            }
          } catch (error) {
            console.log(error.stack);
          }

          console.log("paymentIntentId je: " + paymentIntentId);
          console.log("--------------oneCampaignThirdParty je--------------");
          console.log(oneCampaignThirdParty);

          // i treba amount da upise za tog supportera, i onda znamo kolko je taj supporter uplatio tacno..

          try {
            await oneCampaignThirdParty.update(
              { payment_status: status, amount: amount },
              { transaction: t5 }
            ); // azurira status paymenta, za tog supportera (eto, treba da ima okej..)
            await t5.commit();
          } catch (error) {
            await t5.rollback();
            console.log(error.stack);
          }

          // we update value in that athlete (it's campaign for one athlete..)
          //  ovde pravi error ti, za konfirmaciju sada ! ,

          // i naravno, treba da uveca amount u taj Athlete (e sad, nebitno je odakle uzima, ali dobije email, sto treba ionako.. )
          // ! da, za ovaj, trebace preko Id, da nadje email od tog athlete-a ? (jer ima samo "athleteId")
          // ! on ce ici ovako (prvo ce proveriti da li je oneCampaign, prazan ? (il da koristis tu nekako ) )

          // ! aha, da ipak ovde mozes direktno preko "athleteId" , da nadjes athlete koji je

          const t6u = await db.sequelize.transaction();
          /*  lock: true,
          transaction: t6, */

          const oneAthleteU = await User.findOne({
            where: { userId: oneCampaignThirdParty.athleteId },
            lock: true,
            transaction: t6u,
          });

          console.log(" on moze naci oneAthlete");
          // console.log(oneAthlete)

          // now you increase how much got donated (yes, in cents keep it so we get 2 decimal values there )
          try {
            //  await oneAthleteU.update({ donatedAmount: amount}); // azurira samo taj
            await oneAthleteU.increment(
              "donatedAmount",
              { by: amount },
              { transaction: t6u }
            ); // add (+) za toliko amount za taj athlete

            console.log("da li je nasao athlete !");
            await t6u.commit();
          } catch (error) {
            await t6u.rollback();
            console.log(error.stack);
          }

          // e i za tu campaign, ako je prvi supporter koji to bio napravio, nije uplatio, neko drugi moze da uplati i onda ce nastaviti da bude aktivan ovaj !

          const t7 = await db.sequelize.transaction();

          const oneCampaign = await Campaign.findOne({
            where: { campaignId: oneCampaignThirdParty.campaignId },
            lock: true,
            transaction: t7,
          });

          // ne mozes ovo da diras ako je oneCampaign prazan. ne mozes ovako pristupit (al pristupice i dalje, onaj normalan.. )
          try {
            await oneCampaign.update(
              { payment_status: status },
              { transaction: t7 }
            ); // azurira samo taj
            await t7.commit();
          } catch (error) {
            await t7.rollback();
            console.log(error.stack);
          }

        } else {

          await t5.rollback();
          console.log("you need to release it as well, if there's not proper payment_id ! ")
          console.log("couldn't find proper payment_id, just send back to stripe as confirmed.. ");
        }


          

    } else {
      // ovde koristi t2 transaction od prvog !
      // jer nije prazan..

      // ovde azurira amount, po discount code koji ima.
      if (oneCampaign.couponDonationCode) {
        // znaci ako ima neki coupon
        var amount = await calculateNewAmountWithDiscountCode(
          amountOriginal,
          oneCampaign.couponDonationCode,
          oneCampaign.countryAthleteIsIn
        );
        console.log("novi amount sa discount oneCampaign: " + amount);
      } else {
        // ako nema nijedan discount code upisan u tabeli, nece ni proveravat nista.. ide dalje onda..
        var amount = amountOriginal;
      }

      // ne mozes ovo da diras ako je oneCampaign prazan. ne mozes ovako pristupit (al pristupice i dalje, onaj normalan.. )
      try {
        await oneCampaign.update(
          { payment_status: status },
          { transaction: t2 }
        ); // azurira samo taj
        await t2.commit();
      } catch (error) {
        await t2.rollback();
        console.log(error.stack);
      }

      // we update value in that athlete (it's campaign for one athlete..)
      //  ovde pravi error ti, za konfirmaciju sada ! ,

      // i naravno, treba da uveca amount u taj Athlete (e sad, nebitno je odakle uzima, ali dobije email, sto treba ionako.. )
      // da, za ovaj, trebace preko Id, da nadje email od tog athlete-a ? (jer ima samo "athleteId")
      // on ce ici ovako (prvo ce proveriti da li je oneCampaign, prazan ? (il da koristis tu nekako ) )

      /* lock: true,
      transaction: t3z,
      const t3z = await db.sequelize.transaction(); */

      // e, za inicijalno kreiranje, user sto daje, i ne mora lock . jer to ce uvek biti taj jedan supporter.. tkd nema potrebe. ovo gore sto imas , je okej da ima lock..

      //const tAthleteZ = await db.sequelize.transaction();

      const oneAthletez = await User.findOne({
        where: { email: oneCampaign.friendEmail },
       

      });

      console.log(" on moze naci oneAthlete");
      console.log(oneAthletez);

      console.log("uvecava tog athlete-a donation amount");
      console.log(oneAthletez);

      // now you increase how much got donated (yes, in cents keep it so we get 2 decimal values there )
      try {
        // await oneAthlete.update({ donatedAmount: amount}); // azurira samo taj
        await oneAthletez.increment("donatedAmount", { by: amount }); // add (+) za toliko amount za taj athlete

        //await tAthleteZ.commit();
        
        // await t3z.commit();
      } catch (error) {
        //  await t3z.rollback();

       // await tAthleteZ.rollback();
        console.log(error.stack);
      }

      // okej, dodatj tog supportera, u toj tabeli statscampaign (da bi lakse fetchovao  racunao, da ne pravim duple  itd..)

      if (oneCampaign.supporterEmail) {
        const oneSupporter = await User.findOne({
          where: { email: oneCampaign.supporterEmail },
        });

        var supporterUserId = oneSupporter.userId;
      } else {
        var supporterUserId = " ";
      }

      const addSupporterToStats = {
        campaignId: oneCampaign.campaignId,
        athleteId: oneAthletez.userId,

        supporterId: supporterUserId,
        supporterName: oneCampaign.supporterName,
        supporterEmail: oneCampaign.supporterEmail,

        supporterComment: oneCampaign.supporterComment,

        amount: amount,

        payment_status: status,
      };

      const t4 = await db.sequelize.transaction();

      try {
        await Statscampaign.create(addSupporterToStats, { transaction: t4 });

        await t4.commit();
      } catch (e) {
        await t4.rollback();
        console.log(error.stack);
      }
    }
  }

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(`  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log("PaymentIntent was successful!");

      //console.log(paymentIntent.id) // evo, on ga pogadja i nalazi u database koji ima za campaign...

      await updatePaymentStatus(
        paymentIntent.id,
        "succeeded",
        paymentIntent.amount
      );



      console.log(event.data.object); // drzi ga u centima da, nema sta da konvertujes ipak !
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

  console.log("we received, thanks");
  res.send({ received: true });
};

module.exports = {
  webhookController,
};
