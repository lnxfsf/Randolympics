const express = require("express");
const {
  makePayment,
  donateOnlyWithDiscountCode,
  confirmPaypalTransaction,
  tempPaymentBeforeStripe,
} = require("../controllers/paymentControllers");
const router = express.Router();




router.post("/makePayment", makePayment);

// donate only with coupon codes
router.post("/donateOnlyWithDiscountCode", donateOnlyWithDiscountCode);


// confirm paypal transaction
router.post("/confirmPaypalTransaction", confirmPaypalTransaction);


// temporary payment API, before implementing stripe, as we don't have Stripe/paypal where money will go
router.post("/tempPaymentBeforeStripe", tempPaymentBeforeStripe);


module.exports = router;
