

const express = require("express");
const { update_rank_data, votingForNP, resignFromCurrentPosition, votingForGP,  } = require("../controllers/votingControllers");
const router = express.Router();




// update ranking
router.post("/update_rank_data", update_rank_data)


//NP, elections (by Athletes). handled separatelly routes, so less confusion.. 
router.get("/votingForNP", votingForNP )
router.post("/votingForNP", votingForNP )
router.post("/resignFromCurrentPosition", resignFromCurrentPosition)


// for GP elections (by NP's)
router.get("/votingForGP", votingForGP )
router.post("/votingForGP", votingForGP )



module.exports = router;



