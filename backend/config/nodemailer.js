const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: `patrokumarrahul@gmail.com`,
    pass: `rahul1582000`,
  },
});

module.exports = transporter;