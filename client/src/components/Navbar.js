import React from 'react';

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
