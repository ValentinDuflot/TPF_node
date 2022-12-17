/** Author: Valentin DUFLOT
 * Ceci sert à vérifier les informations recues dans le corps d'une requete POST pour absence
 */

// imports requis
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAbsenceInput(data) {
    let errors = {};
    // Convertit les champs vides en chaines vides pour pouvoir utiliser la fonction validator
    data.typeConge = !isEmpty(data.typeConge) ? data.typeConge : "";
    data.dateDebut = !isEmpty(data.dateDebut) ? data.dateDebut : "";
    data.dateFin = !isEmpty(data.dateFin) ? data.dateFin : "";
    data.idUser = !isEmpty(data.idUser) ? data.idUser : "";
    data.validation = !isEmpty(data.validation) ? data.validation : "";
    data.commentaire = !isEmpty(data.commentaire) ? data.commentaire : "";
    
    // typeConge
    if (Validator.isEmpty(data.typeConge)) {
        errors.typeConge = "typeConge field is required";
    }
    // dateDebut
    if (Validator.isEmpty(data.dateDebut)) {
        errors.dateDebut = "dateDebut field is required";
    }
    // dateFin
    if (Validator.isEmpty(data.dateFin)) {
        errors.dateFin = "dateFin field is required";
    }
    // idUser
    if (Validator.isEmpty(data.idUser)) {
        errors.idUser = "idUser field is required";
    }
    // validation
    if (Validator.isEmpty(data.validation)) {
        errors.validation = "validation field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
    
}