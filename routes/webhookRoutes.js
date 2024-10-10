const express = require("express");
const { webhookController  } = require("../controllers/webhookController");
const router = express.Router();



router.post('/', express.raw({ type: 'application/json' }), webhookController)



module.exports = router;

