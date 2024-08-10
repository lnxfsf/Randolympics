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

    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }




  });
};
