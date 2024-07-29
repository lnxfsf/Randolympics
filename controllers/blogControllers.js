



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


const blogNews = async (req, res) => {

}



const blogEconomics = async (req, res) => {

}



module.exports = {
  blogGames,
  blogNews,
  blogEconomics,


  deletegamepost,
};