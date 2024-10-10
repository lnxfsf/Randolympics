const express = require("express");
const { rankingTop50, otherUsers, lastInRank,
         team, currentNP , 
         listLoginTrafficHistory, 
         landingPageRandomize, shareTableLandingPage,
           createCampaign,
           campaignDetails,
           howManySupportersCampaign,
           lastCommentsSupportersCampaign,
           lastTransactionsSupportersCampaign,


           listAllCampaigns,
           listAllUsers,

           informOtherSupporters,
           firstSupportersCampaign,
           allTransactionsSupportersCampaign,
        
        } = require("../controllers/listDataControllers");
const router = express.Router();







// router.post("/update_rank_data", update_rank_data)  // this is to update rank data, for normal Rank.. 


//TODO, this concerning rank, etc. should have it's own routes.. as it will be many. top50, and others... so in backend already, it eases frontend work.. 
// to get top50, only last 50 based on "ranking" column
/* 
router.get("/rankingTop50",rankingTop50)
router.get("/otherUsers",otherUsers) */



// to get top50, only last 50 based on "ranking" column
router.get("/rankingTop50",rankingTop50)   
router.get("/otherUsers", otherUsers)
router.get("/team", team)  



router.get("/lastInRank", lastInRank)  


router.get("/currentNP", currentNP)   

// to get login history traffic
router.get("/listLoginTrafficHistory",listLoginTrafficHistory)  // ! prvo ovaj, zameni sa: listsData




// randomize LANDING PAGE (this one is not saved anywhere..)
router.get("/landingPageRandomize", landingPageRandomize)

// place, to insert <table className="tablez", whole, that was rendered, so we send to all those friend lists.. (just email)
router.post("/shareTableLandingPage", shareTableLandingPage)




// for reading campaign info 
router.get("/campaignDetails", campaignDetails)
router.get("/howManySupportersCampaign", howManySupportersCampaign)
router.get("/lastCommentsSupportersCampaign", lastCommentsSupportersCampaign)
router.get("/lastTransactionsSupportersCampaign", lastTransactionsSupportersCampaign)
router.get("/firstSupportersCampaign", firstSupportersCampaign)
router.get("/allTransactionsSupportersCampaign",allTransactionsSupportersCampaign)


// list all campaigns
router.get("/listAllCampaigns",listAllCampaigns)

// list all users
router.get("/listAllUsers",listAllUsers)




// inform all those other supporters, of this link
router.post("/informOtherSupporters", informOtherSupporters)

  



// create campaign
router.post("/createCampaign", createCampaign) 



module.exports = router;


