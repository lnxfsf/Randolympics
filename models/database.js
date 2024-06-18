
const dbConfig = require('../data/config');
const { Sequelize, DataTypes } = require('sequelize');


// this is mySQL database (local for now) connection. on 'randolympics' database
  const sequelize = new Sequelize('randolympics', 'igor', 'igor123', {
    host: 'localhost',
    dialect: 'mysql',

    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  });
  
  




sequelize.authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch(err => {
    console.log('Error' + err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./users')(sequelize,DataTypes)



db.sequelize.sync({ force: false })
  .then(() => {
    console.log('yes re-sync is done!');
  });

module.exports = db;
