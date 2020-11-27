// import React, { Component } from 'react'
// import { TextField, Typography } from '@material-ui/core'
// import { connect } from 'react-redux'
// import { DatePicker } from '@material-ui/pickers'


// export class PtCalendar extends Component {

//     state = {
//         appointment: ""
//     }

//     pickAppointment = (e) => {
//         this.setState({
//             appointment: e.target.value
//         }, ()=> console.log(this.state.appointment))
//     }

//     render() {
//         return (


//         )
//     }
// }



// export default connect(msp)(PtCalendar)

import React, { Fragment, useState } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Typography, MenuItem, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { connect } from 'react-redux'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import { setAppointmentDate } from '../../redux/actions'
import { setDate } from "date-fns";

function PtCalendar(props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
      setSelectedDate(date)
      props.setDate(date.toDateString())
  }



  return (
      <Fragment>
        <Typography component="span">
        Book an Appointment with Dr. {props.patient_details.doctor.name}<br/><br/>
             
        <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <KeyboardDatePicker
                autoOk
                label="Choose date:"
                clearable
                disablePast
                value={selectedDate}
                onChange={handleDateChange}
            />
            <br/><br/>
        </MuiPickersUtilsProvider>  
        </Typography>
    </Fragment>
  );
}

const msp = (state) => {
    return {patient: state.patient, patient_details: state.patient_details}
}

const mdp = (dispatch) => {
    return { setDate: (date) => dispatch(setAppointmentDate(date, dispatch))}
}

export default connect(msp, mdp)(PtCalendar);
