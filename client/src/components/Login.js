/** Author: Valentin DUFLOT
 * ce composant et les fonctions liées affiche un formulaire de connexion, un formulaire d'inscription, switchables
 * avec des vérifications de contenus qui changent la couleur des éléments du formulaire en fonction. 
 */

// imports nécessaires
import React, { Component } from 'react';
import { isNotEmpty, checkMail, handleChangeFocusAndBlur } from '../LoginRegisterHelpers.js'

export default class Login extends Component {

  constructor() {
    super();

    this.state = {
      // les variables d'état suivantes servent à gérer la colorisation des champs de formulaires.
      colMail: "white",
      colPass: "white",
      // et celles pour les informations du formulaire
      mailC: "",
      passwordC: ""
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      mail: this.state.mailC,
      password: this.state.passwordC

    };
    console.log(newUser);
  };

  render() {
    return (
      <div id="connexion" className="tab-pane fade in active" role="tabpanel" aria-labelledby="connexion">
        <form noValidate onSubmit={this.onSubmit}>
          <h3> Connexion :</h3>
          {/* MAIL */}
          <div className="form-group" id="mail">
            <label className="form-label" for="mailC">Adresse mail</label>
            <input type="email" id="mailC" className="form-control" style={{ "background": this.state.colMail }}
              onChange={event => {
                handleChangeFocusAndBlur(event, checkMail, (e) => { this.setState({ colMail: e }) }, false);
                this.onChange(event);
              }}
              value={this.state.mailC}
              onFocus={event => handleChangeFocusAndBlur(event, checkMail, (e) => { this.setState({ colMail: e }) }, false)}
              onBlur={event => handleChangeFocusAndBlur(event, checkMail, (e) => { this.setState({ colMail: e }) }, true)}
            />
          </div>

          {/* MDP */}
          <div className="form-group">
            <label className="form-label" for="passwordC">Mot de passe</label>
            <input type="password" id="passwordC" className="form-control" style={{ "background": this.state.colPass }}
              onChange={event => {
                handleChangeFocusAndBlur(event, isNotEmpty, (e) => { this.setState({ colPass: e }) }, false);
                this.onChange(event);
              }}
              value={this.state.passC}
              onFocus={event => handleChangeFocusAndBlur(event, isNotEmpty, (e) => { this.setState({ colPass: e }) }, false)}
              onBlur={event => handleChangeFocusAndBlur(event, isNotEmpty, (e) => { this.setState({ colPass: e }) }, true)}
            />
          </div>

          {/* BOUTON D'ENVOI */}
          <button type="submit" className="btn btn-primary btn-block mb-4">Connexion</button>
        </form>
      </div>
    );
  }
}
