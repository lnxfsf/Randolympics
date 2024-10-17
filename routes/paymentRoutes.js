const express = require("express");
const {
  makePayment,
  donateOnlyWithDiscountCode,
  confirmPaypalTransaction,
} = require("../controllers/paymentControllers");
const router = express.Router();



router.post("/makePayment", makePayment);

// donate only with coupon codes
router.post("/donateOnlyWithDiscountCode", donateOnlyWithDiscountCode);


// confirm paypal transaction
router.post("/confirmPaypalTransaction", confirmPaypalTransaction);


module.exports = router;
