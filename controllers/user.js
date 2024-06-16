const db = require("../models");
const User = db.users;
const Token = db.token;
const Op = db. Sequelize.Op;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto');




// TODO, ti vidi, da promenis ovo u taj ORM isto.. ako treba za email confirmaciju.. jer znas i sam, da je lakse sa ORM
//TODO to sto sad radis ovde dole je ORM vec.. al nestadarizovan...


// TODO uradis ovaj elephant in room, reseno. sa ovime, tako i password. najteze stvari uradio si. i lagano sve je posle... lagano..
// https://medium.com/@rajakjeshmi19/email-verification-using-nodejs-express-with-sequelize-and-mysql-99aad6cd430c


/* 
const userCtrl = {
    register: async (req, res) => {

        
      try {
        const { firstName, lastName, username, email, password, confirmPassword } = req.body;
        
        
        // TODO ovde treba svoju da koristis, da proveri ima li user-a vec sa time ...
        const existingUser = await User.findOne({ where: { email } });
        
        
        
        if (existingUser) {
          return res.status(400).json({ msg: "User already exists." });
        }
  
  
  
        if (password === confirmPassword) {
        
          // i ovo, koristi onu svoju... 
          const hashedPassword = bcrypt.hashSync(password, 12);
          const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, 12);
          
          
          // TODO, i ovde isto koristi svoju funkciju za pravljenje User-a
          const newUser = await User.create({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword,
          });
  
          const token = crypto.randomBytes(32).toString("hex");
          await Token.create({ userId: newUser.id, token });
  
          const verificationURL = `${process.env.BASE_URL}/users/${newUser.id}/verify/${token}`;
          console.log(verificationURL);
          await sendEmail(newUser.email, 'Verify Email', verificationURL);
  
          const accessToken = createAccessToken({ id: newUser.id });
          const refreshToken = createRefreshToken({ id: newUser.id });
  
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/refresh_token',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });
  
          return res.status(200).json({
            accessToken,
            message: "User created successfully and email sent successfully",
          });
        } else {
          return res.status(500).json({ msg: "Password and confirm password do not match" });
        }
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }














    }
  }; */
