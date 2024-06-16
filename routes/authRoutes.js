const express = require("express");
const { register, login, verify_token,verification_success } = require("../controllers/authControllers");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);



//da, i ovo mozes kao ovo gore, samo logiku zamenis, i bice ovo dobro ..  
router.get('/verify/:token', verify_token);

router.get('/verification-success', verification_success)
  



module.exports = router;
