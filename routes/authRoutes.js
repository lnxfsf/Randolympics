const express = require("express");
const { register, login, verify_token,verification_success, email_resend, forgot_password, reset_password_token, reset_password, update_user_data, update_rank_data, rankingTop50 } = require("../controllers/authControllers");
const router = express.Router();


router.post("/register", register);
router.post("/login", login);



// email confirmation 
router.get('/verify/:token', verify_token);
router.get('/verification-success', verification_success)
  
// email resend
router.post('/email_resend', email_resend);


// password recovery
router.post('/forgot_password', forgot_password)  // to this FE, they send a request to go to that email... here and check it. is the email confirmed, if not, he does not go further until he confirms the email he registered with..
router.get('/reset_password/:token', reset_password_token)  // here user, enters his new passowrd. with his :token he can enter his URL
router.post('/reset_password', reset_password) // Route to update the password


// for edit profile
router.post("/update_user_data", update_user_data)
router.post("/update_rank_data", update_rank_data)  // this is to update rank data, for normal Rank.. 


//TODO, this concerning rank, etc. should have it's own routes.. as it will be many. top50, and others... so in backend already, it eases frontend work.. 
// to get top50, only last 50 based on "ranking" column
router.get("/rankingTop50",rankingTop50)







module.exports = router;
