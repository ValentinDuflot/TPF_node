/** Author: Valentin DUFLOT
 * définition du token de connexion
 */

// import nécessaire
import axios from "axios";


const setAuthToken = token => {
    if (token) {
        // applique un token de connexion à chaque requête si l'utilisateur est connecté
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        // détruit le token de connexion sinon
        delete axios.defaults.headers.common["Authorization"];
    }
};
export default setAuthToken;