const dbConfig = require("../data/config");
const { Sequelize, DataTypes } = require("sequelize");

require('dotenv').config();


// this is mySQL database (local for now) connection. on 'randolympics' database
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "mysql",

    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    }
  }
);


sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users")(sequelize, DataTypes); // model for Users
db.traffic = require("./traffic")(sequelize, DataTypes); // this is model, and new database, for all login
db.upcominggames = require("./upcominggames")(sequelize, DataTypes);
db.news = require("./news")(sequelize, DataTypes);
db.economics = require("./economics")(sequelize, DataTypes);

db.campaign = require("./campaign")(sequelize, DataTypes);

db.statscampaign = require("./statscampaign")(sequelize, DataTypes);

db.couponcode = require("./couponcode")(sequelize, DataTypes);
// model for News

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync is done!");
});

module.exports = db;
