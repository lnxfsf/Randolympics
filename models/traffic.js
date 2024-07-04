

module.exports = function (sequelize, DataTypes) {
    return sequelize.define("traffic", {

        trafficHistoryId: {
            type: DataTypes.STRING(255),
            primaryKey: true,
          },


          user_type: {
            type: DataTypes.STRING(120),
            allowNull: false,
          },

          nationality: {
            type: DataTypes.STRING(100),
            
          },


          // this should reset at 0, every day.. 
          numberOfLogins: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
          }



          // user_type
          // country
          // numberOfLogins



    });
};