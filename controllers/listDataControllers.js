// this is, all for ranking..

const db = require("../models/database");
const User = db.users;
const Traffic = db.traffic;
const Campaign = db.campaign;
const Statscampaign = db.statscampaign;
const Couponcodes = db.couponcode;

const Sequelize = db.Sequelize;

const Op = db.Sequelize.Op;

const sendEmail = require("../utils/sendEmail");
const { JSDOM } = require("jsdom");

// stripe
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const listOfSports = require("../data/listOfSports");

const dayjs = require("dayjs");

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
          ["votes", "DESC"], // Sort by ranking descending (greatest first)
          ["name", "ASC"], //  name in ascending order
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
        currentNP: true, // ! ovo treba videti, kako se selektuju (voting) za NP's..
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
  console.log("trazi li gender za RS (ne treba..)" + needGender);

  const nationality = req.query.nationality;

  try {
    const currentUser = await User.findOne({
      where: {
        userId: userId,
      },
    });

    console.log("tip je" + user_type);

    let filterConditions = {
      nationality: nationality,
      user_type: user_type, // zato NP, trazi po NP'evu ! al ne mora ovako. iz FE, salje on po selekciji..

      //nationality: currentUser.nationality, // and same country  || all managers can see all countries. "managers" see other managers.. of same type..

      name: {
        [Op.like]: `%${searchText}%`, //this is so it can search by name (that's for now)
      },
    };

    // yes, we also need it for RS as well..
    if (
      currentUserType === "AH" ||
      currentUserType === "RS" ||
      currentUserType === "NP"
    ) {
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

    console.log("ovo je ono sto treba ti:");
    console.log(filterConditions);

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
    console.log(error.stack);
    res.status(500).json({ error: "Internal server error" });
  }
};

