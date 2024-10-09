require("dotenv").config();

const superagent = require("superagent");

const generateRandomEmail = () => {
  const timestamp = Date.now(); 
  return `user${timestamp}@example.com`; 
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
          done(new Error("Status code not 200"));
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
          done(new Error("Status code not 201"));
        }
      });
  });

  // and now, you test if it pings, when we try to sign up with unverified email (so, we don't mess with Frontend, but here directly you test, everything else QA can do)
  it("should return 401 when email is not verified", function (done) {
    superagent
      .post("http://localhost:5000/auth/login")
      .send({ email: "unverified@gmail.com", password: "12345678" })  // use a test case where the email is unverified
      .end(function (err, res) {
        if (res.status === 401) {
          done();
        } else {
          done(new Error("Did not return the expected error for unverified email"));
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
          done(new Error("Did not return the expected error for missing email or password"));
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
          done(new Error("Did not return the expected error for missing email or password"));
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
          done(new Error("Did not return expected error for incorrect password"));
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
          done(new Error("Did not return expected error for non-existing user"));
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

  it("register new user", function (done) {
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
          done(new Error("Status code not 201"));
        }
      });
  });

})