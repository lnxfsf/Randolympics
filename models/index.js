
const dbConfig = require('../data/config');
const { Sequelize, DataTypes } = require('sequelize');







/* 
dbConfig.DATABASE, 
  dbConfig.USER, 
  dbConfig.PASSWORD, */ 

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
  
  

  
/* 
const sequelize = new Sequelize(
  
  {

    dialect: MySqlDialect,
    database: 'randolympics', 
    user: 'igor', 
    password: 'igor123', 

    host: 'localhost',
   
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);  */




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

db.sequelize.sync({ force: false })
  .then(() => {
    console.log('yes re-sync is done!');
  });

module.exports = db;
