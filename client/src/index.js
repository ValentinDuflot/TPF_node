import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from "react-redux";
import store from "./store";

import Navbar from './components/Navbar'
import Login from './components/Login';
import Register from './components/Register';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <Provider store={store}>
      <div className="container-fluid nav-justified" >
        <div className="tab-content">
          <Login />
          <Register />
        </div>
      </div>
    </Provider>
  </React.StrictMode>
);
