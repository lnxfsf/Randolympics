const superagent = require("superagent");

describe("test mock randomizer", () => {
  it("should return at least 3 (mock) randomizer results", function (done) {
   
    const randomizeFormData = [
        {
          name: "first",
          email: "first@gmail.com",
          weightCategory: "light",
          gender: "M",
        }
      ];
   
      

    superagent
      .get("http://localhost:5000/listsData/landingPageRandomize")
      .query({randomizeFormData: JSON.stringify(randomizeFormData) })
      .end(function (err, res) {
       
        console.log(res.body.length - 2)
        if (res.status === 200 && ((res.body.length - 2) >= 3) ) {
          done();
        } else if (((res.body.length - 2) <= 3)){
            done(new Error(`Expected at least 3 sports, but got ${res.body.length - 2}`)); 
        } else {
          done(err);
        }
      });
  });
});
