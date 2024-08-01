

module.exports = function (sequelize, DataTypes) {

    return sequelize.define("upcominggames", {
        postId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },

          title: {
            type: DataTypes.STRING(255),
            
          },


          subtitle: {
            type: DataTypes.STRING(255),
            
          },


          cover_image: {
            type: DataTypes.STRING(400),
            
          },


          content: {
            type: DataTypes.TEXT('medium'), 
            
          },






    });
};




