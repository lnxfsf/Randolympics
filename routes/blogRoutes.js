const express = require("express");
const { 
   

    blogGames, 
    deletegamepost,
    updateUpcomingGamesBlog,
    gamesDetails,
    creategamepost,


    blogNews, 
    deletenewspost,
    createnewspost,
    newsDetails,
    updateNewsBlog,


    blogEconomics,
    deleteeconomicspost,
    createeconomicspost,
    economicsDetails,
    updateEconomicsBlog,





 } = require("../controllers/blogControllers");
const path = require('path');

const router = express.Router();


// this is all on route:  /blog


// Stockholm 2028 Games, type blogs
// TODO, I'm doing this, without design (figma) file, this is it for now (I'm working within limitations !). I need how all design should look like ! For now, I will just make CRUD 

// TODO, I will make, one big "news", and just use category !! Because, this will probably change. So, at least I don't have to create multiple news tables. But it's all news, just different categories
// TODO like "games 2028", "news" (for all general news), "economics" 
// TODO, and I will separate them in these routes...

// TODO as well, routes to individual blog (news) posts. to have direct link, by it's "post_id", "category" and "title". so it have unique URL always..









// route:  /blog/games  , for "Stockholm 2028 Games"
router.get('/games', blogGames)  
router.post("/deletegamepost", deletegamepost)
router.post("/creategamepost", creategamepost)
router.get("/gamesDetails", gamesDetails )  // get only ONE post, by postId (this is, to see changes immediatelly. )
router.post("/updateUpcomingGamesBlog", updateUpcomingGamesBlog)  // update upcominggames blogs


router.use("/upcominggames", express.static("uploads/blogs/upcominggames"));  // for static files "Stockholm 2028 Games"



//   route:  /blog/news  , for "News"
router.get('/news', blogNews)  
router.post("/deletenewspost", deletenewspost) 
router.post("/createnewspost", createnewspost)
router.get("/newsDetails", newsDetails )  
router.post("/updateNewsBlog", updateNewsBlog)  

router.use("/news", express.static("uploads/blogs/news"));



//   route:  /blog/economics  , for "Economics"
router.get('/economics', blogEconomics)   
router.post("/deleteeconomicspost", deleteeconomicspost) 
router.post("/createeconomicspost", createeconomicspost)
router.get("/economicsDetails", economicsDetails )  
router.post("/updateEconomicsBlog", updateEconomicsBlog)  

router.use("/economics", express.static("uploads/blogs/economics"));










module.exports = router;

