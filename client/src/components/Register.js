import React, { Component} from 'react';

import { isMajor, isNotEmpty, testMDP, testMails, checkMail, handleChangeFocusAndBlur } from '../LoginRegisterHelpers.js'

export default class Register extends Component {
    constructor() {
        super();
        // les variables d'état suivantes servent à gérer la colorisation des champs de formulaires.
        // les variables d'état pour le formulaire d'inscription
        this.state = {
            mail: "white",
            mailConf: "white",
            pass: "white",
            passConf: "white",
            nom: "white",
            age: "white",
            dep: "white"
        }
    }
    render() {

        return (
            // les variables d'état pour le formulaire d'inscription

            <div id="inscription" className="tab-pane fade" role="tabpanel" aria-labelledby="inscription">
                <form>
                    <h3> Inscription: </h3>
                    {/* MAIL */}
                    <div className="form-group">
                        <label className="form-label" for="inscriptionMail">Adresse mail</label>
                        <input type="email" id="inscriptionMail" className="form-control" style={{ "background": this.state.mail }}
                            onChange={event => handleChangeFocusAndBlur(event, checkMail, (e)=>{ this.setState({mail:e}) }, false)}
                            onFocus={event => handleChangeFocusAndBlur(event, checkMail, (e)=>{ this.setState({mail:e}) }, false)}
                            onBlur={event => handleChangeFocusAndBlur(event, checkMail, (e)=>{ this.setState({mail:e}) }, true)}
                        />
                    </div>

                    {/* MAIL CONFIRMATION*/}
                    <div className="form-group">
                        <label className="form-label" for="inscriptionMailConfirmation">Confirmez l'adresse mail</label>
                        <input type="email" id="inscriptionMailConfirmation" className="form-control" style={{ "background": this.state.mailConf }}
                            onChange={event => handleChangeFocusAndBlur(event, testMails, (e)=>{ this.setState({mailConf:e}) }, false, document.getElementById('inscriptionMail'))}
                            onFocus={event => handleChangeFocusAndBlur(event, testMails, (e)=>{ this.setState({mailConf:e}) }, false, document.getElementById('inscriptionMail'))}
                            onBlur={event => handleChangeFocusAndBlur(event, testMails, (e)=>{ this.setState({mailConf:e}) }, true, document.getElementById('inscriptionMail'))}
                        />
                    </div>
                    {/* MDP */}
                    <div className="form-group">
                        <label className="form-label" for="inscriptionMDP">Mot de passe</label>
                        <input type="password" id="inscriptionMDP" className="form-control" style={{ "background": this.state.pass }}
                            onChange={event => handleChangeFocusAndBlur(event, isNotEmpty, (e)=>{ this.setState({pass:e}) }, false)}
                            onFocus={event => handleChangeFocusAndBlur(event, isNotEmpty, (e)=>{ this.setState({pass:e}) }, false)}
                            onBlur={event => handleChangeFocusAndBlur(event, isNotEmpty, (e)=>{ this.setState({pass:e}) }, true)}
                        />
                    </div>

                    {/* MDP REPETITION*/}
                    <div className="form-group">
                        <label className="form-label" for="inscriptionRepetitionMDP">Répétez le mot de passe</label>
                        <input type="password" id="inscriptionRepetitionMDP" className="form-control" style={{ "background": this.state.passConf }}
                            onChange={event => handleChangeFocusAndBlur(event, testMDP, (e)=>{ this.setState({passConf:e}) }, false, document.getElementById('inscriptionMDP'))}
                            onFocus={event => handleChangeFocusAndBlur(event, testMDP, (e)=>{ this.setState({passConf:e}) }, false, document.getElementById('inscriptionMDP'))}
                            onBlur={event => handleChangeFocusAndBlur(event, testMDP, (e)=>{ this.setState({passConf:e}) }, true, document.getElementById('inscriptionMDP'))}
                        />
                    </div>

                    {/* NOM & AGE*/}
                    <div className="form-row">
                        {/* NOM */}
                        <div className="form-group col-md-6">
                            <label className="form-label" for="inscriptionNom">Prénom - NOM</label>
                            <input type="text" id="inscriptionNom" className="form-control" style={{ "background": this.state.nom }}
                                onChange={event => handleChangeFocusAndBlur(event, isNotEmpty, (e)=>{ this.setState({nom:e}) }, false)}
                                onFocus={event => handleChangeFocusAndBlur(event, isNotEmpty, (e)=>{ this.setState({nom:e}) }, false)}
                                onBlur={event => handleChangeFocusAndBlur(event, isNotEmpty, (e)=>{ this.setState({nom:e}) }, true)}
                            />
                        </div>

                        {/* AGE */}
                        <div className="form-group col-md-1">
                            <label className="form-label" for="inscriptionAge">Age</label>
                            <input type="number" id="inscriptionAge" className="form-control" style={{ "background": this.state.age }}
                                onChange={event => handleChangeFocusAndBlur(event, isMajor, (e)=>{ this.setState({age:e}) }, false)}
                                onFocus={event => handleChangeFocusAndBlur(event, isMajor, (e)=>{ this.setState({age:e}) }, false)}
                                onBlur={event => handleChangeFocusAndBlur(event, isMajor, (e)=>{ this.setState({age:e}) }, true)}
                            />
                        </div>
                    </div>

                    {/* ROLE */}
                    <div className="form-group">
                        <label>Rôle</label>
                        <div>
                            <input type="radio" id="huey" name="drone" value="Employe"
                                defaultChecked />
                            <label for="huey">Employé</label>
                        </div>
                        <div>
                            <input type="radio" id="dewey" name="drone" value="Manager" />
                            <label for="Manager">Manager</label>
                        </div>
                    </div>

                    {/* DEPARTEMENT*/}
                    <div className="form-group">
                        <label className="form-label" for="inscriptionDepartement">Département :</label>
                        <input type="text" id="inscriptionDepartement" className="form-control" style={{ "background": this.state.dep }}
                            onChange={event => handleChangeFocusAndBlur(event, isNotEmpty, (e)=>{ this.setState({dep:e}) }, false)}
                            onFocus={event => handleChangeFocusAndBlur(event, isNotEmpty, (e)=>{ this.setState({dep:e}) }, false)}
                            onBlur={event => handleChangeFocusAndBlur(event, isNotEmpty, (e)=>{ this.setState({dep:e}) }, true)}
                        />
                    </div>

                    {/* ENVOYER */}
                    <button type="submit" id="buttonSubmit" className="btn btn-primary btn-block">Inscription</button>

                </form>
            </div>
        );
    }
}
