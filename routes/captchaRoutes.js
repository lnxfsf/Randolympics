const express = require("express");
const router = express.Router();

// And separated the logic for handling requests into controllers.
const { verifyCaptcha } = require("../controllers/captchaController");

// route. after /controller
router.post("/verify", verifyCaptcha);

module.exports = router;
