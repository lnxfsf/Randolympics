const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,

      secure: true,

      auth: {
        user: process.env.USER_email,
        pass: process.env.PASS_email,
      },
    });

    // here he sends mail
    await transporter.sendMail({
      from: process.env.USER_email,
      to: email,
      subject: subject,
      html: text,
    });

    console.log("Email sent successfully");
  } catch (err) {
    console.error("Error sending email:");
    console.error(err);
  }
};