const lastInRank = async (req, res) => {
  try {
    const user_type = req.query.user_type;
    const nationality = req.query.nationality;
    const gender = req.query.gender;

    console.log("-----------------");
    console.log(user_type);
    console.log(nationality);
    console.log(gender);

    const latestUser = await User.findOne({
      attributes: ["ranking"],
      where: { nationality: nationality, gender: gender, user_type: user_type },
      order: [["ranking", "DESC"]],
    });

    console.log(latestUser);

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

  const randomizeFormData = req.query.randomizeFormData;

  console.log("gender je");

  console.log(randomizeFormData[0].gender);

  /* 
    const randomizeFormData = [
      { name: 'first', email: 'first@gmail.com', weightCategory: 'light', gender: 'F' },
    
  
  
    ]; */

  const createOpeningGamesStart = (athlete) => {
    return {
      ...athlete,
      sportName: "Opening ceremony",
      howMuchAthletesMakeATeam: 1,
      locations: 1,

      firstDayHowMuchTimeSlotsExpandBy: 1,
      secondDayHowMuchTimeSlotsExpandBy: 0,
      thirdDayHowMuchTimeSlotsExpandBy: 0,

      // ----------

      firstDayStartGameTimeSlot: "6_9",
      firstDayEndGameTimeSlot: "6_9",

      secondDayStartGameTimeSlot: "",
      secondDayEndGameTimeSlot: "",

      thirdDayStartGameTimeSlot: "",
      thirdDayEndGameTimeSlot: "",

      dayOfStart: "Saturday",

      dateOfStart: "June 24th",

      icon: "olympic_flame",
    };
  };

  const createClosingGamesEnd = (athlete) => {
    return {
      ...athlete,

      sportName: "Closing ceremony",
      howMuchAthletesMakeATeam: 1,
      locations: 1,

      firstDayHowMuchTimeSlotsExpandBy: 1,
      secondDayHowMuchTimeSlotsExpandBy: 0,
      thirdDayHowMuchTimeSlotsExpandBy: 0,

      // ----------

      firstDayStartGameTimeSlot: "12_15",
      firstDayEndGameTimeSlot: "12_15",

      secondDayStartGameTimeSlot: "",
      secondDayEndGameTimeSlot: "",

      thirdDayStartGameTimeSlot: "",
      thirdDayEndGameTimeSlot: "",

      dayOfStart: "Sunday",

      dateOfStart: "July 2nd",

      icon: "olympic_flame",
    };
  };

  /*  const randomizeFormData = [
     { name: 'first', email: 'first@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'second', email: 'second@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'third', email: 'third@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'fourth', email: 'fourth@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'fifth', email: 'fifth@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'six', email: 'six@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'seven', email: 'seven@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'eight', email: 'eight@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'nine', email: 'nine@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'ten', email: 'ten@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'eleven', email: 'eleven@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'twelve', email: 'twelve@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'thirteen', email: 'thirteen@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'fourteen', email: 'fourteen@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'fifteen', email: 'fifteen@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'sixteen', email: 'sixteen@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'seventeen', email: 'seventeen@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'eighteen', email: 'eighteen@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'nineteen', email: 'nineteen@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'twenty', email: 'twenty@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'twentyone', email: 'twentyone@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'twentytwo', email: 'twentytwo@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'twentythree', email: 'twentythree@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'twentyfour', email: 'twentyfour@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'twentyfive', email: 'twentyfive@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'twentysix', email: 'twentysix@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'twentyseven', email: 'twentyseven@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'twentyeight', email: 'twentyeight@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'twentynine', email: 'twentynine@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'thirty', email: 'thirty@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'thirtyone', email: 'thirtyone@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'thirtytwo', email: 'thirtytwo@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'thirtythree', email: 'thirtythree@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'thirtyfour', email: 'thirtyfour@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'thirtyfive', email: 'thirtyfive@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'thirtysix', email: 'thirtysix@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'thirtyseven', email: 'thirtyseven@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'thirtyeight', email: 'thirtyeight@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'thirtynine', email: 'thirtynine@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'forty', email: 'forty@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'fortyone', email: 'fortyone@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'fortytwo', email: 'fortytwo@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'fortythree', email: 'fortythree@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'fortyfour', email: 'fortyfour@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'fortyfive', email: 'fortyfive@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'fortysix', email: 'fortysix@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'fortyseven', email: 'fortyseven@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'fortyeight', email: 'fortyeight@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'fortynine', email: 'fortynine@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'fifty', email: 'fifty@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'fiftyone', email: 'fiftyone@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'fiftytwo', email: 'fiftytwo@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'fiftythree', email: 'fiftythree@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'fiftyfour', email: 'fiftyfour@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'fiftyfive', email: 'fiftyfive@gmail.com', weightCategory: 'light', gender: 'M' },
     { name: 'fiftysix', email: 'fiftysix@gmail.com', weightCategory: 'light', gender: 'F' },
     { name: 'fiftyseven', email: 'fiftyseven@gmail.com', weightCategory: 'light', gender: 'M' }
   ];
  */

  const getRandomItemSports = (
    array,
    ReceivingfirstDayStartGameTimeSlot,
    ReceivingdayOfStart,
    dateToAvoid = "",
    weightCategory = randomizeFormData[0].weightCategory,
    gender = randomizeFormData[0].gender
  ) => {
    const { listOfSports } = array;

    let attempts = 0; // ! eto, neka je ovo kao insex, da ide redom
    const maxAttempts = listOfSports.length;

    let found = 0; // sigurniji način, da znas da dobijas sto treba ti bas !

    let returningSportSelected;
    let TEMPreturningSportSelected;

    while (found == 0 && attempts < maxAttempts) {
      //  problem je sto ide random ovde, ne ide redom. da pogodi isti element ! (eto, probaj redom ici ovde, popunice svaku ! )
      const randomIndex = Math.floor(Math.random() * listOfSports.length);

      TEMPreturningSportSelected = listOfSports[randomIndex];
      //  e ja msm, ovako kazes ti da je random. ali on ionako ovde prodje sve elemente...
      //, jer znas sta je problem. sa truly random
      // cak iako prodje kroz 10 njih, to je to.. on pogodi mozda isti i slicno...

      // ne moras mu to reći, ono (tj. ja msm, zadrzi za sebe, samo, ces drugu funkciju, da imas) koja randomizuje sportove.
      // ali na ovaj nacin, on definitivno moze da prolazi kroz svaki element u sportu !!!

      // okej, reci mu, ali treba da napravis za sport kao jos..

      if (dateToAvoid) {
        // ovo je za taj july 1, july 2, da nema duplikata tako..

        if (typeof TEMPreturningSportSelected.weightCategory !== "undefined") {
          // ovako smo sigurni da neće slip up..
          if (
            TEMPreturningSportSelected.firstDayStartGameTimeSlot ===
              ReceivingfirstDayStartGameTimeSlot &&
            TEMPreturningSportSelected.dayOfStart === ReceivingdayOfStart &&
            TEMPreturningSportSelected.dateOfStart !== dateToAvoid &&
            TEMPreturningSportSelected.gender === gender &&
            TEMPreturningSportSelected.weightCategory === weightCategory
          ) {
            returningSportSelected = listOfSports[randomIndex]; // to je taj selektovan i pronadjen (inače, ide na sledeci random indeks..)
            found = 1;
          }
        } else {
          // ovako smo sigurni da neće slip up..
          if (
            TEMPreturningSportSelected.firstDayStartGameTimeSlot ===
              ReceivingfirstDayStartGameTimeSlot &&
            TEMPreturningSportSelected.dayOfStart === ReceivingdayOfStart &&
            TEMPreturningSportSelected.dateOfStart !== dateToAvoid &&
            TEMPreturningSportSelected.gender === gender
          ) {
            returningSportSelected = listOfSports[randomIndex]; // to je taj selektovan i pronadjen (inače, ide na sledeci random indeks..)
            found = 1;
          }
        }
      } else {
        // a ovo su svi ostali, normalni dani...

        // i weightCategory isto..
        if (typeof TEMPreturningSportSelected.weightCategory !== "undefined") {
          // ! gender radi
          // a ovo su svi ostali, normalni dani...
          if (
            TEMPreturningSportSelected.firstDayStartGameTimeSlot ===
              ReceivingfirstDayStartGameTimeSlot &&
            TEMPreturningSportSelected.dayOfStart === ReceivingdayOfStart &&
            TEMPreturningSportSelected.gender === gender &&
            TEMPreturningSportSelected.weightCategory === weightCategory
          ) {
            returningSportSelected = listOfSports[randomIndex]; // to je taj selektovan i pronadjen (inače, ide na sledeci random indeks..)
            found = 1;
          }
        } else {
          // ! gender radi
          // a ovo su svi ostali, normalni dani...
          if (
            TEMPreturningSportSelected.firstDayStartGameTimeSlot ===
              ReceivingfirstDayStartGameTimeSlot &&
            TEMPreturningSportSelected.dayOfStart === ReceivingdayOfStart &&
            TEMPreturningSportSelected.gender === gender
          ) {
            returningSportSelected = listOfSports[randomIndex]; // to je taj selektovan i pronadjen (inače, ide na sledeci random indeks..)
            found = 1;
          }
        }
      }
      /* else if (TEMPreturningSportSelected.firstDayStartGameTimeSlot === ReceivingfirstDayStartGameTimeSlot &&
        TEMPreturningSportSelected.dayOfStart === ReceivingdayOfStart &&
        BOOLEANdateToAvoid === false
  ){

    returningSportSelected = listOfSports[randomIndex];  // to je taj selektovan i pronadjen (inače, ide na sledeci random indeks..)
    found = 1;
  }
 */
      attempts++;
    }

    // ovde proveri taj..

    return returningSportSelected;
  };

  const getRandomItemAthletes = (array) => {
    /* console.log("unutra random ATHLETE funkc: ")
    console.log(array)
 */

    const randomIndex = Math.floor(Math.random() * array.length);

    return array[randomIndex];
  };

  try {
    // TODO : But we don't need that here ! for marketing..  : Finds all athletes that passed (were top50 in all countries (so no filter by country..))

    // ovo pristupas, u drugima, da mozes ove da preskocis, ako je dovoljno rano za to kao..  (da, on vrti 7 dana za sada.. )
    // ovi dodatna 1 dan, ako ima, to u drugi Sunday2 , stavi listu samo...
    var saturdayOccupiedSlotsAthletes = [];
    var sundayOccupiedSlotsAthletes = [];
    var mondayOccupiedSlotsAthletes = [];
    var tuesdayOccupiedSlotsAthletes = [];
    var wednesdayOccupiedSlotsAthletes = [];
    var thursdayOccupiedSlotsAthletes = [];
    var fridayOccupiedSlotsAthletes = [];

    var JulySaturdayOccupiedSlotsAthletes = [];
    var JulySundayOccupiedSlotsAthletes = [];

    // so now, we get time slots, we put those people we have, in ANY of sports available ! (so, randomized in list)

    // ovo je da popuni taj allTimeSlots sto ima (čistije je, nego sada gomilu onako... lol..)

    // TODO, ovo ces da stavis, da ovde uzima sve.. ali kasnije (vaznije u FE, da prebacis da imas osnovno samo da radi .. pa ces videt posle samo... )
    function allTimeSlots(
      TotalMaxAthletesPerTimeSlot_3_6,
      TotalMaxAthletesPerTimeSlot_6_9,
      TotalMaxAthletesPerTimeSlot_9_12,
      TotalMaxAthletesPerTimeSlot_12_15,
      TotalMaxAthletesPerTimeSlot_15_18,
      TotalMaxAthletesPerTimeSlot_18_21,
      TotalMaxAthletesPerTimeSlot_21_24,

      xOccupiedSlotsAthletes
    ) {
      // -------------

      //  treba da PRESKOCI one koji vec jesu u occupiedAthletes ! da njih ne uzme u obzir !

      //  znači, ti ces gledati:
      //    1)  da li on ima  secondDayHowMuchTimeSlotsExpandBy > 0 || thirdDayHowMuchTimeSlotsExpandBy > 0 (svejedno, da li je 2 ili 3 dan, u odnosu na juče..)
      //    2) kao i, da je to ZAISTA 2 ili 3 dan u odnosu na danas "Monday" !!!   (ma, radi manuelno ovo onda ! za secondDayHowMuchTimeSlotsExpandBy > 0  mora biti i  && "Sunday" unutar .dayOfStart  , sto i imas... )
      // Filter out athletes who are already occupied
      function filterFreeSlotsAthletes(freeSlots, occupiedSlots) {
        // on ide kroz svaki od ovih elemenata ! jedan po jedan rastavlja !
        var slotsFree = freeSlots.filter((athlete) => {
          // const isNotOccupied = !occupiedEmails.includes(athlete.email);

          //  sundayOccupiedSlotsAthletes
          const correspondingOccupiedAthlete = occupiedSlots.filter(
            (occAthlete) => occAthlete.email === athlete.email
          );

          // If there is no corresponding occupied athlete, include this athlete
          if (!correspondingOccupiedAthlete) {
            return true;
          }

          // pre 2 dana, nedelja..
          /*   if ((correspondingOccupiedAthlete.secondDayHowMuchTimeSlotsExpandBy > 0) && (correspondingOccupiedAthlete.dayOfStart === "Sunday")
              || ((correspondingOccupiedAthlete.thirdDayHowMuchTimeSlotsExpandBy > 0) && (correspondingOccupiedAthlete.dayOfStart === "Saturday"))
  
  
  
            ) {
  
              // to je za 2 i 3 dana isto.. u suprotnom ide true (da ubaci ga.. ). znaci striktno gleda po ovome..
              return false;
            } else {
              return true
            }; */

          const shouldExclude = correspondingOccupiedAthlete.some(
            (occAthlete) =>
              (occAthlete.secondDayHowMuchTimeSlotsExpandBy > 0 &&
                occAthlete.dayOfStart === "Sunday") ||
              (occAthlete.thirdDayHowMuchTimeSlotsExpandBy > 0 &&
                occAthlete.dayOfStart === "Saturday")
          );

          return !shouldExclude;
        });

        return slotsFree;
      }

      //},

      var copyfreeSlotsAthletes = [...randomizeFormData];

      // (ovo je dobro i za loop kasnije ! za ona dodatna 2 dana. znaci, on ce isto tako izvrteti (a ako ne, nmvz, jer ima neki randomizer tkd..))
      let freeSlotsAthletes = filterFreeSlotsAthletes(
        copyfreeSlotsAthletes,
        xOccupiedSlotsAthletes
      );

      // e sada isto što ima i u Sunday... (samo za ovaj dan Monday, pronalazi nove sportove koji na ovaj dan počinju ! )

      if (timeSlot_3_6 <= TotalMaxAthletesPerTimeSlot_3_6) {
        let selectedSport;
        let firstDayStartGameTimeSlot;

        // drzi broj pokusaja i uporedjuje sa duzinom array-a... da ne predje to. jer onda znas da je prosao sav array svih sportova..
        let attempts = 0;
        const maxAttempts = listOfSports.length;

        //  (AKO NE MOZE NACI, A PROŠAO JE SVE, ONDA DA PREKINE, JER ONDA CE BITI U INFINITE LOOP  )

        // Loop to find a sport with the desired start time slot
        do {
          selectedSport = getRandomItemSports(listOfSports);
          ({ firstDayStartGameTimeSlot } = selectedSport);
          attempts++;
        } while (firstDayStartGameTimeSlot !== "3_6" && attempts < maxAttempts);

        const { howMuchAthletesMakeATeam } = selectedSport;

        // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
        for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
          if (
            freeSlotsAthletes.length !== 0 &&
            timeSlot_3_6 !== howMuchAthletesMakeATeam
          ) {
            const selectedAthlete = getRandomItemAthletes(freeSlotsAthletes);

            const index = freeSlotsAthletes.indexOf(selectedAthlete);
            if (index > -1) {
              freeSlotsAthletes.splice(index, 1);
            }

            const modifiedAthlete = {
              ...selectedAthlete,
              ...selectedSport,
            };

            xOccupiedSlotsAthletes.push(modifiedAthlete);

            timeSlot_3_6 = timeSlot_3_6 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
          }
        }

        /*    console.log("SUNDAY timeslot: 3_6 ")
           console.log('SUNDAY Occupied Slots Athletes:', sundayOccupiedSlotsAthletes); */
        /*  console.log('SUNDAY Remaining Free Slots Athletes:', freeSlotsAthletes);
         */
      }

      if (timeSlot_6_9 <= TotalMaxAthletesPerTimeSlot_6_9) {
        // ! sada treba, da vidi kolko make a team, taj sport, i toliko da izvrti (znači RANDOM SPORT, a zatim RANDOM ATHLETE po tome ! )

        /*  console.log("lista sporta je:")
         console.log(listOfSports)
        */

        let selectedSport;
        let firstDayStartGameTimeSlot;

        let attempts = 0;
        const maxAttempts = listOfSports.length;

        // Loop to find a sport with the desired start time slot
        do {
          selectedSport = getRandomItemSports(listOfSports);
          ({ firstDayStartGameTimeSlot } = selectedSport);
          attempts++;
        } while (firstDayStartGameTimeSlot !== "6_9" && attempts < maxAttempts);

        const { howMuchAthletesMakeATeam } = selectedSport;

        /*      console.log("sport ime:" + sportName)
             console.log("howMuchMakeATeam :" + howMuchAthletesMakeATeam) */

        //const selectedAthletes = getRandomAthletes(freeSlotsAthletes, howMuchMakeATeam, sportName );

        // ponavlja tolko puta, koliko nam treba za jedan tim  !
        // ! da i ovde sam dodao, <= , da eto ne pravi gresku neku.. tkd, aj. nek ne dira..
        for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
          // occupiedSlotsAthletes.length === howMuchAthletesMakeATeam, so it means, cut this, loop, if we've done how much we need it..
          // in fact, if we use: timeSlot_6_9 , then we just add +1, on every..
          if (
            freeSlotsAthletes.length !== 0 &&
            timeSlot_6_9 !== howMuchAthletesMakeATeam
          ) {
            // ne od sports, nego athletes !

            const selectedAthlete = getRandomItemAthletes(freeSlotsAthletes);

            // remove it from original (now, before we add another variable to that occupiedAthletes... )
            // moras da ga uklonis sa glavnog odma, da bi sklonio. jer on vec ima u povratnoj, taj, samo doda ovu jos jedan property...
            const index = freeSlotsAthletes.indexOf(selectedAthlete);
            if (index > -1) {
              freeSlotsAthletes.splice(index, 1);
            }

            // znaci, vidis, ovaj se pokrece..
            const modifiedAthlete = {
              ...selectedAthlete,
              ...selectedSport,
            };

            // TODO, kad kaze ti da li je starting time always fixed, onda znaces, da li i za sledeci dan, ide u isto vreme, (startingTimeSlot). il ako nije available (vec ima popunjeno), da proba na sledecu (samo na tu sledecu, napravi isto tako, da proveri ako nema koji bi mogao da se stavi kao...)

            xOccupiedSlotsAthletes.push(modifiedAthlete);

            timeSlot_6_9 = timeSlot_6_9 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
          }
        }

        /*   console.log("SUNDAY timeslot: 6-9 ")
          console.log('SUNDAY Occupied Slots Athletes:', sundayOccupiedSlotsAthletes); */
        /*  console.log('SUNDAY Remaining Free Slots Athletes:', freeSlotsAthletes);
         */
      }

      // da, on ide na ovu sledecu takodje, za sledeci time slot u tom istom danu ce isto. da on uzima i dalje, od istih tih ljudi koji su slobodni...
      if (timeSlot_9_12 <= TotalMaxAthletesPerTimeSlot_9_12) {
        let selectedSport;
        let firstDayStartGameTimeSlot;

        let attempts = 0;
        const maxAttempts = listOfSports.length;

        // Loop to find a sport with the desired start time slot
        do {
          selectedSport = getRandomItemSports(listOfSports);
          ({ firstDayStartGameTimeSlot } = selectedSport);
          attempts++;
        } while (
          firstDayStartGameTimeSlot !== "9_12" &&
          attempts < maxAttempts
        );

        const { howMuchAthletesMakeATeam } = selectedSport;

        // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
        for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
          if (
            freeSlotsAthletes.length !== 0 &&
            timeSlot_9_12 !== howMuchAthletesMakeATeam
          ) {
            const selectedAthlete = getRandomItemAthletes(freeSlotsAthletes);

            const index = freeSlotsAthletes.indexOf(selectedAthlete);
            if (index > -1) {
              freeSlotsAthletes.splice(index, 1);
            }

            const modifiedAthlete = {
              ...selectedAthlete,
              ...selectedSport,
            };

            xOccupiedSlotsAthletes.push(modifiedAthlete);

            timeSlot_9_12 = timeSlot_9_12 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
          }
        }

        /*   console.log("SUNDAY timeslot: 9-12 ")
          console.log('SUNDAY Occupied Slots Athletes:', sundayOccupiedSlotsAthletes); */
        /*  console.log('SUNDAY Remaining Free Slots Athletes:', freeSlotsAthletes);
         */
      }

      if (timeSlot_12_15 <= TotalMaxAthletesPerTimeSlot_12_15) {
        let selectedSport;
        let firstDayStartGameTimeSlot;

        let attempts = 0;
        const maxAttempts = listOfSports.length;

        // Loop to find a sport with the desired start time slot
        do {
          selectedSport = getRandomItemSports(listOfSports);
          ({ firstDayStartGameTimeSlot } = selectedSport);
          attempts++;
        } while (
          firstDayStartGameTimeSlot !== "12_15" &&
          attempts < maxAttempts
        );

        const { howMuchAthletesMakeATeam } = selectedSport;

        // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
        for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
          if (
            freeSlotsAthletes.length !== 0 &&
            timeSlot_12_15 !== howMuchAthletesMakeATeam
          ) {
            const selectedAthlete = getRandomItemAthletes(freeSlotsAthletes);

            const index = freeSlotsAthletes.indexOf(selectedAthlete);
            if (index > -1) {
              freeSlotsAthletes.splice(index, 1);
            }

            const modifiedAthlete = {
              ...selectedAthlete,
              ...selectedSport,
            };

            xOccupiedSlotsAthletes.push(modifiedAthlete);

            timeSlot_12_15 = timeSlot_12_15 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
          }
        }

        /* console.log("SUNDAY timeslot: 12_15 ")
        console.log('SUNDAY Occupied Slots Athletes:', sundayOccupiedSlotsAthletes); */
        /*  console.log('SUNDAY Remaining Free Slots Athletes:', freeSlotsAthletes);
         */
      }

      if (timeSlot_15_18 <= TotalMaxAthletesPerTimeSlot_15_18) {
        let selectedSport;
        let firstDayStartGameTimeSlot;

        let attempts = 0;
        const maxAttempts = listOfSports.length;

        // Loop to find a sport with the desired start time slot
        do {
          selectedSport = getRandomItemSports(listOfSports);
          ({ firstDayStartGameTimeSlot } = selectedSport);
          attempts++;
        } while (
          firstDayStartGameTimeSlot !== "15_18" &&
          attempts < maxAttempts
        );

        const { howMuchAthletesMakeATeam } = selectedSport;

        // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
        for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
          if (
            freeSlotsAthletes.length !== 0 &&
            timeSlot_15_18 !== howMuchAthletesMakeATeam
          ) {
            const selectedAthlete = getRandomItemAthletes(freeSlotsAthletes);

            const index = freeSlotsAthletes.indexOf(selectedAthlete);
            if (index > -1) {
              freeSlotsAthletes.splice(index, 1);
            }

            const modifiedAthlete = {
              ...selectedAthlete,
              ...selectedSport,
            };

            xOccupiedSlotsAthletes.push(modifiedAthlete);

            timeSlot_15_18 = timeSlot_15_18 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
          }
        }

        /*   console.log("SUNDAY timeslot: 15_18 ")
          console.log('SUNDAY Occupied Slots Athletes:', sundayOccupiedSlotsAthletes); */
        /*  console.log('SUNDAY Remaining Free Slots Athletes:', freeSlotsAthletes);
         */
      }

      if (timeSlot_18_21 <= TotalMaxAthletesPerTimeSlot_18_21) {
        let selectedSport;
        let firstDayStartGameTimeSlot;

        let attempts = 0;
        const maxAttempts = listOfSports.length;

        // Loop to find a sport with the desired start time slot
        do {
          selectedSport = getRandomItemSports(listOfSports);
          ({ firstDayStartGameTimeSlot } = selectedSport);
          attempts++;
        } while (
          firstDayStartGameTimeSlot !== "18_21" &&
          attempts < maxAttempts
        );

        const { howMuchAthletesMakeATeam } = selectedSport;

        // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
        for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
          if (
            freeSlotsAthletes.length !== 0 &&
            timeSlot_18_21 !== howMuchAthletesMakeATeam
          ) {
            const selectedAthlete = getRandomItemAthletes(freeSlotsAthletes);

            const index = freeSlotsAthletes.indexOf(selectedAthlete);
            if (index > -1) {
              freeSlotsAthletes.splice(index, 1);
            }

            const modifiedAthlete = {
              ...selectedAthlete,
              ...selectedSport,
            };

            xOccupiedSlotsAthletes.push(modifiedAthlete);

            timeSlot_18_21 = timeSlot_18_21 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
          }
        }

        /*    console.log("SUNDAY timeslot: 18_21 ")
           console.log('SUNDAY Occupied Slots Athletes:', sundayOccupiedSlotsAthletes); */
        /*  console.log('SUNDAY Remaining Free Slots Athletes:', freeSlotsAthletes);
         */
      }

      if (timeSlot_21_24 <= TotalMaxAthletesPerTimeSlot_21_24) {
        let selectedSport;
        let firstDayStartGameTimeSlot;

        let attempts = 0;
        const maxAttempts = listOfSports.length;

        // Loop to find a sport with the desired start time slot
        do {
          selectedSport = getRandomItemSports(listOfSports);
          ({ firstDayStartGameTimeSlot } = selectedSport);
          attempts++;
        } while (
          firstDayStartGameTimeSlot !== "21_24" &&
          attempts < maxAttempts
        );

        const { howMuchAthletesMakeATeam } = selectedSport;

        // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
        for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
          if (
            freeSlotsAthletes.length !== 0 &&
            timeSlot_21_24 !== howMuchAthletesMakeATeam
          ) {
            const selectedAthlete = getRandomItemAthletes(freeSlotsAthletes);

            const index = freeSlotsAthletes.indexOf(selectedAthlete);
            if (index > -1) {
              freeSlotsAthletes.splice(index, 1);
            }

            const modifiedAthlete = {
              ...selectedAthlete,
              ...selectedSport,
            };

            xOccupiedSlotsAthletes.push(modifiedAthlete);

            timeSlot_21_24 = timeSlot_21_24 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
          }
        }
      }
    }

    // max athletes per time slot (IT DEPENDS ON DAY OF WEEK, but all in all, it's fixed.. )
    // to znači, da ne sme da predje ove varijable, pri pokušaju dodavanja !
    // ali , ovo je SVI GAMES ZAJEDNO U TAJ TIME SLOT !!!
    // osim toga, svaki sport, će imati za sebe, zasebno, limitaciju koliko athletes moze u taj jedan timeslot da bude. moze opet drugi, ali ne vise od tog, za taj jedan timeframe..
    for (let i = 0; i < 9; i++) {
      // these are most used. the CURRENT STATE, (so, we always know how much athletes are there... ) !
      // you need to reset them, for another day ! (as we're gonna fill them up, in each day, so we can calculate it.. )
      var timeSlot_3_6 = 0;
      var timeSlot_6_9 = 0;
      var timeSlot_9_12 = 0;
      var timeSlot_12_15 = 0;
      var timeSlot_15_18 = 0;
      var timeSlot_18_21 = 0;
      var timeSlot_21_24 = 0;

      const dayName = dayjs().isoWeekday(i).format("dddd");

      /*  
   const currentDayName = dayjs().format('dddd');
   console.log("ime dana je: " + currentDayName);
*/

      // i=0 - Saturday (June 24th)  - nju smatraj kao glavnom saturday
      // i=1 - Sunday (June 25th)
      // i=2 - Monday (June 26th)
      // i=3 - Tuesday (June 27th)
      // i=4 - Wednesday (June 28th)
      // i=5 - Thursday (June 29th)
      // i=6 - Friday (June 30th)
      //
      // i=7 - Saturday July 1st   // a ova dva vikenda, kao sporedna.. dodatno u kodu... druga lista..
      // i=8 - Sunday July 2nd  // a ova dva vikenda, kao sporedna.. dodatno u kodu... druga lista..

      // za svaki time slot !!! u tom danu , ideš manuelno, eto ovo baš ovde..

      if (i === 0) {
        var TotalMaxAthletesPerTimeSlot_3_6 = 0;

        var TotalMaxAthletesPerTimeSlot_6_9 = 40;
        var TotalMaxAthletesPerTimeSlot_9_12 = 40;
        var TotalMaxAthletesPerTimeSlot_12_15 = 42;
        var TotalMaxAthletesPerTimeSlot_15_18 = 12;
        var TotalMaxAthletesPerTimeSlot_18_21 = 44;

        var TotalMaxAthletesPerTimeSlot_21_24 = 0;

        function filterFreeSlotsAthletes(freeSlots, occupiedSlots) {
          // on ide kroz svaki od ovih elemenata ! jedan po jedan rastavlja !
          var slotsFree = freeSlots.filter((athlete) => {
            // const isNotOccupied = !occupiedEmails.includes(athlete.email);

            //  sundayOccupiedSlotsAthletes
            const correspondingOccupiedAthlete = occupiedSlots.filter(
              (occAthlete) => occAthlete.email === athlete.email
            );

            // If there is no corresponding occupied athlete, include this athlete
            if (!correspondingOccupiedAthlete) {
              return true;
            }

            // ALO, ON PROLAZI KROZ SVE SLOBODNE (a to su SVI , elementi ! i samo uporedjuje uff)
            // pre 2 dana, nedelja..
            /*   if ((correspondingOccupiedAthlete.secondDayHowMuchTimeSlotsExpandBy > 0) && (correspondingOccupiedAthlete.dayOfStart === "Friday")
                || ((correspondingOccupiedAthlete.thirdDayHowMuchTimeSlotsExpandBy > 0) && (correspondingOccupiedAthlete.dayOfStart === "Thursday"))
  
  
  
              ) {
  
                // to je za 2 i 3 dana isto.. u suprotnom ide true (da ubaci ga.. ). znaci striktno gleda po ovome..
                return false;
              } else {
                return true
              }; */

            const shouldExclude = correspondingOccupiedAthlete.some(
              (occAthlete) =>
                (occAthlete.secondDayHowMuchTimeSlotsExpandBy > 0 &&
                  occAthlete.dayOfStart === "Friday") ||
                (occAthlete.thirdDayHowMuchTimeSlotsExpandBy > 0 &&
                  occAthlete.dayOfStart === "Thursday")
            );

            return !shouldExclude;
          });

          return slotsFree;
        }

        //},

        /*  var copyfreeSlotsAthletes = [...randomizeFormData];
 
 
 
         var bothOccupiedSlotsAthletes = [
           ...thursdayOccupiedSlotsAthletes,
           ...fridayOccupiedSlotsAthletes,
 
         ]
 
 
         let freeSlotsAthletes = filterFreeSlotsAthletes(copyfreeSlotsAthletes, bothOccupiedSlotsAthletes);
  */

        // jer je prvi ionako, pa ne mora da gleda iza sebe, dane koje ima...
        let freeSlotsAthletes = [...randomizeFormData];

        // e sada isto što ima i u Sunday... (samo za ovaj dan Monday, pronalazi nove sportove koji na ovaj dan počinju ! )

        let noneFound = true;
        while (
          timeSlot_3_6 <= TotalMaxAthletesPerTimeSlot_3_6 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          // drzi broj pokusaja i uporedjuje sa duzinom array-a... da ne predje to. jer onda znas da je prosao sav array svih sportova..
          let attempts = 0;
          const maxAttempts = listOfSports.length;

          //  (AKO NE MOZE NACI, A PROŠAO JE SVE, ONDA DA PREKINE, JER ONDA CE BITI U INFINITE LOOP  )

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "3_6",
              "Saturday",
              "July 1st"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_3_6 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_3_6 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                // ! I JOS JEDAN, SAMO ZA START OF GAMES (OVDE CES DA URADIS, SAMO, TAJ JEDAN PRVI DA PRIKAZES !!! )
                // ! i time, push-ujes, jos taj jedan... (jer to je ovaj taj user ono... )

                saturdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_3_6 = timeSlot_3_6 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_6_9 <= TotalMaxAthletesPerTimeSlot_6_9 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          // ! sada treba, da vidi kolko make a team, taj sport, i toliko da izvrti (znači RANDOM SPORT, a zatim RANDOM ATHLETE po tome ! )

          /*  console.log("lista sporta je:")
           console.log(listOfSports)
          */

          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "6_9",
              "Saturday",
              "July 1st"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_6_9 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_6_9 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            /*      console.log("sport ime:" + sportName)
                 console.log("howMuchMakeATeam :" + howMuchAthletesMakeATeam) */

            //const selectedAthletes = getRandomAthletes(freeSlotsAthletes, howMuchMakeATeam, sportName );

            // ponavlja tolko puta, koliko nam treba za jedan tim  !
            // ! da i ovde sam dodao, <= , da eto ne pravi gresku neku.. tkd, aj. nek ne dira..
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              // occupiedSlotsAthletes.length === howMuchAthletesMakeATeam, so it means, cut this, loop, if we've done how much we need it..
              // in fact, if we use: timeSlot_6_9 , then we just add +1, on every..
              if (freeSlotsAthletes.length !== 0) {
                // ne od sports, nego athletes !

                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                // remove it from original (now, before we add another variable to that occupiedAthletes... )
                // moras da ga uklonis sa glavnog odma, da bi sklonio. jer on vec ima u povratnoj, taj, samo doda ovu jos jedan property...
                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                // znaci, vidis, ovaj se pokrece..
                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                // TODO, kad kaze ti da li je starting time always fixed, onda znaces, da li i za sledeci dan, ide u isto vreme, (startingTimeSlot). il ako nije available (vec ima popunjeno), da proba na sledecu (samo na tu sledecu, napravi isto tako, da proveri ako nema koji bi mogao da se stavi kao...)

                saturdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_6_9 = timeSlot_6_9 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        // da, on ide na ovu sledecu takodje, za sledeci time slot u tom istom danu ce isto. da on uzima i dalje, od istih tih ljudi koji su slobodni...
        while (
          timeSlot_9_12 <= TotalMaxAthletesPerTimeSlot_9_12 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "9_12",
              "Saturday",
              "July 1st"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_9_12 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_9_12 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                saturdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_9_12 = timeSlot_9_12 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_12_15 <= TotalMaxAthletesPerTimeSlot_12_15 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "12_15",
              "Saturday",
              "July 1st"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_12_15 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_12_15 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                saturdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_12_15 = timeSlot_12_15 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_15_18 <= TotalMaxAthletesPerTimeSlot_15_18 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "15_18",
              "Saturday",
              "July 1st"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_15_18 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_15_18 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                saturdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_15_18 = timeSlot_15_18 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_18_21 <= TotalMaxAthletesPerTimeSlot_18_21 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "18_21",
              "Saturday",
              "July 1st"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_18_21 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_18_21 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                saturdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_18_21 = timeSlot_18_21 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_21_24 <= TotalMaxAthletesPerTimeSlot_21_24 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "21_24",
              "Saturday",
              "July 1st"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_21_24 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_21_24 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                saturdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_21_24 = timeSlot_21_24 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }
      } else if (i === 1) {
        // ? ovo ce vaziti za SVE SPORTOVE KOJE BUDES DODAVAO U TAJ "TIME SLOT" !

        var TotalMaxAthletesPerTimeSlot_3_6 = 0;

        var TotalMaxAthletesPerTimeSlot_6_9 = 16;
        var TotalMaxAthletesPerTimeSlot_9_12 = 27;
        var TotalMaxAthletesPerTimeSlot_12_15 = 33;
        var TotalMaxAthletesPerTimeSlot_15_18 = 34;
        var TotalMaxAthletesPerTimeSlot_18_21 = 21;

        var TotalMaxAthletesPerTimeSlot_21_24 = 0;

        function filterFreeSlotsAthletes(freeSlots, occupiedSlots) {
          var slotsFree = freeSlots.filter((athlete) => {
            const correspondingOccupiedAthlete = occupiedSlots.find(
              (occAthlete) => occAthlete.email === athlete.email
            );

            // If there is no corresponding occupied athlete, include this athlete
            if (!correspondingOccupiedAthlete) {
              return true;
            }
            // tebi za ovu nedelja, treba samo da gleda, za jedan dan iza sebe ! to je subota jedino ! ako ima occupied, da ga ne uzme u obzir..(da, da ne uzme, jer je zauzet od juce (subota) i treba da dovrsi, al moze drugi users though..)
            if (
              correspondingOccupiedAthlete.secondDayHowMuchTimeSlotsExpandBy >
                0 &&
              correspondingOccupiedAthlete.dayOfStart === "Saturday"
            ) {
              return false;
            } else {
              return true;
            }
          });

          return slotsFree;
        }

        // ! znači za ovaj fake, marketing, ti koristi tako drugacije slobodno, open i closed slots. smatraj kao countries ih...
        // kreiraj objekat, sa info za athletes, koji su occupied..

        // to je ove koje on i dobije sa frontenda ! ili u obican database, koji i jesu ! vec primljeni

        // ! ovo je za each time slot !!! (znači pravis kopiju za svaki time slot !).
        // shallow copy

        // da ovo će vaziti za taj jedan dan ...
        // ovo je za taj jedan dan..

        var copyfreeSlotsAthletes = [...randomizeFormData];

        // samo saturday (jedan) ima iza sebe..

        let freeSlotsAthletes = filterFreeSlotsAthletes(
          copyfreeSlotsAthletes,
          saturdayOccupiedSlotsAthletes
        );

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

        // i jos jedan indikator, da AKO BAŠ I NEMA NIJEDAN SPORT, NISTA NIJE PRONASAO INACE...

        let noneFound = true;

        // prekinice petlju, ako nema vise users.. ili ako je prazan, za sve users (da uglavnom, treba da prodje sve users, ovo je sve randomizer, jer on ionako izabere random user-a kao i sport..)
        while (
          timeSlot_3_6 <= TotalMaxAthletesPerTimeSlot_3_6 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          // drzi broj pokusaja i uporedjuje sa duzinom array-a... da ne predje to. jer onda znas da je prosao sav array svih sportova..
          let attempts = 0;
          const maxAttempts = listOfSports.length;

          //  (AKO NE MOZE NACI, A PROŠAO JE SVE, ONDA DA PREKINE, JER ONDA CE BITI U INFINITE LOOP  )

          // Loop to find a sport with the desired start time slot
          /*  // ! do {
             selectedSport = getRandomItemSports(listOfSports);
             ({ firstDayStartGameTimeSlot, dayOfStart } = selectedSport);
             attempts++;
           } while (firstDayStartGameTimeSlot !== "3_6" && dayOfStart !== "Sunday" && attempts < maxAttempts);
  */

          // on ovde treba da nadje, sport, koji ce i dalje odgovarati ovom timeframe-u ! a da ga ne overflow-uje isto...
          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "3_6",
              "Sunday",
              "July 2nd"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;

              // ne, okej je, prekida celu while petlju za ovaj timeslot, 3_6, zato sto, on treba makar jedan da nadje..
              // da , jer u funkciji, on prolazi kroz celu listu ionako..
              noneFound = false;
            }
          } while (
            timeSlot_3_6 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_3_6 &&
            noneFound
          );
          // da, ide  >  , jer on moze biti <= , i to je okej, i nece traziti novi sport. ali ako jeste, onda trazi novi sport ipak... jer trazi vise igraca..
          // a ovo ce biti nista, ako nije pronasao taj uopste ! to je koji i jeste 0, koji vec i ima u timeSlot_3_6

          // on nadje taj.. al sto nece da ubaci

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            console.log("1:" + selectedSport.dayOfStart);
            console.log("1:" + selectedSport.firstDayStartGameTimeSlot);

            // TODO, e eto ti, znači, ti ustvari i ne dobijas sto ti treba... dobijes neki "9_12" kao

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              // TODO timeSlot_3_6+howMuchAthletesMakeATeam  , treba vise, ubuduce da li ce moci da stanu jos tih dodatnih tuda... TJ. IZA FOR PETLJE..
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                sundayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_3_6 = timeSlot_3_6 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }

            /*    console.log("SUNDAY timeslot: 3_6 ")
               console.log('SUNDAY Occupied Slots Athletes:', sundayOccupiedSlotsAthletes); */
            /*  console.log('SUNDAY Remaining Free Slots Athletes:', freeSlotsAthletes);
             */
          }
        }

        noneFound = true;

        while (
          timeSlot_6_9 <= TotalMaxAthletesPerTimeSlot_6_9 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          // ! sada treba, da vidi kolko make a team, taj sport, i toliko da izvrti (znači RANDOM SPORT, a zatim RANDOM ATHLETE po tome ! )

          /*  console.log("lista sporta je:")
           console.log(listOfSports)
          */

          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          // Loop to find a sport with the desired start time slot
          /*  do {
             selectedSport = getRandomItemSports(listOfSports);
             ({ firstDayStartGameTimeSlot, dayOfStart } = selectedSport);
             attempts++;
           } while (firstDayStartGameTimeSlot !== "6_9" && dayOfStart !== "Sunday" && attempts < maxAttempts);
  */

          // on ovde izabere drugi sport, za drugoga user-a... (to on isto random ubaci u ove druge ionako..)
          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "6_9",
              "Sunday",
              "July 2nd"
            );

            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_6_9 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_6_9 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            console.log("2:" + selectedSport.dayOfStart);

            /*      console.log("sport ime:" + sportName)
                 console.log("howMuchMakeATeam :" + howMuchAthletesMakeATeam) */

            //const selectedAthletes = getRandomAthletes(freeSlotsAthletes, howMuchMakeATeam, sportName );

            // ponavlja tolko puta, koliko nam treba za jedan tim  !
            // ! da i ovde sam dodao, <= , da eto ne pravi gresku neku.. tkd, aj. nek ne dira..
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              // occupiedSlotsAthletes.length === howMuchAthletesMakeATeam, so it means, cut this, loop, if we've done how much we need it..
              // in fact, if we use: timeSlot_6_9 , then we just add +1, on every..
              if (freeSlotsAthletes.length !== 0) {
                // ne od sports, nego athletes !

                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                // remove it from original (now, before we add another variable to that occupiedAthletes... )
                // moras da ga uklonis sa glavnog odma, da bi sklonio. jer on vec ima u povratnoj, taj, samo doda ovu jos jedan property...
                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                // znaci, vidis, ovaj se pokrece..
                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                // TODO, kad kaze ti da li je starting time always fixed, onda znaces, da li i za sledeci dan, ide u isto vreme, (startingTimeSlot). il ako nije available (vec ima popunjeno), da proba na sledecu (samo na tu sledecu, napravi isto tako, da proveri ako nema koji bi mogao da se stavi kao...)

                sundayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_6_9 = timeSlot_6_9 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }

            /*   console.log("SUNDAY timeslot: 6-9 ")
              console.log('SUNDAY Occupied Slots Athletes:', sundayOccupiedSlotsAthletes); */
            /*  console.log('SUNDAY Remaining Free Slots Athletes:', freeSlotsAthletes);
             */
          }
        }

        noneFound = true;

        // da, on ide na ovu sledecu takodje, za sledeci time slot u tom istom danu ce isto. da on uzima i dalje, od istih tih ljudi koji su slobodni...
        while (
          timeSlot_9_12 <= TotalMaxAthletesPerTimeSlot_9_12 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          // Loop to find a sport with the desired start time slot
          /*   do {
              selectedSport = getRandomItemSports(listOfSports);
              ({ firstDayStartGameTimeSlot, dayOfStart } = selectedSport);
              attempts++;
            } while (firstDayStartGameTimeSlot !== "9_12" && dayOfStart !== "Sunday" && attempts < maxAttempts);
   */

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "9_12",
              "Sunday",
              "July 2nd"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;

              console.log("on je pronasao");
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_9_12 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_9_12 &&
            noneFound
          );
          // znas, on ce ovde pronaci drugi sport, da ima, ako moze da nadje.. i uračunava, da li ce moci da prihvati toliko novih ljudi u taj sport.. tkd, ono dole je nepotrebno

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            console.log("3:" + selectedSport.dayOfStart);

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              // on ovde stane, jer isprazni na drugi user...
              console.log(freeSlotsAthletes.length);
              console.log(timeSlot_9_12);
              console.log(howMuchAthletesMakeATeam);

              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                sundayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_9_12 = timeSlot_9_12 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }

            /*   console.log("SUNDAY timeslot: 9-12 ")
              console.log('SUNDAY Occupied Slots Athletes:', sundayOccupiedSlotsAthletes); */
            /*  console.log('SUNDAY Remaining Free Slots Athletes:', freeSlotsAthletes);
             */
          }
        }

        noneFound = true;

        while (
          timeSlot_12_15 <= TotalMaxAthletesPerTimeSlot_12_15 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "12_15",
              "Sunday",
              "July 2nd"
            );

            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_12_15 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_12_15 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            console.log("4:" + selectedSport.dayOfStart);

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                sundayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_12_15 = timeSlot_12_15 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;

        while (
          timeSlot_15_18 <= TotalMaxAthletesPerTimeSlot_15_18 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "15_18",
              "Sunday",
              "July 2nd"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_15_18 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_15_18 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            console.log("5:" + selectedSport.dayOfStart);

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                sundayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_15_18 = timeSlot_15_18 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_18_21 <= TotalMaxAthletesPerTimeSlot_18_21 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "18_21",
              "Sunday",
              "July 2nd"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_18_21 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_18_21 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            console.log("6:" + selectedSport.dayOfStart);

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                sundayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_18_21 = timeSlot_18_21 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_21_24 <= TotalMaxAthletesPerTimeSlot_21_24 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "21_24",
              "Sunday",
              "July 2nd"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_21_24 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_21_24 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            console.log("7:" + selectedSport.dayOfStart);

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                sundayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_21_24 = timeSlot_21_24 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }
      } else if (i === 2) {
        var TotalMaxAthletesPerTimeSlot_3_6 = 0;
        var TotalMaxAthletesPerTimeSlot_6_9 = 12;
        var TotalMaxAthletesPerTimeSlot_9_12 = 38;
        var TotalMaxAthletesPerTimeSlot_12_15 = 41;
        var TotalMaxAthletesPerTimeSlot_15_18 = 32;
        var TotalMaxAthletesPerTimeSlot_18_21 = 36;
        var TotalMaxAthletesPerTimeSlot_21_24 = 0;

        // -------------

        //  treba da PRESKOCI one koji vec jesu u occupiedAthletes ! da njih ne uzme u obzir !

        //  znači, ti ces gledati:
        //    1)  da li on ima  secondDayHowMuchTimeSlotsExpandBy > 0 || thirdDayHowMuchTimeSlotsExpandBy > 0 (svejedno, da li je 2 ili 3 dan, u odnosu na juče..)
        //    2) kao i, da je to ZAISTA 2 ili 3 dan u odnosu na danas "Monday" !!!   (ma, radi manuelno ovo onda ! za secondDayHowMuchTimeSlotsExpandBy > 0  mora biti i  && "Sunday" unutar .dayOfStart  , sto i imas... )
        // Filter out athletes who are already occupied

        // a macinje od prosli dan sto ima samo. a drzi sve dalje a
        function filterFreeSlotsAthletes(freeSlots, occupiedSlots) {
          // on ide kroz svaki od ovih elemenata ! jedan po jedan rastavlja !
          var slotsFree = freeSlots.filter((athlete) => {
            // const isNotOccupied = !occupiedEmails.includes(athlete.email);

            //  sundayOccupiedSlotsAthletes
            const correspondingOccupiedAthlete = occupiedSlots.filter(
              (occAthlete) => occAthlete.email === athlete.email
            );

            // If there is no corresponding occupied athlete, include this athlete
            if (!correspondingOccupiedAthlete) {
              return true;
            }

            // ! da ,ubacuj ti oboje, okej. ta 2 objekta zajedno. DA, TO TAKO RADI ODLICNO ! jer on osim 3-eg, sto ima, on, isto i proveri da je tog i tog dana počeo ...
            // ALO, ON PROLAZI KROZ SVE SLOBODNE (a to su SVI , elementi ! i samo uporedjuje uff)
            // pre 2 dana, nedelja..
            /*  if ((correspondingOccupiedAthlete.secondDayHowMuchTimeSlotsExpandBy > 0) && (correspondingOccupiedAthlete.dayOfStart === "Sunday")
               || ((correspondingOccupiedAthlete.thirdDayHowMuchTimeSlotsExpandBy > 0) && (correspondingOccupiedAthlete.dayOfStart === "Saturday"))
 
 
 
             ) {
 
               // to je za 2 i 3 dana isto.. u suprotnom ide true (da ubaci ga.. ). znaci striktno gleda po ovome..
               return false;
             } else {
               return true
             }; */

            const shouldExclude = correspondingOccupiedAthlete.some(
              (occAthlete) =>
                (occAthlete.secondDayHowMuchTimeSlotsExpandBy > 0 &&
                  occAthlete.dayOfStart === "Sunday") ||
                (occAthlete.thirdDayHowMuchTimeSlotsExpandBy > 0 &&
                  occAthlete.dayOfStart === "Saturday")
            );

            return !shouldExclude;
          });

          return slotsFree;
        }

        //},

        var copyfreeSlotsAthletes = [...randomizeFormData];

        // sunday, i saturday iza njega su
        var bothOccupiedSlotsAthletes = [
          ...saturdayOccupiedSlotsAthletes,
          ...sundayOccupiedSlotsAthletes,
        ];

        let freeSlotsAthletes = filterFreeSlotsAthletes(
          copyfreeSlotsAthletes,
          sundayOccupiedSlotsAthletes
        );

        // e sada isto što ima i u Sunday... (samo za ovaj dan Monday, pronalazi nove sportove koji na ovaj dan počinju ! )

        let noneFound = true;
        while (
          timeSlot_3_6 <= TotalMaxAthletesPerTimeSlot_3_6 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          // drzi broj pokusaja i uporedjuje sa duzinom array-a... da ne predje to. jer onda znas da je prosao sav array svih sportova..
          let attempts = 0;
          const maxAttempts = listOfSports.length;

          //  (AKO NE MOZE NACI, A PROŠAO JE SVE, ONDA DA PREKINE, JER ONDA CE BITI U INFINITE LOOP  )
          do {
            selectedSport = getRandomItemSports(listOfSports, "3_6", "Monday");
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_3_6 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_3_6 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                mondayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_3_6 = timeSlot_3_6 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_6_9 <= TotalMaxAthletesPerTimeSlot_6_9 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          // ! sada treba, da vidi kolko make a team, taj sport, i toliko da izvrti (znači RANDOM SPORT, a zatim RANDOM ATHLETE po tome ! )

          /*  console.log("lista sporta je:")
           console.log(listOfSports)
          */

          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(listOfSports, "6_9", "Monday");
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_6_9 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_6_9 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            /*      console.log("sport ime:" + sportName)
                 console.log("howMuchMakeATeam :" + howMuchAthletesMakeATeam) */

            //const selectedAthletes = getRandomAthletes(freeSlotsAthletes, howMuchMakeATeam, sportName );

            // ponavlja tolko puta, koliko nam treba za jedan tim  !
            // ! da i ovde sam dodao, <= , da eto ne pravi gresku neku.. tkd, aj. nek ne dira..
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              // occupiedSlotsAthletes.length === howMuchAthletesMakeATeam, so it means, cut this, loop, if we've done how much we need it..
              // in fact, if we use: timeSlot_6_9 , then we just add +1, on every..
              if (freeSlotsAthletes.length !== 0) {
                // ne od sports, nego athletes !

                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                // remove it from original (now, before we add another variable to that occupiedAthletes... )
                // moras da ga uklonis sa glavnog odma, da bi sklonio. jer on vec ima u povratnoj, taj, samo doda ovu jos jedan property...
                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                // znaci, vidis, ovaj se pokrece..
                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                // TODO, kad kaze ti da li je starting time always fixed, onda znaces, da li i za sledeci dan, ide u isto vreme, (startingTimeSlot). il ako nije available (vec ima popunjeno), da proba na sledecu (samo na tu sledecu, napravi isto tako, da proveri ako nema koji bi mogao da se stavi kao...)

                mondayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_6_9 = timeSlot_6_9 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        // da, on ide na ovu sledecu takodje, za sledeci time slot u tom istom danu ce isto. da on uzima i dalje, od istih tih ljudi koji su slobodni...
        while (
          timeSlot_9_12 <= TotalMaxAthletesPerTimeSlot_9_12 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(listOfSports, "9_12", "Monday");
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_9_12 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_9_12 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                mondayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_9_12 = timeSlot_9_12 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_12_15 <= TotalMaxAthletesPerTimeSlot_12_15 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "12_15",
              "Monday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_12_15 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_12_15 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                mondayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_12_15 = timeSlot_12_15 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_15_18 <= TotalMaxAthletesPerTimeSlot_15_18 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "15_18",
              "Monday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_15_18 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_15_18 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                mondayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_15_18 = timeSlot_15_18 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_18_21 <= TotalMaxAthletesPerTimeSlot_18_21 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "18_21",
              "Monday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_18_21 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_18_21 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                mondayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_18_21 = timeSlot_18_21 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_21_24 <= TotalMaxAthletesPerTimeSlot_21_24 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "21_24",
              "Monday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_21_24 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_21_24 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                mondayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_21_24 = timeSlot_21_24 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }
      } else if (i === 3) {
        var TotalMaxAthletesPerTimeSlot_3_6 = 0;

        var TotalMaxAthletesPerTimeSlot_6_9 = 24;
        var TotalMaxAthletesPerTimeSlot_9_12 = 37;
        var TotalMaxAthletesPerTimeSlot_12_15 = 44;
        var TotalMaxAthletesPerTimeSlot_15_18 = 47;
        var TotalMaxAthletesPerTimeSlot_18_21 = 20;

        var TotalMaxAthletesPerTimeSlot_21_24 = 3;

        function filterFreeSlotsAthletes(freeSlots, occupiedSlots) {
          // on ide kroz svaki od ovih elemenata ! jedan po jedan rastavlja !
          var slotsFree = freeSlots.filter((athlete) => {
            // const isNotOccupied = !occupiedEmails.includes(athlete.email);

            //  sundayOccupiedSlotsAthletes
            const correspondingOccupiedAthlete = occupiedSlots.filter(
              (occAthlete) => occAthlete.email === athlete.email
            );

            // If there is no corresponding occupied athlete, include this athlete
            if (!correspondingOccupiedAthlete) {
              return true;
            }

            // ALO, ON PROLAZI KROZ SVE SLOBODNE (a to su SVI , elementi ! i samo uporedjuje uff)
            // pre 2 dana, nedelja..
            /*   if ((correspondingOccupiedAthlete.secondDayHowMuchTimeSlotsExpandBy > 0) && (correspondingOccupiedAthlete.dayOfStart === "Monday")
                || ((correspondingOccupiedAthlete.thirdDayHowMuchTimeSlotsExpandBy > 0) && (correspondingOccupiedAthlete.dayOfStart === "Sunday"))
  
  
  
              ) {
  
                // to je za 2 i 3 dana isto.. u suprotnom ide true (da ubaci ga.. ). znaci striktno gleda po ovome..
                return false;
              } else {
                return true
              }; */

            const shouldExclude = correspondingOccupiedAthlete.some(
              (occAthlete) =>
                (occAthlete.secondDayHowMuchTimeSlotsExpandBy > 0 &&
                  occAthlete.dayOfStart === "Monday") ||
                (occAthlete.thirdDayHowMuchTimeSlotsExpandBy > 0 &&
                  occAthlete.dayOfStart === "Sunday")
            );

            return !shouldExclude;
          });

          return slotsFree;
        }

        //},

        var copyfreeSlotsAthletes = [...randomizeFormData];

        // from sunday, and monday together.. occupied.. if there's. because we need last 2 days... (and it gets it..)
        var bothOccupiedSlotsAthletes = [
          ...sundayOccupiedSlotsAthletes,
          ...mondayOccupiedSlotsAthletes,
        ];

        let freeSlotsAthletes = filterFreeSlotsAthletes(
          copyfreeSlotsAthletes,
          bothOccupiedSlotsAthletes
        );

        // e sada isto što ima i u Sunday... (samo za ovaj dan Monday, pronalazi nove sportove koji na ovaj dan počinju ! )

        let noneFound = true;
        while (
          timeSlot_3_6 <= TotalMaxAthletesPerTimeSlot_3_6 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          // drzi broj pokusaja i uporedjuje sa duzinom array-a... da ne predje to. jer onda znas da je prosao sav array svih sportova..
          let attempts = 0;
          const maxAttempts = listOfSports.length;

          //  (AKO NE MOZE NACI, A PROŠAO JE SVE, ONDA DA PREKINE, JER ONDA CE BITI U INFINITE LOOP  )

          do {
            selectedSport = getRandomItemSports(listOfSports, "3_6", "Tuesday");
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_3_6 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_3_6 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                tuesdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_3_6 = timeSlot_3_6 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_6_9 <= TotalMaxAthletesPerTimeSlot_6_9 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          // ! sada treba, da vidi kolko make a team, taj sport, i toliko da izvrti (znači RANDOM SPORT, a zatim RANDOM ATHLETE po tome ! )

          /*  console.log("lista sporta je:")
           console.log(listOfSports)
          */

          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(listOfSports, "6_9", "Tuesday");
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_6_9 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_6_9 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            /*      console.log("sport ime:" + sportName)
                 console.log("howMuchMakeATeam :" + howMuchAthletesMakeATeam) */

            //const selectedAthletes = getRandomAthletes(freeSlotsAthletes, howMuchMakeATeam, sportName );

            // ponavlja tolko puta, koliko nam treba za jedan tim  !
            // ! da i ovde sam dodao, <= , da eto ne pravi gresku neku.. tkd, aj. nek ne dira..
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              // occupiedSlotsAthletes.length === howMuchAthletesMakeATeam, so it means, cut this, loop, if we've done how much we need it..
              // in fact, if we use: timeSlot_6_9 , then we just add +1, on every..
              if (freeSlotsAthletes.length !== 0) {
                // ne od sports, nego athletes !

                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                // remove it from original (now, before we add another variable to that occupiedAthletes... )
                // moras da ga uklonis sa glavnog odma, da bi sklonio. jer on vec ima u povratnoj, taj, samo doda ovu jos jedan property...
                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                // znaci, vidis, ovaj se pokrece..
                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                // TODO, kad kaze ti da li je starting time always fixed, onda znaces, da li i za sledeci dan, ide u isto vreme, (startingTimeSlot). il ako nije available (vec ima popunjeno), da proba na sledecu (samo na tu sledecu, napravi isto tako, da proveri ako nema koji bi mogao da se stavi kao...)

                tuesdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_6_9 = timeSlot_6_9 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        // da, on ide na ovu sledecu takodje, za sledeci time slot u tom istom danu ce isto. da on uzima i dalje, od istih tih ljudi koji su slobodni...
        while (
          timeSlot_9_12 <= TotalMaxAthletesPerTimeSlot_9_12 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "9_12",
              "Tuesday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_9_12 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_9_12 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                tuesdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_9_12 = timeSlot_9_12 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_12_15 <= TotalMaxAthletesPerTimeSlot_12_15 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "12_15",
              "Tuesday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_12_15 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_12_15 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                tuesdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_12_15 = timeSlot_12_15 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_15_18 <= TotalMaxAthletesPerTimeSlot_15_18 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "15_18",
              "Tuesday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_15_18 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_15_18 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                tuesdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_15_18 = timeSlot_15_18 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_18_21 <= TotalMaxAthletesPerTimeSlot_18_21 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "18_21",
              "Tuesday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_18_21 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_18_21 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                tuesdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_18_21 = timeSlot_18_21 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_21_24 <= TotalMaxAthletesPerTimeSlot_21_24 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "21_24",
              "Tuesday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_21_24 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_21_24 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                tuesdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_21_24 = timeSlot_21_24 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }
      } else if (i === 4) {
        var TotalMaxAthletesPerTimeSlot_3_6 = 0;

        var TotalMaxAthletesPerTimeSlot_6_9 = 36;
        var TotalMaxAthletesPerTimeSlot_9_12 = 47;
        var TotalMaxAthletesPerTimeSlot_12_15 = 50;
        var TotalMaxAthletesPerTimeSlot_15_18 = 44;
        var TotalMaxAthletesPerTimeSlot_18_21 = 49;

        var TotalMaxAthletesPerTimeSlot_21_24 = 15;

        function filterFreeSlotsAthletes(freeSlots, occupiedSlots) {
          // on ide kroz svaki od ovih elemenata ! jedan po jedan rastavlja !
          var slotsFree = freeSlots.filter((athlete) => {
            // const isNotOccupied = !occupiedEmails.includes(athlete.email);

            //  sundayOccupiedSlotsAthletes
            const correspondingOccupiedAthlete = occupiedSlots.filter(
              (occAthlete) => occAthlete.email === athlete.email
            );

            // If there is no corresponding occupied athlete, include this athlete
            if (!correspondingOccupiedAthlete) {
              return true;
            }

            // ALO, ON PROLAZI KROZ SVE SLOBODNE (a to su SVI , elementi ! i samo uporedjuje uff)
            // pre 2 dana, nedelja..
            /*  if ((correspondingOccupiedAthlete.secondDayHowMuchTimeSlotsExpandBy > 0) && (correspondingOccupiedAthlete.dayOfStart === "Tuesday")
               || ((correspondingOccupiedAthlete.thirdDayHowMuchTimeSlotsExpandBy > 0) && (correspondingOccupiedAthlete.dayOfStart === "Monday"))
 
 
 
             ) {
 
               // to je za 2 i 3 dana isto.. u suprotnom ide true (da ubaci ga.. ). znaci striktno gleda po ovome..
               return false;
             } else {
               return true
             };
  */

            const shouldExclude = correspondingOccupiedAthlete.some(
              (occAthlete) =>
                (occAthlete.secondDayHowMuchTimeSlotsExpandBy > 0 &&
                  occAthlete.dayOfStart === "Tuesday") ||
                (occAthlete.thirdDayHowMuchTimeSlotsExpandBy > 0 &&
                  occAthlete.dayOfStart === "Monday")
            );

            return !shouldExclude;
          });

          return slotsFree;
        }

        //},

        var copyfreeSlotsAthletes = [...randomizeFormData];

        var bothOccupiedSlotsAthletes = [
          ...mondayOccupiedSlotsAthletes,
          ...tuesdayOccupiedSlotsAthletes,
        ];

        let freeSlotsAthletes = filterFreeSlotsAthletes(
          copyfreeSlotsAthletes,
          bothOccupiedSlotsAthletes
        );

        // e sada isto što ima i u Sunday... (samo za ovaj dan Monday, pronalazi nove sportove koji na ovaj dan počinju ! )

        let noneFound = true;

        while (
          timeSlot_3_6 <= TotalMaxAthletesPerTimeSlot_3_6 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          // drzi broj pokusaja i uporedjuje sa duzinom array-a... da ne predje to. jer onda znas da je prosao sav array svih sportova..
          let attempts = 0;
          const maxAttempts = listOfSports.length;

          //  (AKO NE MOZE NACI, A PROŠAO JE SVE, ONDA DA PREKINE, JER ONDA CE BITI U INFINITE LOOP  )

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "3_6",
              "Wednesday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_3_6 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_3_6 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                wednesdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_3_6 = timeSlot_3_6 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_6_9 <= TotalMaxAthletesPerTimeSlot_6_9 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          // ! sada treba, da vidi kolko make a team, taj sport, i toliko da izvrti (znači RANDOM SPORT, a zatim RANDOM ATHLETE po tome ! )

          /*  console.log("lista sporta je:")
           console.log(listOfSports)
          */

          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "6_9",
              "Wednesday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_6_9 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_6_9 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            /*      console.log("sport ime:" + sportName)
                 console.log("howMuchMakeATeam :" + howMuchAthletesMakeATeam) */

            //const selectedAthletes = getRandomAthletes(freeSlotsAthletes, howMuchMakeATeam, sportName );

            // ponavlja tolko puta, koliko nam treba za jedan tim  !
            // ! da i ovde sam dodao, <= , da eto ne pravi gresku neku.. tkd, aj. nek ne dira..
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              // occupiedSlotsAthletes.length === howMuchAthletesMakeATeam, so it means, cut this, loop, if we've done how much we need it..
              // in fact, if we use: timeSlot_6_9 , then we just add +1, on every..
              if (freeSlotsAthletes.length !== 0) {
                // ne od sports, nego athletes !

                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                // remove it from original (now, before we add another variable to that occupiedAthletes... )
                // moras da ga uklonis sa glavnog odma, da bi sklonio. jer on vec ima u povratnoj, taj, samo doda ovu jos jedan property...
                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                // znaci, vidis, ovaj se pokrece..
                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                // TODO, kad kaze ti da li je starting time always fixed, onda znaces, da li i za sledeci dan, ide u isto vreme, (startingTimeSlot). il ako nije available (vec ima popunjeno), da proba na sledecu (samo na tu sledecu, napravi isto tako, da proveri ako nema koji bi mogao da se stavi kao...)

                wednesdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_6_9 = timeSlot_6_9 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        // da, on ide na ovu sledecu takodje, za sledeci time slot u tom istom danu ce isto. da on uzima i dalje, od istih tih ljudi koji su slobodni...
        while (
          timeSlot_9_12 <= TotalMaxAthletesPerTimeSlot_9_12 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "9_12",
              "Wednesday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_9_12 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_9_12 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                wednesdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_9_12 = timeSlot_9_12 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_12_15 <= TotalMaxAthletesPerTimeSlot_12_15 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "12_15",
              "Wednesday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_12_15 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_12_15 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                wednesdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_12_15 = timeSlot_12_15 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_15_18 <= TotalMaxAthletesPerTimeSlot_15_18 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "15_18",
              "Wednesday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_15_18 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_15_18 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                wednesdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_15_18 = timeSlot_15_18 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_18_21 <= TotalMaxAthletesPerTimeSlot_18_21 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "18_21",
              "Wednesday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_18_21 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_18_21 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                wednesdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_18_21 = timeSlot_18_21 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_21_24 <= TotalMaxAthletesPerTimeSlot_21_24 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "21_24",
              "Wednesday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_21_24 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_21_24 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                wednesdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_21_24 = timeSlot_21_24 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }
      } else if (i === 5) {
        var TotalMaxAthletesPerTimeSlot_3_6 = 10;

        var TotalMaxAthletesPerTimeSlot_6_9 = 36;
        var TotalMaxAthletesPerTimeSlot_9_12 = 47;
        var TotalMaxAthletesPerTimeSlot_12_15 = 50;
        var TotalMaxAthletesPerTimeSlot_15_18 = 44;
        var TotalMaxAthletesPerTimeSlot_18_21 = 49;

        var TotalMaxAthletesPerTimeSlot_21_24 = 15;

        function filterFreeSlotsAthletes(freeSlots, occupiedSlots) {
          // on ide kroz svaki od ovih elemenata ! jedan po jedan rastavlja !
          var slotsFree = freeSlots.filter((athlete) => {
            // const isNotOccupied = !occupiedEmails.includes(athlete.email);

            //  sundayOccupiedSlotsAthletes
            const correspondingOccupiedAthlete = occupiedSlots.filter(
              (occAthlete) => occAthlete.email === athlete.email
            );

            // If there is no corresponding occupied athlete, include this athlete
            if (!correspondingOccupiedAthlete) {
              return true;
            }

            // ALO, ON PROLAZI KROZ SVE SLOBODNE (a to su SVI , elementi ! i samo uporedjuje uff)
            // pre 2 dana, nedelja..
            /*  if ((correspondingOccupiedAthlete.secondDayHowMuchTimeSlotsExpandBy > 0) && (correspondingOccupiedAthlete.dayOfStart === "Wednesday")
               || ((correspondingOccupiedAthlete.thirdDayHowMuchTimeSlotsExpandBy > 0) && (correspondingOccupiedAthlete.dayOfStart === "Tuesday"))
 
 
 
             ) {
 
               // to je za 2 i 3 dana isto.. u suprotnom ide true (da ubaci ga.. ). znaci striktno gleda po ovome..
               return false;
             } else {
               return true
             }; */

            const shouldExclude = correspondingOccupiedAthlete.some(
              (occAthlete) =>
                (occAthlete.secondDayHowMuchTimeSlotsExpandBy > 0 &&
                  occAthlete.dayOfStart === "Wednesday") ||
                (occAthlete.thirdDayHowMuchTimeSlotsExpandBy > 0 &&
                  occAthlete.dayOfStart === "Tuesday")
            );

            return !shouldExclude;
          });

          return slotsFree;
        }

        //},

        var copyfreeSlotsAthletes = [...randomizeFormData];

        var bothOccupiedSlotsAthletes = [
          ...tuesdayOccupiedSlotsAthletes,
          ...wednesdayOccupiedSlotsAthletes,
        ];

        let freeSlotsAthletes = filterFreeSlotsAthletes(
          copyfreeSlotsAthletes,
          bothOccupiedSlotsAthletes
        );

        // e sada isto što ima i u Sunday... (samo za ovaj dan Monday, pronalazi nove sportove koji na ovaj dan počinju ! )

        let noneFound = true;

        while (
          timeSlot_3_6 <= TotalMaxAthletesPerTimeSlot_3_6 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          // drzi broj pokusaja i uporedjuje sa duzinom array-a... da ne predje to. jer onda znas da je prosao sav array svih sportova..
          let attempts = 0;
          const maxAttempts = listOfSports.length;

          //  (AKO NE MOZE NACI, A PROŠAO JE SVE, ONDA DA PREKINE, JER ONDA CE BITI U INFINITE LOOP  )

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "3_6",
              "Thursday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_3_6 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_3_6 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                thursdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_3_6 = timeSlot_3_6 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_6_9 <= TotalMaxAthletesPerTimeSlot_6_9 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          // ! sada treba, da vidi kolko make a team, taj sport, i toliko da izvrti (znači RANDOM SPORT, a zatim RANDOM ATHLETE po tome ! )

          /*  console.log("lista sporta je:")
           console.log(listOfSports)
          */

          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "6_9",
              "Thursday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_6_9 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_6_9 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            /*      console.log("sport ime:" + sportName)
                 console.log("howMuchMakeATeam :" + howMuchAthletesMakeATeam) */

            //const selectedAthletes = getRandomAthletes(freeSlotsAthletes, howMuchMakeATeam, sportName );

            // ponavlja tolko puta, koliko nam treba za jedan tim  !
            // ! da i ovde sam dodao, <= , da eto ne pravi gresku neku.. tkd, aj. nek ne dira..
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              // occupiedSlotsAthletes.length === howMuchAthletesMakeATeam, so it means, cut this, loop, if we've done how much we need it..
              // in fact, if we use: timeSlot_6_9 , then we just add +1, on every..
              if (freeSlotsAthletes.length !== 0) {
                // ne od sports, nego athletes !

                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                // remove it from original (now, before we add another variable to that occupiedAthletes... )
                // moras da ga uklonis sa glavnog odma, da bi sklonio. jer on vec ima u povratnoj, taj, samo doda ovu jos jedan property...
                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                // znaci, vidis, ovaj se pokrece..
                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                // TODO, kad kaze ti da li je starting time always fixed, onda znaces, da li i za sledeci dan, ide u isto vreme, (startingTimeSlot). il ako nije available (vec ima popunjeno), da proba na sledecu (samo na tu sledecu, napravi isto tako, da proveri ako nema koji bi mogao da se stavi kao...)

                thursdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_6_9 = timeSlot_6_9 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        // da, on ide na ovu sledecu takodje, za sledeci time slot u tom istom danu ce isto. da on uzima i dalje, od istih tih ljudi koji su slobodni...
        while (
          timeSlot_9_12 <= TotalMaxAthletesPerTimeSlot_9_12 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "9_12",
              "Thursday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_9_12 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_9_12 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                thursdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_9_12 = timeSlot_9_12 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_12_15 <= TotalMaxAthletesPerTimeSlot_12_15 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "12_15",
              "Thursday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_12_15 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_12_15 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                thursdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_12_15 = timeSlot_12_15 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_15_18 <= TotalMaxAthletesPerTimeSlot_15_18 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "15_18",
              "Thursday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_15_18 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_15_18 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                thursdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_15_18 = timeSlot_15_18 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_18_21 <= TotalMaxAthletesPerTimeSlot_18_21 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "18_21",
              "Thursday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_18_21 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_18_21 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                thursdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_18_21 = timeSlot_18_21 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_21_24 <= TotalMaxAthletesPerTimeSlot_21_24 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          selectedSport = getRandomItemSports(
            listOfSports,
            "21_24",
            "Thursday"
          );

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "21_24",
              "Thursday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_21_24 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_21_24 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                thursdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_21_24 = timeSlot_21_24 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }
      } else if (i === 6) {
        var TotalMaxAthletesPerTimeSlot_3_6 = 0;

        var TotalMaxAthletesPerTimeSlot_6_9 = 15;
        var TotalMaxAthletesPerTimeSlot_9_12 = 21;
        var TotalMaxAthletesPerTimeSlot_12_15 = 30;
        var TotalMaxAthletesPerTimeSlot_15_18 = 48;
        var TotalMaxAthletesPerTimeSlot_18_21 = 48;

        var TotalMaxAthletesPerTimeSlot_21_24 = 0;

        function filterFreeSlotsAthletes(freeSlots, occupiedSlots) {
          // on ide kroz svaki od ovih elemenata ! jedan po jedan rastavlja !
          var slotsFree = freeSlots.filter((athlete) => {
            // const isNotOccupied = !occupiedEmails.includes(athlete.email);

            //  sundayOccupiedSlotsAthletes
            const correspondingOccupiedAthlete = occupiedSlots.filter(
              (occAthlete) => occAthlete.email === athlete.email
            );

            // If there is no corresponding occupied athlete, include this athlete
            if (!correspondingOccupiedAthlete) {
              return true;
            }

            // ALO, ON PROLAZI KROZ SVE SLOBODNE (a to su SVI , elementi ! i samo uporedjuje uff)
            // pre 2 dana, nedelja..
            /*   if ((correspondingOccupiedAthlete.secondDayHowMuchTimeSlotsExpandBy > 0) && (correspondingOccupiedAthlete.dayOfStart === "Thursday")
                || ((correspondingOccupiedAthlete.thirdDayHowMuchTimeSlotsExpandBy > 0) && (correspondingOccupiedAthlete.dayOfStart === "Wednesday"))
  
  
  
              ) {
  
                // to je za 2 i 3 dana isto.. u suprotnom ide true (da ubaci ga.. ). znaci striktno gleda po ovome..
                return false;
              } else {
                return true
              };
   */

            const shouldExclude = correspondingOccupiedAthlete.some(
              (occAthlete) =>
                (occAthlete.secondDayHowMuchTimeSlotsExpandBy > 0 &&
                  occAthlete.dayOfStart === "Thursday") ||
                (occAthlete.thirdDayHowMuchTimeSlotsExpandBy > 0 &&
                  occAthlete.dayOfStart === "Wednesday")
            );

            return !shouldExclude;
          });

          return slotsFree;
        }

        //},

        var copyfreeSlotsAthletes = [...randomizeFormData];

        var bothOccupiedSlotsAthletes = [
          ...wednesdayOccupiedSlotsAthletes,
          ...thursdayOccupiedSlotsAthletes,
        ];

        let freeSlotsAthletes = filterFreeSlotsAthletes(
          copyfreeSlotsAthletes,
          bothOccupiedSlotsAthletes
        );

        // e sada isto što ima i u Sunday... (samo za ovaj dan Monday, pronalazi nove sportove koji na ovaj dan počinju ! )

        let noneFound = true;

        while (
          timeSlot_3_6 <= TotalMaxAthletesPerTimeSlot_3_6 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          // drzi broj pokusaja i uporedjuje sa duzinom array-a... da ne predje to. jer onda znas da je prosao sav array svih sportova..
          let attempts = 0;
          const maxAttempts = listOfSports.length;

          //  (AKO NE MOZE NACI, A PROŠAO JE SVE, ONDA DA PREKINE, JER ONDA CE BITI U INFINITE LOOP  )

          do {
            selectedSport = getRandomItemSports(listOfSports, "3_6", "Friday");
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_3_6 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_3_6 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                fridayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_3_6 = timeSlot_3_6 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_6_9 <= TotalMaxAthletesPerTimeSlot_6_9 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          // ! sada treba, da vidi kolko make a team, taj sport, i toliko da izvrti (znači RANDOM SPORT, a zatim RANDOM ATHLETE po tome ! )

          /*  console.log("lista sporta je:")
           console.log(listOfSports)
          */

          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(listOfSports, "6_9", "Friday");
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_6_9 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_6_9 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            /*      console.log("sport ime:" + sportName)
                 console.log("howMuchMakeATeam :" + howMuchAthletesMakeATeam) */

            //const selectedAthletes = getRandomAthletes(freeSlotsAthletes, howMuchMakeATeam, sportName );

            // ponavlja tolko puta, koliko nam treba za jedan tim  !
            // ! da i ovde sam dodao, <= , da eto ne pravi gresku neku.. tkd, aj. nek ne dira..
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              // occupiedSlotsAthletes.length === howMuchAthletesMakeATeam, so it means, cut this, loop, if we've done how much we need it..
              // in fact, if we use: timeSlot_6_9 , then we just add +1, on every..
              if (freeSlotsAthletes.length !== 0) {
                // ne od sports, nego athletes !

                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                // remove it from original (now, before we add another variable to that occupiedAthletes... )
                // moras da ga uklonis sa glavnog odma, da bi sklonio. jer on vec ima u povratnoj, taj, samo doda ovu jos jedan property...
                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                // znaci, vidis, ovaj se pokrece..
                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                // TODO, kad kaze ti da li je starting time always fixed, onda znaces, da li i za sledeci dan, ide u isto vreme, (startingTimeSlot). il ako nije available (vec ima popunjeno), da proba na sledecu (samo na tu sledecu, napravi isto tako, da proveri ako nema koji bi mogao da se stavi kao...)

                fridayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_6_9 = timeSlot_6_9 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        // da, on ide na ovu sledecu takodje, za sledeci time slot u tom istom danu ce isto. da on uzima i dalje, od istih tih ljudi koji su slobodni...
        while (
          timeSlot_9_12 <= TotalMaxAthletesPerTimeSlot_9_12 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(listOfSports, "9_12", "Friday");
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_9_12 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_9_12 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                fridayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_9_12 = timeSlot_9_12 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_12_15 <= TotalMaxAthletesPerTimeSlot_12_15 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "12_15",
              "Friday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_12_15 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_12_15 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                fridayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_12_15 = timeSlot_12_15 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_15_18 <= TotalMaxAthletesPerTimeSlot_15_18 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          selectedSport = getRandomItemSports(listOfSports, "15_18", "Friday");

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "15_18",
              "Friday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_15_18 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_15_18 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                fridayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_15_18 = timeSlot_15_18 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_18_21 <= TotalMaxAthletesPerTimeSlot_18_21 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "18_21",
              "Friday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_18_21 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_18_21 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                fridayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_18_21 = timeSlot_18_21 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_21_24 <= TotalMaxAthletesPerTimeSlot_21_24 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "21_24",
              "Friday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_21_24 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_21_24 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...selectedSport,
                };

                fridayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_21_24 = timeSlot_21_24 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }
      }

      // i=7 - Saturday July 1nd
      else if (i === 7) {
        var TotalMaxAthletesPerTimeSlot_3_6 = 0;

        var TotalMaxAthletesPerTimeSlot_6_9 = 40;
        var TotalMaxAthletesPerTimeSlot_9_12 = 40;
        var TotalMaxAthletesPerTimeSlot_12_15 = 42;
        var TotalMaxAthletesPerTimeSlot_15_18 = 12;
        var TotalMaxAthletesPerTimeSlot_18_21 = 44;

        var TotalMaxAthletesPerTimeSlot_21_24 = 0;

        function filterFreeSlotsAthletes(freeSlots, occupiedSlots) {
          // on ide kroz svaki od ovih elemenata ! jedan po jedan rastavlja !
          var slotsFree = freeSlots.filter((athlete) => {
            // const isNotOccupied = !occupiedEmails.includes(athlete.email);

            //  sundayOccupiedSlotsAthletes
            const correspondingOccupiedAthlete = occupiedSlots.filter(
              (occAthlete) => occAthlete.email === athlete.email
            );

            // If there is no corresponding occupied athlete, include this athlete
            if (!correspondingOccupiedAthlete) {
              return true;
            }

            // ALO, ON PROLAZI KROZ SVE SLOBODNE (a to su SVI , elementi ! i samo uporedjuje uff)
            // pre 2 dana, nedelja..
            /*   if ((correspondingOccupiedAthlete.secondDayHowMuchTimeSlotsExpandBy > 0) && (correspondingOccupiedAthlete.dayOfStart === "Friday")
                || ((correspondingOccupiedAthlete.thirdDayHowMuchTimeSlotsExpandBy > 0) && (correspondingOccupiedAthlete.dayOfStart === "Thursday"))
  
  
  
              ) {
  
                // to je za 2 i 3 dana isto.. u suprotnom ide true (da ubaci ga.. ). znaci striktno gleda po ovome..
                return false;
              } else {
                return true
              }; */

            const shouldExclude = correspondingOccupiedAthlete.some(
              (occAthlete) =>
                (occAthlete.secondDayHowMuchTimeSlotsExpandBy > 0 &&
                  occAthlete.dayOfStart === "Friday") ||
                (occAthlete.thirdDayHowMuchTimeSlotsExpandBy > 0 &&
                  occAthlete.dayOfStart === "Thursday")
            );

            return !shouldExclude;
          });

          return slotsFree;
        }

        //},

        var copyfreeSlotsAthletes = [...randomizeFormData];

        // Thursday (June 29th)
        // i=6 - Friday (June 30th)

        var bothOccupiedSlotsAthletes = [
          ...thursdayOccupiedSlotsAthletes,
          ...fridayOccupiedSlotsAthletes,
        ];

        let freeSlotsAthletes = filterFreeSlotsAthletes(
          copyfreeSlotsAthletes,
          bothOccupiedSlotsAthletes
        );

        // e sada isto što ima i u Sunday... (samo za ovaj dan Monday, pronalazi nove sportove koji na ovaj dan počinju ! )

        let noneFound = true;
        while (
          timeSlot_3_6 <= TotalMaxAthletesPerTimeSlot_3_6 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          // drzi broj pokusaja i uporedjuje sa duzinom array-a... da ne predje to. jer onda znas da je prosao sav array svih sportova..
          let attempts = 0;
          const maxAttempts = listOfSports.length;

          //  (AKO NE MOZE NACI, A PROŠAO JE SVE, ONDA DA PREKINE, JER ONDA CE BITI U INFINITE LOOP  )

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "3_6",
              "Saturday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_3_6 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_3_6 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,

                  ...{
                    ...selectedSport,
                    dateOfStart: "July 1st",
                  },

                  julyDay: true,
                };

                JulySaturdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_3_6 = timeSlot_3_6 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_6_9 <= TotalMaxAthletesPerTimeSlot_6_9 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          // ! sada treba, da vidi kolko make a team, taj sport, i toliko da izvrti (znači RANDOM SPORT, a zatim RANDOM ATHLETE po tome ! )

          /*  console.log("lista sporta je:")
           console.log(listOfSports)
          */

          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "6_9",
              "Saturday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_6_9 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_6_9 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            /*      console.log("sport ime:" + sportName)
                 console.log("howMuchMakeATeam :" + howMuchAthletesMakeATeam) */

            //const selectedAthletes = getRandomAthletes(freeSlotsAthletes, howMuchMakeATeam, sportName );

            // ponavlja tolko puta, koliko nam treba za jedan tim  !
            // ! da i ovde sam dodao, <= , da eto ne pravi gresku neku.. tkd, aj. nek ne dira..
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              // occupiedSlotsAthletes.length === howMuchAthletesMakeATeam, so it means, cut this, loop, if we've done how much we need it..
              // in fact, if we use: timeSlot_6_9 , then we just add +1, on every..
              if (freeSlotsAthletes.length !== 0) {
                // ne od sports, nego athletes !

                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                // remove it from original (now, before we add another variable to that occupiedAthletes... )
                // moras da ga uklonis sa glavnog odma, da bi sklonio. jer on vec ima u povratnoj, taj, samo doda ovu jos jedan property...
                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                // znaci, vidis, ovaj se pokrece..
                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...{
                    ...selectedSport,
                    dateOfStart: "July 1st",
                  },
                  julyDay: true,
                };

                // TODO, kad kaze ti da li je starting time always fixed, onda znaces, da li i za sledeci dan, ide u isto vreme, (startingTimeSlot). il ako nije available (vec ima popunjeno), da proba na sledecu (samo na tu sledecu, napravi isto tako, da proveri ako nema koji bi mogao da se stavi kao...)

                JulySaturdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_6_9 = timeSlot_6_9 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        // da, on ide na ovu sledecu takodje, za sledeci time slot u tom istom danu ce isto. da on uzima i dalje, od istih tih ljudi koji su slobodni...
        while (
          timeSlot_9_12 <= TotalMaxAthletesPerTimeSlot_9_12 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "9_12",
              "Saturday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_9_12 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_9_12 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...{
                    ...selectedSport,
                    dateOfStart: "July 1st",
                  },
                  julyDay: true,
                };

                JulySaturdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_9_12 = timeSlot_9_12 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_12_15 <= TotalMaxAthletesPerTimeSlot_12_15 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "12_15",
              "Saturday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_12_15 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_12_15 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...{
                    ...selectedSport,
                    dateOfStart: "July 1st",
                  },
                  julyDay: true,
                };

                JulySaturdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_12_15 = timeSlot_12_15 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_15_18 <= TotalMaxAthletesPerTimeSlot_15_18 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "15_18",
              "Saturday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_15_18 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_15_18 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...{
                    ...selectedSport,
                    dateOfStart: "July 1st",
                  },
                  julyDay: true,
                };

                JulySaturdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_15_18 = timeSlot_15_18 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_18_21 <= TotalMaxAthletesPerTimeSlot_18_21 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          selectedSport = getRandomItemSports(
            listOfSports,
            "18_21",
            "Saturday"
          );

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "18_21",
              "Saturday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_18_21 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_18_21 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...{
                    ...selectedSport,
                    dateOfStart: "July 1st",
                  },
                  julyDay: true,
                };

                JulySaturdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_18_21 = timeSlot_18_21 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_21_24 <= TotalMaxAthletesPerTimeSlot_21_24 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "21_24",
              "Saturday"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_21_24 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_21_24 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...{
                    ...selectedSport,
                    dateOfStart: "July 1st",
                  },
                  julyDay: true,
                };

                JulySaturdayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_21_24 = timeSlot_21_24 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }
      }

      // i=8 - Sunday July 2nd
      else if (i === 8) {
        // i=8 - Sunday July 2nd

        // ? ovo ce vaziti za SVE SPORTOVE KOJE BUDES DODAVAO U TAJ "TIME SLOT" !

        var TotalMaxAthletesPerTimeSlot_3_6 = 0;

        var TotalMaxAthletesPerTimeSlot_6_9 = 16;
        var TotalMaxAthletesPerTimeSlot_9_12 = 27;
        var TotalMaxAthletesPerTimeSlot_12_15 = 33;
        var TotalMaxAthletesPerTimeSlot_15_18 = 34;
        var TotalMaxAthletesPerTimeSlot_18_21 = 21;

        var TotalMaxAthletesPerTimeSlot_21_24 = 0;

        function filterFreeSlotsAthletes(freeSlots, occupiedSlots) {
          var slotsFree = freeSlots.filter((athlete) => {
            const correspondingOccupiedAthlete = occupiedSlots.filter(
              (occAthlete) => occAthlete.email === athlete.email
            );

            // If there is no corresponding occupied athlete, include this athlete
            if (!correspondingOccupiedAthlete) {
              return true;
            }

            // dobro je, nece se ponavljati, samo on da izbegne ove druge, ako ima neke nove kao znas... da ako su zauzeti vec (samo u frontend, isto posla jos, da to napravis... da prikaze samo.. )
            /*   if ((correspondingOccupiedAthlete.secondDayHowMuchTimeSlotsExpandBy > 0) && (correspondingOccupiedAthlete.dayOfStart === "Saturday")
                || ((correspondingOccupiedAthlete.thirdDayHowMuchTimeSlotsExpandBy > 0) && (correspondingOccupiedAthlete.dayOfStart === "Friday"))
              ) {
  
                return false;
              } else {
                return true
              }; */

            const shouldExclude = correspondingOccupiedAthlete.some(
              (occAthlete) =>
                (occAthlete.secondDayHowMuchTimeSlotsExpandBy > 0 &&
                  occAthlete.dayOfStart === "Saturday") ||
                (occAthlete.thirdDayHowMuchTimeSlotsExpandBy > 0 &&
                  occAthlete.dayOfStart === "Friday")
            );

            return !shouldExclude;
          });
          return slotsFree;
        }

        // ! znači za ovaj fake, marketing, ti koristi tako drugacije slobodno, open i closed slots. smatraj kao countries ih...
        // kreiraj objekat, sa info za athletes, koji su occupied..

        // to je ove koje on i dobije sa frontenda ! ili u obican database, koji i jesu ! vec primljeni

        // ! ovo je za each time slot !!! (znači pravis kopiju za svaki time slot !).
        // shallow copy

        // da ovo će vaziti za taj jedan dan ...
        // ovo je za taj jedan dan..

        var copyfreeSlotsAthletes = [...randomizeFormData];

        // da, taj drugi saturday gledas..
        var bothOccupiedSlotsAthletes = [
          ...JulySaturdayOccupiedSlotsAthletes,
          ...fridayOccupiedSlotsAthletes,
        ];

        let freeSlotsAthletes = filterFreeSlotsAthletes(
          copyfreeSlotsAthletes,
          bothOccupiedSlotsAthletes
        );

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

        // i jos jedan indikator, da AKO BAŠ I NEMA NIJEDAN SPORT, NISTA NIJE PRONASAO INACE...

        let noneFound = true;

        // prekinice petlju, ako nema vise users.. ili ako je prazan, za sve users (da uglavnom, treba da prodje sve users, ovo je sve randomizer, jer on ionako izabere random user-a kao i sport..)
        while (
          timeSlot_3_6 <= TotalMaxAthletesPerTimeSlot_3_6 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          // drzi broj pokusaja i uporedjuje sa duzinom array-a... da ne predje to. jer onda znas da je prosao sav array svih sportova..
          let attempts = 0;
          const maxAttempts = listOfSports.length;

          //  (AKO NE MOZE NACI, A PROŠAO JE SVE, ONDA DA PREKINE, JER ONDA CE BITI U INFINITE LOOP  )

          // Loop to find a sport with the desired start time slot
          /*  // ! do {
             selectedSport = getRandomItemSports(listOfSports);
             ({ firstDayStartGameTimeSlot, dayOfStart } = selectedSport);
             attempts++;
           } while (firstDayStartGameTimeSlot !== "3_6" && dayOfStart !== "Sunday" && attempts < maxAttempts);
    */

          // on ovde treba da nadje, sport, koji ce i dalje odgovarati ovom timeframe-u ! a da ga ne overflow-uje isto...
          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "3_6",
              "Sunday",
              "June 25th"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;

              // ne, okej je, prekida celu while petlju za ovaj timeslot, 3_6, zato sto, on treba makar jedan da nadje..
              // da , jer u funkciji, on prolazi kroz celu listu ionako..
              noneFound = false;
            }
          } while (
            timeSlot_3_6 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_3_6 &&
            noneFound
          );
          // da, ide  >  , jer on moze biti <= , i to je okej, i nece traziti novi sport. ali ako jeste, onda trazi novi sport ipak... jer trazi vise igraca..
          // a ovo ce biti nista, ako nije pronasao taj uopste ! to je koji i jeste 0, koji vec i ima u timeSlot_3_6

          // on nadje taj.. al sto nece da ubaci

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            console.log("1:" + selectedSport.dayOfStart);
            console.log("1:" + selectedSport.firstDayStartGameTimeSlot);

            // TODO, e eto ti, znači, ti ustvari i ne dobijas sto ti treba... dobijes neki "9_12" kao

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              // TODO timeSlot_3_6+howMuchAthletesMakeATeam  , treba vise, ubuduce da li ce moci da stanu jos tih dodatnih tuda... TJ. IZA FOR PETLJE..
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...{
                    ...selectedSport,
                    dateOfStart: "July 2nd",
                  },
                  julyDay: true,
                };

                JulySundayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_3_6 = timeSlot_3_6 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }

            /*    console.log("SUNDAY timeslot: 3_6 ")
               console.log('SUNDAY Occupied Slots Athletes:', JulySundayOccupiedSlotsAthletes); */
            /*  console.log('SUNDAY Remaining Free Slots Athletes:', freeSlotsAthletes);
             */
          }
        }

        noneFound = true;

        while (
          timeSlot_6_9 <= TotalMaxAthletesPerTimeSlot_6_9 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          // ! sada treba, da vidi kolko make a team, taj sport, i toliko da izvrti (znači RANDOM SPORT, a zatim RANDOM ATHLETE po tome ! )

          /*  console.log("lista sporta je:")
           console.log(listOfSports)
          */

          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          // Loop to find a sport with the desired start time slot
          /*  do {
             selectedSport = getRandomItemSports(listOfSports);
             ({ firstDayStartGameTimeSlot, dayOfStart } = selectedSport);
             attempts++;
           } while (firstDayStartGameTimeSlot !== "6_9" && dayOfStart !== "Sunday" && attempts < maxAttempts);
    */

          // on ovde izabere drugi sport, za drugoga user-a... (to on isto random ubaci u ove druge ionako..)
          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "6_9",
              "Sunday",
              "June 25th"
            );

            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_6_9 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_6_9 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            console.log("2:" + selectedSport.dayOfStart);

            /*      console.log("sport ime:" + sportName)
                 console.log("howMuchMakeATeam :" + howMuchAthletesMakeATeam) */

            //const selectedAthletes = getRandomAthletes(freeSlotsAthletes, howMuchMakeATeam, sportName );

            // ponavlja tolko puta, koliko nam treba za jedan tim  !
            // ! da i ovde sam dodao, <= , da eto ne pravi gresku neku.. tkd, aj. nek ne dira..
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              // occupiedSlotsAthletes.length === howMuchAthletesMakeATeam, so it means, cut this, loop, if we've done how much we need it..
              // in fact, if we use: timeSlot_6_9 , then we just add +1, on every..
              if (freeSlotsAthletes.length !== 0) {
                // ne od sports, nego athletes !

                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                // remove it from original (now, before we add another variable to that occupiedAthletes... )
                // moras da ga uklonis sa glavnog odma, da bi sklonio. jer on vec ima u povratnoj, taj, samo doda ovu jos jedan property...
                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                // znaci, vidis, ovaj se pokrece..
                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...{
                    ...selectedSport,
                    dateOfStart: "July 2nd",
                  },
                  julyDay: true,
                };

                // TODO, kad kaze ti da li je starting time always fixed, onda znaces, da li i za sledeci dan, ide u isto vreme, (startingTimeSlot). il ako nije available (vec ima popunjeno), da proba na sledecu (samo na tu sledecu, napravi isto tako, da proveri ako nema koji bi mogao da se stavi kao...)

                JulySundayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_6_9 = timeSlot_6_9 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }

            /*   console.log("SUNDAY timeslot: 6-9 ")
              console.log('SUNDAY Occupied Slots Athletes:', JulySundayOccupiedSlotsAthletes); */
            /*  console.log('SUNDAY Remaining Free Slots Athletes:', freeSlotsAthletes);
             */
          }
        }

        noneFound = true;

        // da, on ide na ovu sledecu takodje, za sledeci time slot u tom istom danu ce isto. da on uzima i dalje, od istih tih ljudi koji su slobodni...
        while (
          timeSlot_9_12 <= TotalMaxAthletesPerTimeSlot_9_12 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          // Loop to find a sport with the desired start time slot
          /*   do {
              selectedSport = getRandomItemSports(listOfSports);
              ({ firstDayStartGameTimeSlot, dayOfStart } = selectedSport);
              attempts++;
            } while (firstDayStartGameTimeSlot !== "9_12" && dayOfStart !== "Sunday" && attempts < maxAttempts);
    */

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "9_12",
              "Sunday",
              "June 25th"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;

              console.log("on je pronasao");
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_9_12 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_9_12 &&
            noneFound
          );
          // znas, on ce ovde pronaci drugi sport, da ima, ako moze da nadje.. i uračunava, da li ce moci da prihvati toliko novih ljudi u taj sport.. tkd, ono dole je nepotrebno

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            console.log("3:" + selectedSport.dayOfStart);

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              // on ovde stane, jer isprazni na drugi user...
              console.log(freeSlotsAthletes.length);
              console.log(timeSlot_9_12);
              console.log(howMuchAthletesMakeATeam);

              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...{
                    ...selectedSport,
                    dateOfStart: "July 2nd",
                  },
                  julyDay: true,
                };

                JulySundayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_9_12 = timeSlot_9_12 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }

            /*   console.log("SUNDAY timeslot: 9-12 ")
              console.log('SUNDAY Occupied Slots Athletes:', JulySundayOccupiedSlotsAthletes); */
            /*  console.log('SUNDAY Remaining Free Slots Athletes:', freeSlotsAthletes);
             */
          }
        }

        noneFound = true;

        while (
          timeSlot_12_15 <= TotalMaxAthletesPerTimeSlot_12_15 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "12_15",
              "Sunday",
              "June 25th"
            );

            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_12_15 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_12_15 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            console.log("4:" + selectedSport.dayOfStart);

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...{
                    ...selectedSport,
                    dateOfStart: "July 2nd",
                  },
                  julyDay: true,
                };

                JulySundayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_12_15 = timeSlot_12_15 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;

        while (
          timeSlot_15_18 <= TotalMaxAthletesPerTimeSlot_15_18 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "15_18",
              "Sunday",
              "June 25th"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_15_18 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_15_18 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            console.log("5:" + selectedSport.dayOfStart);

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...{
                    ...selectedSport,
                    dateOfStart: "July 2nd",
                  },
                  julyDay: true,
                };

                JulySundayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_15_18 = timeSlot_15_18 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_18_21 <= TotalMaxAthletesPerTimeSlot_18_21 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "18_21",
              "Sunday",
              "June 25th"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_18_21 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_18_21 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            console.log("6:" + selectedSport.dayOfStart);

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...{
                    ...selectedSport,
                    dateOfStart: "July 2nd",
                  },
                  julyDay: true,
                };

                JulySundayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_18_21 = timeSlot_18_21 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }

        noneFound = true;
        while (
          timeSlot_21_24 <= TotalMaxAthletesPerTimeSlot_21_24 &&
          freeSlotsAthletes.length !== 0 &&
          noneFound
        ) {
          let selectedSport;
          let firstDayStartGameTimeSlot;

          let attempts = 0;
          const maxAttempts = listOfSports.length;

          do {
            selectedSport = getRandomItemSports(
              listOfSports,
              "21_24",
              "Sunday",
              "June 25th"
            );
            if (selectedSport) {
              var { howMuchAthletesMakeATeam } = selectedSport;
            } else {
              var howMuchAthletesMakeATeam = 0;
              noneFound = false;
            }
          } while (
            timeSlot_21_24 + howMuchAthletesMakeATeam >
              TotalMaxAthletesPerTimeSlot_21_24 &&
            noneFound
          );

          if (selectedSport) {
            const { howMuchAthletesMakeATeam } = selectedSport;

            console.log("7:" + selectedSport.dayOfStart);

            // ! znači, ja sam ovde samo stavio   <=  , jer taj zadnji nije hteo da radi kako treba !!!
            for (let i = 0; i <= howMuchAthletesMakeATeam; i++) {
              if (freeSlotsAthletes.length !== 0) {
                const selectedAthlete =
                  getRandomItemAthletes(freeSlotsAthletes);

                const index = freeSlotsAthletes.indexOf(selectedAthlete);
                if (index > -1) {
                  freeSlotsAthletes.splice(index, 1);
                }

                const modifiedAthlete = {
                  ...selectedAthlete,
                  ...{
                    ...selectedSport,
                    dateOfStart: "July 2nd",
                  },
                  julyDay: true,
                };

                JulySundayOccupiedSlotsAthletes.push(modifiedAthlete);

                timeSlot_21_24 = timeSlot_21_24 + 1; // so, every athlete (as well, it really means in all sports it counts.. no matter what sport it is, but actually, this one, is choosing randomly sport...)
              }
            }
          }
        }
      }
    }

    // e sada, lista svih sportova !
    // i onda randomizer, sklapa ručno raspored kako treba, sklopi to u objekat jedan i šalje nazad !

    // znači u ti gledas, za 1 time slot, da ne sme da se poveca vise od toga. odnosno. ti samo gledas, kada random, dodas taj sport iz tog random izabrano liste, ti trebas
    // da, povecas za +1 taj time slot, sto oznacava, da se obavlja jedan sport tuda !
    // da,

    // sada dodajes ove,
    // za saturday (opening)
    randomizeFormData.forEach((athlete) => {
      const openingGamesStart = createOpeningGamesStart(athlete);
      saturdayOccupiedSlotsAthletes.push(openingGamesStart);
    });

    // za sunday (closing)
    randomizeFormData.forEach((athlete) => {
      const closingGamesEnd = createClosingGamesEnd(athlete);
      JulySundayOccupiedSlotsAthletes.push(closingGamesEnd);
    });

    var everyDayInOneForUser = [].concat(
      saturdayOccupiedSlotsAthletes,
      sundayOccupiedSlotsAthletes,
      mondayOccupiedSlotsAthletes,
      tuesdayOccupiedSlotsAthletes,
      wednesdayOccupiedSlotsAthletes,
      thursdayOccupiedSlotsAthletes,
      fridayOccupiedSlotsAthletes,

      JulySaturdayOccupiedSlotsAthletes,
      JulySundayOccupiedSlotsAthletes
    );

    // Access the first element, to nam je prvi korisnik, i njemu vracamo u frontend samo..
    const firstUserEmail = randomizeFormData[0].email;

    const filteredAthletes = everyDayInOneForUser.filter(
      (athlete) => athlete.email === firstUserEmail
    );

    console.log("+++++++++++ Za prvog user-a je +++++++++++++++++++");
    console.log(filteredAthletes);
    //console.log(everyDayInOneForUser)

    /* 
        const secondUserEmail = randomizeFormData[1].email; */

    /* const secondfilteredAthletes = everyDayInOneForUser.filter(athlete => athlete.email === secondUserEmail);
    console.log("+++++++++++ Za drugi user-a je +++++++++++++++++++")
    console.log(secondfilteredAthletes)
    


    
    const sedmiUserEmail = randomizeFormData[6].email;

    const sedmifilteredAthletes = everyDayInOneForUser.filter(athlete => athlete.email === sedmiUserEmail);
    console.log("+++++++++++ Za sedmi user-a je +++++++++++++++++++")
    console.log(sedmifilteredAthletes)
 */

    /* 
   
       console.log("+++++++++++ Sve ovo ostalo user-a je +++++++++++++++++++")
       console.log(everyDayInOneForUser) 

*/
    // ends and empties this, for next request again..
    saturdayOccupiedSlotsAthletes = [];
    sundayOccupiedSlotsAthletes = [];
    mondayOccupiedSlotsAthletes = [];
    tuesdayOccupiedSlotsAthletes = [];
    wednesdayOccupiedSlotsAthletes = [];
    thursdayOccupiedSlotsAthletes = [];
    fridayOccupiedSlotsAthletes = [];

    JulySaturdayOccupiedSlotsAthletes = [];
    JulySundayOccupiedSlotsAthletes = [];

    return res.status(200).json(filteredAthletes);
  } catch (error) {
    console.log(error);
  }
};

