require("dotenv").config();

const superagent = require("superagent");

describe("login", () => {
  it("should have status code 200", function (done) {
    superagent
      .post("http://localhost:5000/auth/login")
      .send({
        email: "ah-1-F-us@gmail.com",
        password: "12345678",
      })
      .end(function (err, res) {
        if (err) return done(err);
        if (res.status === 200) {
          done();
        } else {
          done(new Error("Status code not 200"));
        }
      });
  });
});
