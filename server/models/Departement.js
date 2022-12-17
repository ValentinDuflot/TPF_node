/** Author : Gontran Derid
 * Ici sont contenues les informations de base d'un Role dans mangodb
 */

//imports requis
const mongoose = require('mongoose');
const internal = require('stream');
const Schema = mongoose.Schema;

//définition du schéma DepartementSchema
const DepartementSchema = new Schema({
  id: String,
  departement: String,
});

// création du module Departement.
module.exports = Departement = mongoose.model(
  'departements',
  DepartementSchema
);
