/** Author: Valentin DUFLOT
 * ce composant sert à afficher la liste des jours fériés et des RTT employeurs
 */

// import nécessaire
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { obtenirJFetRTT } from '../actions/absenceActions'
import NavbarUtilisateur from "./NavbarUtilisateur";

function format(date) {
    let temp = new Date(date);

    return temp.getDate() + "/" + temp.getMonth() + "/" + (temp.getYear()+1900).toString();
}

function affichageJour(date) {
    
    switch (new Date(date).getDay())
    {
        case 3: return "Lundi"; 
        case 4: return "Mardi"; 
        case 5: return "Mercredi"; 
        case 6: return "Jeudi"; 
        case 7: return "Vendredi"; 
        case 1: return "Samedi"; 
        case 2: return "Dimanche"; 
    }
}
// composant react simple
const DisplayJFEtRTT = (props) => {

    const annees = [2022, 2023];
    const [selecteur, setSelecteur] = useState(2022);

    let liste = props.obtenirJFetRTT();

    const [affichage, setAffichage] = useState("");

    useEffect(() => {
        setAffichage(
            Object.values(liste).map(val =>
            (val.dateDebut.toString().slice(0, 4) === selecteur.toString() && <tr key={val._id}>
                <td> {format(val.dateDebut)}</td>
                <td>
                    {val.typeConge === "JF" && <p>Jour férié</p>}
                    {val.typeConge === "RTTm" && <p>RTT employeur</p>}
                </td>
                <td>
                    { affichageJour(val.dateDebut)
                    }
                </td>
                <td> {val.commentaire}</td>
            </tr>)
            ));
    }, [selecteur, liste])

    return (
        <div>
            <NavbarUtilisateur />

            <div className="form-group">
                <label>Année</label>

                {Object.values(annees).map(val =>
                    <div key={val}>
                        <input type="radio" id={val} name="radio" value={val} onChange={() => { setSelecteur(val); }} />
                        <label htmlFor={val}>{val}</label>
                    </div>
                )}

            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th colSpan="4"> Affichage des absences </th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <th>Date</th>
                        <th>Type de congé</th>
                        <th>Jour</th>
                        <th>Motif</th>

                    </tr>

                    {affichage}

                </tbody>
            </table>

        </div>
    )
}


// informations nécessaires à la transformation du composant en composant apte à requeter la BDD via l'export spécifique ci-dessous
DisplayJFEtRTT.propTypes = {
    obtenirJFetRTT: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { obtenirJFetRTT })(DisplayJFEtRTT);