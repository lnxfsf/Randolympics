/* const mysql = require("mysql2");
const config = require("./config");



const connectDB = async () => {



    const pool = mysql.createPool(config);

    


    pool.getConnection((err, connection) => {
        if (err) {
          console.log({ error: err.message });
        }
    
        console.log("Connected to MySQL database");
        connection.release();
      });




      module.exports = pool;

      





};


module.exports = connectDB;
 */