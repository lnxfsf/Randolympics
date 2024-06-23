const multer = require("multer");
const path = require("path");

let filename = "";

const createMulterStorage = (uploadPath) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      filename = Date.now() + path.extname(file.originalname);
      cb(null, filename);
    },
  });
};

const createUpload = (uploadPath) => {
  const storage = createMulterStorage(uploadPath);

  return multer({
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
};

//pass the upload path. for profile_picture
const uploadProfile = createUpload("uploads/profile_pictures");

const uploadProfileImage = uploadProfile.single("image");

const profile_picture_upload = async (req, res) => {
  uploadProfileImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    // Everything went fine.
    const files = req.files;
    console.log(files);

    console.log(filename);

    res.json(filename);
  });
};

module.exports = {
  profile_picture_upload,
};
