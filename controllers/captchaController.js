// And separated the logic for handling requests into controllers.

const axios = require("axios");
const SITE_SECRET = process.env.SITE_SECRET;


const verifyCaptcha = async (request, response) => {
  const { captchaValue } = request.body;



  try {
    const { data } = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${SITE_SECRET}&response=${captchaValue}`
    );

  


    response.send(data);
  } catch (error) {
    res.status(500).send({ error: "Captcha verification failed" });
  }
};

module.exports = {
  verifyCaptcha,
};
