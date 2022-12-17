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
const User = require("../models/User");
const isEmpty = require("is-empty");


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
router.get("/getAbsence", (req, res) => {
    const liste = Absence
        .find({})
        .then(function (absence) {
            res.send(absence);
        })
});

// traitement des requetes GET de getAbsenceByUser
router.get("/getAbsenceByUser", (req, res) => {
    if (!isEmpty(req.body.idUser)) {

        // on vérifie qu'il existe un utilisateur à l'ID spécifié
        User.findOne({ _id: req.body.idUser }).then(user => {
            // s'il existe, on poursuit
            if (user) {
                const liste = Absence
                    .find({ idUser: req.body.idUser })
                    .exec()
                    .then(function (absence) {
                        res.send(absence);
                    })
            }
            else {
                return res.status(400).json({ mail: "no user found" });
            }
        });
    }
    else {
        return res.status(400).json({ mail: "specify a user id" });
    }
});


// traitement des requetes GET de getAbsenceByDepartement
router.get("/getAbsenceByDepartement", (req, res) => {

    // on vérifie qu'on a reçu un département
    if (!isEmpty(req.body.departement)) {

        // on cherche tous les utilisateurs de ce département
        User.find({ departement: req.body.departement }).exec().then(users => {
            
            let listeUtilisateurs = [];
            users.map((d,k) => {
                listeUtilisateurs.push(d._id);
            })
            
            Absence.find({ idUser : {$in : listeUtilisateurs}})
            .exec()
            .then(function (absence) {
                res.send(absence);
            })
        });
    } 
    else {
        return res.status(400).json({ mail: "specify a departement" });
    }
});

module.exports = router;