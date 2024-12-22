
const path = require('path');
const fs = require('fs');


const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    dialect: 'mysql',
    port: process.env.PORT_MYSQL,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
        ca: fs.readFileSync(path.join(__dirname, 'ca-certificate.crt')),
      },
    },
   
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  };
  
  module.exports = config;

  

  