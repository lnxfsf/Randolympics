const express = require("express");
const {
  makePayment,
  donateOnlyWithDiscountCode,
} = require("../controllers/paymentControllers");
const router = express.Router();



router.post("/makePayment", makePayment);

// donate only with coupon codes
router.post("/donateOnlyWithDiscountCode", donateOnlyWithDiscountCode);



module.exports = router;
