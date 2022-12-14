// imports nécessaires
import React from 'react';


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

function handleAndBlur(fonction, element, elementComparaison) {
    element.addEventListener('input', (e) => {
      if (elementComparaison != null) {
        if (fonction(element.value, elementComparaison.value)) {
          e.target.style = "background:lightgreen";
        }
        else {
          e.target.style = "background:lightcoral";
        }
      }
      else {
        if (fonction(element.value)) {
          e.target.style = "background:lightgreen";
        }
        else {
          e.target.style = "background:lightcoral";
        }
      }
    });

    element.addEventListener('focus', (e) => {
      if (elementComparaison != null) {
        if (fonction(element.value, elementComparaison.value)) {
          e.target.style = "background:lightgreen";
        }
        else {
          e.target.style = "background:lightcoral";
        }
      }
      else {
        if (fonction(element.value)) {
          e.target.style = "background:lightgreen";
        }
        else {
          e.target.style = "background:lightcoral";
        }
      }
    });

    element.addEventListener('blur', (e) => {
      if (elementComparaison != null) {
        if (fonction(element.value, elementComparaison.value)) {
          e.target.style = "background:white";
        }
        else {
          e.target.style = "background:lightcoral";
        }
      }
      else {
        if (fonction(element.value)) {
          e.target.style = "background:white";
        }
        else {
          e.target.style = "background:lightcoral";
        }
      }

    });
}


function Login() {
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
            <input type="email" id="loginMail" className="form-control" style={{"background": "white"}}/>
          </div>
          {
            handleAndBlur(checkMail,document.getElementById('loginMail'))
          }

          {/* MDP */}
          <div className="form-group">
            <label className="form-label" for="loginMDP">Mot de passe</label>
            <input type="password" id="loginMDP" className="form-control" />
          </div>
          {
            handleAndBlur(isNotEmpty,document.getElementById('loginMDP'))
          }

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
            <input type="email" id="inscriptionMail" className="form-control" style={{"background": "white"}}/>
          </div>
          {
            handleAndBlur(checkMail,document.getElementById('inscriptionMail'))
          }

          {/* MAIL CONFIRMATION*/}
          <div className="form-group">
            <label className="form-label" for="inscriptionMailConfirmation">Confirmez l'adresse mail</label>
            <input type="email" id="inscriptionMailConfirmation" className="form-control" style={{"background": "white"}}/>
          </div>
          {
            handleAndBlur(testMails,document.getElementById('inscriptionMailConfirmation'),document.getElementById('inscriptionMail'))
          }

          {/* MDP */}
          <div className="form-group">
            <label className="form-label" for="inscriptionMDP">Mot de passe</label>
            <input type="password" id="inscriptionMDP" className="form-control" />
          </div>
          {
            handleAndBlur(isNotEmpty,document.getElementById('inscriptionMDP'))
          }

          {/* MDP REPETITION*/}
          <div className="form-group">
            <label className="form-label" for="inscriptionRepetitionMDP">Répétez le mot de passe</label>
            <input type="password" id="inscriptionRepetitionMDP" className="form-control" />
          </div>
          {
            handleAndBlur(testMDP,document.getElementById('inscriptionRepetitionMDP'), document.getElementById('inscriptionMDP'))
          }

          {/* PRENOM & AGE*/}
          <div className="form-row">
            {/* PRENOM */}
            <div className="form-group col-md-6">
              <label className="form-label" for="inscriptionPrenom">Prénom</label>
              <input type="text" id="inscriptionPrenom" className="form-control" style={{"background": "white"}} />
            </div>
            {
              handleAndBlur(isNotEmpty,document.getElementById('inscriptionPrenom'))
            }

            {/* AGE */}
            <div className="form-group col-md-1">
              <label className="form-label" for="inscriptionAge">Age</label>
              <input type="number" id="inscriptionAge" className="form-control" />
            </div>
            {
              handleAndBlur(isMajor,document.getElementById('inscriptionAge'))
            } 
          </div>

          {/* VALIDATION CGU */}
          <div className="form-group form-check d-flex justify-content-center ">
            <input className="form-check-input" type="checkbox" value="" id="registerCheck"
              aria-describedby="registerCheckHelpText" />
            <label className="form-check-label" for="registerCheck">
              <i>I have read and agree to the terms...</i>
            </label>
          </div>
          {/* ENVOYER */}
          <button type="submit" id="buttonSubmit" className="btn btn-primary btn-block" disabled>Inscription</button>
          {
            // si le bouton pour les CGU est non check,
            // on désactive le bouton de validation d'inscription
            // et inversement
              document.getElementById('registerCheck').addEventListener('change', (event) => {
              if(event.currentTarget.checked){
                document.getElementById('buttonSubmit').disabled = false;
              }
              else{
                document.getElementById('buttonSubmit').disabled = true;
              }
            })
          }


        </form>
      </div>
    </div>
  </div>
    );

}

export default Login;
