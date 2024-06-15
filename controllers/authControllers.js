// authentication server will require controller functions for user registration and login.
// These functions will handle user data and authentication logic


const { v4: uuidv4 } = require("uuid");

const jwt = require("jsonwebtoken");

const userSchema = require("../schemas/userSchema"); // ! OVO MAKNI 

const bcrypt = require("bcryptjs");

// TODO, ti vidi, da promenis ovo u taj ORM isto.. ako treba za email confirmaciju.. jer znas i sam, da je lakse sa ORM
//TODO to sto sad radis ovde dole je ORM vec.. al nestadarizovan...


// da , ovo ti nece trebati vise. ovo je naporno odrzavati i ovo stvarno, skrati kod, i lakse za email confrimation..
const {
  createTable,
  checkRecordExists,
  insertRecord,
} = require("../utils/sqlFunctions");  // ! OVO MAKNI 

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};





const register = async (req, res) => {
  // TODO samo da pass values.. to je to... za sad... (kao i crypto isto, zavisno koji je... da zna.. (dodaj novi value koji tip crypto-a..))

  // TODO, you only haven't inserted "picture field", because I yet need to set image upload..
  // on ovde uzima varijable (znaci jako malo da izmenis i treba, samo da predjes sada na ORM, i mnogo lakse u buducnosti bice ti)
  const {
    user_type,
    email,
    email_private,
    password,
    name,
    phone,
    phone_private,
    nationality,
    weight,
    weight_private,
    bio,
    cryptoaddress,
    cryptoaddress_type,
    picture

  } = req.body;

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

    // hashuje password, i ovo isto normalno. nema jos uvek sql nista..
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt); //hash password

  // TODO da, evo on ovde ubaci vrednosti samo...
  /*  const user = {
    userId: uuidv4(),
    email,
    password: hashedPassword,
  }; */


  // user objekat, i ovo ce on isto tako slati.. inače.. 
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
    picture,
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
    cryptoaddress_type,
  };




  try {



    // ! ovde treba, da kreira model vrv, tabelu, ako nema. on ce znati ako ima ili nema, njegov sequelize
    await createTable(userSchema); // this is for first time... to create table..

    //does it have email in database records
    // ! i ovde unutar sync(), pozivom na taj kreirani model gore.. il ako ga ima vec, znace on...  da proveris polja samo... za email.. (znaci, ni ne treba ovaj recordExists,,), ima kao mongodb, da ga on nadje, ako ima, nema...
    const userAlreadyExists = await checkRecordExists("users", "email", email);



    if (userAlreadyExists) {
      res.status(409).json({ error: "Email already exists" });
    } else {


      // ! i ovde ga ubacuje !! ako nema.. i tjt. nista drugo ne menjas logiku vidis ! to je to, ostalo ostaje isto. da na email confirmation predjes..
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

    // ! proveri, pretrazi, ako ima.. da, to je sve.. on ako ima nesto da vrati, vratice i ici ce u ovu "if" , ako nema, vratice neki error dole i nece smetat..
    const existingUser = await checkRecordExists("users", "email", email);

    if (existingUser) {
      if (!existingUser.password) {
        res.status(401).json({ error: "Invalid credentials" });

        return;
      }

      // here, we encrypt password from POST (that gets encrypted), and compared to the one in database
      // i ovo ostaje isto... 
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );



      // on ovde vraca json podatke, ne diras ovo nista..
      if (passwordMatch) {
        res.status(200).json({
          userId: existingUser.userId,
          user_type: existingUser.user_type,
          email: existingUser.email,
          access_token: generateAccessToken(existingUser.userId),

          name: existingUser.name,
          birthdate: existingUser.birthdate,
          phone: existingUser.phone,
          nationality: existingUser.nationality,
          weight: existingUser.weight,
          picture: existingUser.picture,
          bio: existingUser.bio,
          cryptoaddress: existingUser.cryptoaddress,
          cryptoaddress_type: existingUser.cryptoaddress_type,

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
