const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "leanna13@ethereal.email",
      pass: "Wjyh6TAnBfuPcxBSSZ",
    },
  });