// authentication server will require controller functions for user registration and login.
// These functions will handle user data and authentication logic

const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");


// TODO, ti vidi, da promenis ovo u taj ORM isto.. ako treba za email confirmaciju.. jer znas i sam, da je lakse sa ORM
//TODO to sto sad radis ovde dole je ORM vec.. al nestadarizovan...



const {
  createTable,
  checkRecordExists,
  insertRecord,
} = require("../utils/sqlFunctions");

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};







const register = async (req, res) => {


  // TODO samo da pass values.. to je to... za sad... (kao i crypto isto, zavisno koji je... da zna.. (dodaj novi value koji tip crypto-a..))

  // TODO, you only haven't inserted "picture field", because I yet need to set image upload..
  const { user_type, email, email_private, password, name, 
    phone, phone_private, nationality , 
    weight, weight_private ,bio,cryptoaddress, cryptoaddress_type  } = req.body;


  // TODO, samo polja koja ne smeju biti prazna (osim weight, nebitno je.. ionako nece biti requirement u database)
/*   if (!email || !password ) {
    res
      .status(400)
      .json({ error: "Email or Password fields cannot be empty!" });
    return;
  } else if (!user_type || !phone || !nationality) {
    //TODO, if you want, to separate error for each individual case. but that's later..
    res
    .status(400)
    .json({ error: "Check all that's required" });
    return;
  } */

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt); //hash password


  // TODO da, evo on ovde ubaci vrednosti samo... 
 /*  const user = {
    userId: uuidv4(),
    email,
    password: hashedPassword,
  }; */

  const user = {
    userId: uuidv4(),
    user_type,
    email,
    email_private,
    password: hashedPassword,
    name,
    name_verify: null,
    birthdate: null,
    birthdate_private: null,
    birthdate_verify: null,
    phone,
    phone_private,
    nationality,
    nationality_verify: null,
    weight,
    weight_private,
    picture: null,
    passport_photo: null,
    passport_expiry: null,
    passport_expiry_verify: null,
    bio,
    achievements: null,
    ranking: null,
    ranking_heavy: null,
    ranking_medium: null,
    ranking_low: null,
    team: null,
    cryptoaddress,
    cryptoaddress_type



  };

  try {
    await createTable(userSchema); // this is for first time... to create table..

    //does it have email in database records
    const userAlreadyExists = await checkRecordExists("users", "email", email);

    if (userAlreadyExists) {
      res.status(409).json({ error: "Email already exists" });
    } else {

      await insertRecord("users", user);

      res.status(201).json({ message: "User created successfully!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ error: "Email or Password fields cannot be empty!" });
    return;
  }

  try {
    const existingUser = await checkRecordExists("users", "email", email);

    if (existingUser) {
      if (!existingUser.password) {
        res.status(401).json({ error: "Invalid credentials" });

        return;
      }

      // here, we encrypt password from POST (that gets encrypted), and compared to the one in database
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (passwordMatch) {
        res.status(200).json({
          userId: existingUser.userId,
          email: existingUser.email,
          access_token: generateAccessToken(existingUser.userId),
        });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
};
