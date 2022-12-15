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
    // les variables d'état suivantes servent à gérer la colorisation des champs de formulaires.
    this.state = {
      mail: "white",
      pass: "white",
    }
  }

  render() {
    return (


      <div id="connexion" className="tab-pane fade in active" role="tabpanel" aria-labelledby="connexion">
        <form >
          <h3> Connexion :</h3>
          {/* MAIL */}
          <div className="form-group" id="mail">
            <label className="form-label" for="loginMail">Adresse mail</label>
            <input type="email" id="loginMail" className="form-control" style={{ "background": this.state.mail }}
              onChange={event => handleChangeFocusAndBlur(event, checkMail, (e)=>{ this.setState({mail:e}) }, false)}
              onFocus={event => handleChangeFocusAndBlur(event, checkMail, (e)=>{ this.setState({mail:e}) }, false)}
              onBlur={event => handleChangeFocusAndBlur(event, checkMail, (e)=>{ this.setState({mail:e}) }, true)}
            />
          </div>

          {/* MDP */}
          <div className="form-group">
            <label className="form-label" for="loginMDP">Mot de passe</label>
            <input type="password" id="loginMDP" className="form-control" style={{ "background": this.state.pass }}
              onChange={event => handleChangeFocusAndBlur(event, isNotEmpty, (e)=>{ this.setState({pass:e}) }, false)}
              onFocus={event => handleChangeFocusAndBlur(event, isNotEmpty, (e)=>{ this.setState({pass:e}) }, false)}
              onBlur={event => handleChangeFocusAndBlur(event, isNotEmpty, (e)=>{ this.setState({pass:e}) }, true)}
            />
          </div>

          {/* BOUTON D'ENVOI */}
          <button type="submit" className="btn btn-primary btn-block mb-4">Connexion</button>
        </form>
      </div>


    );

  }
}
