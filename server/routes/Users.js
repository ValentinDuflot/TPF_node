/** Author: Valentin DUFLOT
 * Gestion des routes et des requêtes liées aux Users, donc /register/POST et /login/POST
*/

// imports requis
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// import des fonctions de validation de requetes
const validateRegisterInput = require("../controllers/register");
const validateLoginInput = require("../controllers/login");

// import du modèle User
const User = require("../models/User")


// traitement des requetes POST de register
router.post("/register", (req, res) => {

    // Validation des informations du formulaire
    const { errors, isValid } = validateRegisterInput(req.body);

    // Renvoi code 400 si invalidité
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // On cherche si un utilisateur à ce mail existe déjà
    User.findOne({ mail: req.body.mail }).then(user => {
        // s'il existe déjà, renvoi code 400
        if (user) {
            return res.status(400).json({ mail: "Email already exists" });
        } else {
            // sinon, création de l'utilisateur
            const newUser = new User({
                name: req.body.name,
                mail: req.body.mail,
                password: req.body.password,
                role: req.body.role,
                departement: req.body.departement,
                age:req.body.age
            });
            // on ne sauvegarde pas le pass en clair, on le hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {

                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// traitement des requestes POST de login
router.post("/login", (req, res) => {

    // validation de formulaire
    const { errors, isValid } = validateLoginInput(req.body);

    // renvoi code 400 si invalidité
    if (!isValid) {
        console.log("ERR ", req.body);
        return res.status(400).json(errors);
    }

    const mail = req.body.mail;
    const password = req.body.password;
    // recherche dans le bdd d'un utilisateur avec ce mail
    User.findOne({ mail }).then(user => {

        // si inexistant, code 400
        if (!user) {
            return res.status(404).json({ mailnotfound: "Email not found" });
        }

        // si existant, on compare son MDP
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // Correspondance, donc on enregistre les informations de l'utilisateur
                const payload = {
                    _id: user._id,
                    name: user.name
                };
                // et on crée un token d'authentification
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // une année en secondes
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "tkn " + token
                        });
                    }
                );
            }
            // mot de passe incorrect, code 400
            else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

module.exports = router;
