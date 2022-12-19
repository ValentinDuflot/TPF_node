/** Author: Valentin DUFLOT
 * ce composant sert à afficher la liste des demandes de congé pour un utilisateur donné
 */

// import nécessaire
import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { obtenirAbsenceByUser, obtenirNombreAbsencesRestants } from '../actions/absenceActions'
import NavbarUtilisateur from "./NavbarUtilisateur";

function format(date) {
    let temp = new Date(date);

    return temp.getDate() + "/" + temp.getMonth() + "/" + temp.getYear();
}
// composant react simple
const Display = (props) => {

    const userData = {
        idUser: props.auth.user._id
    };

    let liste = props.obtenirAbsenceByUser(userData);

    const reqData = {
        idUser: props.auth.user._id,
        typeConge: "CP"
    };
    const reqDataRtt = {
        idUser: props.auth.user._id,
        typeConge: "RTTe"
    };

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
                        <th>Date de début</th>
                        <th>Date de fin</th>
                        <th>Type de congé</th>
                        <th>Validation</th>
                        <th>Motif</th>
                        <th>Actions</th>

                    </tr>

                    {Object.values(liste).map(val =>
                        <tr key={val._id}>
                            <td> {format(val.dateDebut)}</td>
                            <td> {format(val.dateFin)}</td>
                            <td> {val.typeConge}</td>
                            <td> {val.validation}</td>
                            <td> {val.commentaire}</td>
                            <td>
                                {(val.validation === "INITIALE" && <button > modifier </button>)}
                                {(val.validation === "INITIALE" && <button > supprimer</button>)}

                                {(val.validation === "EN_ATTENTE_VALIDATION" && <button > modifier </button>)}
                                {(val.validation === "EN_ATTENTE_VALIDATION" && <button > supprimer</button>)}

                                {(val.validation === "REJETEE" && <button > modifier</button>)}
                                {(val.validation === "REJETEE" && <button > supprimer</button>)}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <p>{props.obtenirNombreAbsencesRestants(reqData)} jours de congés payés restants</p>
            <p>{props.obtenirNombreAbsencesRestants(reqDataRtt) -19} RTT restants</p>
            
        </div>
    )
}


// informations nécessaires à la transformation du composant en composant apte à requeter la BDD via l'export spécifique ci-dessous
Display.propTypes = {
    obtenirAbsenceByUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { obtenirAbsenceByUser, obtenirNombreAbsencesRestants })(Display);