const express = require("express");
const { register, login, verify_token, verification_success, 
    email_resend, forgot_password, reset_password_token, reset_password,
    campaignDoesUserExist,
    campaignIsSupporterPassCorrect,
    refreshToken,
    logout,
} = require("../controllers/authControllers");
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



// we need this for campaign, in order to check if there's already some ... (as well, not to create users, or ones that will be left, and not used in database)
router.get('/campaignDoesUserExist', campaignDoesUserExist)
router.get('/campaignIsSupporterPassCorrect',campaignIsSupporterPassCorrect)


// refresh jwt token
router.post("/refresh", refreshToken);
router.get("/logout", logout);



module.exports = router;
