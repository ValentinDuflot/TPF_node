/** Author: Valentin DUFLOT
 * ce composant et les fonctions liées affichent un formulaire de connexion
 * avec des vérifications de contenus qui changent la couleur des éléments du formulaire en fonction. 
 */

// imports nécessaires
import React, { Component } from 'react';
import { isNotEmpty, checkMail, handleChangeFocusAndBlur, tailleMDP } from '../LoginRegisterHelpers.js'

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

class Login extends Component {

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      //this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  // en cas de changement dans le contenu d'un champ du formulaire, on l'enregistre dans la variable d'état correspondante
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  // en cas d'envoi du formulaire, on utilise la fonction loginUser pour requeter la BDD
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      mail: this.state.mailC,
      password: this.state.passwordC
    };
    this.props.loginUser(userData);
  };

  // affichage du composant
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
                handleChangeFocusAndBlur(event, tailleMDP, (e) => { this.setState({ colPass: e }) }, false);
                this.onChange(event);
              }}
              value={this.state.passC}
              onFocus={event => handleChangeFocusAndBlur(event, tailleMDP, (e) => { this.setState({ colPass: e }) }, false)}
              onBlur={event => handleChangeFocusAndBlur(event, tailleMDP, (e) => { this.setState({ colPass: e }) }, true)}
            />
          </div>

          {/* BOUTON D'ENVOI */}
          <button type="submit" className="btn btn-primary btn-block mb-4">Connexion</button>
        </form>
      </div>
    );
  }
}


// informations nécessaires à la transformation du composant en composant apte à requeter la BDD via l'export spécifique ci-dessous
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { loginUser })(Login);