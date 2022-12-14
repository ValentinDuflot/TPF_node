/** Author: Valentin DUFLOT
 * On définit ici certaines fonctions essentielles à l'authentification et à l'inscription
 */


// imports nécessaires
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
import { useEffect, useState } from "react";



// Inscription, par requete POST
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("http://127.0.0.1:5000/routes/users/register", userData)
        .then(res => history.push("/"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err

            })
        );
};

// Connexion, par requête POST, et création de token de connexion 
export const loginUser = userData => dispatch => {
    axios
        .post("http://127.0.0.1:5000/routes/users/login", userData)
        .then(res => {
            // enregistrement du token
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            // décodage du token pour obtenir les données utilisateur
            const decoded = jwt_decode(token);
            // renvoi des données utilisateur
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        );
};

export const obtenirUserByID = data => dispatch => {

    const [resultat, setResultat] = useState([]);

    useEffect(() => {

        axios.
            post("http://127.0.0.1:5000/routes/users/getUserByID", data)
            .then(res => {
                setResultat(res.data)
            }
            )
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err
                })
            )
    }, [])

    return resultat;
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// déconnexion
export const logoutUser = () => dispatch => {
    // suppression du token de connexion
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    // définition du currentUser sur un objet vide.
    dispatch(setCurrentUser({}));
};