require('dotenv').config();


//this is config for migrations ! so it can connect to database
module.exports = {
  
    "development": {
      "username": process.env.USER,
      "password": process.env.PASSWORD,
      "database": process.env.DATABASE,
      "host": process.env.HOST,
      "dialect": "mysql"
    },
    "production": {



      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      host: process.env.HOST,
      dialect: "mysql",
      port: process.env.PORT_MYSQL,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },

     



    }
  
}