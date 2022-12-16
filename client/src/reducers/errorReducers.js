/** Author: Valentin DUFLOT
 * définition du reducer pour les erreurs
 */

// import nécessaire
import { GET_ERRORS } from "../actions/types";

// etat initial vide
const initialState = {};

export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}