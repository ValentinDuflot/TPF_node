/** Author: Valentin DUFLOT
 * Initialisation de la page d'acceuil de l'application
 * contenant la navbar (connexion/inscription)
 * et l'un des deux formulaires
 */

// imports nécessaires
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from "react-redux";
import store from "./store";


import Navbar from './components/Navbar'
import Login from './components/Login';
import Register from './components/Register';

import Accueil from './components/Accueil'
import Display from './components/Display'
import DisplayJFEtRTT from './components/FeriesEtRtt'
import Calendrier from './components/Calendrier'

import { BrowserRouter, Route, Routes  } from 'react-router-dom';

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import AddAbsence from './components/AddAbsence';


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser()); 
    // Redirect to login
    window.location.href = "./login";
  }
}


// affichage du contenu.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} ></Route>
          <Route path="/login" element={<Navbar />} ></Route>
          <Route path="/register" element={<Navbar />} ></Route>
        </Routes>

        <div className="container-fluid nav-justified" >
          <Routes>
            <Route path="/login" element={<Login />} ></Route>
            <Route path="/register" element={<Register />} ></Route>
            <Route path="/accueil" element={<Accueil />} ></Route>
            <Route path="/addAbsence" element={<AddAbsence />} ></Route>
            <Route path="/display" element={<Display />} ></Route>
            <Route path="/ferieEtRtt" element={<DisplayJFEtRTT />} ></Route>
            <Route path="/planning" element={<Calendrier />} ></Route>
            
            
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
