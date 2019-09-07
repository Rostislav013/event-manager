const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const passport = require("passport");
const users = require("../routes/api/users");

const app = express();

// Body parser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

//DB Config
const db = require('../config/keys').mongoURL;


//Connect to MongoDB
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log("Hei maan, I cannot connect", err));

    const port = process.env.PORT || 8000; //process.env.port is Heroku's port if app is deploed there




    // Passport middleware
    app.use(passport.initialize());

    // Passport config
    require("../config/passport")(passport);

    // Routes
    app.use("/api/users", users);


    app.listen(port, () => console.log(`Server up n running on port ${port}! That is sooo cool!`));
