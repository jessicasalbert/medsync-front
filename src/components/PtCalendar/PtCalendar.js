import React, { Component } from 'react'
import { TextField, Typography } from '@material-ui/core'
import { connect } from 'react-redux'

export class PtCalendar extends Component {

    state = {
        appointment: ""
    }

    pickAppointment = (e) => {
        this.setState({
            appointment: e.target.value
        }, ()=> console.log(this.state.appointment))
    }

    render() {
        return (
            <Typography component="span">
                Book an Appointment with Dr. {this.props.patient_details.doctor.name}
                <TextField value={this.state.appointment} onChange={this.pickAppointment} type="datetime-local"></TextField>
            </Typography>
        )
    }
}

const msp = (state) => {
    return {patient: state.patient, patient_details: state.patient_details}
}

export default connect(msp)(PtCalendar)

