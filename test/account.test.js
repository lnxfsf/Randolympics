require("dotenv").config();

const superagent = require("superagent");

const generateRandomEmail = () => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 4); 

  return `user${randomString}${timestamp}@example.com`;
};

describe("login", () => {
  let randomEmail;

  before(() => {
    // Generate a new random email every time we run test
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
          // Expected outcome, user already exists
          done();
        } else if (err) {
          // Fail if any other error occurs
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

describe("registration", () => {
  let randomEmail;

  before(() => {
    // Generate a new random email every time we run test
    randomEmail = generateRandomEmail();
  });

  // so both in same time, define it here.. just url (it doesn't verify if email was actually sent ! )
  it("should register new user and also verify it have verification url", function (done) {
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
              if (err) return done(err); // Handle any errors during verification

              // Check if the verification was successful
              if (verifyRes.status === 200) {
                // Optionally, you can check the body of the response here
                done(); // Finish the test
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
          // Fail if any other error occurs
          done(err);
        } else {
          done(err);
        }
      });
  });

  it("should not allow duplicate email registration", function (done) {
    superagent
      .post("http://localhost:5000/auth/register")
      .send({ email: randomEmail, password: "12345678", user_type: "AH" })
      .end(function (err, res) {
        if (res.status === 409) {
          // Expected outcome, user already exists
          done();
        } else if (err) {
          // Fail if any other error occurs
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
          // Expected outcome, user already exists
          done();
        } else if (err) {
          // Fail if any other error occurs
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
        email: randomEmail,
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
        email: randomEmail,
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
        email: randomEmail,
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
        email: randomEmail,
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
        email: randomEmail,
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
    // Generate a new random email every time we run test
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
              if (err) return done(err); // Handle any errors during verification

              // Check if the verification was successful
              if (verifyRes.status === 200) {
                // Optionally, you can check the body of the response here
                done(); // Finish the test
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
          // Fail if any other error occurs
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
