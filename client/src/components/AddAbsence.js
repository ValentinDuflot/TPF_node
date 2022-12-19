/** Author: Valentin DUFLOT
* ce composant et les fonctions liées affichent un formulaire d'ajout d'absence
*/

// imports nécessaires
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from "prop-types";
import { addAbsence } from "../actions/absenceActions";

import { isNotEmpty, handleChangeFocusAndBlur } from '../LoginRegisterHelpers.js'
import NavbarUtilisateur from './NavbarUtilisateur';
import { Link } from 'react-router-dom';


class AddAbsence extends Component {
    constructor() {
        super();
        var date = new Date();
        var currDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

        // les variables d'état suivantes servent à gérer la colorisation des champs de formulaires.
        this.state = {
            colComm: "white",
            // et celles pour les informations du formulaire
            typeSelecteur: "RTT",
            comm: "/",
            dateDebut: currDate,
            dateFin: currDate
        }
    }

    componentDidMount() {
        // Si l'utilisateur n'est pas loggé, on le redirige vers la page de login
        if (!this.props.auth.isAuthenticated) {
            window.location.href = "/login";
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    // en cas de changement dans le contenu d'un champ du formulaire, on l'enregistre dans la variable d'état correspondante
    onChange = e => {
        /*if (e.target.id === "manager" || e.target.id === "employe") {
            this.setState({ roleI: e.target.value });
        }
        else {*/
        this.setState({ [e.target.id]: e.target.value });
    };

    // en cas d'envoi du formulaire, on utilise la fonction addAbsence pour requeter la BDD et eventuellement créer l'absence
    onSubmit = e => {
        e.preventDefault();
        const newAbsence = {

            typeConge: this.state.typeSelecteur,
            dateDebut: this.state.dateDebut,
            dateFin: this.state.dateFin,
            idUser: this.props.auth.user._id,
            validation: "INITIALE",
            commentaire: this.state.comm

        };
        this.props.addAbsence(newAbsence, this.props.history);
    };

    // affichage du composant
    render() {

        return (
            <div id="inscription" role="tabpanel" aria-labelledby="inscription">

                <NavbarUtilisateur />

                <form noValidate onSubmit={this.onSubmit}>
                    <h3> Ajout de congé: </h3>

                    <div className="form-row">
                        {/* DATE DEBUT */}
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="dateDebut">Date de début</label>
                            <input type="date" id="dateDebut" className="form-control"
                                onChange={event => {
                                    this.onChange(event);
                                }}
                                value={this.state.dateDebut}
                            />
                        </div>

                        {/* DATE FIN */}
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="dateFin">Date de fin</label>
                            <input type="date" id="dateFin" className="form-control"
                                onChange={event => {
                                    this.onChange(event);
                                }}
                                value={this.state.dateFin}
                            />
                        </div>
                    </div>

                    {/* TYPE DE CONGE */}
                    <div className="form-group container-fluid">
                        <label htmlFor="typeSelecteur">Type de congé: </label>
                        <select className="form-select form-select-lg mb-3" name="typeSelecteur" id="typeSelecteur"
                            value={this.state.typeSelecteur}
                            onChange={event => {
                                this.onChange(event);
                            }}>
                            {(this.props.auth.user.role !== "Admin" && <option value="RTTe">RTT Employé</option>)}

                            {(this.props.auth.user.role === "Manager" && <option value="RTTm">RTT Employeur</option>)}

                            {(this.props.auth.user.role !== "Admin" && <option value="CP">Congé payé</option>)}
                            {(this.props.auth.user.role !== "Admin" && <option value="CSS">Congé sans solde</option>)}
                            {(this.props.auth.user.role !== "Admin" && <option value="M">Mission</option>)}

                            {(this.props.auth.user.role === "Admin" && <option value="JF">Jour férié</option>)}
                        </select>
                    </div>

                    {/* COMMENTAIRE */}
                    <div className="form-group container-fluid">
                        <label className="form-label" htmlFor="comm">Commentaire</label>
                        <input type="text" id="comm" className="form-control" style={{ "background": this.state.colComm }}
                            onChange={event => {
                                handleChangeFocusAndBlur(event, isNotEmpty, (e) => { this.setState({ colComm: e }) }, false);
                                this.onChange(event);
                            }}
                            value={this.state.comm}
                            onFocus={event => handleChangeFocusAndBlur(event, isNotEmpty, (e) => { this.setState({ colComm: e }) }, false)}
                            onBlur={event => handleChangeFocusAndBlur(event, isNotEmpty, (e) => { this.setState({ colComm: e }) }, true)}
                        />
                    </div>

                    {/* ENVOYER */}
                    <button type="submit" id="buttonSubmit" className="btn btn-primary btn-block">Ajout</button>
                    <Link to="/display" className="btn btn-primary btn-block" >
                        Retour à l'accueil
                    </Link>

                </form>
            </div>
        );
    }
}

// informations nécessaires à la transformation du composant en composant apte à requeter la BDD via l'export spécifique ci-dessous
AddAbsence.propTypes = {
    addAbsence: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { addAbsence })(AddAbsence); 