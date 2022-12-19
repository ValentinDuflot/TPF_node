/** Author: Valentin DUFLOT
 * Cette navbar affichée à l'accueil utilisateur permet de switcher l'affichage entre les différentes fonctionnalités en fonction du rôle (mana,employé,admin) de l'utilisateur
 */

// import nécessaire
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

// composant react simple
class NavbarUtilisateur extends Component {

    render() {
        // LA NAVBAR POUR LES EMPLOYES
        if (this.props.auth.user.role === "Employe") {
            return (
                <div id="navbarEmploye">
                    <ul id="navbar" className="nav  nav-justified" role="tablist">
                        <li className="nav-item" role="presentation">
                            <Link to="/display" className="btn btn-primary btn-block" >
                                Affichage des absences
                            </Link>
                        </li>
                        <li className="nav-item" role="presentation">
                            <Link to="/addAbsence" className="btn btn-primary btn-block" >
                                Demande d'absences
                            </Link>
                        </li>
                        <li className="nav-item" role="presentation">
                            <Link to="/ferieEtRtt" className="btn btn-primary btn-block" >
                                Jours fériés et RTT employeur
                            </Link>
                        </li>
                        <li className="nav-item" role="presentation">
                            <Link to="/planning" className="btn btn-primary btn-block" >
                                Planning des absences
                            </Link>
                        </li>
                    </ul>
                </div>
            )
        }

        // LA NAVBAR POUR LES MANAGER
        if (this.props.auth.user.role === "Manager") {
            return (
                <ul id="navbar" className="nav  nav-justified" role="tablist">
                    <li className="nav-item" role="presentation">
                        <Link to="/display" className="btn btn-primary btn-block" >
                            Affichage des absences
                        </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link to="/addAbsence" className="btn btn-primary btn-block" >
                            Demande d'absences
                        </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link to="/ferieEtRtt" className="btn btn-primary btn-block" >
                            Jours fériés et RTT employeur
                        </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link to="/validation" className="btn btn-primary btn-block" >
                            Validation des demandes
                        </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link to="/displayDepJour" className="btn btn-primary btn-block" >
                            Vue par département et par jour
                        </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link to="/histogramme" className="btn btn-primary btn-block" >
                            Histogramme
                        </Link>
                    </li>
                </ul>
            )
        }

        // LA NAVBAR POUR LES ADMINS
        if (this.props.auth.user.role === "Admin") {
            return (
                <ul id="navbar" className="nav  nav-justified" role="tablist">
                <li className="nav-item" role="presentation">
                    <Link to="/ferieEtRtt" className="btn btn-primary btn-block" >
                        Jours fériés et RTT employeur
                    </Link>
                </li>
                    <li className="nav-item" role="presentation">
                        <Link to="/ajoutFerieEtRtt" className="btn btn-primary btn-block" >
                            ajout jour fériés et RTT employeur
                        </Link>
                    </li>
                </ul>
            )
        }

    }
}



// informations nécessaires à la transformation du composant en composant apte à requeter la BDD via l'export spécifique ci-dessous
NavbarUtilisateur.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps)(NavbarUtilisateur);




