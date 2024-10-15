require("dotenv").config();

const superagent = require("superagent");
const db = require("../models/database");

const Users = db.users;

const { format } = require('date-fns');


// Function to create a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateRandomEmail = () => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 4);

  return `user${randomString}${timestamp}@example.com`;
};

describe("login", () => {
  let randomEmail;

  before(() => {
    randomEmail = generateRandomEmail();
  });

  it("should return 200 for successful login", function (done) {
    superagent
      .post("http://localhost:5000/auth/login")
      .send({
        email: "ah-1-F-us@gmail.com",
        password: "12345678",
      })
      .end(function (err, res) {
        if (res.status === 200) {
          done();
        } else {
          done(err);
        }
      });
  });

  // to test, if email unverified works, we need to create that user first. and then check it.
  it("should to test, if email unverified works, we need to create that user first. this should pass 201", function (done) {
    superagent
      .post("http://localhost:5000/auth/register")
      .send({ email: randomEmail, password: "12345678", user_type: "AH" })
      .end(function (err, res) {
        if (res.status === 201) {
          done();
        } else if (err) {
          done(err);
        } else {
          done(err);
        }
      });
  });

  // and now, you test if it pings, when we try to sign up with unverified email (so, we don't mess with Frontend, but here directly you test, everything else QA can do)
  it("should return 401 when email is not verified", function (done) {
    superagent
      .post("http://localhost:5000/auth/login")
      .send({ email: "unverified@gmail.com", password: "12345678" }) // use a test case where the email is unverified
      .end(function (err, res) {
        if (res.status === 401) {
          done();
        } else {
          done(
            new Error("Did not return the expected error for unverified email")
          );
        }
      });
  });

  it("should return 400 when email is missing", function (done) {
    superagent
      .post("http://localhost:5000/auth/login")
      .send({ email: "", password: "12345678" })
      .end(function (err, res) {
        if (res.status === 400) {
          done();
        } else {
          done(
            new Error(
              "Did not return the expected error for missing email or password"
            )
          );
        }
      });
  });

  it("should return 400 when password is missing (email provided)", function (done) {
    superagent
      .post("http://localhost:5000/auth/login")
      .send({ email: "unverified32@gmail.com", password: "" })
      .end(function (err, res) {
        if (res.status === 400) {
          done();
        } else {
          done(
            new Error(
              "Did not return the expected error for missing email or password"
            )
          );
        }
      });
  });

  it("should return 401 for incorrect password", function (done) {
    superagent
      .post("http://localhost:5000/auth/login")
      .send({ email: "ah-1-F-us@gmail.com", password: "wrongpassword" })
      .end(function (err, res) {
        if (res.status === 401) {
          done();
        } else {
          done(
            new Error("Did not return expected error for incorrect password")
          );
        }
      });
  });

  it("should return 401 for non-existing user", function (done) {
    superagent
      .post("http://localhost:5000/auth/login")
      .send({ email: "nonexistent@gmail.com", password: "12345678" })
      .end(function (err, res) {
        if (res.status === 401) {
          done();
        } else {
          done(
            new Error("Did not return expected error for non-existing user")
          );
        }
      });
  });
});

