const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailerConfig;

  // send mail with defined transport object
  return transporter.sendMail({
    from: 'John App 👻" <balchutbutrf@gmail.com>', // sender address
    to, // list of receivers
    subject, // plain text body
    html, // html body
  });
};

module.exports = sendEmail;
