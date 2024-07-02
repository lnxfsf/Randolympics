// this is, all for ranking..

const db = require("../models/database");
const User = db.users;
const Token = db.token;
const Op = db.Sequelize.Op;

const update_rank_data = async (req, res) => {
  const { userId, originalRank, goingToRank } = req.body;

  await db.sequelize.sync();

  //this is the selected user... find by userId..
  const user = await User.findOne({
    where: { userId: userId },
  });

  // you get user_type, here.. so to know which one to update, depending what user_type it is...
  const user_type = user.user_type;

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

        if (user_type === "AH") {
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
            await user.update(
              { ranking: user.ranking + 1 },
              { transaction: t }
            );

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop + 1;
          }
        } else if (user_type === "RS") {
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: { rankingRS: user.rankingRS + 1 },
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
            await user.update(
              { rankingRS: user.rankingRS + 1 },
              { transaction: t }
            );

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop + 1;
          }
        } else if (user_type === "EM") {
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: { rankingEM: user.rankingEM + 1 },
            });

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { rankingEM: user.rankingEM },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.increment('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            await user.update(
              { rankingEM: user.rankingEM + 1 },
              { transaction: t }
            );

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop + 1;
          }
        } else if (user_type === "NP") {
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: { rankingNP: user.rankingNP + 1 },
            });

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { rankingNP: user.rankingNP },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.increment('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            await user.update(
              { rankingNP: user.rankingNP + 1 },
              { transaction: t }
            );

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop + 1;
          }
        } else if (user_type === "VM") {
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: { rankingVM: user.rankingVM + 1 },
            });

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { rankingVM: user.rankingVM },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.increment('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            await user.update(
              { rankingVM: user.rankingVM + 1 },
              { transaction: t }
            );

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop + 1;
          }
        } else if (user_type === "SM") {
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: { rankingSM: user.rankingSM + 1 },
            });

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { rankingSM: user.rankingSM },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.increment('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            await user.update(
              { rankingSM: user.rankingSM + 1 },
              { transaction: t }
            );

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop + 1;
          }
        } else if (user_type === "MM") {
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: { rankingMM: user.rankingMM + 1 },
            });

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { rankingMM: user.rankingMM },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.increment('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            await user.update(
              { rankingMM: user.rankingMM + 1 },
              { transaction: t }
            );

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop + 1;
          }
        } else if (user_type === "ITM") {
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: { rankingITM: user.rankingITM + 1 },
            });

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { rankingITM: user.rankingITM },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.increment('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            await user.update(
              { rankingITM: user.rankingITM + 1 },
              { transaction: t }
            );

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop + 1;
          }
        } else if (user_type === "LM") {
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: { rankingLM: user.rankingLM + 1 },
            });

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { rankingLM: user.rankingLM },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.increment('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            await user.update(
              { rankingLM: user.rankingLM + 1 },
              { transaction: t }
            );

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop + 1;
          }
        } else if (user_type === "GP") {
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: { rankingGP: user.rankingGP + 1 },
            });

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { rankingGP: user.rankingGP },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.increment('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
           
           if(user.rankingGP !== 1){
            await user.update(
              { rankingGP: user.rankingGP + 1 },
              { transaction: t }
            );
          } else {
            // this is, for when we already have currentGP, we need to check, if NP actually can change GP right now. or after 4 yrs, or if he resigned..
            // and this means, user in question, used here is currentGP, so we can check... 

            const currentDate = new Date(); // current date
            const date_from_DB = new Date(user.currentGP_UpToDate)  // date from DB, so we can compare them..

          
            if (user.currentGP == false || currentDate > date_from_DB){
              // this means he's not president anymore, and resigned.. 
              // as well, only if we can change it (as we can't until 4yrs have passed)

              await user.update(
                { rankingGP: user.rankingGP + 1, currentGP: false  },
                { transaction: t }
              );
            } else {

              // should return something here, message now.. or just code, so to show something in there.. 


            }



          }

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop + 1;
          }
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

        if (user_type === "AH") {
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
            await user.update(
              { ranking: user.ranking - 1 },
              { transaction: t }
            );

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop - 1;
          }
        } else if (user_type === "RS") {
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: { rankingRS: user.rankingRS - 1 },
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
            await user.update(
              { rankingRS: user.rankingRS - 1 },
              { transaction: t }
            );

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop - 1;
          }
        } else if (user_type === "EM") {
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: { rankingEM: user.rankingEM - 1 },
            });

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { rankingEM: user.rankingEM },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.decrement('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            await user.update(
              { rankingEM: user.rankingEM - 1 },
              { transaction: t }
            );

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop - 1;
          }
        } else if (user_type === "NP") {
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: { rankingNP: user.rankingNP - 1 },
            });

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { rankingNP: user.rankingNP },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.decrement('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            await user.update(
              { rankingNP: user.rankingNP - 1 },
              { transaction: t }
            );

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop - 1;
          }
        } else if (user_type === "VM") {
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: { rankingVM: user.rankingVM - 1 },
            });

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { rankingVM: user.rankingVM },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.decrement('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            await user.update(
              { rankingVM: user.rankingVM - 1 },
              { transaction: t }
            );

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop - 1;
          }
        } else if (user_type === "SM") {
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: { rankingSM: user.rankingSM - 1 },
            });

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { rankingSM: user.rankingSM },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.decrement('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            await user.update(
              { rankingSM: user.rankingSM - 1 },
              { transaction: t }
            );

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop - 1;
          }
        } else if (user_type === "MM") {
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: { rankingMM: user.rankingMM - 1 },
            });

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { rankingMM: user.rankingMM },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.decrement('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            await user.update(
              { rankingMM: user.rankingMM - 1 },
              { transaction: t }
            );

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop - 1;
          }
        } else if (user_type === "ITM") {
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: { rankingITM: user.rankingITM - 1 },
            });

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { rankingITM: user.rankingITM },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.decrement('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            await user.update(
              { rankingITM: user.rankingITM - 1 },
              { transaction: t }
            );

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop - 1;
          }
        } else if (user_type === "LM") {
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: { rankingLM: user.rankingLM - 1 },
            });

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { rankingLM: user.rankingLM },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.decrement('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            await user.update(
              { rankingLM: user.rankingLM - 1 },
              { transaction: t }
            );

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop - 1;
          }
        } else if (user_type === "GP") {
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: { rankingGP: user.rankingGP - 1 },
            });

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { rankingGP: user.rankingGP },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.decrement('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            console.log("pre" + user.rankingGP);
            await user.update(
              { rankingGP: user.rankingGP - 1 },
              { transaction: t }
            );

            if (user.rankingGP == 1) {
              // +4 years from on.. NP can't vote new GP anymore..
              let date = new Date();  // TODO just test, with current date, if we pass today time, (or yesterday-s..)
              date.setFullYear(date.getFullYear() + 4);

              // so, we set it as true !
              await user.update(
                { currentGP: true, currentGP_UpToDate: date },
                { transaction: t }
              );
            }

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop - 1;
          }
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

// ! for fetching in list
const rankingTop50 = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10
  const offset = parseInt(req.query.offset) || 0;

  try {
    const topUsers = await User.findAll({
      where: {
        ranking: {
          [Op.lte]: 50, // Fetch users with ranking less than or equal to 50
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
};

const otherUsers = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10
  const offset = parseInt(req.query.offset) || 0;

  try {
    const otherUsers = await User.findAll({
      where: {
        ranking: {
          [Op.gt]: 50, // Fetch users with ranking greater than 50
        },
      },
      order: [["ranking", "ASC"]],
      limit: limit,
      offset: offset,
    });

    // on vraca ovo 100%
    res.json(otherUsers);
  } catch (error) {
    console.error("Error fetching top users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  update_rank_data,
  rankingTop50,
  otherUsers,
};
