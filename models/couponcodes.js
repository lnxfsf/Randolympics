

module.exports = function (sequelize, DataTypes) {
  return sequelize.define("couponcodes", {
   
    couponId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,

    },

    couponCode: {
      type: DataTypes.STRING(255),

    },
    
    isCouponActive: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
    },

    country: {
      type: DataTypes.STRING(255),

    },



    expiryDate: {
      type: DataTypes.DATEONLY,

    },


    // if it's "GLOBAL", it's up to YOU, to insert data, that will be seen as percent ! and that's 0.95 * 100  (so, *100, is what you do when you extract this data... )
    couponValue: {
      type: DataTypes.FLOAT,
    },


    // kad je national, samo tolko i uvećaš
    // a ako je, global, onda samo izracuvas koliko je uvecao sa tim %, i onda ga uploaduje, ovde, kolko je azurirao..
    maxSpentLimit: {
      type: DataTypes.INTEGER,
    },


    //  for "GLOBAL", this can be limit, how many times, it can be used ! (once, and then it expires). 
    // For national, we don't check this value (but you can add to it, why not ofc.. )
    couponTimesUsed: {
      type: DataTypes.INTEGER,
    }




  });
};