const shareTableLandingPage = async (req, res) => {
  const tableHTML = req.body.tableHTML;
  const emailsToSendTo = req.body.emailsToSendTo;

  const dom = new JSDOM(tableHTML);
  const document = dom.window.document;
  document.querySelectorAll("img").forEach((img) => img.remove());

  // back to string
  const modifiedHTML = document.documentElement.outerHTML;

  var email = "ivanlerinc1510@gmail.com";

  emailsToSendTo.forEach((user) => {
    sendEmail(
      user.email,
      "See my event schedule",
      `Hey I thought you should see a demo from <a href="www.randolympics.com">Randolympics</a> website, how it will create random events, for sports we can try to compete in. 
      <br/>
      What do you think ? Let's try out some new challenge. Let's sign up together for this.
      <br/>
      Let's goooo 🏃🏆🚀
      <br/>
      <br/>
      
      ${modifiedHTML}
      
      
      
      
      
      `
    );
  });
};

const createCampaign = async (req, res) => {
  const {
    campaignId,
    friendName,
    friendMiddleName,
    friendFamilyName,
    friendLastName,
    friendEmail,
    friendPhone,
    friendBirthdate,
    friendNationality,
    friendImage,
    friendGender,

    supporterName,
    supporterPhone,
    supporterEmail,
    supporterComment,
  } = req.body;

  await db.sequelize.sync();

  // you need to validate server side  ! because you can't allow empty values for some things...
  if (friendName == "") {
    res.status(409).json({ message: "First name can't be empty !" });
    return;
  }

  if (friendLastName == "") {
    res.status(409).json({ message: "Last name can't be empty !" });
    return;
  }

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!emailRegex.test(friendEmail)) {
    res.status(409).json({ message: "Friend email is incorrect !" });
    return;
  }

  if (friendNationality == "") {
    res.status(409).json({ message: "Nationality name can't be empty !" });
    return;
  }

  // za supporter (yes, this is all for campaign, what we absolutelly need, information to have..)
  if (supporterName == "") {
    res.status(409).json({ message: "Supporter name can't be empty !" });
    return;
  }

  // we only check for validity of email, if it's inserted here
  if (supporterEmail !== "") {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(supporterEmail)) {
      res.status(409).json({ message: "Supporter email is incorrect !" });
      return;
    }
  }

  const payment_status = "unpaid";
  const payment_id = "";

  const campaign = {
    campaignId,
    friendName,
    friendMiddleName,
    friendFamilyName,
    friendLastName,
    friendEmail,
    friendPhone,
    friendBirthdate,
    friendNationality,
    friendImage,
    friendGender,

    supporterName,
    supporterPhone,
    supporterEmail,
    supporterComment,

    payment_status,
    payment_id,
  };

  const t = await db.sequelize.transaction();

  try {
    const newCampaign = await Campaign.create(campaign, { transaction: t });
    await t.commit();

    res.status(201).json({ message: "Campaign created successfully!" });
  } catch (error) {
    console.log(error.stack);
  }
};

