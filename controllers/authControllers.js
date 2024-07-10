// authentication server will require controller functions for user registration and login.
// These functions will handle user data and authentication logic

// ? ovo ovde je za email confirmation

const db = require("../models/database");
const User = db.users;
const Traffic = db.traffic;
const Op = db.Sequelize.Op;

const Sequelize = db.Sequelize; // ! this

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
          where: { nationality: nationality,
            gender: gender,
             user_type: user_type },
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

const fetchLatestData = async (req, res) => {
  const { userId } = req.body;
  // only if it's logged in, we will know it's userId, hence nobody can guess this route..

  try {
    await db.sequelize.sync();

    const existingUser = await User.findOne({
      where: { userId: userId },
    });

    if (existingUser) {
      res.status(200).json({
        userId: existingUser.userId,
        user_type: existingUser.user_type,
        email: existingUser.email,

        access_token: generateAccessToken(existingUser.userId), // ! just check, if you will have trouble logging in, but shouldn't be..

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
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
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


// ! vraca error, nije sve nasao..
const update_rank_data = async (req, res) => {
  const { userId, originalRank, goingToRank, user_type, nationality  } = req.body;

  console.log("primasssssssssss"+userId)

  console.log("primasssssssssss"+nationality)
  console.log("primasssssssssss"+ user_type) // OVO JE PROBLEM ! on dobija, current user_type ! ali treba ipak da prima, sa selected value !! dropdown !!


  await db.sequelize.sync();

  //this is the selected user... find by userId..
  const user = await User.findOne({
    where: { userId: userId },
  });

  var gender = user.gender;

  console.log("gender je:::::: "+gender)
  /* if(user){ */
     // just to get these variables.. we need it for ranking
    // var user_typeOfuserWereChanging = user.user_type; // like, so we can use it for ranking.. 
     //var nationalityOfuserWereChanging = user.nationality; // and by nationality. we need it for ranking, to filter by.. 
 

     
  /* } */

  if(user_type === "AH"){
    if (user) {
      console.log("original rank je:" + originalRank);
      console.log("going to rank AH:" + goingToRank);

      console.log("ovaj prvi ")



    

      // when athlete goes LOWER IN RANK (but that's calculated as going UP in rank NUMBER.. )
      // for ( >0 ), when it's positive number. i.e. to go up in rank number. (i.e. athlete goes lower in rank, from 2 to 5 .. )
      if ((goingToRank - originalRank) > 0) {
        var originalRankLoop = originalRank;

        console.log("onda vrsi ovo u prvoj if")
        // this is in case of error, so it doesn't write directly in database
        const t = await db.sequelize.transaction();

        try {

          // if it reached 1, and goingToRank is also being 1, then won't go furhter..
          while (originalRankLoop !== goingToRank) {

            console.log("zatim u ovaj loop:")

            let lowerUser = await User.findOne({
              where: { 
                // by these two, we can filter right ranking we need..
                nationality: nationality, 
                user_type: user_type,
                gender: gender,


                ranking: user.ranking + 1, // pronadje njemu gornji

              },
            });

            console.log("nasao je, upper user: "+lowerUser)

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { ranking: user.ranking },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.increment('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            await user.update({ ranking: user.ranking + 1 }, { transaction: t });
            

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop + 1;
          }

          await t.commit();
          return res.status(200).json({ message: "User rank updated" });
        } catch (error) {
          await t.rollback();
          return res.status(500).json({ error: error.message });
        }
      } else if ((goingToRank - originalRank) < 0) {
        // when athlete goes UPPER IN RANK (but that's calculated as going DOWN in rank NUMBER.. )
        // for ( <0 ), when it's negative number. i.e. to go down in rank number. (i.e. athlete goes up in rank, from 5 to 2 .. )

        console.log("izvrsava DRUGI if")


        var originalRankLoop = originalRank;

        // this is in case of error, so it doesn't write directly in database
        const t = await db.sequelize.transaction();

        try {
          // if it reached 1, and goingToRank is also being 1, then won't go furhter..
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: { 
                // by these two, we can filter right ranking we need..
                nationality: nationality, 
                user_type: user_type,
                gender: gender,
                
                
                ranking: user.ranking - 1 },
            });

            console.log("nasao je, lower user: "+lowerUser)

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { ranking: user.ranking },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.decrement('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            await user.update({ ranking: user.ranking - 1 }, { transaction: t });

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop - 1;
          }

          await t.commit();
          return res.status(200).json({ message: "User rank updated" });
        } catch (error) {
          await t.rollback();
          return res.status(500).json({ error: error.message });
        }
      }
    }
} else if (user_type === "RS"){

  // for RS, we use rankingRS !

  if (user) {
    console.log("original rank je:" + originalRank);
    console.log("going to rank RS:" + goingToRank);



  

    // when athlete goes LOWER IN RANK (but that's calculated as going UP in rank NUMBER.. )
    // for ( >0 ), when it's positive number. i.e. to go up in rank number. (i.e. athlete goes lower in rank, from 2 to 5 .. )
    if (goingToRank - originalRank > 0) {
      var originalRankLoop = originalRank;

      // this is in case of error, so it doesn't write directly in database
      const t = await db.sequelize.transaction();

      try {
        // if it reached 1, and goingToRank is also being 1, then won't go furhter..
        while (originalRankLoop !== goingToRank) {
          let lowerUser = await User.findOne({
            where: { 
              // by these two, we can filter right ranking we need..
              nationality: nationality, 
              user_type: user_type,


              rankingRS: user.rankingRS + 1, 

            },
          });

          //if there's none, nevermind, just go one number +1 then.. no problem...
          if (lowerUser) {
            await lowerUser.update(
              { rankingRS: user.rankingRS },
              { transaction: t }
            );
          }

          // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
          //await user.increment('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
          await user.update({ rankingRS: user.rankingRS + 1 }, { transaction: t });

          // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
          originalRankLoop = originalRankLoop + 1;
        }

        await t.commit();
        return res.status(200).json({ message: "User rank updated" });
      } catch (error) {
        await t.rollback();
        return res.status(500).json({ error: error.message });
      }
    } else if (goingToRank - originalRank < 0) {
      // when athlete goes UPPER IN RANK (but that's calculated as going DOWN in rank NUMBER.. )
      // for ( <0 ), when it's negative number. i.e. to go down in rank number. (i.e. athlete goes up in rank, from 5 to 2 .. )

      var originalRankLoop = originalRank;

      // this is in case of error, so it doesn't write directly in database
      const t = await db.sequelize.transaction();

      try {
        // if it reached 1, and goingToRank is also being 1, then won't go furhter..
        while (originalRankLoop !== goingToRank) {
          let lowerUser = await User.findOne({
            where: { 
              // by these two, we can filter right ranking we need..
              nationality: nationality, 
              user_type: user_type,
              
              
              rankingRS: user.rankingRS - 1 },
          });

          //if there's none, nevermind, just go one number +1 then.. no problem...
          if (lowerUser) {
            await lowerUser.update(
              { rankingRS: user.rankingRS },
              { transaction: t }
            );
          }

          // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
          //await user.decrement('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
          await user.update({ rankingRS: user.rankingRS - 1 }, { transaction: t });

          // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
          originalRankLoop = originalRankLoop - 1;
        }

        await t.commit();
        return res.status(200).json({ message: "User rank updated" });
      } catch (error) {
        await t.rollback();
        return res.status(500).json({ error: error.message });
      }
    }
  }
}


};

const update_user_data = async (req, res) => {
  // get data from FE
  const {
    original_email,

    name,
    phone,
    nationality,
    weight,
    cryptoaddress,
    //picture: uploadedFile,

    cryptoaddress_type,

    email_private,
    phone_private,
    weight_private,

    passport_photo,
    birthdate,
    birthdate_private,
    picture,
    bio,

    // this is when we are receiving from Validation Manager. we also need to check, if all values are true, so we can also have another variable "passportStatus". right, and we use this one, to allow/deny access to others, also use it as for showing status
    updating_from_VM, // or otherwise, it will change passportStatus... if we don't intend to 
    name_verify,
    birthdate_verify,
    nationality_verify,
    passport_expiry_verify,

    passport_expiry,

    passportLastValidatedRejected,

    isRejected, // then sets all 4 fields to null... (false)
  } = req.body;

  await db.sequelize.sync();

  const user = await User.findOne({
    where: { email: original_email },
  });

  if (user) {
    let needsUpdate = false; // used as indicator, if we need to update or not
    const updatingObject = {};

    if (passport_expiry !== user.passport_expiry) {
      updatingObject.passport_expiry = passport_expiry;
      needsUpdate = true;
    }

    // ? so this is for passport

    if (passportLastValidatedRejected !== user.passportLastValidatedRejected) {
      updatingObject.passportLastValidatedRejected =
        passportLastValidatedRejected;
      needsUpdate = true;
    }



  if(updating_from_VM){
      var passportStatus = "unvalidated";
      if (
        name_verify &&
        birthdate_verify &&
        nationality_verify &&
        passport_expiry_verify &&
        passport_expiry
      ) {
        var passportStatus = "validated";
      } else {
        var passportStatus = "unvalidated";
      }
    }
    
    

    if (isRejected === true) {
      passportStatus = "rejected"; // it will be updated in one below.. for this one..
      needsUpdate = true;

      // now set others at null
      updatingObject.name_verify = false;
      updatingObject.birthdate_verify = false;
      updatingObject.nationality_verify = false;
      updatingObject.passport_expiry_verify = null; // ! needs to remove date..
    }

    if (passportStatus !== user.passportStatus) {
      updatingObject.passportStatus = passportStatus;
      needsUpdate = true;
    }

    if (name_verify !== user.name_verify) {
      updatingObject.name_verify = name_verify;
      needsUpdate = true;
    }

    if (birthdate_verify !== user.birthdate_verify) {
      updatingObject.birthdate_verify = birthdate_verify;
      needsUpdate = true;
    }

    if (nationality_verify !== user.nationality_verify) {
      updatingObject.nationality_verify = nationality_verify;
      needsUpdate = true;
    }

    if (passport_expiry_verify !== user.passport_expiry_verify) {
      updatingObject.passport_expiry_verify = passport_expiry_verify;
      needsUpdate = true;
    }

    // ? so this is for passport

    // it can be empty, it will just make it empty..
    if (bio !== user.bio) {
      updatingObject.bio = bio;
      needsUpdate = true;
    }

    if (name && name !== user.name) {
      updatingObject.name = name;
      needsUpdate = true;
    }

    if (phone && phone !== user.phone) {
      updatingObject.phone = phone;
      needsUpdate = true;
    }

    if (nationality && nationality !== user.nationality) {
      updatingObject.nationality = nationality;
      needsUpdate = true;
    }

    if (weight && weight !== user.weight) {
      updatingObject.weight = weight;
      needsUpdate = true;
    }

    if (cryptoaddress && cryptoaddress !== user.cryptoaddress) {
      updatingObject.cryptoaddress = cryptoaddress;
      needsUpdate = true;
    }

    if (cryptoaddress_type && cryptoaddress_type !== user.cryptoaddress_type) {
      updatingObject.cryptoaddress_type = cryptoaddress_type;
      needsUpdate = true;
    }

    if (email_private !== user.email_private) {
      updatingObject.email_private = email_private;
      needsUpdate = true;
    }

    if (phone_private !== user.phone_private) {
      updatingObject.phone_private = phone_private;
      needsUpdate = true;
    }

    if (weight_private !== user.weight_private) {
      updatingObject.weight_private = weight_private;
      needsUpdate = true;
    }

    // for now, it won't delete older one, if it's null.. only through special field that's passed from FE (so I don't have to implement more complex structure for "Save passport photo", clickable text field )
    if (passport_photo && passport_photo !== user.passport_photo) {
      updatingObject.passport_photo = passport_photo;
      needsUpdate = true;

      // so, if we successfully uploaded, here we are adding that date !
      var passportUploadedDate = new Date();
      updatingObject.passportUploadedDate = passportUploadedDate;
    }

    if (birthdate && birthdate !== user.birthdate) {
      updatingObject.birthdate = birthdate;
      needsUpdate = true;
    }

    if (birthdate_private !== user.birthdate_private) {
      updatingObject.birthdate_private = birthdate_private;
      needsUpdate = true;
    }

    if (picture && picture !== user.picture) {
      updatingObject.picture = picture;
      needsUpdate = true;
    }

    if (needsUpdate) {
      try {
        await user.update(updatingObject);

        return res.status(200).json({ message: "User details updated" });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }

  try {
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ! for fetching in list
const rankingTop50 = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10
  const offset = parseInt(req.query.offset) || 0; //parseInt, is because we want it as integer
  const user_type = req.query.user_type; // for selection, (first filter..), to show AH users, or some others..

  const searchText = req.query.searchText;

  const genderFilter = req.query.genderFilter;
  // const categoryFilter = req.query.categoryFilter; // TODO, this is for category, heavy, medium, light.. but that's later...

  // this is for NP's selection by athletes
  const votedFor = req.query.votedFor;

  
  // this is for GP's selection by NP's (so it show above red line only one selected by user)
  const votedForGP = req.query.votedForGP;

  //console.log("primam user tip: " + user_type);

  const countryOfcurrentUserOnFrontend =
    req.query.countryOfcurrentUserOnFrontend; // with this, we can get country NP is from, and by that filter "AH"'s, and show only them, and thus, also ranking would be the same way..

  // for user_type "GP" (on dropdown menu selection), bring back ONLY  1 element ! NO pagination !  (there won't be any..
  // as pagination, is just offset anyways... )

  // GP (and those management position, don't have filtering by M or F (buttons won't affect it ))
  // this, is also for these others, gives only one as in top, and all others are in Others..
  if (user_type === "EM") {
    try {
      const topUsers = await User.findAll({
        where: {
          rankingEM: 1, //users, with ranking 1
          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
          },
        },
        order: [["rankingEM", "ASC"]],
        limit: limit,
        offset: offset,
      });

      res.json(topUsers);
    } catch (error) {
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (user_type === "RS") {
    if (countryOfcurrentUserOnFrontend) {
      try {
        const topUsers = await User.findAll({
          where: {
            rankingRS: {
              [Op.lte]: 50, // Fetch users with ranking less than or equal to 50
            },
            user_type: user_type,
            nationality: countryOfcurrentUserOnFrontend,

            name: {
              [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
            },
          },
          order: [["rankingRS", "ASC"]],
          limit: limit,
          offset: offset,
        });

        res.json(topUsers);
      } catch (error) {
        console.error("Error fetching top users:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  } else if (user_type === "NP") {
    try {

    

      // ! this is route for athletes, and referee & support. ONLY THEM can choose NP ! GP can't !!! so this is route we're gonna use
      // that means, we give back, ordered by "voting" ! we don't need "ranking", for NP selection
      // findOne, just one we need
      const topCurrentNP = await User.findAll({
        where: {
          //currentNP: true, // BRING BACK (to filter, only one row). that's currentNP. he will be above red line..

          userId: votedFor, // userId, of NP, he selected..
          nationality: countryOfcurrentUserOnFrontend, // this is for displaying list, right.. so... 

          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
          },
        },
        /*  order: [["votes", "DESC"]], */ // from highest votes, to least..
        /*  limit: limit, */
        /*  offset: offset, */
      });

      // we need to find percentage, for votes, how much each one have
      // Fetch all NP users
      const npUsers = await User.findAll({
        where: {
          user_type: user_type,
        },
      });

      // Calculate total votes, in all NPs
      const totalVotes = npUsers.reduce((sum, user) => sum + user.votes, 0);

      // posto je on array, samo udjes u njega da nadjes tog userId, i onda ce vratiti na kraju percentage ionako...
      const WithPercentage = topCurrentNP.map((user) => {
        const currentUser = npUsers.find(
          (npUser) => npUser.userId === user.userId
        );

        const userVotes = currentUser.votes;
        if (userVotes) {
          var percentage = (userVotes / totalVotes) * 100;
        } else {
          // don't divide by 0 , so we just return as 0 here
          var percentage = 0;
        }

        // this is where we add percent to object, variable..
        return {
          ...user.toJSON(), // Convert Sequelize instance to plain object
          userNPPercentage: percentage.toFixed(2), // to two points...
        };
      });

      res.json(WithPercentage);

      //res.json(topCurrentNP);
    } catch (error) {
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (user_type === "VM") {
    try {
      const topUsers = await User.findAll({
        where: {
          rankingVM: 1, //users, with ranking 1
          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
          },
        },
        order: [["rankingVM", "ASC"]],
        limit: limit,
        offset: offset,
      });

      res.json(topUsers);
    } catch (error) {
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (user_type === "SM") {
    try {
      const topUsers = await User.findAll({
        where: {
          rankingSM: 1, //users, with ranking 1
          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
          },
        },
        order: [["rankingSM", "ASC"]],
        limit: limit,
        offset: offset,
      });

      res.json(topUsers);
    } catch (error) {
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (user_type === "MM") {
    try {
      const topUsers = await User.findAll({
        where: {
          rankingMM: 1, //users, with ranking 1
          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
          },
        },
        order: [["rankingMM", "ASC"]],
        limit: limit,
        offset: offset,
      });

      res.json(topUsers);
    } catch (error) {
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (user_type === "ITM") {
    try {
      const topUsers = await User.findAll({
        where: {
          rankingITM: 1, //users, with ranking 1
          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
          },
        },
        order: [["rankingITM", "ASC"]],
        limit: limit,
        offset: offset,
      });

      res.json(topUsers);
    } catch (error) {
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (user_type === "LM") {
    try {
      const topUsers = await User.findAll({
        where: {
          rankingLM: 1, //users, with ranking 1
          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
          },
        },
        order: [["rankingLM", "ASC"]],
        limit: limit,
        offset: offset,
      });

      res.json(topUsers);
    } catch (error) {
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (user_type === "GP") {
    try {
      const topUsers = await User.findAll({
        where: {
          // ne, treba da vrati, taj selektovan, userId, sto dobi
          // rankingGP: 1, //users, with ranking 1

          userId: votedForGP,

          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
          },
        },
        order: [["rankingGP", "ASC"]],
        limit: limit,
        offset: offset,
      });

      console.log("kod selekcije GP on vrati");
      console.log(topUsers);

      res.json(topUsers);
    } catch (error) {
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // can't filter by anything if countryOfcurrentUserOnFrontend  is empty
    // this is route for Athletes !!!!

    if (countryOfcurrentUserOnFrontend) {
      try {
        const topUsers = await User.findAll({
          where: {
            ranking: {
              [Op.lte]: 50, // Fetch users with ranking less than or equal to 50
            },
            user_type: user_type,
            nationality: countryOfcurrentUserOnFrontend,

            name: {
              [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
            },

            gender: {
              [Op.like]: `%${genderFilter}%`,
            },
          },
          order: [["ranking", "ASC"]],
          limit: limit,
          offset: offset,
        });

        res.json(topUsers);
      } catch (error) {
        console.error("Error fetching top users:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
};

const otherUsers = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10
  const offset = parseInt(req.query.offset) || 0;
  const user_type = req.query.user_type; // for selection, (first filter..), to show AH users, or some others..

  const searchText = req.query.searchText;

  const genderFilter = req.query.genderFilter;
  // const categoryFilter = req.query.categoryFilter; // TODO, this is for category, heavy, medium, light.. but that's later...
  const votedFor = req.query.votedFor;

  const votedForGP = req.query.votedForGP; // for GP

  const countryOfcurrentUserOnFrontend =
    req.query.countryOfcurrentUserOnFrontend; // with this, we can get country NP is from, and by that filter "AH"'s, and show only them, and thus, also ranking would be the same way..

  if (user_type === "EM") {
    try {
      const otherUsers = await User.findAll({
        where: {
          rankingEM: {
            [Op.gt]: 1, // Fetch users with ranking greater than 1
          },
          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
          },
        },
        order: [["rankingEM", "ASC"]], // Sort by ranking ascending
        limit: limit,
        offset: offset,
      });

      //ne vraca nista..
      console.log("stampa" + otherUsers);
      res.json(otherUsers);
    } catch (error) {
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (user_type === "RS") {
    // for "Referee & support", we also use number, and don't discern between male and female ...

    if (countryOfcurrentUserOnFrontend) {
      try {
        const otherUsers = await User.findAll({
          where: {
            rankingRS: {
              [Op.gt]: 50, // Fetch users with ranking greater than 50
            },
            user_type: user_type,
            nationality: countryOfcurrentUserOnFrontend,

            name: {
              [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
            },
          },
          order: [["rankingRS", "ASC"]], // Sort by ranking ascending
          limit: limit,
          offset: offset,
        });

        //ne vraca nista..
        console.log("stampa" + otherUsers);
        res.json(otherUsers);
      } catch (error) {
        console.error("Error fetching top users:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  } else if (user_type === "LM") {
    // for "Referee & support", we also use number, and don't discern between male and female ...
    try {
      const otherUsers = await User.findAll({
        where: {
          rankingLM: {
            [Op.gt]: 1, // Fetch users with ranking greater than 50
          },
          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
          },
        },
        order: [["rankingLM", "ASC"]], // Sort by ranking ascending
        limit: limit,
        offset: offset,
      });

      //ne vraca nista..
      console.log("stampa" + otherUsers);
      res.json(otherUsers);
    } catch (error) {
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (user_type === "ITM") {
    // for "Referee & support", we also use number, and don't discern between male and female ...
    try {
      const otherUsers = await User.findAll({
        where: {
          rankingITM: {
            [Op.gt]: 1, // Fetch users with ranking greater than 50
          },
          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
          },
        },
        order: [["rankingITM", "ASC"]], // Sort by ranking ascending
        limit: limit,
        offset: offset,
      });

      //ne vraca nista..
      console.log("stampa" + otherUsers);
      res.json(otherUsers);
    } catch (error) {
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (user_type === "MM") {
    // for "Referee & support", we also use number, and don't discern between male and female ...
    try {
      const otherUsers = await User.findAll({
        where: {
          rankingMM: {
            [Op.gt]: 1, // Fetch users with ranking greater than 50
          },
          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
          },
        },
        order: [["rankingMM", "ASC"]], // Sort by ranking ascending
        limit: limit,
        offset: offset,
      });

      //ne vraca nista..
      console.log("stampa" + otherUsers);
      res.json(otherUsers);
    } catch (error) {
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (user_type === "SM") {
    // for "Referee & support", we also use number, and don't discern between male and female ...
    try {
      const otherUsers = await User.findAll({
        where: {
          rankingSM: {
            [Op.gt]: 1, // Fetch users with ranking greater than 50
          },
          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
          },
        },
        order: [["rankingSM", "ASC"]], // Sort by ranking ascending
        limit: limit,
        offset: offset,
      });

      //ne vraca nista..
      console.log("stampa" + otherUsers);
      res.json(otherUsers);
    } catch (error) {
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (user_type === "VM") {
    // for "Referee & support", we also use number, and don't discern between male and female ...
    try {
      const otherUsers = await User.findAll({
        where: {
          rankingVM: {
            [Op.gt]: 1, // Fetch users with ranking greater than 50
          },
          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
          },
        },
        order: [["rankingVM", "ASC"]], // Sort by ranking ascending
        limit: limit,
        offset: offset,
      });

      //ne vraca nista..
      console.log("stampa" + otherUsers);
      res.json(otherUsers);
    } catch (error) {
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (user_type === "GP") {
    // for "Referee & support", we also use number, and don't discern between male and female ...
    try {
      const otherUsers = await User.findAll({
        where: {
          /* rankingGP: {
            [Op.gt]: 1, // Fetch users with ranking greater than 50
          }, */
          userId: {
            [Op.not]: votedForGP,
          },

          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
          },
        },
        order: [["rankingGP", "ASC"]], // Sort by ranking ascending
        limit: limit,
        offset: offset,
      });

      //ne vraca nista..
      console.log("stampa" + otherUsers);
      res.json(otherUsers);
    } catch (error) {
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (user_type === "NP") {
    // ! this, is also, for NP, we need it's own route, as we will handle other stuff...
    try {
      const otherNPs = await User.findAll({
        where: {
          // everything that's not NP..  (as we don't go by ranking.. at all)
          // currentNP: false,

          nationality: countryOfcurrentUserOnFrontend,

          userId: {
            [Op.not]: votedFor,
          },

          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
          },
        },
        order: [
          ['votes', 'DESC'], // Sort by ranking descending (greatest first)
          ['name', 'ASC']    //  name in ascending order 
        ],
        
        
        
        

        limit: limit,
        offset: offset,
      });

      // we need to find percentage, for votes, how much each one have
      const npUsers = await User.findAll({
        where: {
          user_type: user_type,
        },
      });

      // Calculate total votes, in all NPs
      const totalVotes = npUsers.reduce((sum, user) => sum + user.votes, 0);

      const WithPercentage = otherNPs.map((user) => {
        const currentUser = npUsers.find(
          (npUser) => npUser.userId === user.userId
        );

        const userVotes = currentUser.votes;
        if (userVotes) {
          var percentage = (userVotes / totalVotes) * 100;
        } else {
          // don't divide by 0 , so we just return as 0 here
          var percentage = 0.0;
        }

        return {
          ...user.toJSON(),
          userNPPercentage: percentage.toFixed(2),
        };
      });

      res.json(WithPercentage);

      // res.json(otherNPs);
    } catch (error) {
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    if (countryOfcurrentUserOnFrontend) {
      try {
        const otherUsers = await User.findAll({
          where: {
            ranking: {
              [Op.gt]: 50, // Fetch users with ranking greater than 50
            },
            user_type: user_type,
            nationality: countryOfcurrentUserOnFrontend,

            name: {
              [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
            },
            gender: {
              [Op.like]: `%${genderFilter}%`,
            },
          },
          order: [["ranking", "ASC"]], // Sort by ranking ascending
          limit: limit,
          offset: offset,
        });

        //ne vraca nista..
        console.log("stampa" + otherUsers);
        res.json(otherUsers);
      } catch (error) {
        console.error("Error fetching top users:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
};

const currentNP = async (req, res) => {

  const nationality = req.query.nationality;

  // console.log("on stampa:" +nationality)

  try {
    const currentNP = await User.findOne({
      where: {
        currentNP: true,  // ! ovo treba videti, kako se selektuju (voting) za NP's..  
        nationality: nationality,
        user_type: "NP",
      },
    });

    // console.log("Stampa NP koji je:")
    

    return res.status(200).json(currentNP);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const team = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10
  const offset = parseInt(req.query.offset) || 0;

  const searchText = req.query.searchText;

  // you send this, by finding out, about your user, .. just by being signed up in there...
  // const genderFilter = req.query.genderFilter;

  const userId = req.query.userId; // this is to get current User, all data from him.
  //  console.log(userId)

  // so, from FE, you send: "userId", searchText, offset, limit

  const user_type = req.query.user_type; // ovo je, koji filtiras, koji trazis, user_type.. iz database-a.. // and that's by dropdown, what's selected to show. it's selectedRole

  const currentUserType = req.query.currentUserType; // we need this, as for current user, so we know if we need to filter by nationality or not (as not all of them require it, and some of them need it globally.. ). it's just NP's and AH, and RS

  const genderFilter = req.query.genderFilter;

  

  const categoryFilter = req.query.categoryFilter;

  const needGender = req.query.needGender;
  console.log("trazi li gender za RS (ne treba..)"+needGender)

  
  
  


  const nationality = req.query.nationality;

  try {
    const currentUser = await User.findOne({
      where: {
        userId: userId,
      },
    });

    

    console.log("tip je"+user_type)

    let filterConditions = {
      nationality: nationality,
      user_type: user_type, // zato NP, trazi po NP'evu ! al ne mora ovako. iz FE, salje on po selekciji..

      //nationality: currentUser.nationality, // and same country  || all managers can see all countries. "managers" see other managers.. of same type..

      name: {
        [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
      },
    };




    // yes, we also need it for RS as well..
    if (currentUserType === "AH" || currentUserType === "RS" || currentUserType === "NP") {
      filterConditions = {
        ...filterConditions,
        nationality: currentUser.nationality, // so for "AH" and "NP" , we filter by nationality. all other users, are not restricted by country. so they can see it globally.. (like managers !)
      };
    }

    if (needGender === "true") {
      filterConditions = {
        ...filterConditions,
        gender: {
          [Op.like]: `%${genderFilter}%`,
        },
      };
    }

    // only, 50 are in team, ! (if we are showing "AH" users !)
    
    if (user_type === "AH" ) {
      filterConditions = {
        ...filterConditions,
        ranking: {
          [Op.lte]: 50,
        },
      };
    }

    // also, applies for RS as well (but it uses another rankingRS ! )
    if(currentUserType === "RS"){
      filterConditions = {
        ...filterConditions,
        rankingRS: {
          [Op.lte]: 50,
        },
      };
    }

    console.log("ovo je ono sto treba ti:")
    console.log(filterConditions)

    // also different ranking depending on user type..
    //  treba po selection koji salje ! jer tako on vrši ta filtiranja..
    if (user_type === "AH") {
      var orderRankingByCurrentUser = [["ranking", "ASC"]]; // Sort by ranking ascending
    } else if (user_type == "GP") {
      var orderRankingByCurrentUser = [["rankingGP", "ASC"]];
    } else if (user_type == "NP") {
      var orderRankingByCurrentUser = [["rankingNP", "ASC"]];
    } else if (user_type == "EM") {
      var orderRankingByCurrentUser = [["rankingEM", "ASC"]];
    } else if (user_type == "ITM") {
      var orderRankingByCurrentUser = [["rankingITM", "ASC"]];
    } else if (user_type == "MM") {
      var orderRankingByCurrentUser = [["rankingMM", "ASC"]];
    } else if (user_type == "SM") {
      var orderRankingByCurrentUser = [["rankingSM", "ASC"]];
    } else if (user_type == "VM") {
      var orderRankingByCurrentUser = [["rankingVM", "ASC"]];
    } else if (user_type == "LM") {
      var orderRankingByCurrentUser = [["rankingLM", "ASC"]];
    } else if (user_type == "RS") {
      var orderRankingByCurrentUser = [["rankingRS", "ASC"]];
    }

    // based, on same country..
    const teamMates = await User.findAll({
      where: filterConditions,

      order: orderRankingByCurrentUser, // Sort by ranking ascending. also depends on currentUserType

      limit: limit,
      offset: offset,
    });

    


    res.json(teamMates);
  } catch (error) {}
};

const votingForNP = async (req, res) => {
  // this is for dropdown menu
  if (req.method === "GET") {
    const userId = req.query.user_type;

    // for "athletes", and their selection of NP, we just show votes... (and their percent.. ).

    try {
      const selectedVoteNP = await User.findOne({
        where: {
          userId: userId,
        },
      });

      //ne vraca nista..
      console.log("stampa sinovac" + selectedVoteNP);
      res.status(200).json(selectedVoteNP); // okej, vrati objekat tog, user-a, ali samo, prikaze za taj user, njegova kolona "votedFor"... (da, nemoj da se bakćeš sa localstorage kod ovoga.. lakse je ovako. ima sa NP rangiranjem jos da se radi... )
    } catch (error) {
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    const { /* votedFor, */ NPuserId, current_user_userId } = req.body;
    // votedFor , is .name , value..
    // cek, dobio je sada userId ! kako, nzm, bolje ne diraj !

    // userId, od NP, for who he voted for.. so we can work with it !

    try {
      await db.sequelize.sync();

      // ovo je current User da nadjes.. da samo kolonu azuriras mu
      const currentUser = await User.findOne({
        where: {
          userId: current_user_userId,
        },
      });




      // mozes dobiti nationality, odmah ovde, od tog currentUser, (koji i jeste na frontend.. )
      const currentUserNationality = currentUser.nationality;

      // ovo je NP da nadjes.. TO JE TRENUTNI KOJI KORISNIK IZABRAO !
      const selectedVoteNP = await User.findOne({
        where: {
          userId: NPuserId,
        },
      });

      const previousVoteNP = currentUser.votedForNPuserId
        ? await User.findOne({
            where: { userId: currentUser.votedForNPuserId },
          })
        : null;


        console.log("current user je:")
        console.log(currentUser.name)

        console.log("selected NP  je:")
        console.log(selectedVoteNP.name)


        //console.log("previousVoteNP od current User-a  je:")
        //console.log(previousVoteNP.name)



      // sad izvuče prethodni , i utvdi da li je doslo do promene, (ako nije, ne radi nista.. ako jeste onda radi nesto... ). tj. negacija, da izvrsi, ako je unique, novi entry..
      if (currentUser.votedForNPuserId !== NPuserId) {

        console.log(" on prodje prvi if")

        // sada handluje, promjenu. jer ovo vrši, kad god i ima neke promjene,u odnosu na sto je imao...
        if (selectedVoteNP) {
          // doesn't need to decrement previous vote, if it was null (for user who was just created.. )
          if (previousVoteNP) {
            await previousVoteNP.decrement("votes", { by: 1 });
          }

          // njemu (NP, koji je selektovan sada) uvecavas votes, za +1. i tjt..
          await selectedVoteNP.increment("votes", { by: 1 });

          // here, you check, if selectedVoteNP , have 130% more votes than currentNP (you find him based on flag.. )
          // you find who is currentNP now.. to try to replace him..
          
          const currentNP = await User.findOne({
            where: {
              currentNP: true,
              nationality: currentUserNationality, //  ! also, needs to be from same country. you check by same country only !! the selection 
              user_type: "NP",
            },
          });

          // you don't use selectedNP ! but 2nd, who have most votes... (as is not currentNP: false). okay, just the one with most votes, without,  currentNP: false
          var secondMostVotes = await User.findOne({
            where: {
              currentNP: false,
              nationality: currentUserNationality, //  ! also, needs to be from same country. you check by same country only !! the selection 
              user_type: "NP",
            },
            order: [["votes", "DESC"]],
          });


          console.log("nije nego ne nalazi second most votes !!! zato sve ostalo ne izvrsava: ")
          console.log(secondMostVotes)

            
          /* 
          if(secondMostVotes){
            // znači, ovo samo ako je prazan. pa onda mora da uzme neki random, samo da bi ono uporedio čisto..
            // eto, po imenu, alfabetski kao... 
            var secondMostVotes = await User.findOne({
              where: {
                currentNP: false,
                nationality: currentUserNationality, 
                user_type: "NP",
              },
              order: [["name", "ASC"]],
            });
          }

          console.log("a onda postaje: ")
          console.log(secondMostVotes) */


          //console.log("the one with most values:" + secondMostVotes);

          //console.log(currentNP);

          // if there's no currentNP, then make this selected one, as currentNP (just, precaution.)
          if (currentNP) {
            // now we check, if we have 130% more votes than currentNP ! (we just fetched him ! ). JUST BY the currentNP ! (not others.. )

            // Calculate the percentage increase
            /*    let voteDifference = selectedVoteNP.votes - currentNP.votes;   // 2 - 4 =  -2
            let percentageIncrease = (voteDifference / currentNP.votes) * 100;  // ((-2)*100). to je 300% više.. 
 */

            let voteDifference = secondMostVotes.votes - currentNP.votes; // 2 - 4 =  -2
            let percentageIncrease = (voteDifference / currentNP.votes) * 100; // ((-2)*100). to je 300% više..

            if (percentageIncrease >= 130) {
              // we swap second most voted NP, with currentNP (so currentNP NO MORE ! )

              /* selectedVoteNP.currentNP = true;
                currentNP.currentNP = false; */
              await secondMostVotes.update({ currentNP: true });

              // set first for secondMostVotes (as he's now, new currentNP ! )
              await secondMostVotes.update({
                status: "Acting National President",
              });
              var date_now = new Date().toString(); //timestamp..
              await secondMostVotes.update({ status_date: date_now });

              // only if he was actually currentNP before, otherwise, don't add these strings to it..
              if (currentNP.currentNP == true) {
                // set for previouse "currentNP" (as he's resigned now, replaced )
                await currentNP.update({ status: "Resigned" });
                var date_now = new Date().toString(); //timestamp..
                await currentNP.update({ status_date: date_now });
              }

              await currentNP.update({ currentNP: false });
            } else {
              /* selectedVoteNP.currentNP = false;
                currentNP.currentNP = true; */

              await secondMostVotes.update({ currentNP: false });

              await currentNP.update({ currentNP: true });

              /*  I don't think we need this here.. it's okay for currentNP, but this.. no.. as it's working on every selection..
             // 
             await currentNP.update({ status: "Acting National President" });
             var date_now = new Date().toString(); //timestamp..
             await currentNP.update({ status_date: date_now });


             // 
             await secondMostVotes.update({ status: "Resigned" });
             var date_now = new Date().toString(); //timestamp..
             await secondMostVotes.update({ status_date: date_now }); */
            }
          } else {
            // if there's no currentNP, then make this selected one, as currentNP (just, precaution.)
            /*  selectedVoteNP.currentNP = true;
            
            
            await selectedVoteNP.save(); */

          // !  SELECTED, THE JUST SELECTEB BY USER !!!
            // ! so this has to go, instead of secondMostVotes.update  , it needs to be    selectedVoteNP.update (so.. selectedVoteNP !! )
         /*   await secondMostVotes.update({ currentNP: true });

            // and set status text, as he's currentNP.. (that's what he wants)
            await secondMostVotes.update({
              status: "Acting National President",
            });
            var date_now = new Date().toString(); //timestamp..
            await secondMostVotes.update({ status_date: date_now });  */
         
            await selectedVoteNP.update({ currentNP: true });

            // and set status text, as he's currentNP.. (that's what he wants)
            await selectedVoteNP.update({
              status: "Acting National President",
            });
            var date_now = new Date().toString(); //timestamp..
            await selectedVoteNP.update({ status_date: date_now }); 
         
          }
        }

        // NE ČUVAJ ODMAH, nego moras da znaš i prethodni, votedFor koji je bio...
        //TODO, SACUVAJ IME, U TAJ CURRENT USER, KOJI JESTE SIGNED UP !
        // dobija ovde
        if (currentUser) {
          try {
            //MORAŠ DA ZNAŠ I userId , od NP, za koji si sačuvao !
            // da bi ovaj gore, mogao da ga smanji, pre nego poveca ovaj drugi !
            //currentUser.votedForNPuserId = NPuserId;

            await currentUser.update({
              votedForNPuserId: selectedVoteNP.userId,
            });
            //currentUser.votedFor = votedFor; // samo ime uzmes..

            await currentUser.update({ votedFor: selectedVoteNP.name });
          } catch (error) {
            console.log(error.message);
          }
        }

        res.status(200).json(selectedVoteNP); // okej, vrati objekat tog, user-a, ali samo, prikaze za taj user, njegova kolona "votedFor"... (da, nemoj da se bakćeš sa localstorage kod ovoga.. lakse je ovako. ima sa NP rangiranjem jos da se radi... )
      }
    } catch (error) {
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const votingForGP = async (req, res) => {
  if (req.method === "GET") {
    const userId = req.query.user_type;

    try {
      const selectedVoteGP = await User.findOne({
        where: {
          userId: userId,
        },
      });

      //ne vraca nista..

      res.status(200).json(selectedVoteGP); // okej, vrati objekat tog, user-a, ali samo, prikaze za taj user, njegova kolona "votedFor"... (da, nemoj da se bakćeš sa localstorage kod ovoga.. lakse je ovako. ima sa NP rangiranjem jos da se radi... )
    } catch (error) {
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    const { GPuserId, current_user_userId } = req.body;

    try {
      await db.sequelize.sync();

      // ovo je current User da nadjes.. da samo kolonu azuriras mu
      const currentUser = await User.findOne({
        where: {
          userId: current_user_userId,
        },
      });

      // ovo je GP da nadjes.. TO JE TRENUTNI KOJI KORISNIK IZABRAO !
      const selectedVoteGP = await User.findOne({
        where: {
          userId: GPuserId,
        },
      });

      // he get's this, by checking value of current user, if it's empty or not... aha..
      const previousVoteGP = currentUser.votedForGPuserId
        ? await User.findOne({
            where: { userId: currentUser.votedForGPuserId },
          })
        : null;

      // sad izvuče prethodni , i utvdi da li je doslo do promene, (ako nije, ne radi nista.. ako jeste onda radi nesto... ). tj. negacija, da izvrsi, ako je unique, novi entry..
      if (currentUser.votedForGPuserId !== GPuserId) {
        // sada handluje, promjenu. jer ovo vrši, kad god i ima neke promjene,u odnosu na sto je imao...
        if (selectedVoteGP) {
          // doesn't need to decrement previous vote, if it was null (for user who was just created.. )
          if (previousVoteGP) {
            await previousVoteGP.decrement("votesGP", { by: 1 });
          }

          // njemu (NP, koji je selektovan sada) uvecavas votes, za +1. i tjt..
          await selectedVoteGP.increment("votesGP", { by: 1 });

          // here, you check, if selectedVoteNP , have 130% more votes than currentGP (you find him based on flag.. )
          // you find who is currentGP now.. to try to replace him..
          const currentGP = await User.findOne({
            where: {
              currentGP: true,
              user_type: "GP",
            },
          });

          // you don't use selectedGP ! but 2nd, who have most votes... (as is not currentNP: false). okay, just the one with most votes, without,  currentNP: false
          const secondMostVotes = await User.findOne({
            where: {
              currentGP: false,

              user_type: "GP",
            },
            order: [["votesGP", "DESC"]],
          });

          //console.log("the one with most values:" + secondMostVotes);

          //console.log(currentNP);

          // if there's no currentNP, then make this selected one, as currentNP (just, precaution.)
          if (currentGP) {
            // now we check, if we have 130% more votes than currentNP ! (we just fetched him ! ). JUST BY the currentNP ! (not others.. )

            // Calculate the percentage increase
            /*    let voteDifference = selectedVoteNP.votes - currentNP.votes;   // 2 - 4 =  -2
            let percentageIncrease = (voteDifference / currentNP.votes) * 100;  // ((-2)*100). to je 300% više.. 
 */

            let voteDifference = secondMostVotes.votesGP - currentGP.votesGP; // 2 - 4 =  -2
            let percentageIncrease = (voteDifference / currentGP.votesGP) * 100; // ((-2)*100). to je 300% više..

            // he said, 20% more. so that's 120% more..
            if (percentageIncrease >= 120) {
              // we swap second most voted NP, with currentNP (so currentNP NO MORE ! )

              /* selectedVoteNP.currentNP = true;
                currentNP.currentNP = false; */
              await secondMostVotes.update({ currentGP: true });

              // set first for secondMostVotes (as he's now, new currentNP ! )
              await secondMostVotes.update({
                status: "Acting Global President",
              });
              var date_now = new Date().toString(); //timestamp..
              await secondMostVotes.update({ status_date: date_now });

              //TODO, not yet, but he also said, we need after 4 yrs.. we can't change it.. but for now, just keep this as it is.. for us to be simple, for NP's multiple countries..

              // only if he was actually currentGP before, otherwise, don't add these strings to it..
              if (currentGP.currentGP == true) {
                // set for previouse "currentGP" (as he's resigned now, replaced )
                await currentGP.update({ status: "Resigned" });
                var date_now = new Date().toString(); //timestamp..
                await currentGP.update({ status_date: date_now });
              }

              await currentGP.update({ currentGP: false });
            } else {
              /* selectedVoteNP.currentNP = false;
                currentNP.currentNP = true; */

              await secondMostVotes.update({ currentGP: false });

              await currentGP.update({ currentGP: true });
            }
          } else {
            // if there's no currentNP, then make this selected one, as currentNP (just, precaution.)
            /*  selectedVoteNP.currentNP = true;
            
            await selectedVoteNP.save(); */

            await secondMostVotes.update({ currentGP: true });

            // and set status text, as he's currentNP.. (that's what he wants)
            await secondMostVotes.update({
              status: "Acting Global President",
            });
            var date_now = new Date().toString(); //timestamp..
            await secondMostVotes.update({ status_date: date_now });
          }
        }

        if (currentUser) {
          try {
            //MORAŠ DA ZNAŠ I userId , od NP, za koji si sačuvao !
            // da bi ovaj gore, mogao da ga smanji, pre nego poveca ovaj drugi !
            //currentUser.votedForNPuserId = NPuserId;

            await currentUser.update({
              votedForGPuserId: selectedVoteGP.userId,
            });
            //currentUser.votedFor = votedFor; // samo ime uzmes..

            // this is just for name.. we don't need that.. in selection it does that automatically
            //await currentUser.update({ votedFor: selectedVoteNP.name });
          } catch (error) {
            console.log(error.message);
          }
        }

        res.status(200).json(selectedVoteGP); // okej, vrati objekat tog, user-a, ali samo, prikaze za taj user, njegova kolona "votedFor"... (da, nemoj da se bakćeš sa localstorage kod ovoga.. lakse je ovako. ima sa NP rangiranjem jos da se radi... )
      }
    } catch (error) {
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const resignFromCurrentPosition = async (req, res) => {
  const { userId, user_type } = req.body;

  try {
    await db.sequelize.sync();

    // so, it works only for NP (if he was actually currentNP)
    // TODO, later on, you do it for GP, as well (when signed user is GP.. ). when you implement his ..

    // this is for "NP"
    if (user_type == "NP") {
      const currentUserNP = await User.findOne({
        where: {
          currentNP: true,
          userId: userId,
        },
      });

      // the second one, with most votes, who wasn't currentNP, will become.. now, because currentNP is resigning
      const secondMostVotes = await User.findOne({
        where: {
          currentNP: false,

          user_type: "NP",
        },
        order: [["votes", "DESC"]],
      });

      // just swap them...
      await secondMostVotes.update({ currentNP: true });

      await secondMostVotes.update({
        status: "Acting National President",
      });
      var date_now = new Date().toString(); //timestamp..
      await secondMostVotes.update({ status_date: date_now });

      if (currentUserNP.currentNP == true) {
        // set for previouse "currentNP" (as he's resigned now, replaced )
        await currentUserNP.update({ status: "Resigned" });
        var date_now = new Date().toString(); //timestamp..
        await currentUserNP.update({ status_date: date_now });
      }

      await currentUserNP.update({ currentNP: false });
    }
  } catch (error) {
    console.log(error.message);
  }

  res.status(200).send("You resigned !");
};

const listAllUsers = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  const user_type = req.query.user_type; // for selection, (first filter..), to show AH users, or some others..

  const searchText = req.query.searchText;
  // const genderFilter = req.query.genderFilter;

  const nationality = req.query.nationality;

  const passportStatus = req.query.passportStatus;

  let filterConditions = {
    name: {
      [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
    },
  };

  if (user_type) {
    filterConditions = {
      ...filterConditions,
      user_type: {
        [Op.like]: `%${user_type}%`, //this is so it can search by name (that's for now)
      },
    };
  }

  if (nationality) {
    filterConditions = {
      ...filterConditions,
      nationality: nationality,
    };
  }

  if (passportStatus) {
    filterConditions = {
      ...filterConditions,
      passportStatus: {
        [Op.like]: `${passportStatus}`, //this is so it can search by that passport status
      },
    };
  }

  var ordersBy = [
    /*   [Sequelize.literal('FIELD(passportStatus, "unvalidated", "rejected", "validated")'), 'ASC'] */
    [Sequelize.literal(`passportStatus <> 'unvalidated'`), "ASC"],
    [Sequelize.literal(`passportStatus <> 'rejected'`), "ASC"],
    ["passportStatus", "ASC"],
  ];

  try {
    const listAllUsers = await User.findAll({
      where: filterConditions,

      // "unvalidated", have more priority, shows first. then "rejected", second.. and then "validated"
      order: ordersBy,

      limit: limit,
      offset: offset,
    });

    res.json(listAllUsers);
  } catch (error) {
    console.error("Error fetching top users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const listLoginTrafficHistory = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  const user_type = req.query.user_type; // for selection, (first filter..), to show AH users, or some others..

  const nationality = req.query.nationality;

  let filterCondition = {};

  // TODO, you should send, default, to filter by country NP currently is. and leave that as selected value in filter.. by default.. only on deletion, it removes. but then it shows a big mess.. like all countries, that's not what we want
  if (user_type) {
    filterCondition = {
      ...filterCondition,
      user_type: {
        [Op.like]: `%${user_type}%`, //this is so it can search by name (that's for now)
      },
    };
  }

  if (nationality) {
    filterCondition = {
      ...filterCondition,
      nationality: nationality,
    };
  }

  try {
    const listLoginTrafficHistory = await Traffic.findAll({
      where: filterCondition,

      // "unvalidated", have more priority, shows first. then "rejected", second.. and then "validated"
      order: [["numberOfLogins", "DESC"]], // from highest number of logins to lowest

      limit: limit,
      offset: offset,
    });

    console.log(listLoginTrafficHistory);

    res.json(listLoginTrafficHistory);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
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
  update_user_data,
  update_rank_data,

  rankingTop50,
  otherUsers,
  votingForNP,

  resignFromCurrentPosition,
  team,
  currentNP,
  votingForGP,
  listAllUsers,

  fetchLatestData,
  listLoginTrafficHistory,
};




