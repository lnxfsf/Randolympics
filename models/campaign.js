module.exports = function (sequelize, DataTypes) {
  return sequelize.define("campaign", {
    campaignId: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      
    },

    friendName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    friendMiddleName: {
      type: DataTypes.STRING(255),
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
    },

    supporterName: {
      type: DataTypes.STRING(255),
    },

    supporterPhone: {
      type: DataTypes.STRING(15),
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



  });
};
