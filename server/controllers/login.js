/** Author: Valentin DUFLOT
 * Ceci sert à vérifier les informations recues dans le corps d'une requete POST pour login
 */

// imports requis
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};
    // Convertit les champs vides en chaines vides pour pouvoir utiliser la fonction validator
    data.mail = !isEmpty(data.mail) ? data.mail : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // MAIL
    if (Validator.isEmpty(data.mail)) {
        errors.mail = "Email field is required";
    } else if (!Validator.isEmail(data.mail)) {
        errors.mail = "Email is invalid";
    }

    // PASS
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};