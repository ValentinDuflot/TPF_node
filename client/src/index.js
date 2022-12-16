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
import { BrowserRouter, Route, Routes } from 'react-router-dom';


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
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
