//-------------- Send mail is use for implment the forget password 

const nodemailer = require("nodemailer")

const SendMail = async (to, subject, text) => {

  try {

    //Create the transporter help of nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_AUTH_PASS
      }
    });

    transporter.sendMail({to,subject,text});

  } catch (error) { throw new Error(error); }
}

module.exports = SendMail;