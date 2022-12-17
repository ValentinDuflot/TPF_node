/** Author : Valentin DUFLOT
 * Ici sont contenues les informations de base d'une absence dans mangodb
 */

//imports requis
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//définition du schéma AbsenceSchema
const AbsenceSchema = new Schema({
  id: String,
  typeConge: String, // RTT/ CP/ CSS/ M/ JF
  dateDebut: Date,
  dateFin: Date,
  idUser: String,
  commentaire: String,
  validation: { type: String, default: INITIALE }, //INITIALE /EN_ATTENTE_VALIDATION / VALIDEE / REJETEE
});

// création du module Absence.
module.exports = Absence = mongoose.model('absence', AbsenceSchema);