// TODO, put this somewhere else, but this, just so I can work with something
const makePayment = async (req, res) => {
  const {
    amount,
    campaignId,
    supporterName,
    supporterEmail,
    separateDonationThruPage,
    supporterComment,
    discountCode,
    countryAthleteIsIn,
  } = req.body;

  console.log(campaignId);
  console.log(amount);

  console.log("on dobija supporterName: " + supporterName);
  console.log("dobija i supporterEmail: " + supporterEmail);
  console.log("dobija i supporterComment: " + supporterComment);

  console.log("dobija i discountCode: " + discountCode);

  console.log("dobija i countryAthleteIsIn: " + countryAthleteIsIn);

  console.log("separateDonationThruPage: " + separateDonationThruPage);
  // TODO, da, sa ovime, on mora da kreira tabelu, jer fino u backend samo posalji sve sto ti treba, da se ne cimam sa FE, insecure je ionako to jako...

  // TODO ovde, amount . si 100% siguran kolko novca dano !

  // TODO i success (mora biti potvrdjen payment ! kako on dobija ovde !)

  console.log("passed once");

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    res.send({
      paymentIntent,
    });

    console.log(paymentIntent);

    console.log("ono sto on prima je." + campaignId);

    if (separateDonationThruPage) {
      try {
        await db.sequelize.sync();

        // find athleteId (so we increase his donatedAmount when we confirm payment)

        // prvo nadjes u campaign, pa odatle nadjes info (u Users, za taj email, athlete !)
        var campaignViewed = await Campaign.findOne({
          where: { campaignId: campaignId },
        });

        console.log("--------------------campaignViewed------------------");
        console.log(campaignViewed);
        console.log("----------direktni pristup je");
        console.log(campaignViewed.friendEmail);
        // sad nalazi athleteId po ovome...
        const oneAthlete = await User.findOne({
          where: { email: campaignViewed.friendEmail },
        });

        // e sada uzimas athleteId odatle:   oneAthlete.userId

        // sada, moras da proveris, da li je supporter anonymus ! A AKO IMA NALOG UPISUJES GA OVDE NJEGOV "supporterId"
        // znaci izvrsi proveru, da li email supportera (isto je unique zar ne..), matchje neki koji postoji u database. cisto eto moze korisno imat ako treba (za njegovu listu, koga je on supportovao.. (a i fora je, da ako kreira nalog, vidis, isto ce imati pregled koga je supportovao..))
        // to jeste "supporterEmail", direktno, ovaj sto je donirao sa stranice, što upisuje !
        const oneSupporter = await User.findOne({
          where: { email: supporterEmail },
        });

        if (oneSupporter) {
          var supporterId = oneSupporter.userId;
          // if there's nothing, no such user, supporter, then nothing happens, it will be "null" stored in database anyways..
        } else {
          var supporterId = "";
        }

        // amount, JOS NE UPISUJES OVDE NISTA ! (to tek na drugoj strani pri potvrdi, jer ionako database, kreira ga kao 0 ..)

        // on ce supporterEmail, da cuva u ovaj record. pa eto kasnije, kada supporter napravi nalog, moci ce da ima pregled svojih ! bez obzira eto vidis.. pre nego napravio nalog, moci ce da ih vidi isto..

        // payment_status, isto ne diras sad nista, u database biva ionako "unpaid" po default-u

        const supporter_data = {
          campaignId,
          athleteId: oneAthlete.userId,
          supporterId,

          supporterName,
          supporterEmail,
          supporterComment,

          payment_id: paymentIntent.id,
          couponDonationCode: discountCode,
          countryAthleteIsIn: countryAthleteIsIn,
        };

        await Statscampaign.create(supporter_data);

        // ! ali, ovo je kada neko dodaje, u vec kreirani campaignId ! radi transaction history (a isto tako, mozemo da čitamo svi komentari od supporters..)

        // supporterComment
      } catch (error) {
        console.log(error.stack);
      }
    } else {
      // ! OVO JE OBICAN, ubaci u campaignId, trazi on ovde..
      // sad upisi u database (da, i vise puta ako je, ako nije uspeo, ide on dole u error ionako)
      const oneCampaign = await Campaign.findOne({
        where: { campaignId: campaignId },
      });

      try {
        await oneCampaign.update({
          payment_id: paymentIntent.id,

          couponDonationCode: discountCode,
          countryAthleteIsIn: countryAthleteIsIn,
        }); // azurira samo taj

        // samo novi model za ove dve stvari upravo..

        // ! 11.08 , i doda discountCode , countryAthleteIsIn, njih takodje azurira u database !
      } catch (error) {
        console.log(error.stack);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }

  /*   const stripe = require('stripe')(process.env.STRIPE_TEST_API)

  stripe.products.create({
    name: 'Starter Subscription',
    description: '$12/Month subscription',
  }).then(product => {
    stripe.prices.create({
      unit_amount: 1200,
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
      product: product.id,
    }).then(price => {
      console.log('Success! Here is your starter subscription product id: ' + product.id);
      console.log('Success! Here is your starter subscription price id: ' + price.id);
    });
  }); */
};

const campaignDetails = async (req, res) => {
  const campaignId = req.query.campaignId;

  try {
    const oneCampaign = await Campaign.findOne({
      where: {
        campaignId: campaignId,
      },
    });

    // i nadji user Athlete-a, takodje, da i to koristis u BE... (pa ces izvuci koji ti treba u dve varijable..)
    const thatAthlete = await User.findOne({
      where: {
        email: oneCampaign.friendEmail,
      },
    });

    return res.status(200).json({ oneCampaign, thatAthlete });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// how many supporters are there for that athlete (campaign)
const howManySupportersCampaign = async (req, res) => {
  const campaignId = req.query.campaignId;

  try {
    const countOfSupporters = await Statscampaign.count({
      where: {
        campaignId: campaignId,
      },
    });

    res.json({ count: countOfSupporters });
  } catch (error) {
    console.log(error.stack);
  }

  // TODO, ovo je za kolko supporters ima ovde
};

const lastCommentsSupportersCampaign = async (req, res) => {
  const campaignId = req.query.campaignId;

  try {
    const lastCommentsSupporters = await Statscampaign.findAll({
      where: {
        campaignId: campaignId,
        supporterComment: {
          [Sequelize.Op.ne]: null,
        },
      },

      limit: 3,
      attributes: ["supporterComment"], // only this row in database retrieve
      order: [["createdAt", "DESC"]],
    });

    console.log(lastCommentsSupporters);

    res.json(lastCommentsSupporters);
  } catch (error) {
    console.log(error.stack);
  }
};

const lastTransactionsSupportersCampaign = async (req, res) => {
  const campaignId = req.query.campaignId;

  try {
    const lastCommentsSupporters = await Statscampaign.findAll({
      where: {
        campaignId: campaignId,
      },

      limit: 3,
      attributes: ["supporterName", "amount", "supporterComment"], // only this row in database retrieve
      order: [["createdAt", "DESC"]],
    });

    console.log(lastCommentsSupporters);

    res.json(lastCommentsSupporters);
  } catch (error) {
    console.log(error.stack);
  }
};

// donate using only dicsount code
const donateOnlyWithDiscountCode = async (req, res) => {
  const {
    discountCode,
    campaignId,

    supporterEmail,
    supporterName,
    supporterComment,
  } = req.body;

  try {
    // ima li koji odgovara tome..
    await db.sequelize.sync();

    // prvo nadjes u campaign, pa odatle nadjes info (u Users, za taj email, athlete !)
    const campaignViewed = await Campaign.findOne({
      where: { campaignId: campaignId },
    });

    console.log("---------> campaignId" + campaignId);
    console.log(campaignViewed);

    // sad nalazi athleteId po ovome... (treba da upise dodatno ovoliko !)
    const oneAthlete = await User.findOne({
      where: { email: campaignViewed.friendEmail },
    });

    console.log("---------> oneAthlete " + campaignViewed.friendEmail);
    console.log(oneAthlete);

    // sada, moras da proveris, da li je supporter anonymus ! A AKO IMA NALOG UPISUJES GA OVDE NJEGOV "supporterId"
    // znaci izvrsi proveru, da li email supportera (isto je unique zar ne..), matchje neki koji postoji u database. cisto eto moze korisno imat ako treba (za njegovu listu, koga je on supportovao.. (a i fora je, da ako kreira nalog, vidis, isto ce imati pregled koga je supportovao..))
    // to jeste "supporterEmail", direktno, ovaj sto je donirao sa stranice, što upisuje !

    try {
      const oneSupporter = await User.findOne({
        where: { email: supporterEmail },
      });

      if (oneSupporter) {
        var supporterId = oneSupporter.userId;
        // if there's nothing, no such user, supporter, then nothing happens, it will be "null" stored in database anyways..
      } else {
        var supporterId = "";
      }
    } catch (e) {
      console.log(e.stack);
    }

    // treba, da odma matchujes i drzavu ovde u "where", da imas manje da trazis i kucas. da preko athlete odmah da ih imas sve tu..

    try {
      // on nadje koji ima.. u Coupons
      var oneCoupon = await Couponcodes.findOne({
        where: {
          couponCode: discountCode,
          isCouponActive: 1,
          country: oneAthlete.nationality.toUpperCase(),
        },
      });
      console.log("OVDE NE RADI ");
      console.log(discountCode);
      console.log(oneAthlete.nationality.toUpperCase());

      console.log(oneCoupon);
    } catch (e) {
      console.log(e.stack);
    }

    if (!oneCoupon || typeof oneCoupon === "undefined") {
      //  console.log("coupon code is not valid");

      // so it do nothing in backend anyways..
      res.status(200).json({ message: "coupon code is not valid" });
    }

    // sada proveri 'Coupons.js'  sa 'statsCampaign.js'
    if (oneCoupon.couponCode) {
      // cek, ti ne treba da upisujes nista u statsCampaign ! to ti je za potvrdu bilo ustvari (upisujes samo amount.. )
      // da, TI USTVARI KREIRAS NOVI ROW, kao transakciju u taj statsCampaign, upravo sa vrednoscu iz tog couponCode-a...

      // prvo izvuces amount koji treba, pa to samo kreiras tu row u tabeli

      /*  const oneCoupon = await Statscampaign.findOne({
          where: { couponDonationCode: discountCode, },
        }); */

      // znaci kreiras jedan row .. (da, treba da upises, i u Athlete isto), i ovaj ce jedini biti odmah "success", jer on ne radi potvrdu..
      try {
        await db.sequelize.sync();

        const currentDate = new Date();
        const expiryDate = new Date(oneCoupon.expiryDate);

        let newAmount = oneCoupon.couponValue; // da uvek vazi samo za fixed ! samo, i ovo vazi samo za national (nece matchovati nijedan "GLOBAL", ionako...)

        let newSpentAmount = newAmount + oneCoupon.spentAmount;

        if (
          currentDate <= expiryDate &&
          newSpentAmount < oneCoupon.maxSpentLimit &&
          oneCoupon.couponTimesUsed <= oneCoupon.maxCouponTimesUsed
        ) {
          try {
            await oneCoupon.update({
              couponTimesUsed: oneCoupon.couponTimesUsed + 1,
              spentAmount: newSpentAmount,
            }); // azurira samo taj

            // i azurira status transakcije kao "success", eto da je full-ed
            await campaignViewed.update({ payment_status: "succeeded" });

            // i u athlete mora da azurira + tolko amount donated...
            await oneAthlete.update({
              donatedAmount: oneAthlete.donatedAmount + newAmount,
            });
          } catch (error) {
            console.log(error.stack);
          }

          var amount = newAmount;
        } else {
          try {
            // then it's expired, just set it so, so we don't check it anymore..
            await oneCoupon.update({ isCouponActive: 0 });
          } catch (e) {
            console.log(e.stack);
          }

          // samo vrati to i tjt..
          var amount = newAmount;
        }

        // ! evo ovde
        //  var amount = calculateDonateWithDiscountOnly(currentDate,expiryDate,newAmount,newSpentAmount);

        const supporter_data = {
          campaignId,
          athleteId: oneAthlete.userId,

          supporterId,

          supporterEmail,
          supporterName,
          supporterComment,

          countryAthleteIsIn: oneAthlete.nationality,

          amount: amount,
        };

        await Statscampaign.create(supporter_data);

        res.status(200).json({ message: "coupon confirmed" });
      } catch (e) {
        console.log(e.stack);
      }
    }
  } catch (e) {
    console.log(e.stack);
  }
};

const listAllCampaigns = async (req, res) => {
  const campaignId = req.query.campaignId;

  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  const filterGender = req.query.filterGender;
  const filterNationality_selected = req.query.filterNationality_selected;
  const searchFirstNameText = req.query.searchFirstNameText;
  const searchFamilyNameText = req.query.searchFamilyNameText;

  console.log("----------listAllCampaigns----------");
  console.log(filterGender);

  console.log(filterNationality_selected);
  console.log(searchFirstNameText);
  console.log(searchFamilyNameText);

  try {
    const allCampaigns = await Campaign.findAll({
      /*  where: {

      friendGender: {
        [Op.like]: `${filterGender}`,  // Partial match for first name
      },

      friendNationality: {
        [Op.like]: `%${filterNationality_selected}%`,  // Partial match for first name
      },
     
      friendName: {
        [Op.like]: `%${searchFirstNameText}%`,  // Partial match for first name
      },

      friendFamilyName: {
        [Op.like]: `%${searchFamilyNameText}%`,  // Partial match for first name
      },
    


      },  */

      where: {
        friendGender: {
          [Op.like]: `%${filterGender}%`,
        },
        friendNationality: {
          [Op.like]: `%${filterNationality_selected}%`,
        },

        friendName: {
          [Op.like]: `%${searchFirstNameText}%`,
        },
        friendFamilyName: {
          [Op.like]: `%${searchFamilyNameText}%`,
        },
      },
      order: [["updatedAt", "DESC"]],
      limit: limit,
      offset: offset,
    });

    /*  // i nadji user Athlete-a, takodje, da i to koristis u BE... (pa ces izvuci koji ti treba u dve varijable..)
    const thatAthlete = await User.findOne({
      where: {
        email: oneCampaign.friendEmail,
      },
    });  */

    res.json(allCampaigns);

    //  return res.status(200).json({ oneCampaign, thatAthlete });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};





const informOtherSupporters = async (req,res) => {

  /* additionalSupporterEmailsToSendTo, */
  const { campaignURL, name  } = req.body;

  const additionalSupporterEmailsToSendTo = JSON.parse(req.body.additionalSupporterEmailsToSendTo);

  
  
  

  try {

 
   if (additionalSupporterEmailsToSendTo) {
    additionalSupporterEmailsToSendTo.forEach((user) => {
      console.log("salje li on nesto: " + user.email);

      sendEmail(
        user.email,
        "Invitation to participate in Randolympics",
        `We're signing up ${name} to participate in campaign.

        Check him <a href=${campaignURL}>out here</a>

      
      
      
      
      
      
      `
      );
    });
  } 

} catch (e){
  console.log(e.stack);
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

  shareTableLandingPage,

  makePayment,
  createCampaign,

  campaignDetails,
  howManySupportersCampaign,
  lastCommentsSupportersCampaign,
  lastTransactionsSupportersCampaign,

  donateOnlyWithDiscountCode,

  listAllCampaigns,

  informOtherSupporters,

};
