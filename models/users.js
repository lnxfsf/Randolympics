




// he uses callback for this
module.exports = function(sequelize, DataTypes) {

    return sequelize.define('users',{
    
        
    
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
        type: DataTypes.BOOLEAN,
    },
    password: {
        type: DataTypes.STRING(255),
    },
    name: {
        type: DataTypes.STRING(255),
    },
    name_verify: {
        type: DataTypes.BOOLEAN,
    },
    birthdate: {
        type: DataTypes.DATEONLY,
    },
    birthdate_private: {
        type: DataTypes.BOOLEAN,
    },
    birthdate_verify: {
        type: DataTypes.BOOLEAN,
    },
    phone: {
        type: DataTypes.STRING(15),
    },
    phone_private: {
        type: DataTypes.BOOLEAN,
    },
    nationality: {
        type: DataTypes.STRING(100),
    },
    nationality_verify: {
        type: DataTypes.BOOLEAN,
    },
    weight: {
        type: DataTypes.DOUBLE,
    },
    weight_private: {
        type: DataTypes.BOOLEAN,
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
        type: DataTypes.BOOLEAN,
    },
    bio: {
        type: DataTypes.STRING(250),
  
    },
    achievements: {
        type: DataTypes.STRING(250),
    },
    ranking: {
        type: DataTypes.INTEGER,
        
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
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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

      votedFor: {
        type: DataTypes.STRING(255),
      }
















    });
    };
    

