// schema for the user table

/* const userSchema = `
  CREATE TABLE IF NOT EXISTS users (
      userId VARCHAR(255) PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255)
  )
`; */

/* const userSchema = `
  CREATE TABLE IF NOT EXISTS users (
      userId VARCHAR(255) PRIMARY KEY,
      user_type VARCHAR(120) NOT NULL,
      email VARCHAR(255) NOT NULL,
      email_private BOOLEAN,
      password VARCHAR(255),
      name VARCHAR(255),
      name_verify BOOLEAN‚
      birthdate DATE,
      birthdate_private BOOLEAN,
      birthdate_verify BOOLEAN,
      phone VARCHAR(15),
      phone_private BOOLEAN,
      nationality VARCHAR(100),
      nationality_verify BOOLEAN,
      weight DOUBLE,
      weight_private BOOLEAN,
      picture VARCHAR(400),
      passport_photo VARCHAR(400),
      passport_expiry DATE,
      passport_expiry_verify BOOLEAN,
      bio VARCHAR(250),
      achievements VARCHAR(250),
      ranking VARCHAR(20),
      ranking_heavy VARCHAR(20),
      ranking_medium VARCHAR(20),
      ranking_low VARCHAR(20),
      team VARCHAR(150),
      cryptoaddress VARCHAR(150),
      cryptoaddress_type VARCHAR(10)
  )

`;



module.exports = userSchema; */


const userSchema = `
  CREATE TABLE IF NOT EXISTS users (
      userId VARCHAR(255) PRIMARY KEY,
      user_type VARCHAR(120) NOT NULL,
      email VARCHAR(255) NOT NULL,
      email_private BOOLEAN,
      password VARCHAR(255),
      name VARCHAR(255),
      name_verify BOOLEAN,
      birthdate DATE,
      birthdate_private BOOLEAN,
      birthdate_verify BOOLEAN,
      phone VARCHAR(15),
      phone_private BOOLEAN,
      nationality VARCHAR(100),
      nationality_verify BOOLEAN,
      weight DOUBLE,
      weight_private BOOLEAN,
      picture VARCHAR(400),
      passport_photo VARCHAR(400),
      passport_expiry DATE,
      passport_expiry_verify BOOLEAN,
      bio VARCHAR(250),
      achievements VARCHAR(250),
      ranking VARCHAR(20),
      ranking_heavy VARCHAR(20),
      ranking_medium VARCHAR(20),
      ranking_low VARCHAR(20),
      team VARCHAR(150),
      cryptoaddress VARCHAR(150),
      cryptoaddress_type VARCHAR(10)
  );
`;

module.exports = userSchema;