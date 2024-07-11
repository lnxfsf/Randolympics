


const express = require("express");
const { update_user_data, fetchLatestData , listAllUsers  } = require("../controllers/userControllers");
const router = express.Router();



// for edit profile
router.post("/update_user_data", update_user_data)

router.post("/fetchLatestData", fetchLatestData )


// listAllUsers... (for passport verification)
router.get("/listAllUsers", listAllUsers)




module.exports = router;
