
const db = require("../models/database");
const User = db.users;
const Token = db.token;
const Op = db.Sequelize.Op;




const update_rank_data = async (req, res) => {
  const { userId, originalRank, goingToRank, user_type, nationality } = req.body;

  /*   console.log("primasssssssssss" + userId)
  
    console.log("primasssssssssss" + nationality)
    console.log("primasssssssssss" + user_type) // OVO JE PROBLEM ! on dobija, current user_type ! ali treba ipak da prima, sa selected value !! dropdown !!
   */

  await db.sequelize.sync();

  //this is the selected user... find by userId..
  const user = await User.findOne({
    where: { userId: userId },
  });

  var gender = user.gender;

  console.log("gender je:::::: " + gender)
  /* if(user){ */
  // just to get these variables.. we need it for ranking
  // var user_typeOfuserWereChanging = user.user_type; // like, so we can use it for ranking.. 
  //var nationalityOfuserWereChanging = user.nationality; // and by nationality. we need it for ranking, to filter by.. 



  /* } */

  if (user_type === "AH") {
    if (user) {
      console.log("original rank je:" + originalRank);
      console.log("going to rank AH:" + goingToRank);

      console.log("ovaj prvi ")





      // when athlete goes LOWER IN RANK (but that's calculated as going UP in rank NUMBER.. )
      // for ( >0 ), when it's positive number. i.e. to go up in rank number. (i.e. athlete goes lower in rank, from 2 to 5 .. )
      if ((goingToRank - originalRank) > 0) {
        var originalRankLoop = originalRank;

        console.log("onda vrsi ovo u prvoj if")
        // this is in case of error, so it doesn't write directly in database
        const t = await db.sequelize.transaction();

        try {

          // if it reached 1, and goingToRank is also being 1, then won't go furhter..
          while (originalRankLoop !== goingToRank) {

            console.log("zatim u ovaj loop:")

            let lowerUser = await User.findOne({
              where: {
                // by these two, we can filter right ranking we need..
                nationality: nationality,
                user_type: user_type,
                gender: gender,


                ranking: user.ranking + 1, // pronadje njemu gornji

              },
            });

            console.log("nasao je, upper user: " + lowerUser)

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { ranking: user.ranking },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.increment('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            await user.update({ ranking: user.ranking + 1 }, { transaction: t });


            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop + 1;
          }

          await t.commit();
          return res.status(200).json({ message: "User rank updated" });
        } catch (error) {

          console.log(error.stack)

          await t.rollback();
          return res.status(500).json({ error: error.message });
        }
      } else if ((goingToRank - originalRank) < 0) {
        // when athlete goes UPPER IN RANK (but that's calculated as going DOWN in rank NUMBER.. )
        // for ( <0 ), when it's negative number. i.e. to go down in rank number. (i.e. athlete goes up in rank, from 5 to 2 .. )

        console.log("izvrsava DRUGI if")


        var originalRankLoop = originalRank;

        // this is in case of error, so it doesn't write directly in database
        const t = await db.sequelize.transaction();

        try {
          // if it reached 1, and goingToRank is also being 1, then won't go furhter..
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: {
                // by these two, we can filter right ranking we need..
                nationality: nationality,
                user_type: user_type,
                gender: gender,


                ranking: user.ranking - 1
              },
            });

            console.log("nasao je, lower user: " + lowerUser)

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { ranking: user.ranking },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.decrement('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            await user.update({ ranking: user.ranking - 1 }, { transaction: t });

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop - 1;
          }

          await t.commit();
          return res.status(200).json({ message: "User rank updated" });
        } catch (error) {
          console.log(error.stack)

          await t.rollback();
          return res.status(500).json({ error: error.message });
        }
      }
    }
  } else if (user_type === "RS") {

    // for RS, we use rankingRS !

    if (user) {
      console.log("original rank je:" + originalRank);
      console.log("going to rank RS:" + goingToRank);





      // when athlete goes LOWER IN RANK (but that's calculated as going UP in rank NUMBER.. )
      // for ( >0 ), when it's positive number. i.e. to go up in rank number. (i.e. athlete goes lower in rank, from 2 to 5 .. )
      if (goingToRank - originalRank > 0) {
        var originalRankLoop = originalRank;

        // this is in case of error, so it doesn't write directly in database
        const t = await db.sequelize.transaction();

        try {
          // if it reached 1, and goingToRank is also being 1, then won't go furhter..
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: {
                // by these two, we can filter right ranking we need..
                nationality: nationality,
                user_type: user_type,


                rankingRS: user.rankingRS + 1,

              },
            });

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { rankingRS: user.rankingRS },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.increment('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            await user.update({ rankingRS: user.rankingRS + 1 }, { transaction: t });

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop + 1;
          }

          await t.commit();
          return res.status(200).json({ message: "User rank updated" });
        } catch (error) {
          console.log(error.stack)

          await t.rollback();
          return res.status(500).json({ error: error.message });
        }
      } else if (goingToRank - originalRank < 0) {
        // when athlete goes UPPER IN RANK (but that's calculated as going DOWN in rank NUMBER.. )
        // for ( <0 ), when it's negative number. i.e. to go down in rank number. (i.e. athlete goes up in rank, from 5 to 2 .. )

        var originalRankLoop = originalRank;

        // this is in case of error, so it doesn't write directly in database
        const t = await db.sequelize.transaction();

        try {
          // if it reached 1, and goingToRank is also being 1, then won't go furhter..
          while (originalRankLoop !== goingToRank) {
            let lowerUser = await User.findOne({
              where: {
                // by these two, we can filter right ranking we need..
                nationality: nationality,
                user_type: user_type,


                rankingRS: user.rankingRS - 1
              },
            });

            //if there's none, nevermind, just go one number +1 then.. no problem...
            if (lowerUser) {
              await lowerUser.update(
                { rankingRS: user.rankingRS },
                { transaction: t }
              );
            }

            // this is to update it in database. // this one works ! nicely !!! even if it needs to jump !
            //await user.decrement('ranking', { by: 1 }); // but this, just won't.. BUT, you will use this simple increment/decrement for simpler, (like, when athlete, have to select NP... )
            await user.update({ rankingRS: user.rankingRS - 1 }, { transaction: t });

            // this is for (while) loop. as it doesn't fetch changes immediatelly, so in variable we do...
            originalRankLoop = originalRankLoop - 1;
          }

          await t.commit();
          return res.status(200).json({ message: "User rank updated" });
        } catch (error) {
          console.log(error.stack)

          await t.rollback();
          return res.status(500).json({ error: error.message });
        }
      }
    }
  }


};





