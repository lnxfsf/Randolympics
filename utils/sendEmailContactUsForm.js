const nodemailer = require("nodemailer");

module.exports = async (userEmail, subject, message, senderName) => {
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

    const subjectWithSenderInfo = `${subject} - from: ${senderName} (${userEmail}) `;

    // here he sends mail
    await transporter.sendMail({
      from: `"Support" support@randolympics.org`,
      to: "support@randolympics.org",
      replyTo: userEmail,
      subject: subjectWithSenderInfo,
      html: message,
    });

    console.log("Email sent successfully");
  } catch (err) {
    console.error("Error sending email:");
    console.error(err);
  }
};
