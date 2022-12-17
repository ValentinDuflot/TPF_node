/** Author : Gontran Derid
 * Ici sont contenues les informations de base d'un Role dans mongodb
 */

//imports requis
const mongoose = require('mongoose');
const internal = require('stream');
const Schema = mongoose.Schema;

//définition du schéma JourFerieSchema
const JourFerieSchema = new Schema({
  id: String,
  date: date,
  type: String,
  jour: String,
  commentaire: String,
});

// création du module JourFerie.
module.exports = JourFerie = mongoose.model('JourFerie', JourFerieSchema);
