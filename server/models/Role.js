/** Author : Gontran Derid
 * Ici sont contenues les informations de base d'un Role dans mangodb
 */

//imports requis
const mongoose = require('mongoose');
const internal = require('stream');
const Schema = mongoose.Schema;

//définition du schéma RoleSchema
const RoleSchema = new Schema({
  id: String,
  role: String,
});

// création du module Role.
module.exports = Role = mongoose.model('roles', RoleSchema);
