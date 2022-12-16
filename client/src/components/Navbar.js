/** Author: Valentin DUFLOT
 * Cette navbar affichée à l'index permet de switcher l'affichage entre le formulaire de connexion et celui d'inscription
 */

// import nécessaire
import React from "react";
import { Link } from "react-router-dom";

// composant react simple
export default function Navbar() {
    return (
        <ul id="navbar" className="nav  nav-justified" role="tablist">
            <li className="nav-item" role="presentation">
                <Link to="/login" className="btn btn-primary btn-block" >
                    Connexion
                </Link>
            </li>

            <li className="nav-item" role="presentation">
                <Link to="/register" className="btn btn-primary btn-block" >
                    Inscription
                </Link>
            </li>
        </ul>
    );
}
