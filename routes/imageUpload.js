const express = require("express");
const {
  profile_picture_upload,
  passport_picture_upload,
} = require("../controllers/imageUploadControllers");
const router = express.Router();

// for profile picture upload
router.post("/profilePicture", profile_picture_upload);

// for passport upload
router.post("/passportPicture", passport_picture_upload);




// for accessing routes to there.. (and later on, in frontend, you define more routes). if it's for profile, then add on this: "/uploads/profile_pictures"
router.use("/profile_pics", express.static("uploads/profile_pictures"));
router.use("/passport_pics", express.static("uploads/passport_pictures"));



module.exports = router;