let randomEmailRe;
describe("registration", () => {
  before(() => {
    randomEmailRe = generateRandomEmail();
  });

  // so both in same time, define it here.. just url (it doesn't verify if email was actually sent ! )
  it("should register new user and also verify it have verification url", function (done) {
    superagent
      .post("http://localhost:5000/auth/register")
      .send({ email: randomEmailRe, password: "12345678", user_type: "AH" })
      .end(function (err, res) {
        if (res.status === 201 && res.body.verificationToken) {
          superagent
            .get(
              `http://localhost:5000/auth/verify/${res.body.verificationToken}`
            )

            .end(function (err, verifyRes) {
              if (err) return done(err);

              if (verifyRes.status === 200) {
                done();
              } else {
                done(
                  new Error(
                    `Verification failed with status: ${verifyRes.status}`
                  )
                );
              }
            });

          /*  done(); */
        } else if (err) {
          done(err);
        } else {
          done(err);
        }
      });
  });

  it("should not allow duplicate email registration", function (done) {
    superagent
      .post("http://localhost:5000/auth/register")
      .send({ email: randomEmailRe, password: "12345678", user_type: "AH" })
      .end(function (err, res) {
        if (res.status === 409) {
          done();
        } else if (err) {
          done(err);
        } else {
          done(err);
        }
      });
  });

  // validation
  it("should return an error for invalid email format", function (done) {
    superagent
      .post("http://localhost:5000/auth/register")
      .send({
        email: "invalid-email-format",
        password: "12345678",
        user_type: "AH",
      })
      .end(function (err, res) {
        if (res.status === 409) {
          done();
        } else if (err) {
          done(err);
        } else {
          done(err);
        }
      });
  });

  it("should return 409 when name is empty", function (done) {
    superagent
      .post("http://localhost:5000/auth/register")
      .send({
        email: randomEmailRe,
        password: "12345678",
        user_type: "AH",
        name: "",
      })
      .end(function (err, res) {
        if (res.status === 409) {
          done();
        } else {
          done(err);
        }
      });
  });

  it("should return 409 when email is invalid", function (done) {
    superagent
      .post("http://localhost:5000/auth/register")
      .send({
        email: "invalid-email",
        password: "12345678",
        user_type: "AH",
        name: "John",
        lastName: "Doe",
      })
      .end(function (err, res) {
        if (res.status === 409) {
          done();
        } else {
          done(err);
        }
      });
  });

  it("should return 409 when password is less than 4 characters", function (done) {
    superagent
      .post("http://localhost:5000/auth/register")
      .send({
        email: randomEmailRe,
        password: "123",
        user_type: "AH",
        name: "John",
        lastName: "Doe",
      })
      .end(function (err, res) {
        if (res.status === 409) {
          done();
        } else {
          done(err);
        }
      });
  });

  it("should return 409 when last name is empty", function (done) {
    superagent
      .post("http://localhost:5000/auth/register")
      .send({
        email: randomEmailRe,
        password: "12345678",
        user_type: "AH",
        name: "John",
        lastName: "", // Missing last name
      })
      .end(function (err, res) {
        if (res.status === 409) {
          done();
        } else {
          done(err);
        }
      });
  });

  it("should return 409 when nationality is not selected", function (done) {
    superagent
      .post("http://localhost:5000/auth/register")
      .send({
        email: randomEmailRe,
        password: "12345678",
        user_type: "AH",
        name: "John",
        lastName: "Doe",
        nationality: "", // Missing nationality
      })
      .end(function (err, res) {
        if (res.status === 409) {
          done();
        } else {
          done(err);
        }
      });
  });

  it("should return 409 when weight is not provided for user_type 'AH'", function (done) {
    superagent
      .post("http://localhost:5000/auth/register")
      .send({
        email: randomEmailRe,
        password: "12345678",
        user_type: "AH",
        name: "John",
        lastName: "Doe",
        nationality: "American",
        // Weight is missing
      })
      .end(function (err, res) {
        if (res.status === 409) {
          done();
        } else {
          done(err);
        }
      });
  });
});

// integration test
describe("test registration and logging in", () => {
  let randomEmail;

  before(() => {
    randomEmail = generateRandomEmail();
  });

  it("should register new user and also verify it", function (done) {
    superagent
      .post("http://localhost:5000/auth/register")
      .send({ email: randomEmail, password: "12345678", user_type: "AH" })
      .end(function (err, res) {
        if (res.status === 201 && res.body.verificationToken) {
          superagent
            .get(
              `http://localhost:5000/auth/verify/${res.body.verificationToken}`
            )

            .end(function (err, verifyRes) {
              if (err) return done(err);

              if (verifyRes.status === 200) {
                done();
              } else {
                done(
                  new Error(
                    `Verification failed with status: ${verifyRes.status}`
                  )
                );
              }
            });
        } else if (err) {
          done(err);
        } else {
          done(err);
        }
      });
  });

  it("logs in successfully to that new created account", function (done) {
    superagent
      .post("http://localhost:5000/auth/login")
      .send({
        email: randomEmail,
        password: "12345678",
      })
      .end(function (err, res) {
        if (res.status === 200) {
          done();
        } else {
          done(err);
        }
      });
  });
});

describe("test whether resend email verification & password recovery works", () => {
  it("should resend verification email", function (done) {
    superagent
      .post("http://localhost:5000/auth/email_resend")
      .send({
        email: "ah-1-F-us@gmail.com",
      })
      .end(function (err, res) {
        if (res.status === 200) {
          done();
        } else {
          done(err);
        }
      });
  });

  it("should send (on email) link to insert new password", function (done) {
    superagent
      .post("http://localhost:5000/auth/forgot_password")
      .send({
        email: "ah-1-F-us@gmail.com",
      })
      .end(function (err, res) {
        if (res.status === 200) {
          done();
        } else {
          done(err);
        }
      });
  });
});

