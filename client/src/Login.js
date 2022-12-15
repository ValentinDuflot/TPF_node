/** Author: Valentin DUFLOT
 * ce composant et les fonctions liées affiche un formulaire de connexion, un formulaire d'inscription, switchables
 * avec des vérifications de contenus qui changent la couleur des éléments du formulaire en fonction. 
 */

// imports nécessaires
import React, { useState } from 'react';

// teste si l'age est >= 18
function isMajor(age) {
  if (!isNaN(age)) {
    if (age >= 18) {
      return true;
    }
  }
  return false;
}

// teste si la chaine n'est pas vide
function isNotEmpty(string) {
  if (string !== "") {
    return true;
  }
  return false;
}

// teste si les deux mdp spécifiés sont identiques
function testMDP(mdpA, mdpB) {
  return mdpA === mdpB ? true : false;
}

// teste si les deux mails spécifiés sont identiques
function testMails(mailA, mailB) {
  return mailA === mailB ? true : false;
}

//teste si le mail fourni est dans le bon format
function checkMail(mail) {
  var mailformat = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,4}$/;
  return mail.match(mailformat);
}

//appelé par les éléments des formulaires
// event est l'évènement qui a provoqué l'appel de la fonction
// fonction est celle qui effectue le test pour gérer la couleur (trouvable dans les fonctions ci-dessus)
// fonctionChangement est celle qui change la couleur de l'élément (change la variable d'état)
// blur : false si on a focus ou change un élément du formulaire, true si on l'a blur
// elementComparaison : pour mailConfirmation et mdpConfirmation, il faut renseigner l'élément avec laquelle on compare le courant
function handleChangeFocusAndBlur(event, fonction, fonctionChangement, blur, elementComparaison) {
  if (elementComparaison != null) {
    if (fonction(event.target.value, elementComparaison.value)) {
      if (blur) { fonctionChangement('white'); }
      else { fonctionChangement('lightgreen'); }
    }
    else {
      fonctionChangement('lightcoral');
    }
  }
  else {
    if (fonction(event.target.value)) {
      if (blur) { fonctionChangement('white'); }
      else { fonctionChangement('lightgreen'); }
    }
    else {
      fonctionChangement('lightcoral');
    }
  }
}

