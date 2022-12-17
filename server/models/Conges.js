/** Author : Gontran Derid
 * Ici sont contenues les informations de base d'un Role dans mongodb
 */

//imports requis
const mongoose = require('mongoose');
const internal = require('stream');
const Schema = mongoose.Schema;

//définition du schéma CongeSchema
const CongeSchema = new Schema({
  id: String,
  typeconge: String,
  Abreviationconge: String,
});

// création du module Conge.
module.exports = Conge = mongoose.model('conges', CongeSchema);
