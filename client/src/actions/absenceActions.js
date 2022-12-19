/** Author: Valentin DUFLOT
 * On définit ici certaines fonctions essentielles à l'ajout d'absence
 */


// imports nécessaires
import axios from "axios";
import { useEffect, useState } from "react";
import { GET_ERRORS } from "./types";



// ajout d'absennce, par requete POST
export const addAbsence = (data, history) => dispatch => {
    axios
        .post("http://127.0.0.1:5000/routes/absences/addAbsence", data)
        .then(res => history.push("/"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        );
};

export const obtenirAbsenceByUser = data => dispatch => {
    const [liste, setListe] = useState([]);

    useEffect(() => {

        axios
            .post("http://127.0.0.1:5000/routes/absences/getAbsenceByUser", data)
            .then(res => {
                setListe(res.data)
            })
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err
                })
            )
    }, [])

    return liste;
}

export const obtenirNombreAbsences = data => dispatch => {
    const [resultat, setResultat] = useState([]);
    useEffect(() => {
        axios
            .post("http://127.0.0.1:5000/routes/absences/getNombreAbsences", data)
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

export const obtenirNombreAbsencesValidees = data => dispatch => {

    const [resultat, setResultat] = useState([]);

    useEffect(() => {
        axios
            .post("http://127.0.0.1:5000/routes/absences/getNombreAbsencesValidees", data)
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
export const obtenirNombreAbsencesRestants = data => dispatch => {

    const [resultat, setResultat] = useState([]);

    useEffect(() => {
        axios
            .post("http://127.0.0.1:5000/routes/absences/getNombreAbsencesValidees", data)
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

    return 25 - resultat;
}

export const obtenirJFetRTT = data => dispatch => {
    const [resultat, setResultat] = useState([]);

    useEffect(() => {
    axios
        .post("http://127.0.0.1:5000/routes/absences/getJoursFeriesEtRTTEmployeurs", data)
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