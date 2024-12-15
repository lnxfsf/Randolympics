const multer = require("multer");

const path = require("path");
const fs = require("fs");
const sharp = require('sharp');
const aws = require("aws-sdk");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");

const spacesEndpoint = new aws.Endpoint("https://fra1.digitaloceanspaces.com");
const s3 = new S3Client({
  endpoint: spacesEndpoint,
  region: "fra1",
  credentials: {
    accessKeyId: process.env.S3_BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.S3_BUCKET_SECRET_KEY,
  },
});

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
  /*  console.log("req.file" + req.file);
 console.log(req.file); */

  const file = req.file;
  const newFileName = uuidv4() + file.originalname; // we will get more random file name

 


  


  try {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg"
    ) {
      return res
        .status(400)
        .send({ message: "Only .png, .jpg, and .jpeg formats are allowed" });
    }


    let compressedImageBuffer;


    if (file.mimetype === "image/png") {
      // Compress PNG
      compressedImageBuffer = await sharp(file.buffer)
        .png({ compressionLevel: 9, quality: 80 }) 
        .toBuffer();
    } else {
      // Compress JPEG
      compressedImageBuffer = await sharp(file.buffer)
        .jpeg({ quality: 80 }) // Set JPEG quality to 80%
        .toBuffer();
    }





    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `profile_pictures/${newFileName}`,
      Body: compressedImageBuffer,
      ContentType: req.file.mimetype,
      ACL: "public-read",
    };

    const command = new PutObjectCommand(params);
    const data = await s3.send(command);

  
    

    res.json(newFileName);
  } catch (error) {
    console.error("Error uploading file:", error);
    res
      .status(500)
      .send({ message: "Error uploading file", error: error.message });
  }
};

const passport_picture_upload = async (req, res) => {
  const file = req.file;
  const newFileName = uuidv4() + file.originalname;

  try {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg"
    ) {
      return res
        .status(400)
        .send({ message: "Only .png, .jpg, and .jpeg formats are allowed" });
    }

    let compressedImageBuffer;


    if (file.mimetype === "image/png") {
      // Compress PNG
      compressedImageBuffer = await sharp(file.buffer)
        .png({ compressionLevel: 9, quality: 80 }) 
        .toBuffer();
    } else {
      // Compress JPEG
      compressedImageBuffer = await sharp(file.buffer)
        .jpeg({ quality: 80 }) // Set JPEG quality to 80%
        .toBuffer();
    }

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `passport_pictures/${newFileName}`,
      Body: compressedImageBuffer,
      ContentType: req.file.mimetype,
      ACL: "public-read",
    };

    const command = new PutObjectCommand(params);
    const data = await s3.send(command);

    res.json(newFileName);
  } catch (error) {
    console.error("Error uploading file:", error);
    res
      .status(500)
      .send({ message: "Error uploading file", error: error.message });
  }

  //pass the upload path. for profile_picture
  /*   const uploadPassport = createUpload("uploads/passport_pictures");
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
  }); */
};

/* const blogs_upcominggames_picture_upload = async (req, res) => {
  //pass the upload path. for profile_picture
  const uploadBlogUpcomingGame = createUpload("uploads/blogs/upcominggames");
  const uploadBlogUpcomingImage = uploadBlogUpcomingGame.single("image");

  uploadBlogUpcomingImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    // Everything went fine.
    const files = req.files;
    console.log(files);

    console.log(filename);

    res.json(filename);
  });
}; */