const votingForNP = async (req, res) => {
  // this is for dropdown menu
  if (req.method === "GET") {
    const userId = req.query.user_type;

    // for "athletes", and their selection of NP, we just show votes... (and their percent.. ).

    try {
      const selectedVoteNP = await User.findOne({
        where: {
          userId: userId,
        },
      });

      //ne vraca nista..
      console.log("stampa sinovac" + selectedVoteNP);
      res.status(200).json(selectedVoteNP); // okej, vrati objekat tog, user-a, ali samo, prikaze za taj user, njegova kolona "votedFor"... (da, nemoj da se bakćeš sa localstorage kod ovoga.. lakse je ovako. ima sa NP rangiranjem jos da se radi... )
    } catch (error) {
      console.log(error.stack)

      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    const { /* votedFor, */ NPuserId, current_user_userId } = req.body;
    // votedFor , is .name , value..
    // cek, dobio je sada userId ! kako, nzm, bolje ne diraj !

    // userId, od NP, for who he voted for.. so we can work with it !

    try {
      await db.sequelize.sync();

      // ovo je current User da nadjes.. da samo kolonu azuriras mu
      const currentUser = await User.findOne({
        where: {
          userId: current_user_userId,
        },
      });




      // mozes dobiti nationality, odmah ovde, od tog currentUser, (koji i jeste na frontend.. )
      const currentUserNationality = currentUser.nationality;

      // ovo je NP da nadjes.. TO JE TRENUTNI KOJI KORISNIK IZABRAO !
      const selectedVoteNP = await User.findOne({
        where: {
          userId: NPuserId,
        },
      });

      const previousVoteNP = currentUser.votedForNPuserId
        ? await User.findOne({
          where: { userId: currentUser.votedForNPuserId },
        })
        : null;


      console.log("current user je:")
      console.log(currentUser.name)

      console.log("selected NP  je:")
      console.log(selectedVoteNP.name)


      //console.log("previousVoteNP od current User-a  je:")
      //console.log(previousVoteNP.name)



      // sad izvuče prethodni , i utvdi da li je doslo do promene, (ako nije, ne radi nista.. ako jeste onda radi nesto... ). tj. negacija, da izvrsi, ako je unique, novi entry..
      if (currentUser.votedForNPuserId !== NPuserId) {

        console.log(" on prodje prvi if")

        // sada handluje, promjenu. jer ovo vrši, kad god i ima neke promjene,u odnosu na sto je imao...
        if (selectedVoteNP) {
          // doesn't need to decrement previous vote, if it was null (for user who was just created.. )
          if (previousVoteNP) {
            await previousVoteNP.decrement("votes", { by: 1 });
          }

          // njemu (NP, koji je selektovan sada) uvecavas votes, za +1. i tjt..
          await selectedVoteNP.increment("votes", { by: 1 });

          // here, you check, if selectedVoteNP , have 130% more votes than currentNP (you find him based on flag.. )
          // you find who is currentNP now.. to try to replace him..

          const currentNP = await User.findOne({
            where: {
              currentNP: true,
              nationality: currentUserNationality, //  ! also, needs to be from same country. you check by same country only !! the selection 
              user_type: "NP",
            },
          });

          console.log("ali moze naci trenutni")
          console.log(currentNP)

          // you don't use selectedNP ! but 2nd, who have most votes... (as is not currentNP: false). okay, just the one with most votes, without,  currentNP: false
          var secondMostVotes = await User.findOne({
            where: {
              currentNP: false,  // instead of false.. (aha, oke, false i true, ostaje ipak, nego samo tinyint treba, i kao 0 da čuva... i sve okej)
              nationality: currentUserNationality, //  ! also, needs to be from same country. you check by same country only !! the selection 
              user_type: "NP",
            },
            order: [["votes", "DESC"]],
          });


          console.log("nije nego ne nalazi second most votes !!! zato sve ostalo ne izvrsava: ")
          console.log(secondMostVotes)


          /* 
          if(secondMostVotes){
            // znači, ovo samo ako je prazan. pa onda mora da uzme neki random, samo da bi ono uporedio čisto..
            // eto, po imenu, alfabetski kao... 
            var secondMostVotes = await User.findOne({
              where: {
                currentNP: false,
                nationality: currentUserNationality, 
                user_type: "NP",
              },
              order: [["name", "ASC"]],
            });
          }
 
          console.log("a onda postaje: ")
          console.log(secondMostVotes) */


          //console.log("the one with most values:" + secondMostVotes);

          //console.log(currentNP);

          // if there's no currentNP, then make this selected one, as currentNP (just, precaution.)
          if (currentNP) {
            // now we check, if we have 130% more votes than currentNP ! (we just fetched him ! ). JUST BY the currentNP ! (not others.. )

            // Calculate the percentage increase
            /*    let voteDifference = selectedVoteNP.votes - currentNP.votes;   // 2 - 4 =  -2
            let percentageIncrease = (voteDifference / currentNP.votes) * 100;  // ((-2)*100). to je 300% više.. 
 */

            let voteDifference = secondMostVotes.votes - currentNP.votes; // 2 - 4 =  -2
            let percentageIncrease = (voteDifference / currentNP.votes) * 100; // ((-2)*100). to je 300% više..

            if (percentageIncrease >= 130) {
              // we swap second most voted NP, with currentNP (so currentNP NO MORE ! )

              /* selectedVoteNP.currentNP = true;
                currentNP.currentNP = false; */
              await secondMostVotes.update({ currentNP: true });

              // set first for secondMostVotes (as he's now, new currentNP ! )
              await secondMostVotes.update({
                status: "Acting National President",
              });
              var date_now = new Date().toString(); //timestamp..
              await secondMostVotes.update({ status_date: date_now });

              // only if he was actually currentNP before, otherwise, don't add these strings to it..
              if (currentNP.currentNP == true) {
                // set for previouse "currentNP" (as he's resigned now, replaced )
                await currentNP.update({ status: "Resigned" });
                var date_now = new Date().toString(); //timestamp..
                await currentNP.update({ status_date: date_now });
              }

              await currentNP.update({ currentNP: false });
            } else {
              /* selectedVoteNP.currentNP = false;
                currentNP.currentNP = true; */

              await secondMostVotes.update({ currentNP: false });

              await currentNP.update({ currentNP: true });

              /*  I don't think we need this here.. it's okay for currentNP, but this.. no.. as it's working on every selection..
             // 
             await currentNP.update({ status: "Acting National President" });
             var date_now = new Date().toString(); //timestamp..
             await currentNP.update({ status_date: date_now });
 
 
             // 
             await secondMostVotes.update({ status: "Resigned" });
             var date_now = new Date().toString(); //timestamp..
             await secondMostVotes.update({ status_date: date_now }); */
            }
          } else {
            // if there's no currentNP, then make this selected one, as currentNP (just, precaution.)
            /*  selectedVoteNP.currentNP = true;
            
            
            await selectedVoteNP.save(); */

            // !  SELECTED, THE JUST SELECTEB BY USER !!!
            // ! so this has to go, instead of secondMostVotes.update  , it needs to be    selectedVoteNP.update (so.. selectedVoteNP !! )
            /*   await secondMostVotes.update({ currentNP: true });
   
               // and set status text, as he's currentNP.. (that's what he wants)
               await secondMostVotes.update({
                 status: "Acting National President",
               });
               var date_now = new Date().toString(); //timestamp..
               await secondMostVotes.update({ status_date: date_now });  */

            await selectedVoteNP.update({ currentNP: true });

            // and set status text, as he's currentNP.. (that's what he wants)
            await selectedVoteNP.update({
              status: "Acting National President",
            });
            var date_now = new Date().toString(); //timestamp..
            await selectedVoteNP.update({ status_date: date_now });

          }
        }

        // NE ČUVAJ ODMAH, nego moras da znaš i prethodni, votedFor koji je bio...
        //TODO, SACUVAJ IME, U TAJ CURRENT USER, KOJI JESTE SIGNED UP !
        // dobija ovde
        if (currentUser) {
          try {
            //MORAŠ DA ZNAŠ I userId , od NP, za koji si sačuvao !
            // da bi ovaj gore, mogao da ga smanji, pre nego poveca ovaj drugi !
            //currentUser.votedForNPuserId = NPuserId;

            await currentUser.update({
              votedForNPuserId: selectedVoteNP.userId,
            });
            //currentUser.votedFor = votedFor; // samo ime uzmes..

            await currentUser.update({ votedFor: selectedVoteNP.name });
          } catch (error) {


            console.log(error.stack)

            console.log(error.message);
          }
        }

        res.status(200).json(selectedVoteNP); // okej, vrati objekat tog, user-a, ali samo, prikaze za taj user, njegova kolona "votedFor"... (da, nemoj da se bakćeš sa localstorage kod ovoga.. lakse je ovako. ima sa NP rangiranjem jos da se radi... )
      }
    } catch (error) {
      console.log(error.stack)
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};




const resignFromCurrentPosition = async (req, res) => {
  const { userId, user_type } = req.body;

  try {
    await db.sequelize.sync();

    // so, it works only for NP (if he was actually currentNP)
    // TODO, later on, you do it for GP, as well (when signed user is GP.. ). when you implement his ..



    if (user_type == "AH") {

      // za AH, radi drugacije

      // kod njega, samo elementi ispod njega, treba da idu za +1 ! (tako ce moci, da rade, i ovi svi ostali. cak i da je na prvo mesto ! )

      // ti znači, za AH, trebaš, samo, da 

      //za AH, treba da nadjes, koji ima ranking. on znace da nadje direktno njega... 
      const currentUserAH = await User.findOne({
        where: {

          userId: userId,
        },
      });


      // znači, nalazis ih preko "ranking", "nationality", "user_type", "gender"  (da, trebace ti ovo sve, da znas ispod koji su ti)

      // so, all users below currentUserAH ranking. are going +1 ! i tjt.. čak i ako je prvi ovaj, isto doći će mu.. 
      // and yes, don't touch current user, at end element or whenever we put them... 
      const usersToUpdate = await User.findAll({
        where: {
          user_type: "AH",
          ranking: {
            [Op.lte]: currentUserAH.ranking,
          },
          nationality: currentUserAH.nationality,
          user_type: currentUserAH.user_type,

          gender: {
            [Op.like]: `%${currentUserAH.gender}%`,
          },

          userId: {
            [Op.ne]: currentUserAH.userId,
          },
        },
        order: [["ranking", "ASC"]],
      });


      console.log("ne prikazuje sve users da update !")
      console.log(usersToUpdate)


      /// and this is actual loop for all those below to go +1 in ranking
      // znači MINUS 1 , tako istinski uveca !
      for (const user of usersToUpdate) {
        await user.update({ ranking: user.ranking - 1 });
      }



      // Set currentUserNP's rankingNP to the maximum rankingNP + 1 (as we already changed them, and so this way, we know who is last.. )
      const maxRankingUser = await User.findOne({
        where: {
          user_type: "AH",

          nationality: currentUserAH.nationality,
          user_type: currentUserAH.user_type,

          gender: {
            [Op.like]: `%${currentUserAH.gender}%`,
          },
        },
        order: [["ranking", "DESC"]],
      });

      // and we put it after the last (as we, didn't updated previous..)
      await currentUserAH.update({ ranking: maxRankingUser.ranking + 1 });

      






      // znači, treba da uveca u sve redove, kolonu "rankingNP" počev od "secondMostVotes" za +1. Ali ne uvećava samo currentUserNP. jer on je na kraju..
      // okej swapovao je gore...  E SADA, TREBA DA currentUserNP pozicionira na kraj (da, samo rankingNP , ). 
      // E SAMO GA ZAMENI SA OVIM TRENUTNI KOJI JESTE POSLEDNJI ELEMENT (jer ne treba da dodaje neke na kraju dodatno jos !)
      // i da počne od secondMostVotes odatle, da poveca sve ka dnu. samo NE uključi (-1), taj zadnji. il proveris samo, da nije taj userID od currentUserNP , i poveca ga... 



    }




    // this is for "NP"
    if (user_type == "NP") {

      // so we actually know he's NP of that country !
      const currentUserNP = await User.findOne({
        where: {
          currentNP: true,
          userId: userId,
        },
      });

      // the second one, with most votes, who wasn't currentNP, will become.. now, because currentNP is resigning
      const secondMostVotes = await User.findOne({
        where: {
          currentNP: false,

          user_type: "NP",
        },
        order: [["votes", "DESC"]],
      });

      // just swap them...
      await secondMostVotes.update({ currentNP: true });

      await secondMostVotes.update({
        status: "Acting National President",
      });
      var date_now = new Date().toString(); //timestamp..
      await secondMostVotes.update({ status_date: date_now });

      if (currentUserNP.currentNP == true) {
        // set for previouse "currentNP" (as he's resigned now, replaced )
        await currentUserNP.update({ status: "Resigned" });
        var date_now = new Date().toString(); //timestamp..
        await currentUserNP.update({ status_date: date_now });
      }

      await currentUserNP.update({ currentNP: false });



      // znači, treba da uveca u sve redove, kolonu "rankingNP" počev od "secondMostVotes" za +1. Ali ne uvećava samo currentUserNP. jer on je na kraju..
      // okej swapovao je gore...  E SADA, TREBA DA currentUserNP pozicionira na kraj (da, samo rankingNP , ). 
      // E SAMO GA ZAMENI SA OVIM TRENUTNI KOJI JESTE POSLEDNJI ELEMENT (jer ne treba da dodaje neke na kraju dodatno jos !)
      // i da počne od secondMostVotes odatle, da poveca sve ka dnu. samo NE uključi (-1), taj zadnji. il proveris samo, da nije taj userID od currentUserNP , i poveca ga... 



    }



    // for now, do the same for GP (as it goes by votesGP as well)
    // this is for "GP"
    if (user_type == "GP") {
      const currentUserGP = await User.findOne({
        where: {
          currentGP: true,
          userId: userId,
        },
      });

      // the second one, with most votes, who wasn't currentGP, will become.. now, because currentNP is resigning
      const secondMostVotes = await User.findOne({
        where: {
          currentGP: false,

          user_type: "GP",
        },
        order: [["votesGP", "DESC"]],
      });

      // just swap them...
      await secondMostVotes.update({ currentGP: true });

      await secondMostVotes.update({
        status: "Acting Global President",
      });
      var date_now = new Date().toString(); //timestamp..
      await secondMostVotes.update({ status_date: date_now });

      if (currentUserGP.currentGP == true) {
        // set for previouse "currentNP" (as he's resigned now, replaced )
        await currentUserGP.update({ status: "Resigned" });
        var date_now = new Date().toString(); //timestamp..
        await currentUserGP.update({ status_date: date_now });
      }

      await currentUserGP.update({ currentGP: false });



      // znači, treba da uveca u sve redove, kolonu "rankingNP" počev od "secondMostVotes" za +1. Ali ne uvećava samo currentUserNP. jer on je na kraju..
      // okej swapovao je gore...  E SADA, TREBA DA currentUserNP pozicionira na kraj (da, samo rankingNP , ). 
      // E SAMO GA ZAMENI SA OVIM TRENUTNI KOJI JESTE POSLEDNJI ELEMENT (jer ne treba da dodaje neke na kraju dodatno jos !)
      // i da počne od secondMostVotes odatle, da poveca sve ka dnu. samo NE uključi (-1), taj zadnji. il proveris samo, da nije taj userID od currentUserNP , i poveca ga... 



    }




  } catch (error) {
    console.log(error.stack)
    console.log(error.message);
  }

  res.status(200).send("You resigned !");
};



const votingForGP = async (req, res) => {
  if (req.method === "GET") {
    const userId = req.query.user_type;

    try {
      const selectedVoteGP = await User.findOne({
        where: {
          userId: userId,
        },
      });

      //ne vraca nista..

      res.status(200).json(selectedVoteGP); // okej, vrati objekat tog, user-a, ali samo, prikaze za taj user, njegova kolona "votedFor"... (da, nemoj da se bakćeš sa localstorage kod ovoga.. lakse je ovako. ima sa NP rangiranjem jos da se radi... )
    } catch (error) {
      console.log(error.stack)
      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    const { GPuserId, current_user_userId } = req.body;

    try {
      await db.sequelize.sync();

      // ovo je current User da nadjes.. da samo kolonu azuriras mu
      const currentUser = await User.findOne({
        where: {
          userId: current_user_userId,
        },
      });

      // ovo je GP da nadjes.. TO JE TRENUTNI KOJI KORISNIK IZABRAO !
      const selectedVoteGP = await User.findOne({
        where: {
          userId: GPuserId,
        },
      });

      // he get's this, by checking value of current user, if it's empty or not... aha..
      const previousVoteGP = currentUser.votedForGPuserId
        ? await User.findOne({
          where: { userId: currentUser.votedForGPuserId },
        })
        : null;

      // sad izvuče prethodni , i utvdi da li je doslo do promene, (ako nije, ne radi nista.. ako jeste onda radi nesto... ). tj. negacija, da izvrsi, ako je unique, novi entry..
      if (currentUser.votedForGPuserId !== GPuserId) {
        // sada handluje, promjenu. jer ovo vrši, kad god i ima neke promjene,u odnosu na sto je imao...
        if (selectedVoteGP) {
          // doesn't need to decrement previous vote, if it was null (for user who was just created.. )
          if (previousVoteGP) {
            await previousVoteGP.decrement("votesGP", { by: 1 });
          }

          // njemu (NP, koji je selektovan sada) uvecavas votes, za +1. i tjt..
          await selectedVoteGP.increment("votesGP", { by: 1 });

          // here, you check, if selectedVoteNP , have 130% more votes than currentGP (you find him based on flag.. )
          // you find who is currentGP now.. to try to replace him..
          const currentGP = await User.findOne({
            where: {
              currentGP: true,
              user_type: "GP",
            },
          });

          // you don't use selectedGP ! but 2nd, who have most votes... (as is not currentNP: false). okay, just the one with most votes, without,  currentNP: false
          const secondMostVotes = await User.findOne({
            where: {
              currentGP: false,

              user_type: "GP",
            },
            order: [["votesGP", "DESC"]],
          });

          //console.log("the one with most values:" + secondMostVotes);

          //console.log(currentNP);

          // if there's no currentNP, then make this selected one, as currentNP (just, precaution.)
          if (currentGP) {
            // now we check, if we have 130% more votes than currentNP ! (we just fetched him ! ). JUST BY the currentNP ! (not others.. )

            // Calculate the percentage increase
            /*    let voteDifference = selectedVoteNP.votes - currentNP.votes;   // 2 - 4 =  -2
            let percentageIncrease = (voteDifference / currentNP.votes) * 100;  // ((-2)*100). to je 300% više.. 
 */

            let voteDifference = secondMostVotes.votesGP - currentGP.votesGP; // 2 - 4 =  -2
            let percentageIncrease = (voteDifference / currentGP.votesGP) * 100; // ((-2)*100). to je 300% više..

            // he said, 20% more. so that's 120% more..
            if (percentageIncrease >= 120) {
              // we swap second most voted NP, with currentNP (so currentNP NO MORE ! )

              /* selectedVoteNP.currentNP = true;
                currentNP.currentNP = false; */
              await secondMostVotes.update({ currentGP: true });

              // set first for secondMostVotes (as he's now, new currentNP ! )
              await secondMostVotes.update({
                status: "Acting Global President",
              });
              var date_now = new Date().toString(); //timestamp..
              await secondMostVotes.update({ status_date: date_now });

              //TODO, not yet, but he also said, we need after 4 yrs.. we can't change it.. but for now, just keep this as it is.. for us to be simple, for NP's multiple countries..

              // only if he was actually currentGP before, otherwise, don't add these strings to it..
              if (currentGP.currentGP == true) {
                // set for previouse "currentGP" (as he's resigned now, replaced )
                await currentGP.update({ status: "Resigned" });
                var date_now = new Date().toString(); //timestamp..
                await currentGP.update({ status_date: date_now });
              }

              await currentGP.update({ currentGP: false });
            } else {
              /* selectedVoteNP.currentNP = false;
                currentNP.currentNP = true; */

              await secondMostVotes.update({ currentGP: false });

              await currentGP.update({ currentGP: true });
            }
          } else {
            // if there's no currentNP, then make this selected one, as currentNP (just, precaution.)
            /*  selectedVoteNP.currentNP = true;
            
            await selectedVoteNP.save(); */

            await secondMostVotes.update({ currentGP: true });

            // and set status text, as he's currentNP.. (that's what he wants)
            await secondMostVotes.update({
              status: "Acting Global President",
            });
            var date_now = new Date().toString(); //timestamp..
            await secondMostVotes.update({ status_date: date_now });
          }
        }

        if (currentUser) {
          try {
            //MORAŠ DA ZNAŠ I userId , od NP, za koji si sačuvao !
            // da bi ovaj gore, mogao da ga smanji, pre nego poveca ovaj drugi !
            //currentUser.votedForNPuserId = NPuserId;

            await currentUser.update({
              votedForGPuserId: selectedVoteGP.userId,
            });
            //currentUser.votedFor = votedFor; // samo ime uzmes..

            // this is just for name.. we don't need that.. in selection it does that automatically
            //await currentUser.update({ votedFor: selectedVoteNP.name });
          } catch (error) {
            console.log(error.stack)
            console.log(error.message);
          }
        }

        res.status(200).json(selectedVoteGP); // okej, vrati objekat tog, user-a, ali samo, prikaze za taj user, njegova kolona "votedFor"... (da, nemoj da se bakćeš sa localstorage kod ovoga.. lakse je ovako. ima sa NP rangiranjem jos da se radi... )
      }
    } catch (error) {
      console.log(error.stack)

      console.error("Error fetching top users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};


module.exports = {
  update_rank_data,
  votingForNP,
  resignFromCurrentPosition,
  votingForGP,


}