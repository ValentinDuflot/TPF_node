import React, { Component } from 'react';

import { isMajor, isNotEmpty, testMDP, testMails, checkMail, handleChangeFocusAndBlur } from '../LoginRegisterHelpers.js'

export default class Register extends Component {
    constructor() {
        super();
        // les variables d'état suivantes servent à gérer la colorisation des champs de formulaires.
        // les variables d'état pour le formulaire d'inscription
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
            roleI: "",
            departementI: "",
            ageI: ""
        }
    }

    onChange = e => {
        if(e.target.id === "manager" || e.target.id === "employe") {
            this.setState({ [this.state.roleI]: e.target.value });
        }
        else {
            this.setState({ [e.target.id]: e.target.value });
        }
        
    };
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
        console.log(newUser);
    };



    render() {

        return (
            // les variables d'état pour le formulaire d'inscription

            <div id="inscription" className="tab-pane fade" role="tabpanel" aria-labelledby="inscription">
                <form>
                    <h3> Inscription: </h3>
                    {/* MAIL */}
                    <div className="form-group">
                        <label className="form-label" for="mailI">Adresse mail</label>
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
                        <label className="form-label" for="mail2I">Confirmez l'adresse mail</label>
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
                        <label className="form-label" for="passwordI">Mot de passe</label>
                        <input type="password" id="passwordI" className="form-control" style={{ "background": this.state.colPass }}
                            onChange={event => {
                                handleChangeFocusAndBlur(event, isNotEmpty, (e) => { this.setState({ colPass: e }) }, false);
                                this.onChange(event);
                            }}
                            value={this.state.passwordI} onFocus={event => handleChangeFocusAndBlur(event, isNotEmpty, (e) => { this.setState({ colPass: e }) }, false)}
                            onBlur={event => handleChangeFocusAndBlur(event, isNotEmpty, (e) => { this.setState({ colPass: e }) }, true)}
                        />
                    </div>

                    {/* MDP REPETITION*/}
                    <div className="form-group">
                        <label className="form-label" for="password2I">Répétez le mot de passe</label>
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
                            <label className="form-label" for="nameI">Prénom - NOM</label>
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
                            <label className="form-label" for="ageI">Age</label>
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
                                defaultChecked onChange={event => { this.onChange(event);}} />
                            <label for="employe">Employé</label>
                        </div>
                        <div>
                            <input type="radio" id="manager" name="radio" value="Manager" onChange={event => { this.onChange(event);}} />
                            <label for="Manager">Manager</label>
                        </div>
                    </div>

                    {/* DEPARTEMENT*/}
                    <div className="form-group">
                        <label className="form-label" for="departementI">Département :</label>
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
