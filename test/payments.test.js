require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const superagent = require("superagent");
/* const mysql = require("mysql2/promise");
const dbConfig = require("../data/config"); */

const db = require("../models/database");

const Statscampaign = db.statscampaign;
const Campaign = db.campaign;
const Users = db.users;
const Couponcode = db.couponcode;

const generateRandomEmail = () => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 4);

  return `user${randomString}${timestamp}@example.com`;
};

// Function to create a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


const campaignId = uuidv4();

let friendEmail;
let supporterEmail;


describe("creating campaign for friend, that will be used for all payments tests", () => {

  before(() => {
    friendEmail = generateRandomEmail();
    supporterEmail = generateRandomEmail();
  });

  it("should make campaign for friend (saved in 'Campaigns' table)", function (done) {
    superagent
      .post("http://localhost:5000/listsData/createCampaign")
      .send({
        campaignId,
        friendName: "test_name_friend",
        friendMiddleName: "test_middleName_friend",
        friendLastName: "test_friendLastName_friend",
        friendFamilyName: "test_friendFamilyName_friend",
        friendEmail,
        friendPhone: "+36285921926",
        friendBirthdate: "1995-09-27",
        friendNationality: "US",
        friendImage: "ariana_profile.jpg",
        friendGender: "F",

        supporterName: "test_supporterName_friend",
        supporterPhone: "+36285921926",
        supporterEmail,
        supporterComment: "Go go go (supporter comment test)",

        isCelebrity: false,
        fb_link: "",
        ig_link: "",
        tw_link: "",
      })
      .end(function (err, res) {
        if (res.status === 201) {
          console.log(`Campaign id is: ${campaignId}`);
          done();
        } else {
          done(err);
        }
      });
  });

  it("after creating campaign (for friend), it should create (register) account as well (as there's none, and campaign can't be created if (athlete) account exists)", function (done) {
    superagent
      .post("http://localhost:5000/auth/register")
      .send({
        email: friendEmail,
        password: "12345678",
        user_type: "AH",
        name: "test_name_friend",
        middleName: "test_middleName_friend",
        lastName: "test_friendLastName_friend",
        phone: "+36285921926",
        nationality: "US",
        weight: "53",
        cryptoaddress: "fsfdsklčcx43242sfsad",
        picture: "ariana_profile.jpg",
        cryptoaddress_type: "BTC",
        bio: "Test bio athlete campaign",
        gender: "F",

        signedByFriend: true,

        supporterName: "test_name_supporter",
        campaignURL: `http://localhost:5000/campaign/${campaignId}`,

        sendEmailToFriend: true,

        isCelebrity: false,
        fb_link: "",
        ig_link: "",
        tw_link: "",
      })
      .end(function (err, res) {
        if (res.status === 201) {
          done();
        } else {
          done(err);
        }
      });
  });

  it("also, when supporter inserts his info in campaign, that gets saved. And we create supporter account, with user_type='SPT'", function (done) {
    superagent
      .post("http://localhost:5000/auth/register")
      .send({
        email: supporterEmail,
        password: "12345678",
        user_type: "SPT",
        name: "test_name_supporter",
        phone: "+36285921926",
        weight: "55",
        cryptoaddress: "",
        picture: "ariana_profile.jpg",
        cryptoaddress_type: "BTC",
        bio: "",
        gender: "F",
        supporterComment: "Go go go (supporter comment test)",
        campaignURL: `http://localhost:5000/campaign/${campaignId}`,
        signingAsSupporter: true,
      })
      .end(function (err, res) {
        if (res.status === 201) {
          done();
        } else {
          done(err);
          
        }
      });
  });

  it("create coupon codes that will be used in throughout tests", async function () {


    // national coupons ("US"), are fixed price. Addedd to donations, or as sole payment. 
    // US of 10$. Can be used up to 100$ (so 10 users)
    await Couponcode.create({couponCode: 'TESTUS',country: 'US', expiryDate: '2035-09-09', couponValue: 1000, maxSpentLimit: 10000, maxCouponTimesUsed: '10'});
    
    return;
  })

});


