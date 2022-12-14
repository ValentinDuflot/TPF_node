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
                Absence
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



//traitement POST de getNombreAbsences (uniquement pour les congés payés)
router.post("/getNombreAbsences", (req, res) => {
    if (!isEmpty(req.body.idUser)) {
        // on vérifie qu'il existe un utilisateur à l'ID spécifié
        User.findOne({ _id: req.body.idUser })
            .then(user => {
                // s'il existe, on poursuit
                if (user) {
                    Absence
                        .countDocuments({ idUser: req.body.idUser, typeConge: req.body.typeConge })
                        .exec()
                        .then(resultat => res.send("" + resultat))//il faut convertir le resultat en string sinon res.send ne fonctionne pas
                }
                else {
                    console.log("no user found");
                    return res.status(400).json({ userId: "no user found" });
                }
            });
    }
    else {
        console.log("specify a user id");
        return res.status(400).json({ userId: "specify a user id" });
    }
})


//traitement POST de getNombreAbsencesValidees (uniquement pour les congés payés)
router.post("/getNombreAbsencesValidees", (req, res) => {
    if (!isEmpty(req.body.idUser)) {
        // on vérifie qu'il existe un utilisateur à l'ID spécifié
        User.findOne({ _id: req.body.idUser })
            .then(user => {
                // s'il existe, on poursuit
                if (user) {
                    Absence
                        .countDocuments({ idUser: req.body.idUser, typeConge: req.body.typeConge, validation: "VALIDEE" })
                        .exec()
                        .then(resultat => res.send("" + resultat))//il faut convertir le resultat en string sinon res.send ne fonctionne pas
                }
                else {
                    console.log("no user found");
                    return res.status(400).json({ userId: "no user found" });
                }
            });
    }
    else {
        console.log("specify a user id");
        return res.status(400).json({ userId: "specify a user id" });
    }
})

//traitement POST de getJoursFeriesEtRTTEmployeurs
router.post("/getJoursFeriesEtRTTEmployeurs", (req, res) => {

    Absence
        .find({ validation: "VALIDEE" })
        .or([{ typeConge: "JF" }, { typeConge: "RTTm" }])
        .exec()
        .then(resultat => res.send(resultat))

})


// rempalce le champ idUser par son nom 
// NON FONCTIONNEL
function replaceByValue(json) {
    
    for (var k = 0; k < json.length; k++) {
        let id = json[k].idUser
        User.findOne({ _id: id })
        .exec()
            .then((user) => { this.nomUser= user.name}
            )
            json[k].idUser = this.nomUser
    }
    
    //console.log(json);
    return json;
}

router.post("/getAbsencesAValider", (req, res) => {

    Absence
        .find({ validation: "EN_ATTENTE_VALIDATION" })
        .or([{ typeConge: "RTT" }, { typeConge: "CSS" }, { typeConge: "CP" }])
        .exec()
        .then(resultat => {
            replaceByValue(resultat);
            res.send(resultat)
        });
})

module.exports = router;