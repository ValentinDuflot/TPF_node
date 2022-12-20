/** Author: Valentin DUFLOT
 * ce composant sert à afficher la liste des demandes de congé pour un utilisateur donné
 */

// import nécessaire
import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { obtenirAbsencesAValider } from '../actions/absenceActions'

import NavbarUtilisateur from "./NavbarUtilisateur";

function format(date) {
    let temp = new Date(date);

    return temp.getDate() + "/" + temp.getMonth() + "/" + (temp.getYear() + 1900).toString();
}
// composant react simple
const Validation = (props) => {

    let liste = props.obtenirAbsencesAValider();
console.log(liste);
    
    return (
        <div>
            <NavbarUtilisateur />


            <table className="table">
                <thead>
                    <tr>
                        <th colSpan="6"> Affichage des absences </th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <th>Nom</th>
                        <th>Date de début</th>
                        <th>Date de fin</th>
                        <th>Type de congé</th>
                        <th>Validation</th>
                        <th>Motif</th>
                        <th>Actions</th>

                    </tr>

                    {Object.values(liste).map(val =>

                        <tr key={val._id}>
                            <td> {val.idUser} </td>
                            <td> {format(val.dateDebut)}</td>
                            <td> {format(val.dateFin)}</td>
                            <td> {val.typeConge}</td>
                            <td> {val.validation}</td>
                            <td> {val.commentaire}</td>
                            <td>
                                {(val.validation === "EN_ATTENTE_VALIDATION" && <button > VALIDER </button>)}
                                {(val.validation === "EN_ATTENTE_VALIDATION" && <button > REFUSER</button>)}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}


// informations nécessaires à la transformation du composant en composant apte à requeter la BDD via l'export spécifique ci-dessous
Validation.propTypes = {
    obtenirAbsencesAValider: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { obtenirAbsencesAValider })(Validation);