describe("payments", () => {
  let randomEmail;

  //const campaignId = uuidv4();

  before(async () => {
    randomEmail = generateRandomEmail();
  });

  it("Anonymous 10$ payment without any donations (regular pay with credit card) (campaignId is not of real campaign)", async function () {
    this.timeout(15000);

       // and last, check if "how many supporter" works, by just fetching from "Statscampaigns" (transactions), for my campaignId, and see how much you got. compared to previous. (this will get added more and more, throughout test, for other payments.. so you check this as well now)
       const prevHowManySupporters = await Statscampaign.count({
        where: { campaignId: campaignId },
      });


    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    // Make the request to create the payment
    const res = await superagent
      .post("http://localhost:5000/payment/makePayment")
      .set("Content-Type", "application/json")
      .send({
        amount: "10",
        campaignId,
        supporterName: "",
        supporterEmail: "",
        supporterComment: "",
        separateDonationThruPage: true,
        discountCode: "",
      });

    const { paymentIntent } = res.body;

    if (!paymentIntent.id) {
      throw new Error(
        "paymentIntent not received. Have you run Stripe CLI in background? `stripe listen --forward-to localhost:5000/webhook` "
      );
    }

    // Confirm the payment intent
    const confirmedIntent = await stripe.paymentIntents.confirm(
      paymentIntent.id,
      {
        payment_method: "pm_card_visa",
        return_url: "http://example.com/payment-success", // Dummy URL
      }
    );


     // also check in athlete itself, if amount calculated is right one?
    // first find the campaign
    const campaignCheck = await Campaign.findOne({
      where: { campaignId: campaignId },
    });
  

    // and then extract friendEmail, that's that athlete email used
    const athleteCheck = await Users.findOne({
      where: { email: campaignCheck.friendEmail },
    });

    let prevDonatedAmountAH = athleteCheck.donatedAmount;

    // Query the database to check if paymentIntent.id is saved
    // first, check if payment_id is written (so immediatelly)
    const paymentIdCheck = await Statscampaign.findOne({
      where: { payment_id: paymentIntent.id },
    });


 

    if (!paymentIdCheck) {
        throw new Error(
          "payment_id not found in database. So payment will fail further."
        );
    }


    // and then wait for some time, and check database again, 
    await delay(5000);

    // and then, check again if payment proceed through (it's local, so database shouldn't be occupied, should go fast)
    const paymentCheckProcessed = await Statscampaign.findOne({
      where: { payment_id: paymentIntent.id },
    });

     // it needs to check database again, for newest data
     const athleteCheckAgain = await Users.findOne({
      where: { email: campaignCheck.friendEmail },
    });
   

   // console.log("ss"+athleteCheck.donatedAmount)

   // now, confirm, that donatedAmount (current previous), is same as one you get after 
   // only if this is NOT the case, it throws error, and fails test
     if(!(prevDonatedAmountAH + 1000 === athleteCheckAgain.donatedAmount)){
      // 10$, you see it as 1000 (last 2 digits are cents)
      throw new Error(
        `Previous amount '${prevDonatedAmountAH}' in athlete (table Users) is not same calculation what it should be. It's ${athleteCheck.donatedAmount}`
      );

    } 


    
    // and last, check if "how many supporter" works, by just fetching from "Statscampaigns" (transactions), for my campaignId, and see how much you got. compared to previous. (this will get added more and more, throughout test, for other payments.. so you check this as well now)
    const howManySupporters = await Statscampaign.count({
      where: { campaignId: campaignId },
    });


    if (prevHowManySupporters === howManySupporters){
      throw new Error(
        "'how many supporters', doesn't work. transaction is not written in 'Statcampaign' table, and/or campaignId is not used to indentify for which campaign transaction is connected to. "
      );
    }





    // so payment_status === "payment_status" && amount > 0, to know payment really worked fine
    if(paymentCheckProcessed.payment_status === "succeeded" && paymentCheckProcessed.amount > 0){
        console.log(`payment of ${paymentCheckProcessed.amount}$, ${paymentCheckProcessed.payment_status}!`);
        return;
    }else {
        throw new Error(
            `payment didn't proceed through (not written in database). payment_id is '${paymentIdCheck.payment_id}' , so check it directly in MySQL database once again 'select * from statscampaigns where payment_id="<payment_id>";'. Delay in database is 5 seconds, before checking database once again, if payment went through. `
          );
    }




  });



  it(" 10.34$ payment without any donations (regular pay with credit card) (campaignId is not of real campaign)", async function () {
    this.timeout(15000);

       // and last, check if "how many supporter" works, by just fetching from "Statscampaigns" (transactions), for my campaignId, and see how much you got. compared to previous. (this will get added more and more, throughout test, for other payments.. so you check this as well now)
       const prevHowManySupporters = await Statscampaign.count({
        where: { campaignId: campaignId },
      });


    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    // Make the request to create the payment
    const res = await superagent
      .post("http://localhost:5000/payment/makePayment")
      .set("Content-Type", "application/json")
      .send({
        amount: "10.34",
        campaignId,
        supporterName: `supporterName${new Date()}`,
        supporterEmail: `${generateRandomEmail}`,
        supporterComment: "Go go go suporter coment test",
        separateDonationThruPage: true,
        discountCode: "",
      });

    const { paymentIntent } = res.body;

    if (!paymentIntent.id) {
      throw new Error(
        "paymentIntent not received. Have you run Stripe CLI in background? `stripe listen --forward-to localhost:5000/webhook` "
      );
    }

    // Confirm the payment intent
    const confirmedIntent = await stripe.paymentIntents.confirm(
      paymentIntent.id,
      {
        payment_method: "pm_card_visa",
        return_url: "http://example.com/payment-success", // Dummy URL
      }
    );


     // also check in athlete itself, if amount calculated is right one?
    // first find the campaign
    const campaignCheck = await Campaign.findOne({
      where: { campaignId: campaignId },
    });
  

    // and then extract friendEmail, that's that athlete email used
    const athleteCheck = await Users.findOne({
      where: { email: campaignCheck.friendEmail },
    });

    let prevDonatedAmountAH = athleteCheck.donatedAmount;

    // Query the database to check if paymentIntent.id is saved
    // first, check if payment_id is written (so immediatelly)
    const paymentIdCheck = await Statscampaign.findOne({
      where: { payment_id: paymentIntent.id },
    });


 

    if (!paymentIdCheck) {
        throw new Error(
          "payment_id not found in database. So payment will fail further."
        );
    }


    // and then wait for some time, and check database again, 
    await delay(5000);

    // and then, check again if payment proceed through (it's local, so database shouldn't be occupied, should go fast)
    const paymentCheckProcessed = await Statscampaign.findOne({
      where: { payment_id: paymentIntent.id },
    });

     // it needs to check database again, for newest data
     const athleteCheckAgain = await Users.findOne({
      where: { email: campaignCheck.friendEmail },
    });
   

   // console.log("ss"+athleteCheck.donatedAmount)

   // now, confirm, that donatedAmount (current previous), is same as one you get after 
   // only if this is NOT the case, it throws error, and fails test
     if(!(prevDonatedAmountAH + 1034 === athleteCheckAgain.donatedAmount)){
      // 10$, you see it as 1000 (last 2 digits are cents)
      throw new Error(
        `Previous amount '${prevDonatedAmountAH}' in athlete (table Users) is not same calculation what it should be. It's ${athleteCheck.donatedAmount}`
      );

    } 


    
    // and last, check if "how many supporter" works, by just fetching from "Statscampaigns" (transactions), for my campaignId, and see how much you got. compared to previous. (this will get added more and more, throughout test, for other payments.. so you check this as well now)
    const howManySupporters = await Statscampaign.count({
      where: { campaignId: campaignId },
    });


    if (prevHowManySupporters === howManySupporters){
      throw new Error(
        "'how many supporters', doesn't work. transaction is not written in 'Statcampaign' table, and/or campaignId is not used to indentify for which campaign transaction is connected to. "
      );
    }





    // so payment_status === "payment_status" && amount > 0, to know payment really worked fine
    if(paymentCheckProcessed.payment_status === "succeeded" && paymentCheckProcessed.amount > 0){
        console.log(`payment of ${paymentCheckProcessed.amount}$, ${paymentCheckProcessed.payment_status}!`);
        return;
    }else {
        throw new Error(
            `payment didn't proceed through (not written in database). payment_id is '${paymentIdCheck.payment_id}' , so check it directly in MySQL database once again 'select * from statscampaigns where payment_id="<payment_id>";'. Delay in database is 5 seconds, before checking database once again, if payment went through. `
          );
    }




  });
 

  it(" 348749.32 $ payment without any donations (regular pay with credit card) (campaignId is not of real campaign)", async function () {
    this.timeout(15000);

       // and last, check if "how many supporter" works, by just fetching from "Statscampaigns" (transactions), for my campaignId, and see how much you got. compared to previous. (this will get added more and more, throughout test, for other payments.. so you check this as well now)
       const prevHowManySupporters = await Statscampaign.count({
        where: { campaignId: campaignId },
      });


    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    // Make the request to create the payment
    const res = await superagent
      .post("http://localhost:5000/payment/makePayment")
      .set("Content-Type", "application/json")
      .send({
        amount: "348749.32",
        campaignId,
        supporterName: `supporterName${new Date()}`,
        supporterEmail: `${generateRandomEmail}`,
        supporterComment: "Go go go suporter coment test",
        separateDonationThruPage: true,
        discountCode: "",
      });

    const { paymentIntent } = res.body;

    if (!paymentIntent.id) {
      throw new Error(
        "paymentIntent not received. Have you run Stripe CLI in background? `stripe listen --forward-to localhost:5000/webhook` "
      );
    }

    // Confirm the payment intent
    const confirmedIntent = await stripe.paymentIntents.confirm(
      paymentIntent.id,
      {
        payment_method: "pm_card_visa",
        return_url: "http://example.com/payment-success", // Dummy URL
      }
    );


     // also check in athlete itself, if amount calculated is right one?
    // first find the campaign
    const campaignCheck = await Campaign.findOne({
      where: { campaignId: campaignId },
    });
  

    // and then extract friendEmail, that's that athlete email used
    const athleteCheck = await Users.findOne({
      where: { email: campaignCheck.friendEmail },
    });

    let prevDonatedAmountAH = athleteCheck.donatedAmount;

    // Query the database to check if paymentIntent.id is saved
    // first, check if payment_id is written (so immediatelly)
    const paymentIdCheck = await Statscampaign.findOne({
      where: { payment_id: paymentIntent.id },
    });


 

    if (!paymentIdCheck) {
        throw new Error(
          "payment_id not found in database. So payment will fail further."
        );
    }


    // and then wait for some time, and check database again, 
    await delay(5000);

    // and then, check again if payment proceed through (it's local, so database shouldn't be occupied, should go fast)
    const paymentCheckProcessed = await Statscampaign.findOne({
      where: { payment_id: paymentIntent.id },
    });

     // it needs to check database again, for newest data
     const athleteCheckAgain = await Users.findOne({
      where: { email: campaignCheck.friendEmail },
    });
   

   // console.log("ss"+athleteCheck.donatedAmount)

   // now, confirm, that donatedAmount (current previous), is same as one you get after 
   // only if this is NOT the case, it throws error, and fails test
     if(!(prevDonatedAmountAH + 34874932 === athleteCheckAgain.donatedAmount)){
      // 10$, you see it as 1000 (last 2 digits are cents)
      throw new Error(
        `Previous amount '${prevDonatedAmountAH}' in athlete (table Users) is not same calculation what it should be. It's ${athleteCheck.donatedAmount}`
      );

    } 


    
    // and last, check if "how many supporter" works, by just fetching from "Statscampaigns" (transactions), for my campaignId, and see how much you got. compared to previous. (this will get added more and more, throughout test, for other payments.. so you check this as well now)
    const howManySupporters = await Statscampaign.count({
      where: { campaignId: campaignId },
    });


    if (prevHowManySupporters === howManySupporters){
      throw new Error(
        "'how many supporters', doesn't work. transaction is not written in 'Statcampaign' table, and/or campaignId is not used to indentify for which campaign transaction is connected to. "
      );
    }





    // so payment_status === "payment_status" && amount > 0, to know payment really worked fine
    if(paymentCheckProcessed.payment_status === "succeeded" && paymentCheckProcessed.amount > 0){
        console.log(`payment of ${paymentCheckProcessed.amount}$, ${paymentCheckProcessed.payment_status}!`);
        return;
    }else {
        throw new Error(
            `payment didn't proceed through (not written in database). payment_id is '${paymentIdCheck.payment_id}' , so check it directly in MySQL database once again 'select * from statscampaigns where payment_id="<payment_id>";'. Delay in database is 5 seconds, before checking database once again, if payment went through. `
          );
    }




  });





  // for easy access in database queries
  console.log(`Campaign is:  'select * from campaigns where campaignId="${campaignId}";' `)
  console.log(`Campaign stats (all transaction) is: 'select * from statscampaigns where campaignId="${campaignId}";' `)
  console.log(`Athlete email is: ${friendEmail}. 'select * from users where email="${friendEmail}";' `)

});