function Login() {

  // signification des prochains noms de variables : Co = connexion, In = inscription, Conf = confirmation
  // les variables d'état pour le formulaire de connexion
  const [mailCo, setMailCo] = useState('white');
  const [passCo, setPassCo] = useState('white');

  // les variables d'état pour le formulaire d'inscription
  const [mailIn, setMailIn] = useState('white');
  const [mailInConf, setMailInConf] = useState('white');
  const [passIn, setPassIn] = useState('white');
  const [passInConf, setPassInConf] = useState('white');
  const [nomIn, setNomIn] = useState('white');
  const [ageIn, setAgeIn] = useState('white');
  const [depIn, setDepIn] = useState('white');

  return (

    <div className="container-fluid nav-justified" >
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

      <div className="tab-content">
        <div id="connexion" className="tab-pane fade in active" role="tabpanel" aria-labelledby="connexion">
          <form >
            <h3> Connexion :</h3>
            {/* MAIL */}
            <div className="form-group" id="mail">
              <label className="form-label" for="loginMail">Adresse mail</label>
              <input type="email" id="loginMail" className="form-control" style={{ "background": mailCo }}
                onChange={event => handleChangeFocusAndBlur(event, checkMail, setMailCo, false)}
                onFocus={event => handleChangeFocusAndBlur(event, checkMail, setMailCo, false)}
                onBlur={event => handleChangeFocusAndBlur(event, checkMail, setMailCo, true)}
              />
            </div>

            {/* MDP */}
            <div className="form-group">
              <label className="form-label" for="loginMDP">Mot de passe</label>
              <input type="password" id="loginMDP" className="form-control" style={{ "background": passCo }}
                onChange={event => handleChangeFocusAndBlur(event, isNotEmpty, setPassCo, false)}
                onFocus={event => handleChangeFocusAndBlur(event, isNotEmpty, setPassCo, false)}
                onBlur={event => handleChangeFocusAndBlur(event, isNotEmpty, setPassCo, true)}
              />
            </div>

            {/* RESTER CONNECTE & OUBLI MDP*/}
            <div className="form-row">
              {/* RESTER CONNECTE */}
              <div className="form-group col-md-2">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="loginCheck" />
                  <label className="form-check-label" for="loginCheck"> Rester connecté </label>
                </div>
              </div>

              {/* OUBLI MDP */}
              <div className="form-group col-md-2">
                <a href="#!">Mot de passe oublié?</a>
              </div>
            </div>

            {/* BOUTON D'ENVOI */}
            <button type="submit" className="btn btn-primary btn-block mb-4">Connexion</button>
          </form>
        </div>

        <div id="inscription" className="tab-pane fade" role="tabpanel" aria-labelledby="inscription">
          <form>
            <h3> Inscription: </h3>
            {/* MAIL */}
            <div className="form-group">
              <label className="form-label" for="inscriptionMail">Adresse mail</label>
              <input type="email" id="inscriptionMail" className="form-control" style={{ "background": mailIn }}
                onChange={event => handleChangeFocusAndBlur(event, checkMail, setMailIn, false)}
                onFocus={event => handleChangeFocusAndBlur(event, checkMail, setMailIn, false)}
                onBlur={event => handleChangeFocusAndBlur(event, checkMail, setMailIn, true)}
              />
            </div>

            {/* MAIL CONFIRMATION*/}
            <div className="form-group">
              <label className="form-label" for="inscriptionMailConfirmation">Confirmez l'adresse mail</label>
              <input type="email" id="inscriptionMailConfirmation" className="form-control" style={{ "background": mailInConf }}
                onChange={event => handleChangeFocusAndBlur(event, testMails, setMailInConf, false, document.getElementById('inscriptionMail'))}
                onFocus={event => handleChangeFocusAndBlur(event, testMails, setMailInConf, false, document.getElementById('inscriptionMail'))}
                onBlur={event => handleChangeFocusAndBlur(event, testMails, setMailInConf, true, document.getElementById('inscriptionMail'))}
              />
            </div>
            {/* MDP */}
            <div className="form-group">
              <label className="form-label" for="inscriptionMDP">Mot de passe</label>
              <input type="password" id="inscriptionMDP" className="form-control" style={{ "background": passIn }}
                onChange={event => handleChangeFocusAndBlur(event, isNotEmpty, setPassIn, false)}
                onFocus={event => handleChangeFocusAndBlur(event, isNotEmpty, setPassIn, false)}
                onBlur={event => handleChangeFocusAndBlur(event, isNotEmpty, setPassIn, true)}
              />
            </div>

            {/* MDP REPETITION*/}
            <div className="form-group">
              <label className="form-label" for="inscriptionRepetitionMDP">Répétez le mot de passe</label>
              <input type="password" id="inscriptionRepetitionMDP" className="form-control" style={{ "background": passInConf }}
                onChange={event => handleChangeFocusAndBlur(event, testMDP, setPassInConf, false, document.getElementById('inscriptionMDP'))}
                onFocus={event => handleChangeFocusAndBlur(event, testMDP, setPassInConf, false, document.getElementById('inscriptionMDP'))}
                onBlur={event => handleChangeFocusAndBlur(event, testMDP, setPassInConf, true, document.getElementById('inscriptionMDP'))}
              />
            </div>

            {/* NOM & AGE*/}
            <div className="form-row">
              {/* NOM */}
              <div className="form-group col-md-6">
                <label className="form-label" for="inscriptionNom">Prénom - NOM</label>
                <input type="text" id="inscriptionNom" className="form-control" style={{ "background": nomIn }}
                  onChange={event => handleChangeFocusAndBlur(event, isNotEmpty, setNomIn, false)}
                  onFocus={event => handleChangeFocusAndBlur(event, isNotEmpty, setNomIn, false)}
                  onBlur={event => handleChangeFocusAndBlur(event, isNotEmpty, setNomIn, true)}
                />
              </div>

              {/* AGE */}
              <div className="form-group col-md-1">
                <label className="form-label" for="inscriptionAge">Age</label>
                <input type="number" id="inscriptionAge" className="form-control" style={{ "background": ageIn }}
                  onChange={event => handleChangeFocusAndBlur(event, isMajor, setAgeIn, false)}
                  onFocus={event => handleChangeFocusAndBlur(event, isMajor, setAgeIn, false)}
                  onBlur={event => handleChangeFocusAndBlur(event, isMajor, setAgeIn, true)}
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
              <input type="text" id="inscriptionDepartement" className="form-control" style={{ "background": depIn }}
                onChange={event => handleChangeFocusAndBlur(event, isNotEmpty, setDepIn, false)}
                onFocus={event => handleChangeFocusAndBlur(event, isNotEmpty, setDepIn, false)}
                onBlur={event => handleChangeFocusAndBlur(event, isNotEmpty, setDepIn, true)}
              />
            </div>

            {/* ENVOYER */}
            <button type="submit" id="buttonSubmit" className="btn btn-primary btn-block">Inscription</button>

          </form>
        </div>
      </div>
    </div>
  );

}

export default Login;
