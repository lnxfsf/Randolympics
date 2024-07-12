// authentication server will require controller functions for user registration and login.
// These functions will handle user data and authentication logic

// ? ovo ovde je za email confirmation

const db = require("../models/database");
const User = db.users;
const Traffic = db.traffic;
const Op = db.Sequelize.Op;

const Sequelize = db.Sequelize; 

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

const lastInRank = async (user_type, insert_in_this, nationality, gender) => {
  console.log("tip user-a je:");
  console.log(user_type);

  try {
    if (insert_in_this) {
      /* 

    const latestUser = await User.findOne({
      attributes: ["rankingGP"],
      order: [["rankingGP", "DESC"]],
    });

    
    if (latestUser) {
      console.log("ovo je: "+ (parseInt(latestUser.rankingGP)+1))
      console.log(latestUser)
      return (parseInt(latestUser.rankingGP)+1);
    } */

      if (user_type == "AH") {
        // jeste ovde samo diras. to je vezano za "AH" samo..
        // also by user_type !!!

        const latestUser = await User.findOne({
          attributes: ["ranking"],
          where: {
            nationality: nationality,
            gender: gender,
            user_type: user_type
          },
          order: [["ranking", "DESC"]],
        });

        if (latestUser) {
          // ako je našao, onda uveca za +1, i to vraca.. (znači, ako je "AH", u "US", ima vec neki pre njega ranking=4, onda ovaj vraća 5, (to ono sto ce i upisati u OVAJ NAS SADA novi user ! )). jer to je nasao, najveci ranking, filtiran po nationality (country) ! (da, bice mnogo istih ranking, ali oni se po drzavama razlikuju, pa nece sada ono biti to problem..)
          return latestUser.ranking + 1;
        } else {
          // a ako nema nijedan takav user. znaci, nema nijedan user sa tim country (uglv, na to ce se svesti)
          // onda, treba da vrati broj 1 ranking ! DA ! jer, on ubacice ionako country u taj user !
          // i šta.. samo preostaje, da zna, šta on treba ubaciti u ranking.. ako nije našao ništa pre njega, znači, da nema takav user.. i mozes za ovaj što sada kreiramo, da vratis ranking: 1 , tako da nam bude ovaj onda.. (pa onda koristis dalje.. )
          return 1;
        }
      } else if (user_type == "GP") {
        const latestUser = await User.findOne({
          attributes: ["rankingGP"],
          order: [["rankingGP", "DESC"]],
        });

        if (latestUser) {
          console.log("ovo je: " + latestUser.rankingGP + 1);
          return latestUser.rankingGP + 1;
        }
      } else if (user_type == "NP") {
        const latestUser = await User.findOne({
          attributes: ["rankingNP"],
          order: [["rankingNP", "DESC"]],
        });

        if (latestUser) {
          return latestUser.rankingNP + 1;
        }
      } else if (user_type == "EM") {
        const latestUser = await User.findOne({
          attributes: ["rankingEM"],
          order: [["rankingEM", "DESC"]],
        });
        if (latestUser) {
          return latestUser.rankingEM + 1;
        }
      } else if (user_type == "ITM") {
        const latestUser = await User.findOne({
          attributes: ["rankingITM"],
          order: [["rankingITM", "DESC"]],
        });
        if (latestUser) {
          return latestUser.rankingITM + 1;
        }
      } else if (user_type == "MM") {
        const latestUser = await User.findOne({
          attributes: ["rankingMM"],
          order: [["rankingMM", "DESC"]],
        });
        if (latestUser) {
          return latestUser.rankingMM + 1;
        }
      } else if (user_type == "SM") {
        const latestUser = await User.findOne({
          attributes: ["rankingSM"],
          order: [["rankingSM", "DESC"]],
        });
        if (latestUser) {
          return latestUser.rankingSM + 1;
        }
      } else if (user_type == "VM") {
        const latestUser = await User.findOne({
          attributes: ["rankingVM"],
          order: [["rankingVM", "DESC"]],
        });
        if (latestUser) {
          return latestUser.rankingVM + 1;
        }
      } else if (user_type == "LM") {
        const latestUser = await User.findOne({
          attributes: ["rankingLM"],
          order: [["rankingLM", "DESC"]],
        });
        if (latestUser) {
          return latestUser.rankingLM + 1;
        }
      } else if (user_type == "RS") {
        const latestUser = await User.findOne({
          attributes: ["rankingRS"],
          where: { nationality: nationality, user_type: user_type },
          order: [["rankingRS", "DESC"]],
        });
        if (latestUser) {
          return latestUser.rankingRS + 1;
        } else {
          return 1;
        }
      }
    } else {
      // for that one, you just return 0 .. that's the value, it should have. you don't use it (as default it's)
      return 0;
    }

    /* if (latestUser) {
      // console.log("Latest ranking:", latestUser.ranking);
      return latestUser.ranking + 1;
      //so, it returns index, +1, than latest in rows.. (so "ranking" is never null value.. )
    } else {
      console.log("No users found."); // Handle case where no users exist
    } */
  } catch (error) {
    console.error("Error finding latest ranking user:", error);
  }
};

