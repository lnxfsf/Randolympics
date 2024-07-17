// this is, all for ranking..

const db = require("../models/database");
const User = db.users;
const Traffic = db.traffic;
const Op = db.Sequelize.Op;




const listOfSports = require('../data/listOfSports')

const dayjs = require('dayjs');

var weekday = require("dayjs/plugin/isoWeek");
dayjs.extend(weekday);



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
  console.log("trazi li gender za RS (ne treba..)" + needGender)






  const nationality = req.query.nationality;

  try {
    const currentUser = await User.findOne({
      where: {
        userId: userId,
      },
    });





    console.log("tip je" + user_type)

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

    if (user_type === "AH") {
      filterConditions = {
        ...filterConditions,
        ranking: {
          [Op.lte]: 50,
        },
      };
    }

    // also, applies for RS as well (but it uses another rankingRS ! ) yes.. it doesnt filter by gender, but still only first 50 goes..
    if (currentUserType === "RS") {
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




  } catch (error) { }
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
    console.log(error.stack)
    res.status(500).json({ error: "Internal server error" });
  }
};

const lastInRank = async (req, res) => {
  try {
    const user_type = req.query.user_type;
    const nationality = req.query.nationality;
    const gender = req.query.gender;


    console.log("-----------------")
    console.log(user_type)
    console.log(nationality)
    console.log(gender)


    const latestUser = await User.findOne({
      attributes: ["ranking"],
      where: { nationality: nationality, gender: gender, user_type: user_type },
      order: [["ranking", "DESC"]],
    });


    console.log(latestUser)

    res.json(latestUser.ranking);

  } catch (error) {
    console.error("Error fetching top users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



const landingPageRandomize = async (req, res) => {


  // OVO SU ONI KORISNICI KOJIMA TREBA DA POSALJES REZULTATE KADA CE DOBITI OVO ! (email1, je znači onome kome i treba da vratis za tabelu) !! 
 // !  const randomizeFormData = req.query.randomizeFormData;  // ovo je celi objekat znaci iz frontenda..
// ! vrati ovo samo za frontend... ovo eto, lakse objekat imas da radi.. 

const randomizeFormData = [
  { name: 'first', email: 'first@gmail.com', weightCategory: 'light', gender: 'F' },
  { name: 'second', email: 'second@gmail.com', weightCategory: 'light', gender: 'M' },
  { name: 'third', email: 'third@gmail.com', weightCategory: 'light', gender: 'M' },
  { name: 'fourth', email: 'fourth@gmail.com', weightCategory: 'light', gender: 'M' },
  { name: 'fifth', email: 'fifth@gmail.com', weightCategory: 'light', gender: 'M' },
  { name: 'six', email: 'six@gmail.com', weightCategory: 'light', gender: 'M' },
  { name: 'seven', email: 'seven@gmail.com', weightCategory: 'light', gender: 'F' },
];



  // to ce uvek biti original data iz kog izvlačis kopije (za svaki time slot zasebno.. )
 /*  console.log(" ovo......... ")
  console.log(randomizeFormData) */

  // treba da se uvećava samo taj name{num}, da bude broj samo.. // !  ali, to u frontend, treba biti ja msm vec...  





  const getRandomItemSports = (array) => {

    /* console.log("unutra random sport funkc: ")
    console.log(array) */
/* 
    console.log("ovo je destructure") */
    const { listOfSports } = array;
   /*  console.log(listOfSports); */




    const randomIndex = Math.floor(Math.random() * listOfSports.length);



    return listOfSports[randomIndex];

  };



  const getRandomItemAthletes = (array) => {

    /* console.log("unutra random ATHLETE funkc: ")
    console.log(array)
 */


    const randomIndex = Math.floor(Math.random() * array.length);



    return array[randomIndex];

  };



  const getRandomAthletes = (athletes, count, sportName) => {

    // ovo vraća kao rezultat 
    const selectedAthletes = [];

    for (let i = 0; i < count; i++) {
      if (athletes.length === 0) break; // Break if no more athletes available


      const selectedAthlete = getRandomItem(athletes);
      selectedAthletes.push(selectedAthlete);


      // remove it from original (now, before we add another variable to that occupiedAthletes... )
      const index = athletes.indexOf(selectedAthlete);
      if (index > -1) {
        athletes.splice(index, 1);
      }

      selectedAthletes.forEach(athlete => {
        occupiedSlotsAthletes.push({
          ...athlete,
          sportName: sportName
        });

      });


      return selectedAthletes;





    }

  }


  try {

    // TODO : But we don't need that here ! for marketing..  : Finds all athletes that passed (were top50 in all countries (so no filter by country..))



    // so now, we get time slots, we put those people we have, in ANY of sports available ! (so, randomized in list)






    // max athletes per time slot (IT DEPENDS ON DAY OF WEEK, but all in all, it's fixed.. )
    // to znači, da ne sme da predje ove varijable, pri pokušaju dodavanja !
    // ali , ovo je SVI GAMES ZAJEDNO U TAJ TIME SLOT !!!
    // osim toga, svaki sport, će imati za sebe, zasebno, limitaciju koliko athletes moze u taj jedan timeslot da bude. moze opet drugi, ali ne vise od tog, za taj jedan timeframe..
    for (let i = 0; i < 7; i++) {





      // these are most used. the CURRENT STATE, (so, we always know how much athletes are there... ) !
      // you need to reset them, for another day ! (as we're gonna fill them up, in each day, so we can calculate it.. )
      var timeSlot_3_6 = 0;
      var timeSlot_6_9 = 0;
      var timeSlot_9_12 = 0;
      var timeSlot_12_15 = 0;
      var timeSlot_15_18 = 0;
      var timeSlot_18_21 = 0;
      var timeSlot_21_24 = 0;




      const dayName = dayjs().isoWeekday(i).format('dddd');

      /*  
   const currentDayName = dayjs().format('dddd');
   console.log("ime dana je: " + currentDayName);
*/


      // za svaki time slot !!! u tom danu , ideš manuelno, eto ovo baš ovde.. 
      if (dayName === "Sunday") {


        // ? ovo ce vaziti za SVE SPORTOVE KOJE BUDES DODAVAO U TAJ "TIME SLOT" !

        var TotalMaxAthletesPerTimeSlot_3_6 = 0;

        var TotalMaxAthletesPerTimeSlot_6_9 = 16;
        var TotalMaxAthletesPerTimeSlot_9_12 = 27;
        var TotalMaxAthletesPerTimeSlot_12_15 = 33;
        var TotalMaxAthletesPerTimeSlot_15_18 = 34;
        var TotalMaxAthletesPerTimeSlot_18_21 = 21;

        var TotalMaxAthletesPerTimeSlot_21_24 = 0;




        // ! znači za ovaj fake, marketing, ti koristi tako drugacije slobodno, open i closed slots. smatraj kao countries ih... 
        // kreiraj objekat, sa info za athletes, koji su occupied.. 

        // to je ove koje on i dobije sa frontenda ! ili u obican database, koji i jesu ! vec primljeni 

        // ! ovo je za each time slot !!! (znači pravis kopiju za svaki time slot !). 
        // shallow copy

        // da ovo će vaziti za taj jedan dan ... 
        var freeSlotsAthletes = [...randomizeFormData];

        var occupiedSlotsAthletes = [];



        // ! znači, koliko je potrebno ljudi u taj timeframe (ne max, ono fixed, nego jedostavno, kolko je potrebno ljudi da se sastavi taj jedan tim !). da toliko ljudi izvlačiš 
        // ! a ti ces prikazati "current user", tako sto ga filtiras po "email"-u !!! i prikazes za tog, gde se on tačno nalazi u tabelama.. to sklopis tabelu, i to i vracas takodje... 


        // sada, select randomly, i ubaci ga u occupied, i za koji je to slot !  (kao i max, kolko moze u taj time slot ! (znači, ako trazi 3-4 users (ili 11 za fudbal), 
        // to treba )). 
        /* 
                console.log("freeSlotsAthletes su:")
                console.log(freeSlotsAthletes) */




        // okej, dodajes u taj timeSlot (ovo vazi za sve sportove koje ces dodati u taj slot, toga dana ! )
        // a on ce dodavati, ako treba vise ljudi da sastavi tim uopšte ! 
        // da, ovo je generalno, on nece dodavati, više ako on nema više tih... (// ! i da, onaj zašto ih ima 2 kocke, to je jer to ustvari označava TRAJANJE tog event-a ! to moras isto dodati sada odma, kolko traje)
        if (timeSlot_6_9 <= TotalMaxAthletesPerTimeSlot_6_9) {

          // ! sada treba, da vidi kolko make a team, taj sport, i toliko da izvrti (znači RANDOM SPORT, a zatim RANDOM ATHLETE po tome ! )

          /*  console.log("lista sporta je:")
           console.log(listOfSports)
  */

          const selectedSport = getRandomItemSports(listOfSports); // izabira random sport prvo ! 
         /*  console.log("random selected sport je:")
          console.log(selectedSport) */

          const { sportName, howMuchAthletesMakeATeam } = selectedSport;  // izvlači ime, i kolko random athletes treba nam za taj sport

     /*      console.log("sport ime:" + sportName)
          console.log("howMuchMakeATeam :" + howMuchAthletesMakeATeam) */

          //const selectedAthletes = getRandomAthletes(freeSlotsAthletes, howMuchMakeATeam, sportName );



          // ponavlja tolko puta, koliko nam treba za jedan tim  ! 
          for (let i = 0; i < howMuchAthletesMakeATeam; i++) {


            // occupiedSlotsAthletes.length === howMuchAthletesMakeATeam, so it means, cut this, loop, if we've done how much we need it.. 
            // in fact, if we use: timeSlot_6_9 , then we just add +1, on every.. 
            if (freeSlotsAthletes.length !== 0 && timeSlot_6_9 !== howMuchAthletesMakeATeam ) {
             
             
           
              


            


            // ne od sports, nego athletes ! 

            const selectedAthlete = getRandomItemAthletes(freeSlotsAthletes);
          
       

            // remove it from original (now, before we add another variable to that occupiedAthletes... )
            // moras da ga uklonis sa glavnog odma, da bi sklonio. jer on vec ima u povratnoj, taj, samo doda ovu jos jedan property... 
            const index = freeSlotsAthletes.indexOf(selectedAthlete);
            if (index > -1) {
              freeSlotsAthletes.splice(index, 1);
            };


              // znaci, vidis, ovaj se pokrece..  
            const modifiedAthlete = {
              ... selectedAthlete, 
              sportName: sportName
            };



            occupiedSlotsAthletes.push(modifiedAthlete);

            timeSlot_6_9 = timeSlot_6_9 + 1; 

          } 


          }



          console.log('Occupied Slots Athletes:', occupiedSlotsAthletes);
          console.log('Remaining Free Slots Athletes:', freeSlotsAthletes);






        }




















      } else if (dayName === "Monday") {

        var TotalMaxAthletesPerTimeSlot_3_6 = 0;

        var TotalMaxAthletesPerTimeSlot_6_9 = 12;
        var TotalMaxAthletesPerTimeSlot_9_12 = 38;
        var TotalMaxAthletesPerTimeSlot_12_15 = 41;
        var TotalMaxAthletesPerTimeSlot_15_18 = 32;
        var TotalMaxAthletesPerTimeSlot_18_21 = 36;

        var TotalMaxAthletesPerTimeSlot_21_24 = 0;

      } else if (dayName === "Tuesday") {

        var TotalMaxAthletesPerTimeSlot_3_6 = 0;

        var TotalMaxAthletesPerTimeSlot_6_9 = 24;
        var TotalMaxAthletesPerTimeSlot_9_12 = 37;
        var TotalMaxAthletesPerTimeSlot_12_15 = 44;
        var TotalMaxAthletesPerTimeSlot_15_18 = 47;
        var TotalMaxAthletesPerTimeSlot_18_21 = 20;

        var TotalMaxAthletesPerTimeSlot_21_24 = 3;

      } else if (dayName === "Wednesday") {

        var TotalMaxAthletesPerTimeSlot_3_6 = 0;

        var TotalMaxAthletesPerTimeSlot_6_9 = 36;
        var TotalMaxAthletesPerTimeSlot_9_12 = 47;
        var TotalMaxAthletesPerTimeSlot_12_15 = 50;
        var TotalMaxAthletesPerTimeSlot_15_18 = 44;
        var TotalMaxAthletesPerTimeSlot_18_21 = 49;

        var TotalMaxAthletesPerTimeSlot_21_24 = 15;

      } else if (dayName === "Thursday") {

        var TotalMaxAthletesPerTimeSlot_3_6 = 10;

        var TotalMaxAthletesPerTimeSlot_6_9 = 36;
        var TotalMaxAthletesPerTimeSlot_9_12 = 47;
        var TotalMaxAthletesPerTimeSlot_12_15 = 50;
        var TotalMaxAthletesPerTimeSlot_15_18 = 44;
        var TotalMaxAthletesPerTimeSlot_18_21 = 49;

        var TotalMaxAthletesPerTimeSlot_21_24 = 15;

      } else if (dayName === "Friday") {

        var TotalMaxAthletesPerTimeSlot_3_6 = 0;

        var TotalMaxAthletesPerTimeSlot_6_9 = 15;
        var TotalMaxAthletesPerTimeSlot_9_12 = 21;
        var TotalMaxAthletesPerTimeSlot_12_15 = 30;
        var TotalMaxAthletesPerTimeSlot_15_18 = 48;
        var TotalMaxAthletesPerTimeSlot_18_21 = 48;

        var TotalMaxAthletesPerTimeSlot_21_24 = 0;

      } else if (dayName === "Saturday") {

        var TotalMaxAthletesPerTimeSlot_3_6 = 0;

        var TotalMaxAthletesPerTimeSlot_6_9 = 40;
        var TotalMaxAthletesPerTimeSlot_9_12 = 40;
        var TotalMaxAthletesPerTimeSlot_12_15 = 42;
        var TotalMaxAthletesPerTimeSlot_15_18 = 12;
        var TotalMaxAthletesPerTimeSlot_18_21 = 44;

        var TotalMaxAthletesPerTimeSlot_21_24 = 0;

      }






    }






    // e sada, lista svih sportova !
    // i onda randomizer, sklapa ručno raspored kako treba, sklopi to u objekat jedan i šalje nazad !

    // znači u ti gledas, za 1 time slot, da ne sme da se poveca vise od toga. odnosno. ti samo gledas, kada random, dodas taj sport iz tog random izabrano liste, ti trebas
    // da, povecas za +1 taj time slot, sto oznacava, da se obavlja jedan sport tuda ! 
    // da, 


















  } catch (error) {
    console.log(error)
  }




}






module.exports = {
  // update_rank_data,
  rankingTop50,
  otherUsers,
  lastInRank,


  team,
  currentNP,
  listLoginTrafficHistory,


  // randomization LANDING PAGE
  landingPageRandomize,

};
