/** Author: Valentin DUFLOT
* ce composant et les fonctions liées affichent un formulaire d'inscription
* avec des vérifications de contenus qui changent la couleur des éléments du formulaire en fonction. 
*/

// imports nécessaires
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from "prop-types";
import { registerUser } from "../actions/authActions";

import { isMajor, isNotEmpty, testMDP, testMails, checkMail, handleChangeFocusAndBlur, tailleMDP } from '../LoginRegisterHelpers.js'


class Register extends Component {
    constructor() {
        super();
        // les variables d'état suivantes servent à gérer la colorisation des champs de formulaires.
        this.state = {
            colMail: "white",
            colMailConf: "white",
            colPass: "white",
            colPassConf: "white",
            colNom: "white",
            colAge: "white",
            colDep: "white",
            // et celles pour les informations du formulaire
            nameI: "",
            mailI: "",
            mail2I: "",
            passwordI: "",
            password2I: "",
            roleI: "employe",
            departementI: "",
            ageI: ""
        }
    }

    componentDidMount() {
        // Si l'utilisateur est loggé, on le redirige vers la page d'accueil utilisateur
        if (this.props.auth.isAuthenticated) {
            window.location.href = "/accueil";
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
        if (e.target.id === "manager" || e.target.id === "employe") {
            this.setState({ roleI: e.target.value });
        }
        else {
            this.setState({ [e.target.id]: e.target.value });
        }

    };

    // en cas d'envoi du formulaire, on utilise la fonction registerUser pour requeter la BDD et eventuellement créer l'utilisateur
    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.nameI,
            mail: this.state.mailI,
            mail2: this.state.mail2I,
            password: this.state.passwordI,
            password2: this.state.password2I,
            role: this.state.roleI,
            departement: this.state.departementI,
            age: this.state.ageI

        };
        this.props.registerUser(newUser, this.props.history);
    };

    // affichage du composant
    render() {

        return (
            <div id="inscription" role="tabpanel" aria-labelledby="inscription">
                <form noValidate onSubmit={this.onSubmit}>
                    <h3> Inscription: </h3>
                    {/* MAIL */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="mailI">Adresse mail</label>
                        <input type="email" id="mailI" className="form-control" style={{ "background": this.state.colMail }}
                            onChange={event => {
                                handleChangeFocusAndBlur(event, checkMail, (e) => { this.setState({ colMail: e }) }, false);
                                this.onChange(event);
                            }}
                            value={this.state.mailI}
                            onFocus={event => handleChangeFocusAndBlur(event, checkMail, (e) => { this.setState({ colMail: e }) }, false)}
                            onBlur={event => handleChangeFocusAndBlur(event, checkMail, (e) => { this.setState({ colMail: e }) }, true)}
                        />
                    </div>

                    {/* MAIL CONFIRMATION*/}
                    <div className="form-group">
                        <label className="form-label" htmlFor="mail2I">Confirmez l'adresse mail</label>
                        <input type="email" id="mail2I" className="form-control" style={{ "background": this.state.colMailConf }}
                            onChange={event => {
                                handleChangeFocusAndBlur(event, testMails, (e) => { this.setState({ colMailConf: e }) }, false, document.getElementById('mailI'));
                                this.onChange(event);
                            }}
                            value={this.state.mail2I}
                            onFocus={event => handleChangeFocusAndBlur(event, testMails, (e) => { this.setState({ colMailConf: e }) }, false, document.getElementById('mailI'))}
                            onBlur={event => handleChangeFocusAndBlur(event, testMails, (e) => { this.setState({ colMailConf: e }) }, true, document.getElementById('mailI'))}
                        />
                    </div>
                    {/* MDP */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="passwordI">Mot de passe</label>
                        <input type="password" id="passwordI" className="form-control" style={{ "background": this.state.colPass }}
                            onChange={event => {
                                handleChangeFocusAndBlur(event, tailleMDP, (e) => { this.setState({ colPass: e }) }, false);
                                this.onChange(event);
                            }}
                            value={this.state.passwordI} onFocus={event => handleChangeFocusAndBlur(event, tailleMDP, (e) => { this.setState({ colPass: e }) }, false)}
                            onBlur={event => handleChangeFocusAndBlur(event, tailleMDP, (e) => { this.setState({ colPass: e }) }, true)}
                        />
                    </div>

                    {/* MDP REPETITION*/}
                    <div className="form-group">
                        <label className="form-label" htmlFor="password2I">Répétez le mot de passe</label>
                        <input type="password" id="password2I" className="form-control" style={{ "background": this.state.colPassConf }}
                            onChange={event => {
                                handleChangeFocusAndBlur(event, testMDP, (e) => { this.setState({ colPassConf: e }) }, false, document.getElementById('passwordI'));
                                this.onChange(event);
                            }}
                            value={this.state.password2I}
                            onFocus={event => handleChangeFocusAndBlur(event, testMDP, (e) => { this.setState({ colPassConf: e }) }, false, document.getElementById('passwordI'))}
                            onBlur={event => handleChangeFocusAndBlur(event, testMDP, (e) => { this.setState({ colPassConf: e }) }, true, document.getElementById('passwordI'))}
                        />
                    </div>

                    {/* NOM & AGE*/}
                    <div className="form-row">
                        {/* NOM */}
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="nameI">Prénom - NOM</label>
                            <input type="text" id="nameI" className="form-control" style={{ "background": this.state.colNom }}
                                onChange={event => {
                                    handleChangeFocusAndBlur(event, isNotEmpty, (e) => { this.setState({ colNom: e }) }, false);
                                    this.onChange(event);
                                }}
                                value={this.state.nameI}
                                onFocus={event => handleChangeFocusAndBlur(event, isNotEmpty, (e) => { this.setState({ colNom: e }) }, false)}
                                onBlur={event => handleChangeFocusAndBlur(event, isNotEmpty, (e) => { this.setState({ colNom: e }) }, true)}
                            />
                        </div>

                        {/* AGE */}
                        <div className="form-group col-md-1">
                            <label className="form-label" htmlFor="ageI">Age</label>
                            <input type="number" id="ageI" className="form-control" style={{ "background": this.state.colAge }}
                                onChange={event => {
                                    handleChangeFocusAndBlur(event, isMajor, (e) => { this.setState({ colAge: e }) }, false);
                                    this.onChange(event);
                                }}
                                value={this.state.ageI}
                                onFocus={event => handleChangeFocusAndBlur(event, isMajor, (e) => { this.setState({ colAge: e }) }, false)}
                                onBlur={event => handleChangeFocusAndBlur(event, isMajor, (e) => { this.setState({ colAge: e }) }, true)}
                            />
                        </div>
                    </div>

                    {/* ROLE */}
                    <div className="form-group">
                        <label>Rôle</label>
                        <div>
                            <input type="radio" id="employe" name="radio" value="Employe"
                                defaultChecked onChange={event => { this.onChange(event); }} />
                            <label htmlFor="employe">Employé</label>
                        </div>
                        <div>
                            <input type="radio" id="manager" name="radio" value="Manager" onChange={event => { this.onChange(event); }} />
                            <label htmlFor="Manager">Manager</label>
                        </div>
                    </div>

                    {/* DEPARTEMENT*/}
                    <div className="form-group">
                        <label className="form-label" htmlFor="departementI">Département :</label>
                        <input type="text" id="departementI" className="form-control" style={{ "background": this.state.colDep }}
                            onChange={event => {
                                handleChangeFocusAndBlur(event, isNotEmpty, (e) => { this.setState({ colDep: e }) }, false);
                                this.onChange(event);
                            }}
                            value={this.state.departementI}
                            onFocus={event => handleChangeFocusAndBlur(event, isNotEmpty, (e) => { this.setState({ colDep: e }) }, false)}
                            onBlur={event => handleChangeFocusAndBlur(event, isNotEmpty, (e) => { this.setState({ colDep: e }) }, true)}
                        />
                    </div>

                    {/* ENVOYER */}
                    <button type="submit" id="buttonSubmit" className="btn btn-primary btn-block">Inscription</button>

                </form>
            </div>
        );
    }
}

// informations nécessaires à la transformation du composant en composant apte à requeter la BDD via l'export spécifique ci-dessous
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(Register);