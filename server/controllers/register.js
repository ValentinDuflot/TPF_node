/** Author: Valentin DUFLOT
 * Ceci sert à vérifier les informations recues dans le corps d'une requete POST pour register
 */

// imports requis
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};
    // Convertit les champs vides en chaines vides pour pouvoir utiliser la fonction validator
    data.name = !isEmpty(data.name) ? data.name : "";
    data.mail = !isEmpty(data.mail) ? data.mail : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.role = !isEmpty(data.role) ? data.role : "";
    data.departement = !isEmpty(data.departement) ? data.departement : "";

    // NOM
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

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
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    // ROLE
    if (Validator.isEmpty(data.role)) {
        errors.role = "role field is required";
    }

    // DEPARTEMENT
    if (Validator.isEmpty(data.departement)) {
        errors.departement = "departement field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};