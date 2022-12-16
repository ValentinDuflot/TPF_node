/** Author : Valentin DUFLOT
 * Ici sont contenues les informations de base d'un User dans mangodb
 */

//imports requis
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//définition du schéma UserSchema
const UserSchema = new Schema({
    id: String,
    mail: String,
    password: String,
    name: String,
    role: String,
    departement: String
})

// création du module User.
module.exports = User = mongoose.model("users", UserSchema);


