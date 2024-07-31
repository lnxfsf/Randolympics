

module.exports = function (sequelize, DataTypes) {

    return sequelize.define("news", {
        postId: {
            type: DataTypes.STRING(255),
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




