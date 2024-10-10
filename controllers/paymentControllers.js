const db = require("../models/database");
const User = db.users;
const Traffic = db.traffic;
const Campaign = db.campaign;
const Statscampaign = db.statscampaign;
const Couponcodes = db.couponcode;

const Sequelize = db.Sequelize;

const Op = db.Sequelize.Op;

const sendEmail = require("../utils/sendEmail");
const { JSDOM } = require("jsdom");

// stripe
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const listOfSports = require("../data/listOfSports");

const dayjs = require("dayjs");

var weekday = require("dayjs/plugin/isoWeek");
dayjs.extend(weekday);

// TODO, put this somewhere else, but this, just so I can work with something
const makePayment = async (req, res) => {
  const {
    amount,
    campaignId,
    supporterName,
    supporterEmail,
    separateDonationThruPage,
    supporterComment,
    discountCode,
    countryAthleteIsIn,
  } = req.body;

  console.log(campaignId);
  console.log(amount);

  console.log("on dobija supporterName: " + supporterName);
  console.log("dobija i supporterEmail: " + supporterEmail);
  console.log("dobija i supporterComment: " + supporterComment);

  console.log("dobija i discountCode: " + discountCode);

  console.log("dobija i countryAthleteIsIn: " + countryAthleteIsIn);

  console.log("separateDonationThruPage: " + separateDonationThruPage);
  // TODO, da, sa ovime, on mora da kreira tabelu, jer fino u backend samo posalji sve sto ti treba, da se ne cimam sa FE, insecure je ionako to jako...

  // TODO ovde, amount . si 100% siguran kolko novca dano !

  // TODO i success (mora biti potvrdjen payment ! kako on dobija ovde !)

  console.log("passed once");

  try {
    // ovde ne treba transaction, ovo je za stripe request
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    res.send({
      paymentIntent,
    });

    console.log(paymentIntent);

    console.log("ono sto on prima je." + campaignId);

    if (separateDonationThruPage) {
      const t1 = await db.sequelize.transaction();

      try {
        

        // find athleteId (so we increase his donatedAmount when we confirm payment)

        // prvo nadjes u campaign, pa odatle nadjes info (u Users, za taj email, athlete !)
        var campaignViewed = await Campaign.findOne({
          where: { campaignId: campaignId },
        });

        console.log("--------------------campaignViewed------------------");
        console.log(campaignViewed);
        console.log("----------direktni pristup je");
        console.log(campaignViewed.friendEmail);
        // sad nalazi athleteId po ovome...
        const oneAthlete = await User.findOne({
          where: { email: campaignViewed.friendEmail },
        });

        // e sada uzimas athleteId odatle:   oneAthlete.userId

        // sada, moras da proveris, da li je supporter anonymus ! A AKO IMA NALOG UPISUJES GA OVDE NJEGOV "supporterId"
        // znaci izvrsi proveru, da li email supportera (isto je unique zar ne..), matchje neki koji postoji u database. cisto eto moze korisno imat ako treba (za njegovu listu, koga je on supportovao.. (a i fora je, da ako kreira nalog, vidis, isto ce imati pregled koga je supportovao..))
        // to jeste "supporterEmail", direktno, ovaj sto je donirao sa stranice, što upisuje !
        const oneSupporter = await User.findOne({
          where: { email: supporterEmail },
        });

        if (oneSupporter) {
          var supporterId = oneSupporter.userId;
          // if there's nothing, no such user, supporter, then nothing happens, it will be "null" stored in database anyways..
        } else {
          var supporterId = "";
        }

        // amount, JOS NE UPISUJES OVDE NISTA ! (to tek na drugoj strani pri potvrdi, jer ionako database, kreira ga kao 0 ..)

        // on ce supporterEmail, da cuva u ovaj record. pa eto kasnije, kada supporter napravi nalog, moci ce da ima pregled svojih ! bez obzira eto vidis.. pre nego napravio nalog, moci ce da ih vidi isto..

        // payment_status, isto ne diras sad nista, u database biva ionako "unpaid" po default-u

        const supporter_data = {
          campaignId,
          athleteId: oneAthlete.userId,
          supporterId,

          supporterName,
          supporterEmail,
          supporterComment,

          payment_id: paymentIntent.id,
          couponDonationCode: discountCode,
          countryAthleteIsIn: countryAthleteIsIn,
        };

        await Statscampaign.create(supporter_data, { transaction: t1 });

        await t1.commit();
        // ! ali, ovo je kada neko dodaje, u vec kreirani campaignId ! radi transaction history (a isto tako, mozemo da čitamo svi komentari od supporters..)

        // supporterComment
      } catch (error) {
        await t1.rollback();
        console.log(error.stack);
      }
    } else {
      const t2 = await db.sequelize.transaction();

      // ! OVO JE OBICAN, ubaci u campaignId, trazi on ovde..
      // sad upisi u database (da, i vise puta ako je, ako nije uspeo, ide on dole u error ionako)
      const oneCampaign = await Campaign.findOne({
        where: { campaignId: campaignId },
        lock: true,
        transaction: t2,
      });

      try {
        await oneCampaign.update(
          {
            payment_id: paymentIntent.id,

            couponDonationCode: discountCode,
            countryAthleteIsIn: countryAthleteIsIn,
          },
          { transaction: t2 }
        ); // azurira samo taj

        await t2.commit();

        // samo novi model za ove dve stvari upravo..

        // ! 11.08 , i doda discountCode , countryAthleteIsIn, njih takodje azurira u database !
      } catch (error) {
        await t2.rollback();

        console.log(error.stack);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }

  /*   const stripe = require('stripe')(process.env.STRIPE_TEST_API)
  
    stripe.products.create({
      name: 'Starter Subscription',
      description: '$12/Month subscription',
    }).then(product => {
      stripe.prices.create({
        unit_amount: 1200,
        currency: 'usd',
        recurring: {
          interval: 'month',
        },
        product: product.id,
      }).then(price => {
        console.log('Success! Here is your starter subscription product id: ' + product.id);
        console.log('Success! Here is your starter subscription price id: ' + price.id);
      });
    }); */
};

// donate using only dicsount code
const donateOnlyWithDiscountCode = async (req, res) => {
  const {
    discountCode,
    campaignId,

    supporterEmail,
    supporterName,
    supporterComment,
  } = req.body;

  try {
    // ima li koji odgovara tome..
    

    // prvo nadjes u campaign, pa odatle nadjes info (u Users, za taj email, athlete !)

    const t2 = await db.sequelize.transaction();

    const campaignViewed = await Campaign.findOne({
      where: { campaignId: campaignId },
      lock: true,
      transaction: t2,
    });

    console.log("---------> campaignId" + campaignId);
    console.log(campaignViewed);

    const t3 = await db.sequelize.transaction();
    // sad nalazi athleteId po ovome... (treba da upise dodatno ovoliko !)
    const oneAthlete = await User.findOne({
      where: { email: campaignViewed.friendEmail },
      lock: true,
      transaction: t3,
    });

    console.log("---------> oneAthlete " + campaignViewed.friendEmail);
    console.log(oneAthlete);

    // sada, moras da proveris, da li je supporter anonymus ! A AKO IMA NALOG UPISUJES GA OVDE NJEGOV "supporterId"
    // znaci izvrsi proveru, da li email supportera (isto je unique zar ne..), matchje neki koji postoji u database. cisto eto moze korisno imat ako treba (za njegovu listu, koga je on supportovao.. (a i fora je, da ako kreira nalog, vidis, isto ce imati pregled koga je supportovao..))
    // to jeste "supporterEmail", direktno, ovaj sto je donirao sa stranice, što upisuje !

    try {
      const oneSupporter = await User.findOne({
        where: { email: supporterEmail },
      });

      if (oneSupporter) {
        var supporterId = oneSupporter.userId;
        // if there's nothing, no such user, supporter, then nothing happens, it will be "null" stored in database anyways..
      } else {
        var supporterId = "";
      }
    } catch (e) {
      console.log(e.stack);
    }

    // treba, da odma matchujes i drzavu ovde u "where", da imas manje da trazis i kucas. da preko athlete odmah da ih imas sve tu..

    const t1 = await db.sequelize.transaction();

    try {
      // on nadje koji ima.. u Coupons
      var oneCoupon = await Couponcodes.findOne({
        where: {
          couponCode: discountCode,
          isCouponActive: 1,
          country: oneAthlete.nationality.toUpperCase(),
        },

        lock: true,
        transaction: t1,
      });

      console.log("OVDE NE RADI ");
      console.log(discountCode);
      console.log(oneAthlete.nationality.toUpperCase());

      console.log(oneCoupon);
    } catch (e) {
      await t1.rollback();
      console.log(e.stack);
    }

    if (!oneCoupon || typeof oneCoupon === "undefined") {
      await t1.rollback();
      await t2.rollback();
      await t3.rollback();

      //  console.log("coupon code is not valid");

      // so it do nothing in backend anyways..
      res.status(200).json({ message: "coupon code is not valid" });
      return;
    }

    // we don't allow "GLOBAL" codes to be used like this
    /*  if(oneCoupon.country === "GLOBAL"){
  
        await t1.rollback();
  
        // don't use it, there's nothing in Couponcodes ?
      } */
    /* 
          console.log("drzava je: ")
          //console.log(oneCoupon.country)
          console.log(oneCoupon) */

    // sada proveri 'Coupons.js'  sa 'statsCampaign.js'
    if (oneCoupon.couponCode) {
      // cek, ti ne treba da upisujes nista u statsCampaign ! to ti je za potvrdu bilo ustvari (upisujes samo amount.. )
      // da, TI USTVARI KREIRAS NOVI ROW, kao transakciju u taj statsCampaign, upravo sa vrednoscu iz tog couponCode-a...

      // prvo izvuces amount koji treba, pa to samo kreiras tu row u tabeli

      /*  const oneCoupon = await Statscampaign.findOne({
            where: { couponDonationCode: discountCode, },
          }); */

      // znaci kreiras jedan row .. (da, treba da upises, i u Athlete isto), i ovaj ce jedini biti odmah "success", jer on ne radi potvrdu..

      try {
        

        const currentDate = new Date();
        const expiryDate = new Date(oneCoupon.expiryDate);

        let newAmount = oneCoupon.couponValue; // da uvek vazi samo za fixed ! samo, i ovo vazi samo za national (nece matchovati nijedan "GLOBAL", ionako...)

        let newSpentAmount = newAmount + oneCoupon.spentAmount;

        if (
          currentDate <= expiryDate &&
          newSpentAmount < oneCoupon.maxSpentLimit &&
          oneCoupon.couponTimesUsed <= oneCoupon.maxCouponTimesUsed
        ) {
          try {
            await oneCoupon.update(
              {
                couponTimesUsed: oneCoupon.couponTimesUsed + 1,
                spentAmount: newSpentAmount,
              },
              { transaction: t1 }
            ); // azurira samo taj

            // i azurira status transakcije kao "success", eto da je full-ed
            await campaignViewed.update(
              { payment_status: "succeeded" },
              { transaction: t2 }
            );

            // i u athlete mora da azurira + tolko amount donated...
            await oneAthlete.update(
              {
                donatedAmount: oneAthlete.donatedAmount + newAmount,
              },
              { transaction: t3 }
            );

            await t1.commit();
            await t2.commit();
            await t3.commit();
          } catch (error) {
            await t1.rollback();
            await t2.rollback();
            await t3.rollback();
            console.log(error.stack);
          }

          var amount = newAmount;
        } else {
          try {
            // then it's expired, just set it so, so we don't check it anymore..
            await oneCoupon.update({ isCouponActive: 0 }, { transaction: t1 });
            await t1.commit();
          } catch (e) {
            await t1.rollback();
            console.log(e.stack);
          }

          // samo vrati to i tjt..
          var amount = newAmount;
        }

        // ! evo ovde
        //  var amount = calculateDonateWithDiscountOnly(currentDate,expiryDate,newAmount,newSpentAmount);

        const supporter_data = {
          campaignId,
          athleteId: oneAthlete.userId,

          supporterId,

          supporterEmail,
          supporterName,
          supporterComment,

          countryAthleteIsIn: oneAthlete.nationality,

          amount: amount,
        };

        // we create new record.
        const t4 = await db.sequelize.transaction();

        await Statscampaign.create(supporter_data, { transaction: t4 });

        await t4.commit();

        res.status(200).json({ message: "coupon confirmed" });
      } catch (e) {
        await t4.rollback();
        console.log(e.stack);
      }
    }
  } catch (e) {
    console.log(e.stack);
  }
};

module.exports = {
  makePayment,
  donateOnlyWithDiscountCode,
};
