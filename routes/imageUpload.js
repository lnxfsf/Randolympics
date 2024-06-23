const express = require("express");
const {
  profile_picture_upload,
} = require("../controllers/imageUploadControllers");
const router = express.Router();

// for profile picture upload
router.post("/profilePicture", profile_picture_upload);

// for accessing routes to there.. (and later on, in frontend, you define more routes). if it's for profile, then add on this: "/uploads/profile_pictures"
router.use("/uploads", express.static("uploads"));

module.exports = router;
