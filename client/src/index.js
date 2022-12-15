import React from 'react';
import ReactDOM from 'react-dom/client';

import Navbar from './components/Navbar'
import Login from './components/Login';
import Register from './components/Register';

//import Connect from './connect.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <div className="container-fluid nav-justified" >
      <div className="tab-content">
        <Login />
        <Register />
      </div>
    </div>
  </React.StrictMode>
);
