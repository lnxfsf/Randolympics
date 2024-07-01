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

const lastInRank = async () => {
  try {
    const latestUser = await User.findOne({
      attributes: ["ranking"],
      order: [["ranking", "DESC"]],
    });

    if (latestUser) {
      console.log("Latest ranking:", latestUser.ranking);
      return latestUser.ranking + 1;
      //so, it returns index, +1, than latest in rows.. (so "ranking" is never null value.. )
    } else {
      console.log("No users found."); // Handle case where no users exist
    }
  } catch (error) {
    console.error("Error finding latest ranking user:", error);
  }
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
    ranking: await lastInRank(), // he needs this, to complete this function, and return value..
    ranking_heavy: null,
    ranking_medium: null,
    ranking_low: null,
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

const update_rank_data = async (req, res) => {
  const { userId, originalRank, goingToRank } = req.body;

  await db.sequelize.sync();

  //this is the selected user... find by userId..
  const user = await User.findOne({
    where: { userId: userId },
  });

  if (user) {
    console.log("original rank je:" + originalRank);
    console.log("going to rank:" + goingToRank);

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
            where: { ranking: user.ranking + 1 },
          });

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
            where: { ranking: user.ranking - 1 },
          });

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
  } = req.body;

  await db.sequelize.sync();

  const user = await User.findOne({
    where: { email: original_email },
  });

  if (user) {
    let needsUpdate = false; // used as indicator, if we need to update or not
    const updatingObject = {};

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

  const votedFor = req.query.votedFor;

  console.log("primam user tip: " + user_type);

  // for user_type "GP" (on dropdown menu selection), bring back ONLY  1 element ! NO pagination !  (there won't be any..
  // as pagination, is just offset anyways... )

  // GP (and those management position, don't have filtering by M or F (buttons won't affect it ))
  // this, is also for these others, gives only one as in top, and all others are in Others..
  if (
    user_type === "GP" ||
    user_type === "LM" ||
    user_type === "ITM" ||
    user_type === "MM" ||
    user_type === "SM" ||
    user_type === "VM" ||
    user_type === "EM"
  ) {
    try {
      const topUsers = await User.findAll({
        where: {
          ranking: 1, //users, with ranking 1
          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
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
  } else if (user_type === "RS") {
    try {
      const topUsers = await User.findAll({
        where: {
          ranking: {
            [Op.lte]: 50, // Fetch users with ranking less than or equal to 50
          },
          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
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
  } else if (user_type === "NP") {
    try {
      // ! this is route for athletes, and referee & support. ONLY THEM can choose NP ! GP can't !!! so this is route we're gonna use
      // that means, we give back, ordered by "voting" ! we don't need "ranking", for NP selection
      // findOne, just one we need
      const topCurrentNP = await User.findAll({
        where: {
          //currentNP: true, // BRING BACK (to filter, only one row). that's currentNP. he will be above red line..

          userId: votedFor, // userId, of NP, he selected..

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
  } else {
    try {
      const topUsers = await User.findAll({
        where: {
          ranking: {
            [Op.lte]: 50, // Fetch users with ranking less than or equal to 50
          },
          user_type: user_type,

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
};

const otherUsers = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10
  const offset = parseInt(req.query.offset) || 0;
  const user_type = req.query.user_type; // for selection, (first filter..), to show AH users, or some others..

  const searchText = req.query.searchText;

  const genderFilter = req.query.genderFilter;
  // const categoryFilter = req.query.categoryFilter; // TODO, this is for category, heavy, medium, light.. but that's later...
  const votedFor = req.query.votedFor;

  if (
    user_type === "GP" ||
    user_type === "LM" ||
    user_type === "ITM" ||
    user_type === "MM" ||
    user_type === "SM" ||
    user_type === "VM" ||
    user_type === "EM"
  ) {
    try {
      const otherUsers = await User.findAll({
        where: {
          ranking: {
            [Op.gt]: 1, // Fetch users with ranking greater than 1
          },
          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
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
  } else if (user_type === "RS") {
    // for "Referee & support", we also use number, and don't discern between male and female ...
    try {
      const otherUsers = await User.findAll({
        where: {
          ranking: {
            [Op.gt]: 50, // Fetch users with ranking greater than 50
          },
          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
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
  } else if (user_type === "NP") {
    // ! this, is also, for NP, we need it's own route, as we will handle other stuff...
    try {
      const otherNPs = await User.findAll({
        where: {
          // everything that's not NP..  (as we don't go by ranking.. at all)
          // currentNP: false,

          userId: {
            [Op.not]: votedFor,
          },

          user_type: user_type,

          name: {
            [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
          },
        },
        order: [["votes", "DESC"]], // Sort by ranking ascending
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
    try {
      const otherUsers = await User.findAll({
        where: {
          ranking: {
            [Op.gt]: 50, // Fetch users with ranking greater than 50
          },
          user_type: user_type,

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
};




const currentNP = async (req, res) => {
  try {

    const currentNP = await User.findOne({
      where: {
        currentNP: true,
        user_type: "NP",
      },
    });


    return res.status(200).json(currentNP);

  }catch(error){
    res.status(500).json({ error: "Internal server error" });

  }


}

const team = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10
  const offset = parseInt(req.query.offset) || 0;
 
  const searchText = req.query.searchText;

  

  // you send this, by finding out, about your user, .. just by being signed up in there...
  // const genderFilter = req.query.genderFilter;


  const userId = req.query.userId; // this is to get current User, all data from him. 
  //  console.log(userId)

  // so, from FE, you send: "userId", searchText, offset, limit
  
  
  

  
  
   
  try {

    const currentUser = await User.findOne({
      where: {
        userId: userId,
      },
    });

    console.log("nasao je")
    console.log(currentUser)

    // based, on same country.. 
    const teamMates = await User.findAll({
      where: {
        
        user_type: currentUser.user_type,

        gender: currentUser.gender, // by same gender
        nationality: currentUser.nationality, // and same country


        name: {
          [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
        },
      },
      order: [["ranking", "ASC"]], // Sort by ranking ascending
      limit: limit,
      offset: offset,
    });


    res.json(teamMates);

  }catch(error){

  }


}




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

      // sad izvuče prethodni , i utvdi da li je doslo do promene, (ako nije, ne radi nista.. ako jeste onda radi nesto... ). tj. negacija, da izvrsi, ako je unique, novi entry..
      if (currentUser.votedForNPuserId !== NPuserId) {
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
              user_type: "NP",
            },
          });

          // you don't use selectedNP ! but 2nd, who have most votes... (as is not currentNP: false). okay, just the one with most votes, without,  currentNP: false
          const secondMostVotes = await User.findOne({
            where: {
              currentNP: false,

              user_type: "NP",
            },
            order: [["votes", "DESC"]],
          });

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

            await secondMostVotes.update({ currentNP: true });

            // and set status text, as he's currentNP.. (that's what he wants)
            await secondMostVotes.update({
              status: "Acting National President",
            });
            var date_now = new Date().toString(); //timestamp..
            await secondMostVotes.update({ status_date: date_now });
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


const resignFromCurrentPosition = async (req, res) => {


  const { userId, user_type } = req.body;



  try {
    await db.sequelize.sync();


     // so, it works only for NP (if he was actually currentNP)
    // TODO, later on, you do it for GP, as well (when signed user is GP.. ). when you implement his ..
   

    // this is for "NP"
    if(user_type == "NP"){

    
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






  }catch(error){
    console.log(error.message)
  }


  res.status(200).send("You resigned !");

}



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
};
