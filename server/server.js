const express = require('express');
const fs = require('fs');
const app = express();

const morgan = require('morgan');

const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const users = require('./routes/Users.js');
const passport = require('passport');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/TPF');

const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/routes/users", users);

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

app.use(morgan('combined'));

require("./config/passport")(passport);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});