const blogs_news_picture_upload = async (req, res) => {
  const file = req.file;
  const newFileName = uuidv4() + file.originalname;

  try {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg"
    ) {
      return res
        .status(400)
        .send({ message: "Only .png, .jpg, and .jpeg formats are allowed" });
    }

    if (file.mimetype === "image/png") {
      // Compress PNG
      compressedImageBuffer = await sharp(file.buffer)
        .png({ compressionLevel: 9, quality: 80 }) 
        .toBuffer();
    } else {
      // Compress JPEG
      compressedImageBuffer = await sharp(file.buffer)
        .jpeg({ quality: 80 }) // Set JPEG quality to 80%
        .toBuffer();
    }

    
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `blogs/news/${newFileName}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: "public-read",
    };

    const command = new PutObjectCommand(params);
    const data = await s3.send(command);
  } catch (error) {
    console.error("Error uploading file:", error);
    res
      .status(500)
      .send({ message: "Error uploading file", error: error.message });
  }

  res.json(newFileName);
};

/* const blogs_economics_picture_upload = async (req, res) => {
  //pass the upload path. for profile_picture
  const uploadEconomicsNews = createUpload("uploads/blogs/economics");
  const uploadBlogEconomicsImage = uploadEconomicsNews.single("image");

  uploadBlogEconomicsImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    // Everything went fine.
    const files = req.files;
    console.log(files);

    console.log(filename);

    res.json(filename);
  });
}; */

const revertPassportPicture = async (req, res) => {
  // TODO, you'll need to send JWT token here, to make sure it is that user's file. first verify jwt token, and then check in database if it matches to his image filename he owns (for passport and profile picture). so we secure it this way, of unauthorized API requests

  const { filename } = req.body;

  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `passport_pictures/${filename}`,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    console.log(err.stack);
    console.error("Server error:", err);
    res.status(500).json({ message: err });
  }

  // find uploaded image..
  /*   const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    "passport_pictures",
    filename
  );
  try {
    if (fs.existsSync(filePath)) {
      // Remove the file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return res.status(500).json({ message: "Error deleting file" });
        }

        console.log(`File ${filename} deleted successfully`);
        res.status(200).json({ message: "File deleted successfully" });
      });
    } else {
      console.log(`File ${filename} does not exist`);
      res.status(404).json({ message: "File not found" });
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
  } */
};

const revertProfilePicture = async (req, res) => {
  // TODO, you'll need to send JWT token here, to make sure it is that user's file. first verify jwt token, and then check in database if it matches to his image filename he owns (for passport and profile picture). so we secure it this way, of unauthorized API requests

  const { filename } = req.body;

  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `profile_pictures/${filename}`,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    console.log(err.stack);
    console.error("Server error:", err);
    res.status(500).json({ message: err });
  }
  


  // find uploaded image..
/*   const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    "profile_pictures",
    filename
  );
  try {
    if (fs.existsSync(filePath)) {
      // Remove the file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return res.status(500).json({ message: "Error deleting file" });
        }

        console.log(`File ${filename} deleted successfully`);
        res.status(200).json({ message: "File deleted successfully" });
      });
    } else {
      console.log(`File ${filename} does not exist`);
      res.status(404).json({ message: "File not found" });
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
  } */
};

/* const revertBlogs_upcominggames_picture_upload = async (req, res) => {
  const { filename } = req.body;

  console.log("on stampa-------- da revertuje image");
  console.log(filename);

  // find uploaded image..
  const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    "blogs",
    "upcominggames",
    filename
  );
  try {
    if (fs.existsSync(filePath)) {
      // Remove the file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return res.status(500).json({ message: "Error deleting file" });
        }

        console.log(`File ${filename} deleted successfully`);
        res.status(200).json({ message: "File deleted successfully" });
      });
    } else {
      console.log(`File ${filename} does not exist`);
      res.status(404).json({ message: "File not found" });
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}; */

const revertBlogs_news_picture_upload = async (req, res) => {
  const { filename } = req.body;


  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `blogs/news/${filename}`,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    console.log(err.stack);
    console.error("Server error:", err);
    res.status(500).json({ message: err });
  }
  



  // find uploaded image..
/*   const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    "blogs",
    "news",
    filename
  );
  try {
    if (fs.existsSync(filePath)) {
      // Remove the file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return res.status(500).json({ message: "Error deleting file" });
        }

        console.log(`File ${filename} deleted successfully`);
        res.status(200).json({ message: "File deleted successfully" });
      });
    } else {
      console.log(`File ${filename} does not exist`);
      res.status(404).json({ message: "File not found" });
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
  } */



};

/* const revertBlogs_economics_picture_upload = async (req, res) => {
  const { filename } = req.body;

  // find uploaded image..
  const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    "blogs",
    "economics",
    filename
  );
  try {
    if (fs.existsSync(filePath)) {
      // Remove the file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return res.status(500).json({ message: "Error deleting file" });
        }

        console.log(`File ${filename} deleted successfully`);
        res.status(200).json({ message: "File deleted successfully" });
      });
    } else {
      console.log(`File ${filename} does not exist`);
      res.status(404).json({ message: "File not found" });
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}; */

module.exports = {
  profile_picture_upload,
  passport_picture_upload,
  revertProfilePicture,
  revertPassportPicture,

  blogs_news_picture_upload,
  revertBlogs_news_picture_upload,
};
