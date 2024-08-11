module.exports = function (sequelize, DataTypes) {
  return sequelize.define("statscampaign", {
    
    campaignstatsId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    
    campaignId: {
      type: DataTypes.STRING(255),
      
      
    },


    athleteId: {
      type: DataTypes.STRING(255),
    
    },


    supporterId: {
      type: DataTypes.STRING(255),
     
      
    },




    supporterName: {
      type: DataTypes.STRING(255),
    },


    supporterEmail: {
      type: DataTypes.STRING(255),
    },

    supporterComment: {
      type: DataTypes.STRING(255),
     
    },


    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    payment_status: {
      type: DataTypes.STRING(255),
      defaultValue: "unpaid",
    },


    payment_id: {
      type: DataTypes.STRING(600),
    },

    couponDonationCode: {
      type: DataTypes.STRING(255),

    },





  });
};
