const db = require("../models/database");

const Campaign = db.campaign;
const User = db.users;
const Statscampaign = db.statscampaign;

const itemCampaign = async (req, res) => {
  // this is SSE, for checking ItemCampaign if there's something new

  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive"); 

  const campaignId = req.query.campaignId;
  let interval;

  let previousData = null;

  if (!campaignId) {
    res.status(400).json({ error: "Missing campaignId" });
    return;
  }

  try {
    // Send periodic updates
    interval = setInterval(async () => {
      try {
        // Query for the campaign
        const oneCampaign = await Campaign.findOne({
          where: {
            campaignId: campaignId,
          },
        });

        // If the campaign is not found, handle it
        if (!oneCampaign) {
          res.write(
            `data: ${JSON.stringify({ error: "Campaign not found" })}\n\n`
          );
          clearInterval(interval);
          return;
        }

        // Query for the athlete (user associated with the campaign)
        const thatAthlete = await User.findOne({
          where: {
            email: oneCampaign.friendEmail,
          },
        });

        const countOfSupporters = await Statscampaign.findAndCountAll({
          where: {
            campaignId: campaignId,
          },
        });

        // now we need to go to each supporter in Users table, to get value for profile picture, for that supporter if he has account, so it reflects in here.
        const supportersWithPictures = await Promise.all(
          countOfSupporters.rows.map(async (item) => {
            const user = await User.findOne({
              where: { userId: item.supporterId },
              attributes: ["picture"],
            });

            return {
              ...item.toJSON(), // Convert the Sequelize model instance to plain object
              picture: user ? user.picture : null, // Include the picture or null if not found
            };
          })
        );

        const lastCommentsSupporters = await Statscampaign.findAll({
          where: {
            campaignId: campaignId,
            /*  supporterEmail: { [Op.ne]: firstSupporterCampaign.supporterEmail }, */
          },

          limit: 3,
          attributes: ["supporterName", "amount", "supporterComment"], // only this row in database retrieve
          order: [["amount", "DESC"]],
        });

        const currentData = {
          oneCampaign,
          thatAthlete,
          supporters: {
            count: countOfSupporters.count,
            rows: supportersWithPictures,
          },
          lastCommentsSupporters,
        };

        // check if it's really new change, needing to be sent to frontend. if it's not the same (even if previousData is empty) then it can send to frontend
        if (JSON.stringify(previousData) !== JSON.stringify(currentData)) {
          previousData = currentData;
          res.write(`data: ${JSON.stringify(currentData)}\n\n`);
        }

        // Send the latest data
        /*    res.write(
          `data: ${JSON.stringify({
            oneCampaign,
            thatAthlete,
            supporters: {
              count: countOfSupporters.count,
              rows: supportersWithPictures,
            },
            lastCommentsSupporters,
          })}\n\n`
        ); */
      } catch (error) {
        console.error("Database error:", error);
        res.write(
          `data: ${JSON.stringify({ error: "Error fetching data" })}\n\n`
        );
      }
    }, 2000);

    // Send a heartbeat message to keep connection alive
    const aliveInterval = setInterval(() => {
      res.write("data: {}\n\n");
    }, 30000);

    // Clear the interval on client disconnect
    req.on("close", () => {

      clearInterval(interval); 
      clearInterval(aliveInterval);
      console.log("Client disconnected");
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  itemCampaign,
};
