// this is, all for ranking..

const db = require("../models/database");
const User = db.users;
const Traffic = db.traffic;
const Op = db.Sequelize.Op;


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

    // also, applies for RS as well (but it uses another rankingRS ! )
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

module.exports = {
  // update_rank_data,
  rankingTop50,
  otherUsers,
  lastInRank,


  team,
  currentNP,
  listLoginTrafficHistory,
};
