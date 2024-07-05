const express = require("express");
const { rankingTop50, otherUsers } = require("../controllers/listRankingControllers");
const router = express.Router();






// router.post("/update_rank_data", update_rank_data)  // this is to update rank data, for normal Rank.. 


//TODO, this concerning rank, etc. should have it's own routes.. as it will be many. top50, and others... so in backend already, it eases frontend work.. 
// to get top50, only last 50 based on "ranking" column

router.get("/rankingTop50",rankingTop50)
router.get("/otherUsers",otherUsers)





module.exports = router;


