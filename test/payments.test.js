require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const superagent = require("superagent");
/* const mysql = require("mysql2/promise");
const dbConfig = require("../data/config"); */

const { format } = require('date-fns');


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
  before(async () => {
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
    // you'll need to delete previous ones, before trying again.
    const existingCoupon1 = await Couponcode.findOne({
      where: { couponCode: "TESTU1" },
    });
    if (existingCoupon1) {
      await Couponcode.destroy({ where: { couponCode: "TESTU1" } });
    }

    const existingCoupon2 = await Couponcode.findOne({
      where: { couponCode: "TESTU2" },
    });
    if (existingCoupon2) {
      await Couponcode.destroy({ where: { couponCode: "TESTU2" } });
    }

    const existingCoupon3 = await Couponcode.findOne({
      where: { couponCode: "TESTGL" },
    });
    if (existingCoupon3) {
      await Couponcode.destroy({ where: { couponCode: "TESTGL" } });
    }

    // national coupons ("US"), are fixed price. Addedd to coupon codes, or as sole payment.
    // US of 10$. Can be used up to 100$ (so 10 users)

    await Couponcode.create({
      couponCode: "TESTU1",
      country: "US",
      expiryDate: "2035-09-09",
      couponValue: 1000,
      maxSpentLimit: 10000,
      maxCouponTimesUsed: "10",
    });

    // US of 10.34$. Can be used up to 103.4$ (so 10 users)
    await Couponcode.create({
      couponCode: "TESTU2",
      country: "US",
      expiryDate: "2035-09-09",
      couponValue: 1034,
      maxSpentLimit: 10340,
      maxCouponTimesUsed: "10",
    });

    // Global coupons provide increase by % for payment made through credit card. You can't pay with global code solely.

    // Global code of 0.43 (which is  43%). Can be used up to 1000000.4$ (so 10 users)
    await Couponcode.create({
      couponCode: "TESTGL",
      country: "GLOBAL",
      expiryDate: "2035-09-09",
      couponValue: 0.43,
      maxSpentLimit: 100000040,
      maxCouponTimesUsed: "15",
    });

    return;
  });
});

