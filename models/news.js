
// he uses callback for this
module.exports = function(sequelize, DataTypes) {

    return sequelize.define('news',{
    
        
    newsId: {
        type: DataTypes.STRING(255),
        primaryKey: true,
    },




    title: {
        type: DataTypes.STRING(255),
        allowNull: false,

    },

    subtitle: {
        type: DataTypes.STRING(255),
        

    },

    content: {
        type: DataTypes.TEXT,
        
    },
    
    
    category: {
        type: DataTypes.STRING(255),
        allowNull: false,

    },

    picture_of_post: {
        type: DataTypes.STRING(400),
    },


    date_published: {
        type: DataTypes.DATEONLY,
    },
    
    
    
    });
    };
    

