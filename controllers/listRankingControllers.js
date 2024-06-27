
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

  

// ! for fetching in list
const rankingTop50 = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10
    const offset = parseInt(req.query.offset) || 0;
  
    try {
      const topUsers = await User.findAll({
          where: {
              ranking: {
                  [Op.lte]: 50 // Fetch users with ranking less than or equal to 50
              }
          },
          order: [['ranking', 'ASC']], 
          limit: limit,
          offset: offset
      });
  
      res.json(topUsers);
  
  } catch (error) {
    console.error('Error fetching top users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
  }
  
  
  const otherUsers = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10
    const offset = parseInt(req.query.offset) || 0;
  
    try {
      const otherUsers = await User.findAll({
          where: {
              ranking: {
                  [Op.gt]: 50 // Fetch users with ranking greater than 50
              }
          },
          order: [['ranking', 'ASC']], 
          limit: limit,
          offset: offset
      });
  
      // on vraca ovo 100%
      res.json(otherUsers);
  
  } catch (error) {
    console.error('Error fetching top users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
  }



module.exports = {
    update_rank_data,
    rankingTop50,
    otherUsers,
  };
  