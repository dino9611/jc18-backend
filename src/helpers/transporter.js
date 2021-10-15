const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dinotestes12@gmail.com", //email
    pass: "schtfqtxjljngnng", //app password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
