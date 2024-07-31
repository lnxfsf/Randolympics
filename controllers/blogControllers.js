



const db = require("../models/database");

const Upcominggames = db.upcominggames;

const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;

const { v4: uuidv4 } = require("uuid");
var path = require("path");





// this is for a list, to get list for blogs..
const blogGames = async (req, res) => {

  // TODO ne moras sada... posle resi u FE ovo...
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;


  try {

    const allBlogs = await Upcominggames.findAll({

      order: [["updatedAt", "DESC"]],
      limit: limit,
      offset: offset,


    });




    res.json(allBlogs);



  } catch (error) {
    res.status(500).json({ error: error.message });
  }




}



const gamesDetails  = async (req,res) => {
    const postId = req.query.postId;


    
  try {

    const oneBlog = await Upcominggames.findOne({

     where: {
      postId: postId,
     }


    });




    res.json(oneBlog);



  } catch (error) {
    res.status(500).json({ error: error.message });
  }


}


const deletegamepost = async (req, res) => {

  const postId = req.body.postId;

  
  try {




    
    await db.sequelize.sync();


    await Upcominggames.destroy({
      where: {
        postId: postId,
      },
    });

    res.status(200).send({ message: 'Blog post deleted successfully' });
    
  }

  catch (error) {
    res.status(500).json({ error: error.message });
  }

}



const creategamepost = async (req, res) => {

  const title = req.body.title;

  const subtitle = req.body.subtitle;
  const content = req.body.content;
  const cover_image = req.body.cover_image;
  


  

  /* postId - treba da kreira, ID .. */


  const post = {
    postId: uuidv4(),
    title,
    subtitle,
    content,
    cover_image
  }


  await db.sequelize.sync();

  // create new post
  const newPost = await Upcominggames.create(post);


  res.status(201).json({ message: "Post created successfully!" });



}






const updateUpcomingGamesBlog = async (req,res) => {

  const { postId, 
    title,
    subtitle,
    content, 
    cover_image,
  } = req.body;

    await db.sequelize.sync();


    console.log("dobija"+postId)
    console.log(title)
    console.log(subtitle)
    console.log(content)

    
    


    try {
    
    const blogUpcomingGames = await Upcominggames.findOne({
      where: { postId: postId },
    });


    let needsUpdate = false; 
    const updatingObject = {};

    if(blogUpcomingGames){

      



      if(title !== blogUpcomingGames.title){
        updatingObject.title = title;
        needsUpdate = true;
      }

      

      
      if(subtitle !== blogUpcomingGames.subtitle){
        updatingObject.subtitle = subtitle;
        needsUpdate = true;
      }

      
      if(content !== blogUpcomingGames.content){
        updatingObject.content = content;
        needsUpdate = true;
      }

      // so, it can't be empty.. and must be different. so, if we upload empty (nothing) here, then it doesnt update picture. but if there's, then it's updated accordingly 
      if(cover_image && cover_image !== blogUpcomingGames.cover_image){
        updatingObject.cover_image = cover_image;
        needsUpdate = true;
      }


    }


    console.log("needsUpdate"+needsUpdate)
    if (needsUpdate) {
      try {
        await blogUpcomingGames.update(updatingObject);

        return res.status(200).json({ message: "Blog updated" });
   
      } catch (error) {

        console.log(error.stack)
        return res.status(500).json({ error: error.message });
      

    }
  }

} catch (error) {
  return res.status(500).json({ error: error.message });
}

}


const blogNews = async (req, res) => {

}



const blogEconomics = async (req, res) => {

}



module.exports = {
  blogGames,
  blogNews,
  blogEconomics,


  deletegamepost,
  updateUpcomingGamesBlog,

  gamesDetails,
  creategamepost,

};