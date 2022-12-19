/** Author: Valentin DUFLOT
 * Gestion des routes et des requêtes liées aux Absences
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

// traitement des requetes POST de getAbsenceByUser
router.post("/getAbsenceByUser", (req, res) => {
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
                console.log("no user found");
                return res.status(400).json({ mail: "no user found" });
            }
        });
    }
    else {
        console.log("specify a user id");
        return res.status(400).json({ mail: "specify a user id" });
    }
});


// traitement des requetes POST de getAbsenceByDepartement
router.post("/getAbsenceByDepartement", (req, res) => {

    // on vérifie qu'on a reçu un département
    if (!isEmpty(req.body.departement)) {

        // on cherche tous les utilisateurs de ce département
        User.find({ departement: req.body.departement }).exec().then(users => {

            // on enregistre les ID de chaque utilisateur trouvé
            let listeUtilisateurs = [];
            users.map((d, k) => {
                listeUtilisateurs.push(d._id);
            })

            Absence.find({ idUser: { $in: listeUtilisateurs } })
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



// traitement des requetes POST de getAbsenceByType
router.post("/getAbsenceByType", (req, res) => {
    if (!isEmpty(req.body.typeConge)) {
        Absence
            .find({ typeConge: req.body.typeConge })
            .exec()
            .then(function (absence) {
                res.send(absence);
            })
    }
    else {
        return res.status(400).json({ mail: "specify a typeConge" });
    }
});

//traitement POST modifierAbsence
router.post("/modifierAbsence", (req, res) => {

    // on vérifie qu'on a reçu une absence à modifier
    if (!isEmpty(req.body._id)) {
        Absence.findByIdAndUpdate(req.body._id, req.body)
            .exec()
            .then(function (absence) {
                res.send(absence);
            })

    }
    else {
        return res.status(400).json({ mail: "specify a _id" });
    }

});

//traitement POST deleteAbsence
router.post("/deleteAbsence", (req, res) => {

    // on vérifie qu'on a reçu une absence à supprimer
    if (!isEmpty(req.body._id)) {
        Absence.findByIdAndDelete(req.body._id, req.body)
            .exec()
            .then(function (absence) {
                return res.send(absence);
            })
    }
    else {
        return res.status(400).json({ mail: "specify a _id" });
    }
});

module.exports = router;