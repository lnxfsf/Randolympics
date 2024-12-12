const express = require("express");
const {
  makePayment,
  donateOnlyWithDiscountCode,
  confirmPaypalTransaction,
  tempPaymentBeforeStripe,
  checkIfCouponValid,
} = require("../controllers/paymentControllers");
const router = express.Router();




router.post("/makePayment", makePayment);

// donate only with coupon codes
router.post("/donateOnlyWithDiscountCode", donateOnlyWithDiscountCode);


// confirm paypal transaction
router.post("/confirmPaypalTransaction", confirmPaypalTransaction);


router.post("/checkIfCouponValid", checkIfCouponValid);


// temporary payment API, before implementing stripe, as we don't have Stripe/paypal where money will go
router.post("/tempPaymentBeforeStripe", tempPaymentBeforeStripe);


module.exports = router;