describe("payments", () => {
  let randomEmail;

  //const campaignId = uuidv4();

  before(async () => {
    randomEmail = generateRandomEmail();
  });

  it("Stripe - Anonymous 10$ payment without any coupon codes (regular pay with credit card) (campaignId is not of real campaign)", async function () {
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
        amount: "10.00",
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
    if (!(prevDonatedAmountAH + 1000 === athleteCheckAgain.donatedAmount)) {
      // 10$, you see it as 1000 (last 2 digits are cents)
      throw new Error(
        `Previous amount '${prevDonatedAmountAH}' in athlete (table Users) is not same calculation what it should be. It's ${athleteCheck.donatedAmount}`
      );
    }

    // and last, check if "how many supporter" works, by just fetching from "Statscampaigns" (transactions), for my campaignId, and see how much you got. compared to previous. (this will get added more and more, throughout test, for other payments.. so you check this as well now)
    const howManySupporters = await Statscampaign.count({
      where: { campaignId: campaignId },
    });

    if (prevHowManySupporters === howManySupporters) {
      throw new Error(
        "'how many supporters', doesn't work. transaction is not written in 'Statcampaign' table, and/or campaignId is not used to indentify for which campaign transaction is connected to. "
      );
    }

    // so payment_status === "payment_status" && amount > 0, to know payment really worked fine
    if (
      paymentCheckProcessed.payment_status === "succeeded" &&
      paymentCheckProcessed.amount > 0
    ) {
      console.log(
        `payment of ${paymentCheckProcessed.amount}$, ${paymentCheckProcessed.payment_status}!`
      );
      return;
    } else {
      throw new Error(
        `payment didn't proceed through (not written in database). payment_id is '${paymentIdCheck.payment_id}' , so check it directly in MySQL database once again 'select * from statscampaigns where payment_id="<payment_id>";'. Delay in database is 5 seconds, before checking database once again, if payment went through. `
      );
    }
  });



  it("Stripe - 10.34$ payment without any coupon codes (regular pay with credit card) (campaignId is not of real campaign)", async function () {
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
        supporterName: `supporterName${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
        supporterEmail: `${generateRandomEmail()}`,
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
    if (!(prevDonatedAmountAH + 1034 === athleteCheckAgain.donatedAmount)) {
      // 10$, you see it as 1000 (last 2 digits are cents)
      throw new Error(
        `Previous amount '${prevDonatedAmountAH}' in athlete (table Users) is not same calculation what it should be. It's ${athleteCheck.donatedAmount}`
      );
    }

    // and last, check if "how many supporter" works, by just fetching from "Statscampaigns" (transactions), for my campaignId, and see how much you got. compared to previous. (this will get added more and more, throughout test, for other payments.. so you check this as well now)
    const howManySupporters = await Statscampaign.count({
      where: { campaignId: campaignId },
    });

    if (prevHowManySupporters === howManySupporters) {
      throw new Error(
        "'how many supporters', doesn't work. transaction is not written in 'Statcampaign' table, and/or campaignId is not used to indentify for which campaign transaction is connected to. "
      );
    }

    // so payment_status === "payment_status" && amount > 0, to know payment really worked fine
    if (
      paymentCheckProcessed.payment_status === "succeeded" &&
      paymentCheckProcessed.amount > 0
    ) {
      console.log(
        `payment of ${paymentCheckProcessed.amount}$, ${paymentCheckProcessed.payment_status}!`
      );
      return;
    } else {
      throw new Error(
        `payment didn't proceed through (not written in database). payment_id is '${paymentIdCheck.payment_id}' , so check it directly in MySQL database once again 'select * from statscampaigns where payment_id="<payment_id>";'. Delay in database is 5 seconds, before checking database once again, if payment went through. `
      );
    }
  });

  it("Stripe - 348749.32 $ payment without any coupon codes (regular pay with credit card) (campaignId is not of real campaign)", async function () {
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
        supporterName: `supporterName${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
        supporterEmail: `${generateRandomEmail()}`,
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
    if (!(prevDonatedAmountAH + 34874932 === athleteCheckAgain.donatedAmount)) {
      // 10$, you see it as 1000 (last 2 digits are cents)
      throw new Error(
        `Previous amount '${prevDonatedAmountAH}' in athlete (table Users) is not same calculation what it should be. It's ${athleteCheck.donatedAmount}`
      );
    }

    // and last, check if "how many supporter" works, by just fetching from "Statscampaigns" (transactions), for my campaignId, and see how much you got. compared to previous. (this will get added more and more, throughout test, for other payments.. so you check this as well now)
    const howManySupporters = await Statscampaign.count({
      where: { campaignId: campaignId },
    });

    if (prevHowManySupporters === howManySupporters) {
      throw new Error(
        "'how many supporters', doesn't work. transaction is not written in 'Statcampaign' table, and/or campaignId is not used to indentify for which campaign transaction is connected to. "
      );
    }

    // so payment_status === "payment_status" && amount > 0, to know payment really worked fine
    if (
      paymentCheckProcessed.payment_status === "succeeded" &&
      paymentCheckProcessed.amount > 0
    ) {
      console.log(
        `payment of ${paymentCheckProcessed.amount}$, ${paymentCheckProcessed.payment_status}!`
      );
      return;
    } else {
      throw new Error(
        `payment didn't proceed through (not written in database). payment_id is '${paymentIdCheck.payment_id}' , so check it directly in MySQL database once again 'select * from statscampaigns where payment_id="<payment_id>";'. Delay in database is 5 seconds, before checking database once again, if payment went through. `
      );
    }
  });

  // with coupon (discount) codes
  it("Stripe - 10.34$ payment with TESTU1 (national US) (10$) coupon code (regular pay with credit card) (campaignId is not of real campaign)", async function () {
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
        supporterName: `supporterName${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
        supporterEmail: `${generateRandomEmail()}`,
        supporterComment: "Go go go suporter coment test",
        separateDonationThruPage: true,
        discountCode: "TESTU1",
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
    // + 1000 , is for coupon code, national US, 10$
    if (
      !(prevDonatedAmountAH + 1034 + 1000 === athleteCheckAgain.donatedAmount)
    ) {
      // 10$, you see it as 1000 (last 2 digits are cents)
      throw new Error(
        `Previous amount '${prevDonatedAmountAH}' in athlete (table Users) is not same calculation what it should be. It's ${athleteCheck.donatedAmount}`
      );
    }

    // and last, check if "how many supporter" works, by just fetching from "Statscampaigns" (transactions), for my campaignId, and see how much you got. compared to previous. (this will get added more and more, throughout test, for other payments.. so you check this as well now)
    const howManySupporters = await Statscampaign.count({
      where: { campaignId: campaignId },
    });

    if (prevHowManySupporters === howManySupporters) {
      throw new Error(
        "'how many supporters', doesn't work. transaction is not written in 'Statcampaign' table, and/or campaignId is not used to indentify for which campaign transaction is connected to. "
      );
    }

    // and now check couponcodes table, if it saves correctly as well
    const checkCouponTable = await Couponcode.findOne({
      where: { couponCode: "TESTU1" },
    });

    // coupon code, actually saves whole transaction how much it took. so 2034, is how much amount gets used in total. okay..
    if (
      checkCouponTable.spentAmount !== 2034 &&
      checkCouponTable.couponTimesUsed !== 1
    ) {
      throw new Error(
        `Didn't saved in coupon table. Spent amount is ${checkCouponTable.spentAmount}. couponTimesUsed is ${checkCouponTable.couponTimesUsed} `
      );
    }

    // so payment_status === "payment_status" && amount > 0, to know payment really worked fine
    if (
      paymentCheckProcessed.payment_status === "succeeded" &&
      paymentCheckProcessed.amount > 0
    ) {
      console.log(
        `payment of ${paymentCheckProcessed.amount}$, ${paymentCheckProcessed.payment_status}!`
      );
      return;
    } else {
      throw new Error(
        `payment didn't proceed through (not written in database). payment_id is '${paymentIdCheck.payment_id}' , so check it directly in MySQL database once again 'select * from statscampaigns where payment_id="<payment_id>";'. Delay in database is 5 seconds, before checking database once again, if payment went through. `
      );
    }
  });

  it("Stripe - 349.32$ payment with TESTGL (global) (43%) coupon code (regular pay with credit card) (campaignId is not of real campaign)", async function () {
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
        amount: "349.32",
        campaignId,
        supporterName: `supporterName${new Date()}`,
        supporterEmail: `${generateRandomEmail()}`,
        supporterComment: "Go go go suporter coment test",
        separateDonationThruPage: true,
        discountCode: "TESTGL",
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

    // ! + 43% of that , is for coupon code, national US, 10$
    if (!(prevDonatedAmountAH + 49953 === athleteCheckAgain.donatedAmount)) {
      throw new Error(
        `Previous amount '${prevDonatedAmountAH}' in athlete (table Users) is not same calculation what it should be. It's ${athleteCheck.donatedAmount}`
      );
    }

    // and last, check if "how many supporter" works, by just fetching from "Statscampaigns" (transactions), for my campaignId, and see how much you got. compared to previous. (this will get added more and more, throughout test, for other payments.. so you check this as well now)
    const howManySupporters = await Statscampaign.count({
      where: { campaignId: campaignId },
    });

    if (prevHowManySupporters === howManySupporters) {
      throw new Error(
        "'how many supporters', doesn't work. transaction is not written in 'Statcampaign' table, and/or campaignId is not used to indentify for which campaign transaction is connected to. "
      );
    }

    // and now check couponcodes table, if it saves correctly as well
    const checkCouponTable = await Couponcode.findOne({
      where: { couponCode: "TESTGL" },
    });

    if (
      checkCouponTable.spentAmount !== 49953 &&
      checkCouponTable.couponTimesUsed !== 1
    ) {
      throw new Error(
        `Didn't saved in coupon table. Spent amount is ${checkCouponTable.spentAmount}. couponTimesUsed is ${checkCouponTable.couponTimesUsed} `
      );
    }

    // so payment_status === "payment_status" && amount > 0, to know payment really worked fine
    if (
      paymentCheckProcessed.payment_status === "succeeded" &&
      paymentCheckProcessed.amount > 0
    ) {
      console.log(
        `payment of ${paymentCheckProcessed.amount}$, ${paymentCheckProcessed.payment_status}!`
      );
      return;
    } else {
      throw new Error(
        `payment didn't proceed through (not written in database). payment_id is '${paymentIdCheck.payment_id}' , so check it directly in MySQL database once again 'select * from statscampaigns where payment_id="<payment_id>";'. Delay in database is 5 seconds, before checking database once again, if payment went through. `
      );
    }
  });

  describe("Stripe - with incomplete and incorrect discount codes", () => {
    it("incomplete discount codes -  Stripe - 10.34$ payment with TESTU1 (national US) (10$) coupon code (regular pay with credit card) (campaignId is not of real campaign)", async function () {
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
          supporterName: `supporterName${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
          supporterEmail: `${generateRandomEmail()}`,
          supporterComment: "Go go go suporter coment test",
          separateDonationThruPage: true,
          discountCode: "TEU1",
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
      // + 1000 , is for coupon code, national US, 10$
      if (!(prevDonatedAmountAH + 1034 === athleteCheckAgain.donatedAmount)) {
        // 10$, you see it as 1000 (last 2 digits are cents)
        throw new Error(
          `Previous amount '${prevDonatedAmountAH}' in athlete (table Users) is not same calculation what it should be. It's ${athleteCheck.donatedAmount}`
        );
      }

      // and last, check if "how many supporter" works, by just fetching from "Statscampaigns" (transactions), for my campaignId, and see how much you got. compared to previous. (this will get added more and more, throughout test, for other payments.. so you check this as well now)
      const howManySupporters = await Statscampaign.count({
        where: { campaignId: campaignId },
      });

      if (prevHowManySupporters === howManySupporters) {
        throw new Error(
          "'how many supporters', doesn't work. transaction is not written in 'Statcampaign' table, and/or campaignId is not used to indentify for which campaign transaction is connected to. "
        );
      }

      // and now check couponcodes table, if it saves correctly as well
      const checkCouponTable = await Couponcode.findOne({
        where: { couponCode: "TESTU1" },
      });

      // coupon code, actually saves whole transaction how much it took. so 2034, is how much amount gets used in total. okay..
      if (
        checkCouponTable.spentAmount !== 2034 &&
        checkCouponTable.couponTimesUsed !== 1
      ) {
        throw new Error(
          `It shouldn't save (at least add more to previous one) anything in coupon table, as coupon is invalid. checkCouponTable.spentAmount is ${checkCouponTable.spentAmount}. checkCouponTable.couponTimesUsed is ${checkCouponTable.couponTimesUsed} `
        );
      }

      // so payment_status === "payment_status" && amount > 0, to know payment really worked fine
      if (
        paymentCheckProcessed.payment_status === "succeeded" &&
        paymentCheckProcessed.amount > 0
      ) {
        console.log(
          `payment of ${paymentCheckProcessed.amount}$, ${paymentCheckProcessed.payment_status}!`
        );
        return;
      } else {
        throw new Error(
          `payment didn't proceed through (not written in database). payment_id is '${paymentIdCheck.payment_id}' , so check it directly in MySQL database once again 'select * from statscampaigns where payment_id="<payment_id>";'. Delay in database is 5 seconds, before checking database once again, if payment went through. `
        );
      }
    });

    it("incomplete discount codes - Stripe - 349.32$ payment with TESTGL (global) (43%) coupon code (regular pay with credit card) (campaignId is not of real campaign)", async function () {
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
          amount: "349.32",
          campaignId,
          supporterName: `supporterName${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
          supporterEmail: `${generateRandomEmail()}`,
          supporterComment: "Go go go suporter coment test",
          separateDonationThruPage: true,
          discountCode: "TETL",
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

      // ! + 43% of that , is for coupon code, national US, 10$
      if (!(prevDonatedAmountAH + 34932 === athleteCheckAgain.donatedAmount)) {
        throw new Error(
          `Previous amount '${prevDonatedAmountAH}' in athlete (table Users) is not same calculation what it should be. It's ${athleteCheck.donatedAmount}`
        );
      }

      // and last, check if "how many supporter" works, by just fetching from "Statscampaigns" (transactions), for my campaignId, and see how much you got. compared to previous. (this will get added more and more, throughout test, for other payments.. so you check this as well now)
      const howManySupporters = await Statscampaign.count({
        where: { campaignId: campaignId },
      });

      if (prevHowManySupporters === howManySupporters) {
        throw new Error(
          "'how many supporters', doesn't work. transaction is not written in 'Statcampaign' table, and/or campaignId is not used to indentify for which campaign transaction is connected to. "
        );
      }

      // and now check couponcodes table, if it saves correctly as well
      const checkCouponTable = await Couponcode.findOne({
        where: { couponCode: "TESTGL" },
      });

      if (
        checkCouponTable.spentAmount !== 49953 &&
        checkCouponTable.couponTimesUsed !== 1
      ) {
        throw new Error(
          `Didn't saved in coupon table. It should stay same value as previous transaction. Spent amount is ${checkCouponTable.spentAmount}. couponTimesUsed is ${checkCouponTable.couponTimesUsed} `
        );
      }

      // so payment_status === "payment_status" && amount > 0, to know payment really worked fine
      if (
        paymentCheckProcessed.payment_status === "succeeded" &&
        paymentCheckProcessed.amount > 0
      ) {
        console.log(
          `payment of ${paymentCheckProcessed.amount}$, ${paymentCheckProcessed.payment_status}!`
        );
        return;
      } else {
        throw new Error(
          `payment didn't proceed through (not written in database). payment_id is '${paymentIdCheck.payment_id}' , so check it directly in MySQL database once again 'select * from statscampaigns where payment_id="<payment_id>";'. Delay in database is 5 seconds, before checking database once again, if payment went through. `
        );
      }
    });

    it("incorrect discount codes -  Stripe - 10.34$ payment with TESTU1 (national US) (10$) coupon code (regular pay with credit card) (campaignId is not of real campaign)", async function () {
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
          supporterName: `supporterName${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
          supporterEmail: `${generateRandomEmail()}`,
          supporterComment: "Go go go suporter coment test",
          separateDonationThruPage: true,
          discountCode: "TEUFA1",
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
      // + 1000 , is for coupon code, national US, 10$
      if (!(prevDonatedAmountAH + 1034 === athleteCheckAgain.donatedAmount)) {
        // 10$, you see it as 1000 (last 2 digits are cents)
        throw new Error(
          `Previous amount '${prevDonatedAmountAH}' in athlete (table Users) is not same calculation what it should be. It's ${athleteCheck.donatedAmount}`
        );
      }

      // and last, check if "how many supporter" works, by just fetching from "Statscampaigns" (transactions), for my campaignId, and see how much you got. compared to previous. (this will get added more and more, throughout test, for other payments.. so you check this as well now)
      const howManySupporters = await Statscampaign.count({
        where: { campaignId: campaignId },
      });

      if (prevHowManySupporters === howManySupporters) {
        throw new Error(
          "'how many supporters', doesn't work. transaction is not written in 'Statcampaign' table, and/or campaignId is not used to indentify for which campaign transaction is connected to. "
        );
      }

      // and now check couponcodes table, if it saves correctly as well
      const checkCouponTable = await Couponcode.findOne({
        where: { couponCode: "TESTU1" },
      });

      // coupon code, actually saves whole transaction how much it took. so 2034, is how much amount gets used in total. okay..
      if (
        checkCouponTable.spentAmount !== 2034 &&
        checkCouponTable.couponTimesUsed !== 1
      ) {
        throw new Error(
          `It shouldn't save anything in coupon table (so at least, not add any more value to it than previous transaction), as coupon is invalid. checkCouponTable.spentAmount is ${checkCouponTable.spentAmount}. checkCouponTable.couponTimesUsed is ${checkCouponTable.couponTimesUsed} `
        );
      }

      // so payment_status === "payment_status" && amount > 0, to know payment really worked fine
      if (
        paymentCheckProcessed.payment_status === "succeeded" &&
        paymentCheckProcessed.amount > 0
      ) {
        console.log(
          `payment of ${paymentCheckProcessed.amount}$, ${paymentCheckProcessed.payment_status}!`
        );
        return;
      } else {
        throw new Error(
          `payment didn't proceed through (not written in database). payment_id is '${paymentIdCheck.payment_id}' , so check it directly in MySQL database once again 'select * from statscampaigns where payment_id="<payment_id>";'. Delay in database is 5 seconds, before checking database once again, if payment went through. `
        );
      }
    });

    it("incorrect discount codes - Stripe - 349.32$ payment with TESTGL (global) (43%) coupon code (regular pay with credit card) (campaignId is not of real campaign)", async function () {
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
          amount: "349.32",
          campaignId,
          supporterName: `supporterName${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
          supporterEmail: `${generateRandomEmail()}`,
          supporterComment: "Go go go suporter coment test",
          separateDonationThruPage: true,
          discountCode: "TET75L",
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

      // ! + 43% of that , is for coupon code, national US, 10$
      if (!(prevDonatedAmountAH + 34932 === athleteCheckAgain.donatedAmount)) {
        throw new Error(
          `Previous amount '${prevDonatedAmountAH}' in athlete (table Users) is not same calculation what it should be. It's ${athleteCheck.donatedAmount}`
        );
      }

      // and last, check if "how many supporter" works, by just fetching from "Statscampaigns" (transactions), for my campaignId, and see how much you got. compared to previous. (this will get added more and more, throughout test, for other payments.. so you check this as well now)
      const howManySupporters = await Statscampaign.count({
        where: { campaignId: campaignId },
      });

      if (prevHowManySupporters === howManySupporters) {
        throw new Error(
          "'how many supporters', doesn't work. transaction is not written in 'Statcampaign' table, and/or campaignId is not used to indentify for which campaign transaction is connected to. "
        );
      }

      // and now check couponcodes table, if it saves correctly as well
      const checkCouponTable = await Couponcode.findOne({
        where: { couponCode: "TESTGL" },
      });

      if (
        checkCouponTable.spentAmount !== 49953 &&
        checkCouponTable.couponTimesUsed !== 1
      ) {
        throw new Error(
          `Didn't saved in coupon table (at least, not add to previous transaction) Spent amount is ${checkCouponTable.spentAmount}. couponTimesUsed is ${checkCouponTable.couponTimesUsed} `
        );
      }

      // so payment_status === "payment_status" && amount > 0, to know payment really worked fine
      if (
        paymentCheckProcessed.payment_status === "succeeded" &&
        paymentCheckProcessed.amount > 0
      ) {
        console.log(
          `payment of ${paymentCheckProcessed.amount}$, ${paymentCheckProcessed.payment_status}!`
        );
        return;
      } else {
        throw new Error(
          `payment didn't proceed through (not written in database). payment_id is '${paymentIdCheck.payment_id}' , so check it directly in MySQL database once again 'select * from statscampaigns where payment_id="<payment_id>";'. Delay in database is 5 seconds, before checking database once again, if payment went through. `
        );
      }
    });
  });

  describe("payments solely with coupon codes", () => {
    it("payment with only discount code alone, national code ", async function () {
      this.timeout(15000);

      // to check in user, if number of supporters increased
      const prevHowManySupporters = await Statscampaign.count({
        where: { campaignId: campaignId },
      });

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

      const res = await superagent
        .post("http://localhost:5000/payment/donateOnlyWithDiscountCode")
        .set("Content-Type", "application/json")
        .send({
          campaignId,
          supporterName: `supporterName${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
          supporterEmail: `${generateRandomEmail()}`,
          supporterComment: "Go go go suporter coment test",
          separateDonationThruPage: true,
          discountCode: "TESTU2",
        });

      if (res.status === 400) {
        throw new Error(" code is invalid ");
      } else if (res.status === 200) {
        await delay(5000);

        // it needs to check database again, for newest data
        const athleteCheckAgain = await Users.findOne({
          where: { email: campaignCheck.friendEmail },
        });

        if (!(prevDonatedAmountAH + 1034 === athleteCheckAgain.donatedAmount)) {
          // 10$, you see it as 1000 (last 2 digits are cents)
          throw new Error(
            `Previous amount '${prevDonatedAmountAH}' in athlete (table Users) is not same calculation what it should be. It's ${athleteCheck.donatedAmount}`
          );
        }

        const howManySupporters = await Statscampaign.count({
          where: { campaignId: campaignId },
        });

        if (prevHowManySupporters === howManySupporters) {
          throw new Error(
            "'how many supporters', doesn't work. transaction is not written in 'Statcampaign' table, and/or campaignId is not used to indentify for which campaign transaction is connected to. "
          );
        }

        return;
      }
    });

    it("invalid discount code - payment with only discount code alone, national code ", function (done) {
      superagent
        .post("http://localhost:5000/payment/donateOnlyWithDiscountCode")
        .set("Content-Type", "application/json")
        .send({
          campaignId,
          supporterName: `supporterName${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
          supporterEmail: `${generateRandomEmail()}`,
          supporterComment: "Go go go suporter coment test",
          separateDonationThruPage: true,
          discountCode: "TESU1",
        })
        .end(function (err, res) {
          if (res.status !== 400) {
            done(new Error("it should reject it, because code is invalid "));
          } else if (res.status === 400) {
            done();
          } else {
            done(err);
          }
        });
    });

    it("wrong discount code -payment with only discount code alone, national code ", function (done) {
      superagent
        .post("http://localhost:5000/payment/donateOnlyWithDiscountCode")
        .set("Content-Type", "application/json")
        .send({
          campaignId,
          supporterName: `supporterName${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
          supporterEmail: `${generateRandomEmail()}`,
          supporterComment: "Go go go suporter coment test",
          separateDonationThruPage: true,
          discountCode: "TE5WW1",
        })
        .end(function (err, res) {
          if (res.status !== 400) {
            done(new Error("it should reject it, because code is invalid "));
          } else if (res.status === 400) {
            done();
          } else {
            done(err);
          }
        });
    });

    it("using global code (shouldn't work)- payment with only discount code alone, global code ", function (done) {
      superagent
        .post("http://localhost:5000/payment/donateOnlyWithDiscountCode")
        .set("Content-Type", "application/json")
        .send({
          campaignId,
          supporterName: `supporterName${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
          supporterEmail: `${generateRandomEmail()}`,
          supporterComment: "Go go go suporter coment test",
          separateDonationThruPage: true,
          discountCode: "TESTGL",
        })
        .end(function (err, res) {
          if (res.status !== 400) {
            done(
              new Error(
                "it should reject it, because code is global code, and those shouldn't work "
              )
            );
          } else if (res.status === 400) {
            done();
          } else {
            done(err);
          }
        });
    });
  });


  describe("paying as first supporter (right after (that same supporter who made campaign) making campaign)", ()=> {


      
    it("Paying as first supporter (right after making campaign) - Stripe - Anonymous 10$ payment without any coupon codes (regular pay with credit card) (campaignId is not of real campaign)", async function () {
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
          supporterComment: "Paying as first supporter comment ",
          separateDonationThruPage: false,
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
      // ! it should create even for first supporter ! 
      const paymentIdCheck = await Campaign.findOne({
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
      const paymentCheckProcessed = await Campaign.findOne({
        where: { payment_id: paymentIntent.id },
      });

      // it needs to check database again, for newest data
      const athleteCheckAgain = await Users.findOne({
        where: { email: campaignCheck.friendEmail },
      });

      // console.log("ss"+athleteCheck.donatedAmount)

      // now, confirm, that donatedAmount (current previous), is same as one you get after
      // only if this is NOT the case, it throws error, and fails test
      if (!(prevDonatedAmountAH + 1000 === athleteCheckAgain.donatedAmount)) {
        // 10$, you see it as 1000 (last 2 digits are cents)
        throw new Error(
          `Previous amount '${prevDonatedAmountAH}' in athlete (table Users) is not same calculation what it should be. It's ${athleteCheck.donatedAmount}`
        );
      }

      // and last, check if "how many supporter" works, by just fetching from "Statscampaigns" (transactions), for my campaignId, and see how much you got. compared to previous. (this will get added more and more, throughout test, for other payments.. so you check this as well now)
      const howManySupporters = await Statscampaign.count({
        where: { campaignId: campaignId },
      });

      if (prevHowManySupporters === howManySupporters) {
        throw new Error(
          "'how many supporters', doesn't work. transaction is not written in 'Statcampaign' table, and/or campaignId is not used to indentify for which campaign transaction is connected to. "
        );
      }

      // so payment_status === "payment_status" && amount > 0, to know payment really worked fine
      try {
      if (

        paymentCheckProcessed.payment_status === "succeeded" &&
        athleteCheckAgain.donatedAmount > 35001919 // ! ovo samo. treba uvecati  (35001919, bude, kada sračuna sve prethodne). Da, > , jer ne treba biti isti..
      ) {
        console.log(
          `payment of ${athleteCheckAgain.amount}$, ${paymentCheckProcessed.payment_status}!`
        );
        return;
      }
    } catch(error) {
      console.log(`payment didn't proceed through (not written in database). payment_id is '${paymentIdCheck.payment_id}' , so check it directly in MySQL database once again 'select * from statscampaigns where payment_id="<payment_id>";'. Delay in database is 5 seconds, before checking database once again, if payment went through. `)
        throw new Error(error || error.message);
      }
    });


    

  it("Paying as first supporter (right after making campaign) - Stripe - 10.34$ payment without any coupon codes (regular pay with credit card) (campaignId is not of real campaign)", async function () {
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
        supporterName: `supporterName${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
        supporterEmail: `${generateRandomEmail()}`,
        supporterComment: "Go go go suporter coment test",
        separateDonationThruPage: false,
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
    const paymentIdCheck = await Campaign.findOne({
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
    const paymentCheckProcessed = await Campaign.findOne({
      where: { payment_id: paymentIntent.id },
    });

    // it needs to check database again, for newest data
    const athleteCheckAgain = await Users.findOne({
      where: { email: campaignCheck.friendEmail },
    });

    // console.log("ss"+athleteCheck.donatedAmount)

    // now, confirm, that donatedAmount (current previous), is same as one you get after
    // only if this is NOT the case, it throws error, and fails test
    if (!(prevDonatedAmountAH + 1034 === athleteCheckAgain.donatedAmount)) {
      // 10$, you see it as 1000 (last 2 digits are cents)
      throw new Error(
        `Previous amount '${prevDonatedAmountAH}' in athlete (table Users) is not same calculation what it should be. It's ${athleteCheck.donatedAmount}`
      );
    }

    // and last, check if "how many supporter" works, by just fetching from "Statscampaigns" (transactions), for my campaignId, and see how much you got. compared to previous. (this will get added more and more, throughout test, for other payments.. so you check this as well now)
    const howManySupporters = await Statscampaign.count({
      where: { campaignId: campaignId },
    });

    if (prevHowManySupporters === howManySupporters) {
      throw new Error(
        "'how many supporters', doesn't work. transaction is not written in 'Statcampaign' table, and/or campaignId is not used to indentify for which campaign transaction is connected to. "
      );
    }

    // so payment_status === "payment_status" && amount > 0, to know payment really worked fine
    if (
      paymentCheckProcessed.payment_status === "succeeded" &&
      athleteCheckAgain.donatedAmount > 35002919
    ) {
      console.log(
        `payment of ${athleteCheckAgain.donatedAmount}$, ${paymentCheckProcessed.payment_status}!`
      );
      return;
    } else {
      throw new Error(
        `payment didn't proceed through (not written in database). payment_id is '${paymentIdCheck.payment_id}' , so check it directly in MySQL database once again 'select * from statscampaigns where payment_id="<payment_id>";'. Delay in database is 5 seconds, before checking database once again, if payment went through. `
      );
    }
  });

  it("Paying as first supporter (right after making campaign) - Stripe - 348749.32 $ payment without any coupon codes (regular pay with credit card) (campaignId is not of real campaign)", async function () {
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
        supporterName: `supporterName${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
        supporterEmail: `${generateRandomEmail()}`,
        supporterComment: "Go go go suporter coment test",
        separateDonationThruPage: false,
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
    const paymentIdCheck = await Campaign.findOne({
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
    const paymentCheckProcessed = await Campaign.findOne({
      where: { payment_id: paymentIntent.id },
    });

    // it needs to check database again, for newest data
    const athleteCheckAgain = await Users.findOne({
      where: { email: campaignCheck.friendEmail },
    });

    // console.log("ss"+athleteCheck.donatedAmount)

    // now, confirm, that donatedAmount (current previous), is same as one you get after
    // only if this is NOT the case, it throws error, and fails test
    if (!(prevDonatedAmountAH + 34874932 === athleteCheckAgain.donatedAmount)) {
      // 10$, you see it as 1000 (last 2 digits are cents)
      throw new Error(
        `Previous amount '${prevDonatedAmountAH}' in athlete (table Users) is not same calculation what it should be. It's ${athleteCheck.donatedAmount}`
      );
    }

    // and last, check if "how many supporter" works, by just fetching from "Statscampaigns" (transactions), for my campaignId, and see how much you got. compared to previous. (this will get added more and more, throughout test, for other payments.. so you check this as well now)
    const howManySupporters = await Statscampaign.count({
      where: { campaignId: campaignId },
    });

    if (prevHowManySupporters === howManySupporters) {
      throw new Error(
        "'how many supporters', doesn't work. transaction is not written in 'Statcampaign' table, and/or campaignId is not used to indentify for which campaign transaction is connected to. "
      );
    }

    // so payment_status === "payment_status" && amount > 0, to know payment really worked fine
    if (
      paymentCheckProcessed.payment_status === "succeeded" &&
      athleteCheckAgain.donatedAmount > 35003953
    ) {
      console.log(
        `payment of ${athleteCheckAgain.donatedAmount}$, ${paymentCheckProcessed.payment_status}!`
      );
      return;
    } else {
      throw new Error(
        `payment didn't proceed through (not written in database). payment_id is '${paymentIdCheck.payment_id}' , so check it directly in MySQL database once again 'select * from statscampaigns where payment_id="<payment_id>";'. Delay in database is 5 seconds, before checking database once again, if payment went through. `
      );
    }
  });

  // with coupon (discount) codes
  it("Paying as first supporter (right after making campaign) - Stripe - 10.34$ payment with TESTU1 (national US) (10$) coupon code (regular pay with credit card) (campaignId is not of real campaign)", async function () {
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
        supporterName: `supporterName${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
        supporterEmail: `${generateRandomEmail()}`,
        supporterComment: "Go go go suporter coment test",
        separateDonationThruPage: false,
        discountCode: "TESTU1",
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
    const paymentIdCheck = await Campaign.findOne({
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
    const paymentCheckProcessed = await Campaign.findOne({
      where: { payment_id: paymentIntent.id },
    });

    // it needs to check database again, for newest data
    const athleteCheckAgain = await Users.findOne({
      where: { email: campaignCheck.friendEmail },
    });

    // console.log("ss"+athleteCheck.donatedAmount)

    // now, confirm, that donatedAmount (current previous), is same as one you get after
    // only if this is NOT the case, it throws error, and fails test
    // + 1000 , is for coupon code, national US, 10$
    if (
      !(prevDonatedAmountAH + 1034 + 1000 === athleteCheckAgain.donatedAmount)
    ) {
      // 10$, you see it as 1000 (last 2 digits are cents)
      throw new Error(
        `Previous amount '${prevDonatedAmountAH}' in athlete (table Users) is not same calculation what it should be. It's ${athleteCheck.donatedAmount}`
      );
    }

    // and last, check if "how many supporter" works, by just fetching from "Statscampaigns" (transactions), for my campaignId, and see how much you got. compared to previous. (this will get added more and more, throughout test, for other payments.. so you check this as well now)
    const howManySupporters = await Statscampaign.count({
      where: { campaignId: campaignId },
    });

    if (prevHowManySupporters === howManySupporters) {
      throw new Error(
        "'how many supporters', doesn't work. transaction is not written in 'Statcampaign' table, and/or campaignId is not used to indentify for which campaign transaction is connected to. "
      );
    }

    // and now check couponcodes table, if it saves correctly as well
    const checkCouponTable = await Couponcode.findOne({
      where: { couponCode: "TESTU1" },
    });

    // coupon code, actually saves whole transaction how much it took. so 2034, is how much amount gets used in total. okay..
    if (
      checkCouponTable.spentAmount !== 3034 &&
      checkCouponTable.couponTimesUsed !== 2
    ) {
      throw new Error(
        `Didn't saved in coupon table. Spent amount is ${checkCouponTable.spentAmount}. couponTimesUsed is ${checkCouponTable.couponTimesUsed} `
      );
    }

    // so payment_status === "payment_status" && amount > 0, to know payment really worked fine
    if (
      paymentCheckProcessed.payment_status === "succeeded" &&
      athleteCheckAgain.donatedAmount > 69878885
    ) {
      console.log(
        `payment of ${athleteCheckAgain.donatedAmount}$, ${paymentCheckProcessed.payment_status}!`
      );
      return;
    } else {
      throw new Error(
        `payment didn't proceed through (not written in database). payment_id is '${paymentIdCheck.payment_id}' , so check it directly in MySQL database once again 'select * from statscampaigns where payment_id="<payment_id>";'. Delay in database is 5 seconds, before checking database once again, if payment went through. `
      );
    }
  });

  it("Paying as first supporter (right after making campaign) -  Stripe - 349.32$ payment with TESTGL (global) (43%) coupon code (regular pay with credit card) (campaignId is not of real campaign)", async function () {
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
        amount: "349.32",
        campaignId,
        supporterName: `supporterName${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
        supporterEmail: `${generateRandomEmail()}`,
        supporterComment: "Go go go suporter coment test",
        separateDonationThruPage: false,
        discountCode: "TESTGL",
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
    const paymentIdCheck = await Campaign.findOne({
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
    const paymentCheckProcessed = await Campaign.findOne({
      where: { payment_id: paymentIntent.id },
    });

    // it needs to check database again, for newest data
    const athleteCheckAgain = await Users.findOne({
      where: { email: campaignCheck.friendEmail },
    });

    // console.log("ss"+athleteCheck.donatedAmount)

    // now, confirm, that donatedAmount (current previous), is same as one you get after
    // only if this is NOT the case, it throws error, and fails test

    // ! + 43% of that , is for coupon code, national US, 10$
    if (!(prevDonatedAmountAH + 49953 === athleteCheckAgain.donatedAmount)) {
      throw new Error(
        `Previous amount '${prevDonatedAmountAH}' in athlete (table Users) is not same calculation what it should be. It's ${athleteCheck.donatedAmount}`
      );
    }

    // and last, check if "how many supporter" works, by just fetching from "Statscampaigns" (transactions), for my campaignId, and see how much you got. compared to previous. (this will get added more and more, throughout test, for other payments.. so you check this as well now)
    const howManySupporters = await Statscampaign.count({
      where: { campaignId: campaignId },
    });

    if (prevHowManySupporters === howManySupporters) {
      throw new Error(
        "'how many supporters', doesn't work. transaction is not written in 'Statcampaign' table, and/or campaignId is not used to indentify for which campaign transaction is connected to. "
      );
    }

    // and now check couponcodes table, if it saves correctly as well
    const checkCouponTable = await Couponcode.findOne({
      where: { couponCode: "TESTGL" },
    });

    if (
      checkCouponTable.spentAmount !== 99906 &&
      checkCouponTable.couponTimesUsed !== 2
    ) {
      throw new Error(
        `Didn't saved in coupon table. Spent amount is ${checkCouponTable.spentAmount}. couponTimesUsed is ${checkCouponTable.couponTimesUsed} `
      );
    }

    // so payment_status === "payment_status" && amount > 0, to know payment really worked fine
    if (
      paymentCheckProcessed.payment_status === "succeeded" &&
      athleteCheckAgain.donatedAmount > 69880919
    ) {
      console.log(
        `payment of ${athleteCheckAgain.donatedAmount}$, ${paymentCheckProcessed.payment_status}!`
      );
      return;
    } else {
      throw new Error(
        `payment didn't proceed through (not written in database). payment_id is '${paymentIdCheck.payment_id}' , so check it directly in MySQL database once again 'select * from statscampaigns where payment_id="<payment_id>";'. Delay in database is 5 seconds, before checking database once again, if payment went through. `
      );
    }
  });

  })

  it("", async function () {
    // for easy access in database queries
    console.log(
      `Campaign is:  'select * from campaigns where campaignId="${campaignId}";' `
    );
    console.log(
      `Campaign stats (all transaction) is: 'select * from statscampaigns where campaignId="${campaignId}";' `
    );
    console.log(
      `Athlete email is: ${friendEmail}. 'select * from users where email="${friendEmail}";' `
    );

    return;
  });
});




