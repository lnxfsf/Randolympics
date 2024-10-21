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

const superagent = require("superagent");
const fetch = require("node-fetch");

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

    // separateDonationThruPage, you made this, so you can know who first supporter was ! so it's not important to test this..
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

        // sada, moras da proveris, da li je supporter anonymus ! A AKO IMA NALOG UPISUJES GA OVDE NJEGOV "supporterId" !
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

        // ali i dalje, kreira tebelu, u statscampaign, i tuda confirm transakciju
        await Statscampaign.create(supporter_data, { transaction: t1 });

        await t1.commit();
        // ! ali, ovo je kada neko dodaje, u vec kreirani campaignId ! radi transaction history (a isto tako, mozemo da čitamo svi komentari od supporters..)

        // supporterComment
      } catch (error) {
        await t1.rollback();
        console.log(error.stack);
      }
    } else {
      // this get executed when it's first user
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
    var oneCoupon;

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
      oneCoupon = await Couponcodes.findOne({
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
      res.status(400).json({ message: "coupon code is not valid" });
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

const confirmPaypalTransaction = async (req, res) => {
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
      console.log(
        "THIS ROOLBACK IS NORMAL. It means, we're adding as supporter, that's not creator ! | so we release lock for 'Campaign', on this row, as we're gonna use another.."
      );
      await t2.rollback();

      const t5 = await db.sequelize.transaction();

      // znaci da nadje, onaj, koji ima Stats sa tom paymentId, (koji je sada uplatio neko vec..)
      const oneCampaignThirdParty = await Statscampaign.findOne({
        where: { payment_id: paymentIntentId },
        lock: true,
        transaction: t5,
      });

      if (oneCampaignThirdParty) {
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
        console.log(" t6u transakciju");
        /*  lock: true,
          transaction: t6, */

        try {
          const oneAthleteU = await User.findOne({
            where: { userId: oneCampaignThirdParty.athleteId },
            lock: t6u.LOCK.UPDATE, // This adds the row-level lock (and then it will work for this)
            transaction: t6u,

            //  lock: true,
            //  transaction: t6u,
          });

          console.log(" on moze naci oneAthlete");
         console.log(oneAthleteU);
         console.log(amount) //vrv, treba da upišeš kao integer ovde... 



          // now you increase how much got donated (yes, in cents keep it so we get 2 decimal values there )

          //  await oneAthleteU.update({ donatedAmount: amount}); // azurira samo taj

          await oneAthleteU.increment("donatedAmount", {
            by: amount , // ! as integer, because it gets it as 55.00 , and should be 5500 for it
            transaction: t6u,
          }); // add (+) za toliko amount za taj athlete

          // Add the amount to the current value
          // this way, we can update it... as it seemd .increment doesn't support transactions that well.
          /*   await oneAthleteU.update({
              donatedAmount: db.sequelize.literal(`donatedAmount + ${amount}`), }, {transaction: t6u,}
          ); */

          /*  { transaction: t6u } */

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
        console.log(
          "you need to release it as well, if there's not proper payment_id ! "
        );
        console.log(
          "couldn't find proper payment_id, just send back to stripe as confirmed.. "
        );
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

      const tAthleteZ = await db.sequelize.transaction();
      let oneAthletez;

      try {
        oneAthletez = await User.findOne({
          where: { email: oneCampaign.friendEmail },
          lock: tAthleteZ.LOCK.UPDATE,
          transaction: tAthleteZ,
        });

        console.log(" on moze naci oneAthlete");
        console.log(oneAthletez);

        console.log("uvecava tog athlete-a donation amount");
        console.log(oneAthletez);

        // now you increase how much got donated (yes, in cents keep it so we get 2 decimal values there )

        // await oneAthlete.update({ donatedAmount: amount}); // azurira samo taj
        await oneAthletez.increment("donatedAmount", {
          by: amount ,
          transaction: tAthleteZ,
        }); // add (+) za toliko amount za taj athlete

        await tAthleteZ.commit();

        // await t3z.commit();
      } catch (error) {
        //  await t3z.rollback();

        await tAthleteZ.rollback();
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

  const {
    transactionId,
    campaignId,
    discountCode,
    supporterName,
    supporterEmail,
    supporterComment,
    separateDonationThruPage,
    countryAthleteIsIn,
  } = req.body;

  const PAYPAL_ACCESS_TOKEN = await getPayPalAccessToken();

  console.log("confirmPaypalTransaction");
  console.log(transactionId);

  try {
    const response = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${transactionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PAYPAL_ACCESS_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    console.log("PayPal response data:", data);

    if (data.status === "COMPLETED") {
      console.log("paypal successfully confirmed transaction ! ");

      // treba da upišeš u tabelu pre poziva ovog drugog...
      /*    const res = await superagent
    .post(`${process.env.BASE_URL_BACKEND}/payment/makePayment`)
    .set("Content-Type", "application/json")
    .send({
        amount: data.purchase_units[0].amount.value,
        campaignId, // Replace with actual campaignId
        supporterName,
        supporterEmail,
        supporterComment,
        separateDonationThruPage,
        discountCode,
    }); */


    
    

      // you do similar thing you do in /makePayments

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

          // sada, moras da proveris, da li je supporter anonymus ! A AKO IMA NALOG UPISUJES GA OVDE NJEGOV "supporterId" !
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

            payment_id: data.id,
            couponDonationCode: discountCode,
            countryAthleteIsIn: countryAthleteIsIn,
          };

          // ali i dalje, kreira tebelu, u statscampaign, i tuda confirm transakciju
          await Statscampaign.create(supporter_data, { transaction: t1 });

          await t1.commit();
          // ! ali, ovo je kada neko dodaje, u vec kreirani campaignId ! radi transaction history (a isto tako, mozemo da čitamo svi komentari od supporters..)

          // supporterComment
        } catch (error) {
          await t1.rollback();
          console.log(error.stack);
        }
      } else {
        // this get executed when it's first user
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
              payment_id: data.id,

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





      // --------

      console.log("amount which it gets (use this amount, safer) to store");
      console.log(data.purchase_units[0].amount.value);
      // gives USD ($ , dollars), with decimals, even if it's 10$, it sees as 10.00$ (which is okay as well.)

      await updatePaymentStatus(
        data.id,
        "succeeded",
        data.purchase_units[0].amount.value * 100
      );

      // when you send as *100, then it gets it normal value. instead of 55.00 paypal gets us, we send to function as 5500 

      return res.status(200).json({ message: "Payment verified and saved" });
    } else {
      return res.status(400).json({ message: "Payment not completed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ message: "Error verifying payment" });
  }
};

// Function to get PayPal Access Token
async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(
    "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    }
  );

  const data = await response.json();
  return data.access_token;
}

module.exports = {
  makePayment,
  donateOnlyWithDiscountCode,
  confirmPaypalTransaction,
};
