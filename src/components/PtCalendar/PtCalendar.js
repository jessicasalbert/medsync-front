import React, { Fragment } from "react";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import { setAppointmentDate } from '../../redux/actions'

function PtCalendar(props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
      setSelectedDate(date)
      props.setDate(date.toDateString())
      const configObj = {
        method: "GET",
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    }
      date = date.toDateString().split(" ")
      fetch(`http://localhost:3000/api/v1/${props.patient_details.doctor.id}/${date[3]}/${date[1]}/${date[2]}`, configObj)
      .then(res => res.json())
      .then(res => props.setOpenSlots(res))
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

