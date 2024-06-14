const express = require("express");

const router = express.Router();

let filename = "";

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    filename = Date.now() + path.extname(file.originalname);

    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,

  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const uploadImages = upload.single("image");

router.post("/upload", async (req, res) => {
  uploadImages(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    // Everything went fine.
    const files = req.files;
    console.log(files);

    console.log(filename);

    res.json(filename);
  });
});

router.use("/uploads", express.static("uploads"));

module.exports = router;
