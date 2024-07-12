


const express = require("express");
const { update_user_data, fetchLatestData , listAllUsers, deleteUser  } = require("../controllers/userControllers");
const router = express.Router();



// for edit profile
router.post("/update_user_data", update_user_data)

router.post("/fetchLatestData", fetchLatestData )


// listAllUsers... (for passport verification)
router.get("/listAllUsers", listAllUsers)



// delete user profile... 
router.post("/deleteUser", deleteUser)


module.exports = router;
