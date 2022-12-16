/** Author: Valentin DUFLOT
 * Initialisation du server et de la connexion à la BDD
 */

// imports nécessaires
const express = require('express');
const fs = require('fs');
const app = express();

const morgan = require('morgan'); // permet d'afficher en console les requetes reçues

const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const users = require('./routes/Users.js');
const passport = require('passport');

// définition du port pour le server
const port = 5000;

// informations complémentaires nécessaires au server
app.use(cors());
app.use(express.json());
app.use("/routes/users", users);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(morgan('combined')); // affichage des requetes

// import des informations liées au passeport/authentification
require("./config/passport")(passport);

// initialisation de la connexion à la BDD
mongoose.set('strictQuery', false);
const connection = mongoose.connect('mongodb://127.0.0.1:27017/TPF');
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// initialisation du server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});