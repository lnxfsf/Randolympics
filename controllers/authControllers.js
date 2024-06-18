// authentication server will require controller functions for user registration and login.
// These functions will handle user data and authentication logic

// ? ovo ovde je za email confirmation

const db = require("../models/database");
const User = db.users;
const Token = db.token;
const Op = db.Sequelize.Op;

const sendEmail = require("../utils/sendEmail");

const crypto = require("crypto");

// ? ovo ovde je za email confirmation

const { v4: uuidv4 } = require("uuid");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

var path = require("path");

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// When a user signs up, generate a unique verification token and save it in the database with user email.
const generateVerificationToken = () => {
  return crypto.randomBytes(16).toString("hex");
};

const register = async (req, res) => {


  // on ovde uzima varijable
  const {
    user_type,
    email,
    email_private,
    password,
    name,
    phone,
    phone_private,
    nationality,
    weight,
    weight_private,
    bio,
    cryptoaddress,
    cryptoaddress_type,
    picture,
  } = req.body;


  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt); //hash password

  // user object, this is what we send to mysql 
  const user_data = {
    userId: uuidv4(),
    user_type,
    email,
    email_private,
    password: hashedPassword,
    name,
    name_verify: null,
    birthdate: null,
    birthdate_private: null,
    birthdate_verify: null,
    phone,
    phone_private,
    nationality,
    nationality_verify: null,
    weight,
    weight_private,
    picture,
    passport_photo: null,
    passport_expiry: null,
    passport_expiry_verify: null,
    bio,
    achievements: null,
    ranking: null,
    ranking_heavy: null,
    ranking_medium: null,
    ranking_low: null,
    team: null,
    cryptoaddress,
    cryptoaddress_type,

    isVerified: false,
    verificationToken: generateVerificationToken(),
  };


  try {
    await db.sequelize.sync();

    const userAlreadyExists = await User.findOne({
      where: { email: user_data.email },
    });

    if (userAlreadyExists) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Create a new user
    const newUser = await User.create(user_data);
  

    sendEmail(
      newUser.email,
      "Email Verification",
      `<p>Click <a href="http://localhost:5000/auth/verify/${newUser.verificationToken}">here</a> to verify your email.</p>`
    );
   

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const email_resend = async (req, res) => {
  const { email } = req.body;

  try {
    await db.sequelize.sync();

    const user = await User.findOne({
      where: { email: email },
    });

    sendEmail(
      user.email,
      "Email Verification",
      `<p>Click <a href="http://localhost:5000/auth/verify/${user.verificationToken}">here</a> to verify your email.</p>`
    );

    res.status(200).json({ message: "Email verification link resent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verification_success = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/verified.html"));
};

const verify_token = async (req, res) => {
  const token = req.params.token;

  try {
    await db.sequelize.sync();

    const user = await User.findOne({ where: { verificationToken: token } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isVerified = true;
    user.verificationToken = null;

    await user.save();
    console.log("user verified");
 

    return res.redirect("/auth/verification-success");
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal server error" });
  }
};

// password recover
const forgot_password = async (req, res) => {
  const { email } = req.body;

  try {
    await db.sequelize.sync();

    const user = await User.findOne({
      where: { email: email },
    });

    console.log("korisnik je: " + user.name);

    if (user && user.isVerified) {
      const token = generateVerificationToken();

      user.verificationToken = token;
      await user.save();

      console.log("password reset token saved in user");

      sendEmail(
        email,
        "Password Reset",
        `<p>Click <a href="http://localhost:5000/auth/reset_password/${token}">here</a> to reset your password.</p>`
      );

      //res.redirect(`/auth/reset_password/${token}`);
    } else {
      res.status(500).json({ message: "User didn't verified email !" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const reset_password_token = async (req, res) => {
  const token = req.params.token;

  try {
    await db.sequelize.sync();

    // Check if the token exists and is still valid
    const user = await User.findOne({ where: { verificationToken: token } });

    // if user don't exist. won't execute
    if (user) {
   
      res.send(`
      <html>
        <head>
            <style>
            body {
              font-family: 'Roboto', sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #f5f5f5;
            }
            form {
              background: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              display: flex;
              flex-direction: column;
              gap: 16px;
              width: 300px;
            }
            input[type="password"] {
              border: 1px solid #ccc;
              border-radius: 4px;
              padding: 10px;
              font-size: 16px;
              width: 100%;
              box-sizing: border-box;
              transition: border-color 0.3s;
            }
            input[type="password"]:focus {
              border-color: #3f51b5;
              outline: none;
            }
            input[type="hidden"] {
              display: none;
            }
            input[type="submit"] {
              background: #AF2626;
              color: white;
              border: none;
              border-radius: 4px;
              padding: 10px;
              font-size: 16px;
              cursor: pointer;
              transition: background-color 0.3s;
            }
            input[type="submit"]:hover {
              background-color: #8E1F1F;
            }
          </style>
        </head>
        <body>
          <form method="post" action="/auth/reset_password">
            <input type="password" name="password" placeholder="New Password" required>
            <input type="hidden" name="token" value="${token}">
            <input type="submit" value="Reset Password">
          </form>
        </body>
      </html>
    `);
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal server error" });
  }
};

const reset_password = async (req, res) => {
  const { token, password } = req.body;

  try {
    await db.sequelize.sync();

    const user = await User.findOne({ where: { verificationToken: token } });

    if (user) {
      console.log("email mu je:" + user.email);

      // hash password ! don't forget, and then send it
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt); //hash password

      user.password = hashedPassword;

      user.verificationToken = null;

      await user.save();
      res.status(200).send("Password updated successfully");
    } else {
      res.status(404).send("Invalid or expired token");
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ error: "Email or Password fields cannot be empty!" });
    return;
  }

  try {
    await db.sequelize.sync();

    const existingUser = await User.findOne({
      where: { email: email },
    });

    if (existingUser) {
      if (existingUser.isVerified) {
        if (!existingUser.password) {
          res.status(401).json({ message: "Invalid credentials" });

          return;
        }
      } else {
        res.status(401).json({ message: "Email is not verified !", email: existingUser.email });

        return;
      }

      // here, we encrypt password from POST (that gets encrypted), and compared to the one in database
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

     
      if (passwordMatch) {
        res.status(200).json({
          userId: existingUser.userId,
          user_type: existingUser.user_type,
          email: existingUser.email,
          access_token: generateAccessToken(existingUser.userId),

          name: existingUser.name,
          birthdate: existingUser.birthdate,
          phone: existingUser.phone,
          nationality: existingUser.nationality,
          weight: existingUser.weight,
          picture: existingUser.picture,
          bio: existingUser.bio,
          cryptoaddress: existingUser.cryptoaddress,
          cryptoaddress_type: existingUser.cryptoaddress_type,
        });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  verify_token,
  verification_success,
  forgot_password,
  reset_password_token,
  reset_password,
  email_resend,
};