const register = async (req, res) => {



  var BASE_URL_BACKEND = process.env.BASE_URL_BACKEND;


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
    gender,
  } = req.body;

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt); //hash password

  var votes = 0;

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
    birthdate_private: 1,
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
    ranking: await lastInRank(user_type, user_type == "AH", nationality, gender), // he needs this, to complete this function, and return value.. E, jer ga čuva u "ranking". || da, ovo treba samo ti za "Athletes, da NP's mogu birati po drzavi koja i ide.. ". KREIRA. (da, počinje sa 1, ako nema entry za taj country.. ) || we only need nationality, for "AH", so we could use special ranking
    ranking_heavy: null,
    ranking_medium: null,
    ranking_low: null,

    // so, this is for all other users..
    rankingGP: await lastInRank(user_type, user_type == "GP", "", ""),
    rankingNP: await lastInRank(user_type, user_type == "NP", "", ""),
    rankingEM: await lastInRank(user_type, user_type == "EM", "", ""),
    rankingITM: await lastInRank(user_type, user_type == "ITM", "", ""),
    rankingMM: await lastInRank(user_type, user_type == "MM", "", ""),
    rankingSM: await lastInRank(user_type, user_type == "SM", "", ""),
    rankingVM: await lastInRank(user_type, user_type == "VM", "", ""),
    rankingLM: await lastInRank(user_type, user_type == "LM", "", ""),
    rankingRS: await lastInRank(user_type, user_type == "RS", nationality), // and for RS as well ofc..

    team: null,
    cryptoaddress,
    cryptoaddress_type,

    isVerified: false,
    verificationToken: generateVerificationToken(),
    gender,
    votes, // in mysql, default value is 0 , if this is empty..
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
      `<p>Click <a href="${BASE_URL_BACKEND}/auth/verify/${newUser.verificationToken}">here</a> to verify your email.</p>`
    );

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {

    //console.log("error zasto je: ")
    //console.log(error.message)

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
        res.status(401).json({
          message: "Email is not verified !",
          email: existingUser.email,
        });

        return;
      }

      // here, we encrypt password from POST (that gets encrypted), and compared to the one in database
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (passwordMatch) {
        // ! here we logged in. and now, write inside Traffic table,    (create random number for it's id..), "user_type", "nationality",  i onda samo: "numberOfLogins" INCREMENT , i tjt..
        // ! znači on search-uje, i ako ne nadje, kreira (to je update.. ako se ne varam..), i onda increment taj..

        // try to find that row, if there's no, then you need to create it. AND THEN, increment that value ! and that's it...
        const loginEntry = await Traffic.findOne({
          where: {
            user_type: existingUser.user_type, // yes, we need both , to find ! exact..
            nationality: existingUser.nationality,
          },
        });

        if (loginEntry) {
          await loginEntry.increment("numberOfLogins", { by: 1 });
        } else {
          // create that entry, if there's no found..
          // and increment in that (i mean, just put value as 1, because this is it's first entry, and to increment it immediatelly)
          const newLoginEntry = await Traffic.create({
            trafficHistoryId: uuidv4(),
            user_type: existingUser.user_type,
            nationality: existingUser.nationality,
            numberOfLogins: 1, // we already put 1, as this is our first immediatelly..
          });
        }

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
          passport_photo: existingUser.passport_photo,

          bio: existingUser.bio,
          cryptoaddress: existingUser.cryptoaddress,
          cryptoaddress_type: existingUser.cryptoaddress_type,

          email_private: existingUser.email_private,
          phone_private: existingUser.phone_private,
          weight_private: existingUser.weight_private,

          birthdate_private: existingUser.birthdate_private,

          ranking: existingUser.ranking,
          ranking_heavy: existingUser.ranking_heavy,
          ranking_medium: existingUser.ranking_medium,
          ranking_low: existingUser.ranking_low,
          team: existingUser.team,
          votedForNPuserId: existingUser.votedForNPuserId, //userId of NP they (user) voted for. (we have "votedFor", just to keep name, just in case.. )
          votedForGPuserId: existingUser.votedForGPuserId, // userId of GP (used by NP's only !)

          gender: existingUser.gender,

          passport_expiry: existingUser.passport_expiry,
          passportStatus: existingUser.passportStatus,
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




