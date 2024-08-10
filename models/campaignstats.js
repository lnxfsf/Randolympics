module.exports = function (sequelize, DataTypes) {
  return sequelize.define("campaignstats", {
    
    campaignstatsId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    
    campaignId: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      
    },


    athleteId: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },


    supporterId: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      
    },




    supporterName: {
      type: DataTypes.STRING(255),
    },

    
    supporterEmail: {
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







  });
};
