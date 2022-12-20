/** Author: Valentin DUFLOT
 * ce composant sert à afficher un calendrier, de mois en mois, contenant les absences, RTT, ...
 */

// import nécessaire
import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { obtenirAbsenceByUser } from '../actions/absenceActions'
import NavbarUtilisateur from "./NavbarUtilisateur";
import { Calendar } from 'react-calendar'



import 'react-calendar/dist/Calendar.css';

import { format, subHours, startOfMonth } from 'date-fns';
import {
    MonthlyBody,
    MonthlyDay,
    MonthlyCalendar,
    MonthlyNav,
    DefaultMonthlyEventItem,
} from '@zach.codes/react-calendar';

const events = [
    {
        start: '2022-12-12',
        end: '2022-12-13',
        eventClasses: 'optionalEvent',
        title: 'test event',
        description: 'This is a test description of an event',
    },
    {
        start: '2015-07-19',
        end: '2015-07-25',
        title: 'test event',
        description: 'This is a test description of an event',
        data: 'you can add what ever random data you may want to use later',
    },
];

// composant react simple
const Calendrier = (props) => {

    const userData = {
        idUser: props.auth.user._id
    };

    let [currentMonth, setCurrentMonth] = useState(
        startOfMonth(new Date())
    );



    let liste = props.obtenirAbsenceByUser(userData);

    return (
        <div>
            <NavbarUtilisateur />
            
        </div>
    )
}


// informations nécessaires à la transformation du composant en composant apte à requeter la BDD via l'export spécifique ci-dessous
Calendrier.propTypes = {
    obtenirAbsenceByUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { obtenirAbsenceByUser })(Calendrier);