describe("user functions", () => {
  it("updating/(editing profile info) user data as (athlete) normal user", async function () {
    this.timeout(15000);

    try {
      const isUserCreated = await Users.findOne({
        where: { email: randomEmailRe },
      });

      if (isUserCreated) {
        console.log("ide u res. updating user data");
        const res = await superagent
          .post("http://localhost:5000/user/update_user_data")
          .set("Content-Type", "application/json")
          .send({
            original_email: randomEmailRe,
            /*  updating_from_VM: false, */
            name: "new_name",
            familyName: "new family name",
            lastName: "new last name",
            middleName: "new middle name",
            phone: "+36285900000",
            weight: 43,
            cryptoaddress: "new_crypto_addressDMPTfTL5",
            cryptoaddress_type: "DOGE",
            email_private: 0,
            phone_private: 0,
            weight_private: 0,
            passport_photo: "new_pass_photo.jpg",
            birthdate: "2002-10-14",
            birthdate_private: 0,
            picture: "new_profi_pic",
            bio: "new bio info",
            athleteStatement: "new athlete statement",
            athleteStatus: "s3",
          });

        await delay(5000);

        if (res.status === 200) {
          // then check in actual database
          const updatedUser = await Users.findOne({
            where: { email: randomEmailRe },
          });

          if (updatedUser.name !== "new_name") {
            throw new Error("Name doesn't match in database");
          }

          if (updatedUser.familyName !== "new family name") {
            throw new Error("familyName doesn't match in database");
          }

          if (updatedUser.lastName !== "new last name") {
            throw new Error("lastName doesn't match in database");
          }

          if (updatedUser.middleName !== "new middle name") {
            throw new Error("middleName doesn't match in database");
          }

          if (updatedUser.phone !== "+36285900000") {
            throw new Error("phone doesn't match in database");
          }

          if (updatedUser.weight !== 43) {
            throw new Error("weight doesn't match in database");
          }

          if (updatedUser.cryptoaddress !== "new_crypto_addressDMPTfTL5") {
            throw new Error("cryptoaddress doesn't match in database");
          }

          if (updatedUser.cryptoaddress_type !== "DOGE") {
            throw new Error("cryptoaddress_type doesn't match in database");
          }

          if (updatedUser.email_private !== 0) {
            throw new Error("email_private doesn't match in database");
          }

          if (updatedUser.phone_private !== 0) {
            throw new Error("phone_private doesn't match in database");
          }

          if (updatedUser.weight_private !== 0) {
            throw new Error("weight_private doesn't match in database");
          }

          if (updatedUser.passport_photo !== "new_pass_photo.jpg") {
            throw new Error("passport_photo doesn't match in database");
          }

          if (updatedUser.birthdate !== "2002-10-14") {
            throw new Error("birthdate doesn't match in database");
          }

          if (updatedUser.birthdate_private !== 0) {
            throw new Error("birthdate_private doesn't match in database");
          }

          if (updatedUser.picture !== "new_profi_pic") {
            throw new Error("picture doesn't match in database");
          }

          if (updatedUser.bio !== "new bio info") {
            throw new Error("bio doesn't match in database");
          }

          if (updatedUser.athleteStatement !== "new athlete statement") {
            throw new Error("athleteStatement doesn't match in database");
          }

          if (updatedUser.athleteStatus !== "s3") {
            throw new Error("athleteStatus doesn't match in database");
          }
        }

        return;
      }
    } catch (error) {
      throw new Error(error.message || error);
    }
  });



  it("passport should be validated (all fields checked) - validating user data as Validation Manager", async function () {
    this.timeout(15000);

    let dateUpdatedTimePassport = format(new Date(), 'yyyy-MM-dd HH:mm:ss')



    try {
      const isUserCreated = await Users.findOne({
        where: { email: randomEmailRe },
      });

      if (isUserCreated) {
        console.log("ide u res. updating user data");
        const res = await superagent
          .post("http://localhost:5000/user/update_user_data")
          .set("Content-Type", "application/json")
          .send({
            original_email: randomEmailRe,
             updating_from_VM: true, 

             name_verify: true,
             birthdate_verify: true,
             nationality_verify: true,
             passport_expiry_verify: true,

             passport_expiry: "2028-10-14",
             passportLastValidatedRejected: dateUpdatedTimePassport,

           

          });

        await delay(5000);

        if (res.status === 200) {
          // then check in actual database
          const updatedUser = await Users.findOne({
            where: { email: randomEmailRe },
          });



          if (updatedUser.passportStatus !== "validated") {
            throw new Error("passportStatus isn't validated");
          }

         
          
          if (updatedUser.name_verify !== 1) {
            throw new Error("name_verify isn't true");
          }

          if (updatedUser.birthdate_verify !== 1) {
            throw new Error("birthdate_verify isn't true");
          }

          if (updatedUser.nationality_verify !== 1) {
            throw new Error("nationality_verify isn't true");
          }

          if (updatedUser.passport_expiry_verify !== 1) {
            throw new Error("passport_expiry_verify isn't true");
          }

          if (updatedUser.passport_expiry !== "2028-10-14") {
            throw new Error("passport_expiry isn't 2028-10-14");
          }




          console.log("dateUpdatedTimePassport je:"+dateUpdatedTimePassport);
          console.log("updatedUser.passportLastValidatedRejected je: "+format(updatedUser.passportLastValidatedRejected, 'yyyy-MM-dd HH:mm:ss'));

          if (format(updatedUser.passportLastValidatedRejected, 'yyyy-MM-dd HH:mm:ss')  !== dateUpdatedTimePassport ) {
            throw new Error(`passportLastValidatedRejected isn't ${dateUpdatedTimePassport}`);
          }
        


        }

        return;
      }
    } catch (error) {
      throw new Error(error.message || error);
    }
  });



  it("passport should NOT be validated (not some fields are unchecked) - validating user data as Validation Manager", async function () {
    this.timeout(15000);

    let dateUpdatedTimePassport = format(new Date(), 'yyyy-MM-dd HH:mm:ss')



    try {
      const isUserCreated = await Users.findOne({
        where: { email: randomEmailRe },
      });

      if (isUserCreated) {
        console.log("ide u res. updating user data");
        const res = await superagent
          .post("http://localhost:5000/user/update_user_data")
          .set("Content-Type", "application/json")
          .send({
            original_email: randomEmailRe,
             updating_from_VM: true, 

             name_verify: true,
             birthdate_verify: false,
             nationality_verify: true,
             passport_expiry_verify: true,

             passport_expiry: "2028-10-14",
             passportLastValidatedRejected: dateUpdatedTimePassport,

           

          });

        await delay(5000);

        if (res.status === 200) {
          // then check in actual database
          const updatedUser = await Users.findOne({
            where: { email: randomEmailRe },
          });



          if (updatedUser.passportStatus !== "unvalidated") {
            throw new Error("passportStatus isn't unvalidated");
          }

         
          
          if (updatedUser.name_verify !== 1) {
            throw new Error("name_verify isn't true");
          }

          if (updatedUser.birthdate_verify !== 0) {
            throw new Error("birthdate_verify isn't true");
          }

          if (updatedUser.nationality_verify !== 1) {
            throw new Error("nationality_verify isn't true");
          }

          if (updatedUser.passport_expiry_verify !== 1) {
            throw new Error("passport_expiry_verify isn't true");
          }

          if (updatedUser.passport_expiry !== "2028-10-14") {
            throw new Error("passport_expiry isn't 2028-10-14");
          }




          console.log("dateUpdatedTimePassport je:"+dateUpdatedTimePassport);
          console.log("updatedUser.passportLastValidatedRejected je: "+format(updatedUser.passportLastValidatedRejected, 'yyyy-MM-dd HH:mm:ss'));

          if (format(updatedUser.passportLastValidatedRejected, 'yyyy-MM-dd HH:mm:ss')  !== dateUpdatedTimePassport ) {
            throw new Error(`passportLastValidatedRejected isn't ${dateUpdatedTimePassport}`);
          }
        


        }

        return;
      }
    } catch (error) {
      throw new Error(error.message || error);
    }
  });



  it("passport should be rejected - validating user data as Validation Manager", async function () {
    this.timeout(15000);

    let dateUpdatedTimePassport = format(new Date(), 'yyyy-MM-dd HH:mm:ss')



    try {
      const isUserCreated = await Users.findOne({
        where: { email: randomEmailRe },
      });

      if (isUserCreated) {
        console.log("ide u res. updating user data");
        const res = await superagent
          .post("http://localhost:5000/user/update_user_data")
          .set("Content-Type", "application/json")
          .send({
            original_email: randomEmailRe,
             updating_from_VM: true, 

            
             isRejected: true,
             

             passportLastValidatedRejected: dateUpdatedTimePassport,

           

          });

        await delay(5000);

        if (res.status === 200) {
          // then check in actual database
          const updatedUser = await Users.findOne({
            where: { email: randomEmailRe },
          });



          if (updatedUser.passportStatus !== "rejected") {
            throw new Error("passportStatus isn't rejected");
          }



          console.log("dateUpdatedTimePassport je:"+dateUpdatedTimePassport);
          console.log("updatedUser.passportLastValidatedRejected je: "+format(updatedUser.passportLastValidatedRejected, 'yyyy-MM-dd HH:mm:ss'));

          if (format(updatedUser.passportLastValidatedRejected, 'yyyy-MM-dd HH:mm:ss')  !== dateUpdatedTimePassport ) {
            throw new Error(`passportLastValidatedRejected isn't ${dateUpdatedTimePassport}`);
          }
        


        }

        return;
      }
    } catch (error) {
      throw new Error(error.message || error);
    }
  });



});



