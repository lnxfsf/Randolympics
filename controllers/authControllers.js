// authentication server will require controller functions for user registration and login.
// These functions will handle user data and authentication logic

// ? ovo ovde je za email confirmation

const db = require("../models/database");
const User = db.users;
const Token = db.token;
const Op = db.Sequelize.Op;
//onst bcrypt = require('bcrypt')
//const jwt = require('jsonwebtoken');

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

// When a user signs up, generate a unique verification token and save it in the database along with the user's email.
// When a user registers, you can call the generateVerificationToken function to create a token, save it to the database, and send it to the user's email address.
const generateVerificationToken = () => {
  return crypto.randomBytes(16).toString("hex");
};

const register = async (req, res) => {
  // TODO samo da pass values.. to je to... za sad... (kao i crypto isto, zavisno koji je... da zna.. (dodaj novi value koji tip crypto-a..))

  // TODO, you only haven't inserted "picture field", because I yet need to set image upload..
  // on ovde uzima varijable (znaci jako malo da izmenis i treba, samo da predjes sada na ORM, i mnogo lakse u buducnosti bice ti)
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

  // TODO, samo polja koja ne smeju biti prazna (osim weight, nebitno je.. ionako nece biti requirement u database)
  /*   if (!email || !password ) {
    res
      .status(400)
      .json({ error: "Email or Password fields cannot be empty!" });
    return;
  } else if (!user_type || !phone || !nationality) {
    //TODO, if you want, to separate error for each individual case. but that's later..
    res
    .status(400)
    .json({ error: "Check all that's required" });
    return;
  } */

  // hashuje password, i ovo isto normalno. nema jos uvek sql nista..
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt); //hash password

  // user objekat, i ovo ce on isto tako slati.. inače..
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

  //console.log("data iz FE je:" +  JSON.stringify(user_data))

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
    //console.log("New user created:", newUser);

    sendEmail(
      newUser.email,
      "Email Verification",
      `<p>Click <a href="http://localhost:5000/auth/verify/${newUser.verificationToken}">here</a> to verify your email.</p>`
    );
    // aha, pa da, ovo je kao samo običan link, da ide direktno do te rute...
    // treba   /auth/verify ruta da bude finalna...

    // da, znači, on koristi IP od OVOG servera !!! 5000 , tako i na web kad budes bio, isto ćeš.. tako..
    // samo u chrome mozes ukucati, da pokrene GET request za ovaj, i onda ga redirect negde drugde... na FE da prikazuje to kao...

    res.status(201).json({ message: "User created successfully!" });
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
    //res.status(500).json({ message: 'User verified' });
    //res.sendFile(path.join(__dirname, '../public/timeout.html'));

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

    console.log("korisnik je: " + user.name)

    if (user) {

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

    }




  } catch (error) {
    res.status(500).json({ error: error.message });
  }


}

const reset_password_token = async (req, res) => {
  const token = req.params.token; 


  try {
    await db.sequelize.sync();

    // Check if the token exists and is still valid
    const user = await User.findOne({ where: { verificationToken: token } });

    //da nema tog, user-a, ne bi slao ništa.. 
    if(user){
       // da, on radi post, u ovu drugu route, da resetuje password.. (premda ovo u FE ćeš srediti lako, al eto, da funkcionise samo makar.. pa sredices odma zatim)
    res.send(`<form method="post" action="/auth/reset_password"><input type="password" name="password" required><input type="hidden" name="token" value="${token}"><input type="submit" value="Reset Password"></form>`);

    }
   
  
  
  
  }catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal server error" });
  }


}


const reset_password = async (req, res) => {


  const { token, password } = req.body;


  try {
    await db.sequelize.sync();

    const user = await User.findOne({ where: { verificationToken: token } });
    
    if(user){

      console.log("email mu je:" + user.email);

      // treba da je šifruješ samo !!! 
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt); //hash password


      user.password = hashedPassword;


      user.verificationToken = null;

      await user.save();
      res.status(200).send('Password updated successfully');

    }else {
      res.status(404).send('Invalid or expired token');
    }
  




  }catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal server error" });
  }




}






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
      if (!existingUser.password) {
        res.status(401).json({ error: "Invalid credentials" });

        return;
      }

      // here, we encrypt password from POST (that gets encrypted), and compared to the one in database
      // i ovo ostaje isto...
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      // on ovde vraca json podatke, ne diras ovo nista..
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
  reset_password
};
