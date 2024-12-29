const db = require("../models/database");
const User = db.users;
const Campaign = db.campaign;

const Op = db.Sequelize.Op;

const Sequelize = db.Sequelize;

const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// When a user signs up, generate a unique verification token and save it in the database with user email.
const generateVerificationToken = () => {
  return crypto.randomBytes(16).toString("hex");
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

    athleteStatement,
    athleteStatus,

    familyName,
    lastName,

    middleName,

    isRejected, // then sets all 4 fields to null... (false)
  } = req.body;



  const t1 = await db.sequelize.transaction();

  const user = await User.findOne({
    where: { email: original_email },
    lock: t1.LOCK.UPDATE,
    transaction: t1,
  });

  const t2 = await db.sequelize.transaction();

  // first you search for athlete, if it's athlete, by trying User email, with friendEmail in Campaigns
  // original_email, when athlete tries to update for himself.
  // so, right now, we consider scenario, where we only update for athlete one, and we update his details in campaign

  let campaignUser;

  if (user.user_type === "AH") {
    campaignUser = await Campaign.findOne({
      where: { friendEmail: original_email },

      lock: t2.LOCK.UPDATE,
      transaction: t2,
    });
  } else if (user.user_type === "SPT") {
    // find, all that matches in all campaigns, we update only supporter information, when that supporter updates something on his profile..
    campaignUser = await Campaign.findAll({
      where: { supporterEmail: original_email },

      lock: t2.LOCK.UPDATE,
      transaction: t2,
    });

    // TODO And another scenario, is nothing to do with athlete, but supporter which is another user, changes his profile details, so, we update it here as well
    // TODO way to handle this scenario, is that, Supporter have their user_type SPT anyways, so we check if it's supporter or not, trying to update his profile details
    // TODO it will be found, for that user, but ...
    // TODO so not yet, we just have for athlete. we need to make multi-login, and then when SPT gets to login, we solve above problem here

    // TODO, something like this could work..

    // TODO, I tried something, with if cases, get back to this, later on... for SPT, if it works as expected
  }

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

    console.log("salje updating_from_VM za:" + updating_from_VM);

    if (updating_from_VM) {
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

    if (lastName && lastName !== user.lastName) {
      updatingObject.lastName = lastName;
      needsUpdate = true;
    }

    if (familyName && familyName !== user.familyName) {
      updatingObject.familyName = familyName;
      needsUpdate = true;
    }

    if (middleName && middleName !== user.middleName) {
      updatingObject.middleName = middleName;
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

    // da ne obrise prethodno..
    if (athleteStatement && athleteStatement !== user.athleteStatement) {
      updatingObject.athleteStatement = athleteStatement;
      needsUpdate = true;
    }

    if (athleteStatus && athleteStatus !== user.athleteStatus) {
      /*    var textAthleteStatus = "";

        switch (athleteStatus) {
          case "s1":
            textAthleteStatus = "Has not logged in yet";
          case "s2":
            textAthleteStatus = "Logged in but no status";
          case "s3":
            textAthleteStatus = "I'm 99% taking the challenge and going";
          case "s4":
            textAthleteStatus = "I'm most likely going";
          case "s5":
            textAthleteStatus = "I'm maybe going";
          case "s6":
            textAthleteStatus = "I'm definitely not going";
        }
           */

      updatingObject.athleteStatus = athleteStatus;
      needsUpdate = true;
    }

    if (needsUpdate) {
      try {
        await user.update(updatingObject, { transaction: t1 });

        if (user.user_type === "AH") {
          // Only include fields with valid values
          const validUpdatingObject = Object.entries(updatingObject).reduce(
            (acc, [key, value]) => {
              if (value !== undefined && value !== null && value !== "") {
                acc[key] = value;
              }
              return acc;
            },
            {}
          );

          /* // TODO, left to include in myprofile, to update these fields, when it's celebrity, but low priority, as we don't have celebrity, so no worry about this much 
            fb_link
            ig_link
            tw_link
 */

          if (campaignUser) {
            await campaignUser.update(
              {
                friendName: validUpdatingObject.name,
                friendMiddleName: validUpdatingObject.middleName,
                friendFamilyName: validUpdatingObject.familyName,
                friendLastName: validUpdatingObject.lastName,
                friendPhone: validUpdatingObject.phone,
                friendBirthdate: validUpdatingObject.birthdate,
                friendNationality: validUpdatingObject.nationality,
                friendImage: validUpdatingObject.picture,
              },
              { transaction: t2 }
            );
          }
        } else if (user.user_type === "SPT") {
          // Only include fields with valid values
          const validUpdatingObject = Object.entries(updatingObject).reduce(
            (acc, [key, value]) => {
              if (value !== undefined && value !== null && value !== "") {
                acc[key] = value;
              }
              return acc;
            },
            {}
          );

          // TODO: supporterComment:  , not yet implemented, will implement once you make supporter account, and deal with it. so you add field for it

          if (campaignUser) {
            // It will iterate over each campaign user and update it
            for (const campaignUserT of campaignUser) {
              await campaignUserT.update(
                {
                  supporterName: validUpdatingObject.name,
                  supporterPhone: validUpdatingObject.phone,
                },
                { transaction: t2 }
              );
            }
          }
        }

        await t1.commit();
        await t2.commit();

        return res.status(200).json({ message: "User details updated" });
      } catch (error) {
        await t1.rollback();
        await t2.rollback();
        return res.status(500).json({ error: error.message });
      }
    }
  }

  try {
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const fetchLatestData = async (req, res) => {
  const { userId } = req.body;
  // only if it's logged in, we will know it's userId, hence nobody can guess this route..

  try {
    const existingUser = await User.findOne({
      where: { userId: userId },
    });

    console.log("user id fetch latest je: " + userId);
    console.log(existingUser);

    if (existingUser) {
      res.status(200).json({
        userId: existingUser.userId,
        user_type: existingUser.user_type,
        email: existingUser.email,

        access_token: generateAccessToken(existingUser.userId), // ! just check, if you will have trouble logging in, but shouldn't be..

        name: existingUser.name,
        birthdate: existingUser.birthdate,
        middleName: existingUser.middleName,

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

        athleteStatement: existingUser.athleteStatement,
        athleteStatus: existingUser.athleteStatus,

        lastName: existingUser.lastName,
        familyName: existingUser.familyName,



        fb_link: existingUser.fb_link,
        ig_link: existingUser.ig_link,
        tw_link: existingUser.tw_link,
        tt_link: existingUser.tt_link,
        yt_link: existingUser.yt_link,



      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
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
    const listAllUsers = await User.findAndCountAll({
      where: filterConditions,

      // "unvalidated", have more priority, shows first. then "rejected", second.. and then "validated"
      order: ordersBy,

      limit: limit,
      offset: offset,
    });

    res.status(200).json(listAllUsers);
  } catch (error) {
    console.error("Error fetching top users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.body;

  try {
    await User.destroy({
      where: {
        userId: userId,
      },
    });

    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ error: error });
  }
};

module.exports = {
  update_user_data,
  fetchLatestData,
  listAllUsers,
  deleteUser,
};
