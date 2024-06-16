const nodemailer = require('nodemailer');

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
             
            service: process.env.SERVICE,
            
            auth: {
                user: process.env.USER_email,
                pass: process.env.PASS_email
            }
        });

        // here he sends mail
        //TODO , ti stavio: html: ` ` da moze poslati subject koji treba. inace je bilo:  text: text
        await transporter.sendMail({
            from: process.env.USER_email,
            to: email,
            subject: subject,
            html: text
        });

        console.log("Email sent successfully");
    } catch (err) {
        console.error("Error sending email:");
        console.error(err);
    }
};
