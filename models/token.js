

/* 
const Token = db.sequelize.define("token", {


  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },


});

module.exports = Token; */




// on pass-uje funkciju od spolja pri pozivu koja mu treba i onda dobije to sto treba..
module.exports = function(sequelize, DataTypes) {

    return sequelize.define('token',{


  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },



    });

    
};


