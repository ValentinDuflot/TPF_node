/** Author: Valentin DUFLOT
 * Gestion des routes et des requêtes liées aux Absences, donc:
 * /addAbsence (POST)
 * /getAbsence (GET)
*/

// imports requis
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// import des fonctions de validation de requetes
const validateAbsenceInput = require("../controllers/absence");

// import des modèles nécessaires
const Absence = require("../models/Absence")
const User = require("../models/User")


// traitement des requetes POST de addAbsence
router.post("/addAbsence", (req, res) => {

    // Validation des informations du formulaire
    const { errors, isValid } = validateAbsenceInput(req.body);

    // Renvoi code 400 si invalidité
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // on vérifie qu'il existe un utilisateur à l'ID spécifié
    User.findOne({ _id: req.body.idUser }).then(user => {
        // s'il existe, on poursuit
        if (user) {
            const newAbsence = new Absence({
                typeConge: req.body.typeConge,
                dateDebut: req.body.dateDebut,
                dateFin: req.body.dateFin,
                idUser: req.body.idUser,
                validation: req.body.validation,
                commentaire: req.body.commentaire
            });

            newAbsence
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
        }
        // s'il n'existe pas, renvoi code 400
        else {
            return res.status(400).json({ mail: "no user found" });
        }
    })
    
});

// traitement des requetes GET de getAbsence
router.get("/getAbsence", (req,res) => {
    const liste = Absence
    .find({})
    .then(function(absence) {
        res.send(absence);
    })
});
module.exports = router;
