/** Author: Valentin DUFLOT
 * Cette navbar affichée à l'index permet de switcher l'affichage entre le formulaire de connexion et celui d'inscription
 */

// import nécessaire
import React from 'react';

// composant react simple
export default function Navbar() {
    return (
        <ul id="navbar" className="nav nav-tabs nav-justified" role="tablist">
            <li className="nav-item active" role="presentation">
                <a className="nav-link btn btn-block" data-toggle="tab" href="#connexion" aria-controls="login"
                > Connexion </a>
            </li>
            <li className="nav-item" role="presentation">
                <a className="nav-link btn btn-block" data-toggle="tab" href="#inscription" aria-controls="register"
                > Inscription </a>
            </li>
        </ul>
    );
}