// now with these new payments, we can check transaction history API endpoints
describe("check transaction history", () => {
  it("Get Campaign Details", function (done) {
    superagent
      .get("http://localhost:5000/listsData/campaignDetails")
      .set("Content-Type", "application/json")
      .query({
        campaignId,
      })
      .end(function (err, res) {
        if (res.status !== 200) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("Check Number of Supporters", function (done) {
    superagent
      .get("http://localhost:5000/listsData/howManySupportersCampaign")
      .set("Content-Type", "application/json")
      .query({
        campaignId,
      })
      .end(function (err, res) {
        if (res.status === 200 && res.body.count === 10) {
          done();
        } else if (res.body.count < 10) {
          throw new Error(
            `There's not 10 supporter, like it should be. It's: ${res.body.count} `
          );
        } else {
          done(err);
        }
      });
  });

  it("Get Last 3 Comments by Supporters", function (done) {
    superagent
      .get("http://localhost:5000/listsData/lastCommentsSupportersCampaign")
      .set("Content-Type", "application/json")
      .query({
        campaignId,
      })
      .end(function (err, res) {
        if (res.status === 200 && res.body.length <= 3) {
          done();
        } else {
          done(err);
        }
      });
  });

  it("Get Last 3 Transactions by Supporters", function (done) {
    superagent
      .get("http://localhost:5000/listsData/lastTransactionsSupportersCampaign")
      .set("Content-Type", "application/json")
      .query({
        campaignId,
      })
      .end(function (err, res) {
        if (res.status === 200 && res.body.length <= 3) {
          done();
        } else {
          done(err);
        }
      });
  });

  it("Get All Transactions", function (done) {
    superagent
      .get("http://localhost:5000/listsData/allTransactionsSupportersCampaign")
      .set("Content-Type", "application/json")
      .query({
        campaignId,
        limitA: 10,
        offset: 0,
      })
      .end(function (err, res) {
        if (res.status === 200) {
          console.log(`Number of transaction is: ${res.body.count}`);
          done();
        } else {
          done(err);
        }
      });
  });

  it("List All Campaigns", async function () {
    try {
      const res1 = await superagent
        .get("http://localhost:5000/listsData/listAllCampaigns")
        .set("Content-Type", "application/json")
        .query({
          isCelebrity: 0,
          campaignId,
          limitA: 10,
          offset: 0,
        });

      if (res1.status === 200) {
        console.log(
          `Number of campaigns for non-celebrity is: ${res1.body.count}`
        );
      } else {
        throw new Error("Error for number of campaigns for non-celebrity");
      }
    } catch (error) {
      throw new Error(error.message || error);
    }


      try {
        const res2 = await superagent
          .get("http://localhost:5000/listsData/listAllCampaigns")
          .set("Content-Type", "application/json")
          .query({
            isCelebrity: 1,
            campaignId,
            limitA: 10,
            offset: 0,
          });
  
        if (res2.status === 200) {
          console.log(
            `Number of campaigns for celebrity is: ${res2.body.count}`
          );
        } else {
          throw new Error("Error for number of campaigns for celebrity");
        }
      } catch (error) {
        throw new Error(error.message || error);
      }



  });
});
