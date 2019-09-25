const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')
const passport = require("passport");
const users = require("./routes/api/users");

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

app.listen(port, () => console.log(`Server up n running on port ${port}! That is sooo cool!`));
