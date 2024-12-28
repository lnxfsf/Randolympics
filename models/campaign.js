module.exports = function (sequelize, DataTypes) {
  return sequelize.define("campaign", {
    campaignId: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      
    },

    friendName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },

    friendMiddleName: {
      type: DataTypes.STRING(255),
      defaultValue: "",
    },


    friendFamilyName: {
      type: DataTypes.STRING(255),
      defaultValue: "",
    },

    friendLastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    friendEmail: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    friendPhone: {
      type: DataTypes.STRING(15),
      defaultValue: "",
    },

    friendBirthdate: {
      type: DataTypes.DATEONLY,
    },

    friendNationality: {
      type: DataTypes.STRING(100),
      defaultValue: "US",
    },

    friendImage: {
      type: DataTypes.STRING(400),
    },

    friendGender: {
      type: DataTypes.CHAR(1),
      defaultValue: "",
    },

    supporterName: {
      type: DataTypes.STRING(255),
    },

    supporterPhone: {
      type: DataTypes.STRING(15),
      defaultValue: "",
    },

    supporterEmail: {
      type: DataTypes.STRING(255),
    },

    supporterComment: {
      type: DataTypes.STRING(255),
    },

    payment_status: {
      type: DataTypes.STRING(255),
      defaultValue: "unpaid",
    },
    //TODO  E OVE U trigger, mysql, brises za 7 dana i slicno  ! TO GLEDAS PO POLJU "createdAt" !!!

    payment_id: {
      type: DataTypes.STRING(600),
    },

    couponDonationCode: {
      type: DataTypes.STRING(255),
      defaultValue: "",

    },


    countryAthleteIsIn: {
      type: DataTypes.STRING(100),
      defaultValue: "US",
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
      { fields: ['friendEmail'] },
      { fields: ['supporterEmail'] },
      { fields: ['payment_id'] },
    
    ]

  });
};
