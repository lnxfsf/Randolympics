const express = require("express");
const { register, login, verify_token } = require("../controllers/authControllers");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);



//da, i ovo mozes kao ovo gore, samo logiku zamenis, i bice ovo dobro ..  
router.get('/verify/:token', verify_token);
  



module.exports = router;
