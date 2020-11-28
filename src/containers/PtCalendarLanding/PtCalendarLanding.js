import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LoginContainer from '../LoginContainer/LoginContainer'
import NavBar from '../../components/NavBar/NavBar'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from './PtCalendarLandingStyle'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { TextField, MenuItem } from '@material-ui/core';
import PtCalendar from '../../components/PtCalendar/PtCalendar'
import { withStyles } from '@material-ui/core'
import { Button } from '@material-ui/core'


class PtCalendarLanding extends Component {

    state = {
        availableAppts: [],
        selectedTime: null,
        concerns: ""
    }

    setOpenSlots = (arr) => {
        this.setState({
            availableAppts: arr
        })
    }
    
    formEdit = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        const body = {
            doctor_id: this.props.patient_details.doctor.id,
            patient_id: this.props.patient.user.id,
            title: this.props.patient.user.name,
            details: this.state.concerns,
            time_slot: this.state.selectedTime,
            date: this.props.apptDate
        }
        const configObj = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        }
        console.log(body)
        fetch(`http://localhost:3000/api/v1/appointments`, configObj)
        .then(res => res.json())
        .then(console.log)
    }

    render() {
        const { classes } = this.props

        const times = {
            1 : "9:00 - 9:45 AM",
            2: "10:30 - 11:15 AM",
            3: "12:00 - 12:45 PM",
            4: "2:00 - 2:45 PM",
            5: "3:30 - 4:15 PM"
        }
    

    return (
      <>
      {this.props.patient_details ? 
        <div > 
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Grid container spacing={3} align="center" justify="center" >
                    <Grid item xs={10} >
                    <Paper className={classes.loginBox}>
                        <PtCalendar setOpenSlots={this.setOpenSlots}/>
                        <>
                        {!this.props.apptDate ? null
                        :
                        <>
                        
                        {this.props.apptDate.slice(0,3) === "Sat" || this.props.apptDate.slice(0,3) === "Sun" ? "Appointments available Monday-Friday" :
                        <> 
                        {this.state.availableAppts.length > 0 ? 
                        <>
                        <form onSubmit={this.submitHandler}>
                        <Typography>Appointments available for {this.props.apptDate}:</Typography>
                        <TextField  onChange={this.formEdit} id="time" name="selectedTime" value={this.state.selectedTime} select>
                            {this.state.availableAppts.map( slot => <MenuItem value={slot}>{times[slot]}</MenuItem>)}
                        </TextField><br/><br/>
                        <TextField name="concerns" onChange={this.formEdit} placeholder="Concerns" value={this.state.concerns}></TextField><br/><br/>
                        <Button type="submit" variant="outlined" color="primary">Make Appointment</Button><br/>
                        </form>
                        </>
                        :
                        "No appointments available"}</>
                        
                        
                        }</>}
                        </>

                    </Paper>
                    </Grid>   
                </Grid>
                
                </Grid>
            </Grid>
        </div>

        : <Redirect to="mymeds"/> }
      </>
    )
    }
}

const msp = (state) => {
    return {patient: state.patient, patient_details: state.patient_details, apptDate: state.apptDate}
}


export default connect(msp)(withStyles(useStyles, { withTheme: true })(PtCalendarLanding))