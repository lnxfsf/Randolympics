const express = require("express");
const { register, login, verify_token,verification_success, forgot_password, reset_password_token, reset_password } = require("../controllers/authControllers");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);



// email confirmation 
router.get('/verify/:token', verify_token);
router.get('/verification-success', verification_success)
  

// password recovery
router.post('/forgot_password', forgot_password)  // na ovaj FE salje, zahtev, da na taj email ide.. ovde i proverava. da li je email potvrdjen, ako nije, on ne ide dalje dok ne potvrdi email s kojim se registrovao..
router.get('/reset_password/:token', reset_password_token)
router.post('/reset_password', reset_password)


// Route to update the password




module.exports = router;
