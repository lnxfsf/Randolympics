require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const superagent = require("superagent");

const generateRandomEmail = () => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 4); 

  return `user${randomString}${timestamp}@example.com`;
};

describe("test creating campaign", () => {
  describe("creating campaign for friend", () => {
    const campaignId = uuidv4();

    let friendEmail;
    let supporterEmail;

    before(() => {
      // Generate a new random email every time we run test
      friendEmail = generateRandomEmail();
      supporterEmail = generateRandomEmail();
    });



    it("should make campaign for friend (saved in 'Campaigns' table)", function (done) {
      superagent
        .post("http://localhost:5000/listsData/createCampaign")
        .send({
          campaignId,
          friendName: "test_name_friend",
          friendMiddleName: "test_middleName_friend",
          friendLastName: "test_friendLastName_friend",
          friendFamilyName: "test_friendFamilyName_friend",
          friendEmail,
          friendPhone: "+36285921926",
          friendBirthdate: "1995-09-27",
          friendNationality: "US",
          friendImage: "ariana_profile.jpg",
          friendGender: "F",

          supporterName: "test_supporterName_friend",
          supporterPhone: "+36285921926",
          supporterEmail,
          supporterComment: "Go go go (supporter comment test)",

          isCelebrity: false,
          fb_link: "",
          ig_link: "",
          tw_link: "",
        })
        .end(function (err, res) {
          if (res.status === 201) {
            done();
          } else {
            done(err);
          }
        });
    });

    it("after creating campaign (for friend), it should create (register) account as well (as there's none, and campaign can't be created if (athlete) account exists)", function (done) {
    
        
    
        superagent
          .post("http://localhost:5000/auth/register")
          .send({
            email: friendEmail,
            password: "12345678",
            user_type: "AH",
            name: "test_name_friend",
            middleName: "test_middleName_friend",
            lastName: "test_friendLastName_friend",
            phone: "+36285921926",
            nationality: "US",
            weight: "53",
            cryptoaddress: "fsfdsklčcx43242sfsad",
            picture: "ariana_profile.jpg",
            cryptoaddress_type: "BTC",
            bio: "Test bio athlete campaign",
            gender: "F",

            signedByFriend: true,

            supporterName: "test_name_supporter",
            campaignURL: `http://localhost:5000/campaign/${campaignId}`,

            sendEmailToFriend: true,

            isCelebrity: false,
            fb_link: "",
            ig_link: "",
            tw_link: "",
          })
          .end(function (err, res) {
            if (res.status === 201) {
              done();
            } else {
              done(err);
            }
          });
      });




 
      it("also, when supporter inserts his info in campaign, that gets saved. And we create supporter account, with user_type='SPT'", function (done) {
        superagent
          .post("http://localhost:5000/auth/register")
          .send({
            email: supporterEmail,
            password: "12345678",
            user_type: "SPT",
            name: "test_name_supporter",
            phone: "+36285921926",
            weight: "55",
            cryptoaddress: "",
            picture: "ariana_profile.jpg",
            cryptoaddress_type: "BTC",
            bio: "",
            gender: "F",
            supporterComment: "Go go go (supporter comment test)",
            campaignURL: `http://localhost:5000/campaign/${campaignId}`,
            signingAsSupporter: true,
          })
          .end(function (err, res) {
           
            if (res.status === 201) {
              done();
            } else {
                done(err)
             /*  done(new Error("Status code not 201")); */
            }
          });
      }); 

    describe("test validation for campaign", () => {
     

      it("when email is wrong format (campaign for friend (saved in 'Campaigns' table))", function (done) {
        superagent
          .post("http://localhost:5000/listsData/createCampaign")
          .send({
            campaignId,
            friendName: "test_name_friend",
            friendMiddleName: "test_middleName_friend",
            friendLastName: "test_friendLastName_friend",
            friendFamilyName: "test_friendFamilyName_friend",
            friendEmail: "wrong-friendemail",
            friendPhone: "+36285921926",
            friendBirthdate: "1995-09-27",
            friendNationality: "US",
            friendImage: "ariana_profile.jpg",
            friendGender: "F",

            supporterName: "test_supporterName_friend",
            supporterPhone: "+36285921926",
            supporterEmail: "wrong-supporteremail",
            supporterComment: "Go go go (supporter comment test)",

            isCelebrity: false,
            fb_link: "",
            ig_link: "",
            tw_link: "",
          })
          .end(function (err, res) {
            if (res.status === 409) {
              done();
            } else {
              done(err);
            }
          });
      });

      it("when friendName is empty (campaign for friend (saved in 'Campaigns' table))", function (done) {
        superagent
          .post("http://localhost:5000/listsData/createCampaign")
          .send({
            campaignId,
            friendName: "",
            friendMiddleName: "test_middleName_friend",
            friendLastName: "test_friendLastName_friend",
            friendFamilyName: "test_friendFamilyName_friend",
            friendEmail,
            friendPhone: "+36285921926",
            friendBirthdate: "1995-09-27",
            friendNationality: "US",
            friendImage: "ariana_profile.jpg",
            friendGender: "F",

            supporterName: "test_supporterName_friend",
            supporterPhone: "+36285921926",
            supporterEmail,
            supporterComment: "Go go go (supporter comment test)",

            isCelebrity: false,
            fb_link: "",
            ig_link: "",
            tw_link: "",
          })
          .end(function (err, res) {
            if (res.status === 409) {
              done();
            } else {
              done(err);
            }
          });
      });

      it("when friendLastName is empty (campaign for friend (saved in 'Campaigns' table))", function (done) {
        superagent
          .post("http://localhost:5000/listsData/createCampaign")
          .send({
            campaignId,
            friendName: "test_name_friend",
            friendMiddleName: "test_middleName_friend",
            friendLastName: "",
            friendFamilyName: "test_friendFamilyName_friend",
            friendEmail,
            friendPhone: "+36285921926",
            friendBirthdate: "1995-09-27",
            friendNationality: "US",
            friendImage: "ariana_profile.jpg",
            friendGender: "F",

            supporterName: "test_supporterName_friend",
            supporterPhone: "+36285921926",
            supporterEmail,
            supporterComment: "Go go go (supporter comment test)",

            isCelebrity: false,
            fb_link: "",
            ig_link: "",
            tw_link: "",
          })
          .end(function (err, res) {
            if (res.status === 409) {
              done();
            } else {
              done(err);
            }
          });
      });

      it("when friendNationality is empty (campaign for friend (saved in 'Campaigns' table))", function (done) {
        superagent
          .post("http://localhost:5000/listsData/createCampaign")
          .send({
            campaignId,
            friendName: "test_name_friend",
            friendMiddleName: "test_middleName_friend",
            friendLastName: "test_friendLastName_friend",
            friendFamilyName: "test_friendFamilyName_friend",
            friendEmail,
            friendPhone: "+36285921926",
            friendBirthdate: "1995-09-27",
            friendNationality: "",
            friendImage: "ariana_profile.jpg",
            friendGender: "F",

            supporterName: "test_supporterName_friend",
            supporterPhone: "+36285921926",
            supporterEmail,
            supporterComment: "Go go go (supporter comment test)",

            isCelebrity: false,
            fb_link: "",
            ig_link: "",
            tw_link: "",
          })
          .end(function (err, res) {
            if (res.status === 409) {
              done();
            } else {
              done(err);
            }
          });
      });

      it("when supporterName is empty (campaign for friend (saved in 'Campaigns' table))", function (done) {
        superagent
          .post("http://localhost:5000/listsData/createCampaign")
          .send({
            campaignId,
            friendName: "test_name_friend",
            friendMiddleName: "test_middleName_friend",
            friendLastName: "test_friendLastName_friend",
            friendFamilyName: "test_friendFamilyName_friend",
            friendEmail,
            friendPhone: "+36285921926",
            friendBirthdate: "1995-09-27",
            friendNationality: "US",
            friendImage: "ariana_profile.jpg",
            friendGender: "F",

            supporterName: "",
            supporterPhone: "+36285921926",
            supporterEmail,
            supporterComment: "Go go go (supporter comment test)",

            isCelebrity: false,
            fb_link: "",
            ig_link: "",
            tw_link: "",
          })
          .end(function (err, res) {
            if (res.status === 409) {
              done();
            } else {
              done(err);
            }
          });
      });

      it("when all those fields are empty (campaign for friend (saved in 'Campaigns' table))", function (done) {
        superagent
          .post("http://localhost:5000/listsData/createCampaign")
          .send({
            campaignId,
            friendName: "",
            friendMiddleName: "test_middleName_friend",
            friendLastName: "",
            friendFamilyName: "test_friendFamilyName_friend",
            friendEmail,
            friendPhone: "+36285921926",
            friendBirthdate: "1995-09-27",
            friendNationality: "",
            friendImage: "ariana_profile.jpg",
            friendGender: "F",

            supporterName: "",
            supporterPhone: "+36285921926",
            supporterEmail,
            supporterComment: "Go go go (supporter comment test)",

            isCelebrity: false,
            fb_link: "",
            ig_link: "",
            tw_link: "",
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
  });

  describe("creating campaign for celebrity", () => {
    const campaignId = uuidv4();

    let friendEmail;
    let supporterEmail;

    before(() => {
      // Generate a new random email every time we run test
      friendEmail = generateRandomEmail();
      supporterEmail = generateRandomEmail();
    });

    it("should make campaign for celebrity (saved in 'Campaigns' table)", function (done) {
      superagent
        .post("http://localhost:5000/listsData/createCampaign")
        .send({
          campaignId,
          friendName: "test_name_celebrity",
          friendMiddleName: "test_middleName_celebrity",
          friendLastName: "test_friendLastName_celebrity",
          friendFamilyName: "test_friendFamilyName_celebrity",
          friendEmail,
          friendPhone: "+36285921926",
          friendBirthdate: "1995-09-27",
          friendNationality: "US",
          friendImage: "ariana_profile.jpg",
          friendGender: "M",

          supporterName: "test_supporterName_celebrity",
          supporterPhone: "+36285921926",
          supporterEmail,
          supporterComment: "Go go go (supporter comment test)",

          isCelebrity: true,
          fb_link: "@elonmusk",
          ig_link: "@elonmusk",
          tw_link: "@elonmusk",
        })
        .end(function (err, res) {
          if (res.status === 201) {
            done();
          } else {
            done(err);
          }
        });
    });

    it("after creating campaign (for CELEBRITY), it should create (register) as CELEBRITY account as well (as there's none, and campaign can't be created if (athlete) account exists)", function (done) {
      superagent
        .post("http://localhost:5000/auth/register")
        .send({
          email: friendEmail,
          password: "12345678",
          user_type: "AH",
          name: "test_name_celebrity",
          middleName: "test_middleName_celebrity",
          lastName: "test_friendLastName_celebrity",
          phone: "+36285921926",
          nationality: "US",
          weight: "53",
          cryptoaddress: "fsfdsklčcx43242sfsad",
          picture: "ariana_profile.jpg",
          cryptoaddress_type: "BTC",
          bio: "Test bio celebrity campaign",
          gender: "M",

          signedByFriend: true,

          supporterName: "test_name_supporter",
          campaignURL: `http://localhost:5000/campaign/${campaignId}`,

          sendEmailToFriend: true,

          isCelebrity: true,
          fb_link: "@elonmusk",
          ig_link: "@elonmusk",
          tw_link: "@elonmusk",
        })
        .end(function (err, res) {
          if (res.status === 201) {
            done();
          } else {
            done(err);
          }
        });
    });


    it("also, when supporter inserts his info in campaign, that gets saved. And we create supporter account, with user_type='SPT'", function (done) {
        superagent
          .post("http://localhost:5000/auth/register")
          .send({
            email: supporterEmail,
            password: "12345678",
            user_type: "SPT",
            name: "test_name_supporter",
            phone: "+36285921926",
            weight: "55",
            cryptoaddress: "",
            picture: "ariana_profile.jpg",
            cryptoaddress_type: "BTC",
            bio: "",
            gender: "F",
            supporterComment: "Go go go (supporter comment test)",
            campaignURL: `http://localhost:5000/campaign/${campaignId}`,
            signingAsSupporter: true,
          })
          .end(function (err, res) {
            if (res.status === 201) {
              done();
            } else {
              done(err);
            }
          });
      }); 


  });

  /* 
    it("check if this supporter account exists, shouldn't proceed if it exists.", function (done) {
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


      
    it("check if this supporter account exists, should proceed if it doesn't exist.", function (done) {
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
      }); */
});
