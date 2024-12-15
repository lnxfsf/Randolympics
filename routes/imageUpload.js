const express = require("express");

const multer = require("multer");
const path = require("path");
const fs = require("fs");


const {
  profile_picture_upload,
  passport_picture_upload,
  revertProfilePicture,
  revertPassportPicture,
  blogs_news_picture_upload,
  revertBlogs_news_picture_upload,
} = require("../controllers/imageUploadControllers");
const router = express.Router();



// middleware for file upload multer, so it knows what to do with request when it's image
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

upload.single("image");



// for profile picture upload
router.post("/profilePicture", upload.single("image"), profile_picture_upload);



// for passport upload
router.post("/passportPicture", upload.single("image"), passport_picture_upload);


// ! delete when you fix news
//  for upcoming games, blog
/* router.post(
  "/blogs_upcominggames_picture_upload",
  blogs_upcominggames_picture_upload
);
router.delete(
  "/revertBlogs_upcominggames_picture_upload",
  revertBlogs_upcominggames_picture_upload
); */

router.delete("/revertProfilePicture", revertProfilePicture);
router.delete("/revertPassportPicture", revertPassportPicture);

// for accessing routes to there.. (and later on, in frontend, you define more routes). if it's for profile, then add on this: "/uploads/profile_pictures"
// won't be needing anymore, everything stored in S3 digitalocean
/* router.use("/profile_pics", express.static("uploads/profile_pictures"));
router.use("/passport_pics", express.static("uploads/passport_pictures")); */


// for news blog
router.post("/blogs_news_picture_upload", upload.single("image"), blogs_news_picture_upload);
router.delete(
  "/revertBlogs_news_picture_upload",
  revertBlogs_news_picture_upload
);

// for economics blog
/* router.post("/blogs_economics_picture_upload", blogs_economics_picture_upload);
router.delete(
  "/revertBlogs_economics_picture_upload",
  revertBlogs_economics_picture_upload
); */

module.exports = router;
