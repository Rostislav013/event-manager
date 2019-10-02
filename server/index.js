const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')
const passport = require("passport");
const users = require("./routes/api/users");
const nodemailer = require('nodemailer');
const path = require('path');


const eventRouter = require('./routes/event-router'); //for events

const app = express();

// Body parser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(cors()); //for events
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURL;

require('dotenv').config()

//Connect to MongoDB
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected, relax, bro!'))
    .catch(err => console.log("Hei maan, I cannot connect", err));

const port = process.env.PORT || 3001; //process.env.port is Heroku's port if app is deploed there




    // Passport middleware
app.use(passport.initialize());

    // Passport config
require("./config/passport")(passport);

    // Routes
app.use("/api/users", users);

app.use('/api', eventRouter); // for events


//--------------------------//


app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    service: "Gmail",
    auth: {
        user: process.env.emaillog, // generated ethereal user
        pass: process.env.emailpass  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: 'noreply.evmngr@gmail.com', // sender address
      to: 'noreply.evmngr@gmail.com', // list of receivers
      subject: 'New Request from Event Manager App', // Subject line
      // text: '', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      res.redirect('about');
  });
  });

app.listen(port, () => console.log(`Server up n running on port ${port}! That is sooo cool!`));
