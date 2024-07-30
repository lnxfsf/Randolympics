const multer = require("multer");
const path = require("path");
const fs = require('fs');


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




const profile_picture_upload = async (req, res) => {

  //pass the upload path. for profile_picture
  const uploadProfile = createUpload("uploads/profile_pictures");
  const uploadProfileImage = uploadProfile.single("image");

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


const passport_picture_upload = async (req, res) => {

  //pass the upload path. for profile_picture
  const uploadPassport = createUpload("uploads/passport_pictures");
  const uploadPassportImage = uploadPassport.single("image");


  uploadPassportImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    // Everything went fine.
    const files = req.files;
    console.log(files);

    console.log(filename);

    res.json(filename);
  });

}






const revertPassportPicture = async (req, res) => {

  const { filename } = req.body;

  console.log("on stampa-------- da revertuje image")
  console.log(filename)

  
  // find uploaded image..
  const filePath = path.join(__dirname, '..' , 'uploads', 'passport_pictures', filename);
  try {
    if (fs.existsSync(filePath)) {

      // Remove the file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return res.status(500).json({ message: 'Error deleting file' });
        }

        console.log(`File ${filename} deleted successfully`);
        res.status(200).json({ message: 'File deleted successfully' });
      });




    } else {
      console.log(`File ${filename} does not exist`);
      res.status(404).json({ message: 'File not found' });
    }

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }






}


const revertProfilePicture = async (req, res) => {

  const { filename } = req.body;

  console.log("on stampa-------- da revertuje image")
  console.log(filename)


  // find uploaded image..
  const filePath = path.join(__dirname, '..' , 'uploads', 'profile_pictures', filename);
  try {
    if (fs.existsSync(filePath)) {

      // Remove the file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return res.status(500).json({ message: 'Error deleting file' });
        }

        console.log(`File ${filename} deleted successfully`);
        res.status(200).json({ message: 'File deleted successfully' });
      });




    } else {
      console.log(`File ${filename} does not exist`);
      res.status(404).json({ message: 'File not found' });
    }

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }






}


module.exports = {
  profile_picture_upload,
  passport_picture_upload,
  revertProfilePicture,
  revertPassportPicture,

};
