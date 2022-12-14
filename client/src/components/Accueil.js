/** Author: Valentin DUFLOT
 * // POUR L'INSTANT
 * // PROTOTYPE DE PAGE D'ACCUEIL POUR LES UTILISATEURS ENREGISTRES
 */

// import nécessaire
import React, { Component } from "react";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/authActions"
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import NavbarUtilisateur from "./NavbarUtilisateur";

// composant React simple
class Accueil extends Component {

    
    componentDidMount() {
        // Si l'utilisateur n'est pas loggé, on le redirige vers la page de connexion
        if (!this.props.auth.isAuthenticated) {
            window.location.href = "/login";
        }
    }

    // lors du clic sur le bouton de déconnexion
    onLogoutClick = e => {
        // on log out l'utilisateur et le redirige vers la page de login
        e.preventDefault();
        this.props.logoutUser();
        window.location.href = "/login";
    };
    

    // affichage simple.
    render() {
        return (
            <div>
                <NavbarUtilisateur/>
                
            </div>
        );
    }
}

// informations nécessaires à la transformation du composant en composant apte à requeter la BDD via l'export spécifique ci-dessous
Accueil.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Accueil);