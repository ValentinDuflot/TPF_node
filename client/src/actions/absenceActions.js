/** Author: Valentin DUFLOT
 * On définit ici certaines fonctions essentielles à l'ajout d'absence
 */


// imports nécessaires
import axios from "axios";
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