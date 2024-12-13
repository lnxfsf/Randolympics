



const db = require("../models/database");

const Upcominggames = db.upcominggames;
const News = db.news;
const Economics = db.economics;

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





const blogGamesToUser = async (req, res) => {


  const limit = parseInt(req.query.limit) || 3;
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


const gamesDetails = async (req, res) => {
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


  // postId: uuidv4(),  we don't need big compled id.. just number will do for url..


  const post = {
   
    title,
    subtitle,
    content,
    cover_image
  }


  

  const t = await db.sequelize.transaction();

  try {
  // create new post
  const newPost = await Upcominggames.create(post,{ transaction: t });

  await t.commit();

} catch (e) {
  await t.rollback();

}

  res.status(201).json({ message: "Post created successfully!" });



}






const updateUpcomingGamesBlog = async (req, res) => {

  const { postId,
    title,
    subtitle,
    content,
    cover_image,
  } = req.body;

  


  console.log("dobija" + postId)
  console.log(title)
  console.log(subtitle)
  console.log(content)





  try {

    const t1 = await db.sequelize.transaction();


    const blogUpcomingGames = await Upcominggames.findOne({
      where: { postId: postId },
      lock: true,
      transaction: t1,
    });


    let needsUpdate = false;
    const updatingObject = {};

    if (blogUpcomingGames) {





      if (title !== blogUpcomingGames.title) {
        updatingObject.title = title;
        needsUpdate = true;
      }




      if (subtitle !== blogUpcomingGames.subtitle) {
        updatingObject.subtitle = subtitle;
        needsUpdate = true;
      }


      if (content !== blogUpcomingGames.content) {
        updatingObject.content = content;
        needsUpdate = true;
      }

      // so, it can't be empty.. and must be different. so, if we upload empty (nothing) here, then it doesnt update picture. but if there's, then it's updated accordingly 
      if (cover_image && cover_image !== blogUpcomingGames.cover_image) {
        updatingObject.cover_image = cover_image;
        needsUpdate = true;
      }


    }


    console.log("needsUpdate" + needsUpdate)
    if (needsUpdate) {
      
      

      try {
        await blogUpcomingGames.update(updatingObject,{ transaction: t1 });

        await t1.commit();

        return res.status(200).json({ message: "Blog updated" });

      } catch (error) {
        await t1.rollback();
        console.log(error.stack)
        return res.status(500).json({ error: error.message });


      }
    }

  } catch (error) {
   
    return res.status(500).json({ error: error.message });
  }

}


const blogNews = async (req, res) => {

  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;




  try {

    const allBlogs = await News.findAndCountAll({

      order: [["updatedAt", "DESC"]],
      limit: limit,
      offset: offset,


    });

    res.status(200).json(allBlogs);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }




}



const newsToUser = async (req, res) => {

  const limit = parseInt(req.query.limit) || 7;
  const offset = parseInt(req.query.offset) || 0;




  try {

    const allBlogs = await News.findAll({

      //order: [["views", "DESC"]],
      order: [["updatedAt", "DESC"]],
      limit: limit,
      offset: offset,


    });

    res.json(allBlogs);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }




}



const deletenewspost = async (req, res) => {

  const postId = req.body.postId;



  try {





    


    await News.destroy({
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


const newsDetails = async (req, res) => {

  const postId = req.query.postId;

  try {

    const oneBlog = await News.findOne({

      where: {
        postId: postId,
      }


    });




    res.json(oneBlog);



  } catch (error) {
    res.status(500).json({ error: error.message });
  }






}

// this is to count views, for regular user , not any admin etc.. (so based on views, we count popularity)
const readingnewsDetails = async (req, res) => {

  const postId = req.query.postId;

  try {

    const oneBlog = await News.findOne({

      where: {
        postId: postId,
      }


    });


    await oneBlog.increment("views", { by: 1 });

    res.json(oneBlog);



  } catch (error) {
    res.status(500).json({ error: error.message });
  }






}

const createnewspost = async (req, res) => {
  const title = req.body.title;

  const subtitle = req.body.subtitle;
  const content = req.body.content;
  const cover_image = req.body.cover_image;




  const post = {
   
    title,
    subtitle,
    content,
    cover_image
  }

  

  const t = await db.sequelize.transaction();

  try {
  // create new post
  const newPost = await News.create(post,{ transaction: t });

  await t.commit();

  res.status(201).json({ message: "Post created successfully!" });


} catch (e) {
    await t.rollback();
}




}


const updateNewsBlog = async (req, res) => {

  const { postId,
    title,
    subtitle,
    content,
    cover_image,
  } = req.body;


  



  try {


    const t1 = await db.sequelize.transaction();

    const blogNews = await News.findOne({
      where: { postId: postId },
      lock: true,
      transaction: t1,
    });


    let needsUpdate = false;
    const updatingObject = {};


    if (blogNews) {

      if (title !== blogNews.title) {
        updatingObject.title = title;
        needsUpdate = true;
      }




      if (subtitle !== blogNews.subtitle) {
        updatingObject.subtitle = subtitle;
        needsUpdate = true;
      }


      if (content !== blogNews.content) {
        updatingObject.content = content;
        needsUpdate = true;
      }

      // so, it can't be empty.. and must be different. so, if we upload empty (nothing) here, then it doesnt update picture. but if there's, then it's updated accordingly 
      if (cover_image && cover_image !== blogNews.cover_image) {
        updatingObject.cover_image = cover_image;
        needsUpdate = true;
      }


    }

    if (needsUpdate) {
      try {
        await blogNews.update(updatingObject,{ transaction: t1 });

        await t1.commit();

        return res.status(200).json({ message: "Blog updated" });

      } catch (error) {
        await t1.rollback();

        console.log(error.stack)
        return res.status(500).json({ error: error.message });


      }
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

}


const blogEconomics = async (req, res) => {


  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;




  try {

    const allBlogs = await Economics.findAll({

      order: [["updatedAt", "DESC"]],
      limit: limit,
      offset: offset,


    });

    res.json(allBlogs);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }




}




const deleteeconomicspost = async (req, res) => {

  const postId = req.body.postId;



  try {





    


    await Economics.destroy({
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



const createeconomicspost = async (req, res) => {

  const title = req.body.title;

  const subtitle = req.body.subtitle;
  const content = req.body.content;
  const cover_image = req.body.cover_image;




  const post = {
    title,
    subtitle,
    content,
    cover_image
  }

  

  const t = await db.sequelize.transaction();

  // create new post
  try {
    const newPost = await Economics.create(post,{ transaction: t });
    await t.commit();

    res.status(201).json({ message: "Post created successfully!" });
  
  } catch(e) {
    await t.rollback();
  }
 







}




const economicsDetails = async (req, res) => {

  const postId = req.query.postId;

  try {

    const oneBlog = await Economics.findOne({

      where: {
        postId: postId,
      }


    });




    res.json(oneBlog);



  } catch (error) {
    res.status(500).json({ error: error.message });
  }





}






const updateEconomicsBlog = async (req, res) => {

  const { postId,
    title,
    subtitle,
    content,
    cover_image,
  } = req.body;


  



  try {

    const t1 = await db.sequelize.transaction();

    const blogEconomics = await Economics.findOne({
      where: { postId: postId },
      lock: true,
      transaction: t1,
    });


    let needsUpdate = false;
    const updatingObject = {};


    if (blogEconomics) {

      if (title !== blogEconomics.title) {
        updatingObject.title = title;
        needsUpdate = true;
      }




      if (subtitle !== blogEconomics.subtitle) {
        updatingObject.subtitle = subtitle;
        needsUpdate = true;
      }


      if (content !== blogEconomics.content) {
        updatingObject.content = content;
        needsUpdate = true;
      }

      // so, it can't be empty.. and must be different. so, if we upload empty (nothing) here, then it doesnt update picture. but if there's, then it's updated accordingly 
      if (cover_image && cover_image !== blogEconomics.cover_image) {
        updatingObject.cover_image = cover_image;
        needsUpdate = true;
      }


    }

    if (needsUpdate) {
      try {
        await blogEconomics.update(updatingObject,{ transaction: t1 });
        await t1.commit();

        return res.status(200).json({ message: "Blog updated" });

      } catch (error) {
        await t1.rollback();
        
        console.log(error.stack)
        return res.status(500).json({ error: error.message });


      }
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

}




const economicsToUser = async (req, res) => {


  const limit = parseInt(req.query.limit) || 3;
  const offset = parseInt(req.query.offset) || 0;


  try {

    const allBlogs = await Economics.findAll({

      order: [["updatedAt", "DESC"]],
      limit: limit,
      offset: offset,


    });




    res.json(allBlogs);



  } catch (error) {
    res.status(500).json({ error: error.message });
  }




}








module.exports = {





  blogGames,
  deletegamepost,
  updateUpcomingGamesBlog,
  gamesDetails,
  creategamepost,
  blogGamesToUser,



  blogNews,
  deletenewspost,
  createnewspost,
  newsDetails,
  updateNewsBlog,
  newsToUser,
  readingnewsDetails,

  
  blogEconomics,
  deleteeconomicspost,
  createeconomicspost,
  economicsDetails,
  updateEconomicsBlog,
  economicsToUser,



};