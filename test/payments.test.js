require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const superagent = require("superagent");
/* const mysql = require("mysql2/promise");
const dbConfig = require("../data/config"); */

const db = require("../models/database");

const Statscampaign = db.statscampaign;

const generateRandomEmail = () => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 4);

  return `user${randomString}${timestamp}@example.com`;
};

// Function to create a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("payments", () => {
  let randomEmail;

  //const campaignId = uuidv4();

  before(async () => {
    randomEmail = generateRandomEmail();
  });
  it("Anonymous 10$ payment without any donations (regular pay with credit card) (campaignId is not of real campaign)", async function () {
    this.timeout(15000);

    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    // Make the request to create the payment
    const res = await superagent
      .post("http://localhost:5000/payment/makePayment")
      .set("Content-Type", "application/json")
      .send({
        amount: "10",
        campaignId: "eecad191-2a6e-4dd7-9280-d85aec85f288",
        supporterName: "",
        supporterEmail: "",
        supporterComment: "",
        separateDonationThruPage: true,
        discountCode: "",
      });

    const { paymentIntent } = res.body;

    if (!paymentIntent) {
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
});
