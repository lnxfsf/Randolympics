const express = require("express");
const { blogGames, blogNews, blogEconomics, deletegamepost } = require("../controllers/blogControllers");
const path = require('path');

const router = express.Router();


// this is all on route:  /blog


// Stockholm 2028 Games, type blogs
// TODO, I'm doing this, without design (figma) file, this is it for now (I'm working within limitations !). I need how all design should look like ! For now, I will just make CRUD 

// TODO, I will make, one big "news", and just use category !! Because, this will probably change. So, at least I don't have to create multiple news tables. But it's all news, just different categories
// TODO like "games 2028", "news" (for all general news), "economics" 
// TODO, and I will separate them in these routes...

// TODO as well, routes to individual blog (news) posts. to have direct link, by it's "post_id", "category" and "title". so it have unique URL always..



router.get('/games', blogGames)  //   route:  /blog/games  , for "Stockholm 2028 Games"
router.get('/news', blogNews)   //   route:  /blog/news  , for "News"
router.get('/economics', blogEconomics)   //   route:  /blog/economics  , for "Economics"


router.post("/deletegamepost", deletegamepost)


router.use("/upcominggames", express.static("uploads/blogs/upcominggames"));




module.exports = router;

