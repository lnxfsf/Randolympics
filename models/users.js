// he uses callback for this
module.exports = function (sequelize, DataTypes) {
  return sequelize.define("users", {
    userId: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    user_type: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email_private: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
    },
  
    name_verify: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
    },


    middleName: {
      type: DataTypes.STRING(255),
    },

    lastName: {
      type: DataTypes.STRING(255),
    },


    familyName: {
      type: DataTypes.STRING(255),
    },

    birthdate: {
      type: DataTypes.DATEONLY,
    },

    birthdate_private: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
    },

    birthdate_verify: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
    },
    phone: {
      type: DataTypes.STRING(15),
    },
    phone_private: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
    },
    nationality: {
      type: DataTypes.STRING(100),
      defaultValue: "US",
    },
    nationality_verify: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
    },
    weight: {
      type: DataTypes.DOUBLE,
    },
    weight_private: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
    },
    picture: {
      type: DataTypes.STRING(400),
    },
    passport_photo: {
      type: DataTypes.STRING(400),
    },
    passport_expiry: {
      type: DataTypes.DATEONLY,
    },
    passport_expiry_verify: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
    },
    bio: {
      type: DataTypes.STRING(250),
    },
    achievements: {
      type: DataTypes.STRING(250),
    },
    ranking: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // this is, just so it can add onto this..
    },
    ranking_heavy: {
      type: DataTypes.INTEGER,
    },
    ranking_medium: {
      type: DataTypes.INTEGER,
    },
    ranking_low: {
      type: DataTypes.INTEGER,
    },
    team: {
      type: DataTypes.STRING(150),
    },
    cryptoaddress: {
      type: DataTypes.STRING(150),
    },
    cryptoaddress_type: {
      type: DataTypes.STRING(10),
    },

    isVerified: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
    },
    verificationToken: {
      type: DataTypes.STRING,
    },

    gender: {
      type: DataTypes.CHAR(1),
    },

    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    //NP name
    votedFor: {
      type: DataTypes.STRING(255),
      defaultValue: "",
    },

    //NP userId
    votedForNPuserId: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    // GP userId
    votedForGPuserId: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    currentNP: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
    },

    userNPPercentage: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0,
    },

    status: {
      type: DataTypes.STRING(255),
      defaultValue: "Candidate",
    },

    status_date: {
      type: DataTypes.DATE,
    },



    // we need ranking for each user_type.. (so it can easily add to each other)
    rankingGP: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // this is, just so it can add onto this..
    },

    rankingNP: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // this is, just so it can add onto this..
    },

    rankingEM: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // this is, just so it can add onto this..
    },

    rankingITM: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // this is, just so it can add onto this..
    },

    rankingMM: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // this is, just so it can add onto this..
    },

    rankingSM: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // this is, just so it can add onto this..
    },

    rankingVM: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // this is, just so it can add onto this..
    },

    rankingLM: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // this is, just so it can add onto this..
    },

    rankingRS: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // this is, just so it can add onto this..
    },


    currentGP: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
    }, 

    currentGP_UpToDate: {
      type: DataTypes.DATE,
      defaultValue: () => {
        let date = new Date();
        date.setFullYear(date.getFullYear() + 4);
        return date;
      },
      
    }, 

    votesGP: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },



    passportStatus: {
      type: DataTypes.STRING,
      defaultValue: "unvalidated",
    },


    passportUploadedDate: {
      type: DataTypes.DATE,
    },

    passportLastValidatedRejected: {
      type: DataTypes.DATE,
    },


    supporterComment: {
      type: DataTypes.STRING(255),
    },


    donatedAmount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },


    athleteStatement: {
      type: DataTypes.TEXT('medium'),
    },


    athleteStatus: {
      type: DataTypes.STRING(255),
      defaultValue: "s1",

    },
    





    isCelebrity: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
    },


    fb_link: {
      type: DataTypes.STRING(255),
    },

    ig_link: {
      type: DataTypes.STRING(255),
    },

    tw_link: {
      type: DataTypes.STRING(255),
    },

 
    tt_link: {
      type: DataTypes.STRING(255),
    },

    yt_link: {
      type: DataTypes.STRING(255),
    },
    






    
  }, {

    indexes: [
      { fields: ['name'] },
      { fields: ['email'] },
      { fields: ['user_type'] },
      { fields: ['gender'] },
      { fields: ['nationality'] },
    ]

  });
};
