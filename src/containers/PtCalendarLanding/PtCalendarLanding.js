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
import { TextField, MenuItem, Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import PtCalendar from '../../components/PtCalendar/PtCalendar'
import { withStyles } from '@material-ui/core'
import { Button } from '@material-ui/core'
import PtAppt from '../../components/PtAppt/PtAppt'
import { patientDetailsAction } from '../../redux/actions'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

class PtCalendarLanding extends Component {

    state = {
        availableAppts: [],
        selectedTime: null,
        concerns: "", 
        open: false,
        form: false
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

    handleClick = () => {
        this.setState({ open: true})
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ open: false});
    };

    renderAppts =  () => {
        // if (this.props.patient_details.appointments.length > 0) {
        return this.props.patient_details.appointments.map( appt => <><PtAppt appt={appt}></PtAppt><br/></>)
        // } else {
        //     return <p>You have no upcoming appointments</p>
        // }
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
        fetch(`http://localhost:3000/api/v1/appointments`, configObj)
        .then(res => res.json())
        .then(res => {
            this.handleClick()
            const newAppts = [...this.props.patient_details['appointments'], res]
            const newDeets = {...this.props.patient_details}
            newDeets['appointments'] = newAppts
            this.props.updateAppts(newDeets)
        })
    }

    showForm = () => {
        this.setState({form: true})
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
                    <Grid item xs={8}>
                        <Paper className={classes.loginBox}>
                            <Typography>Upcoming appointments:</Typography><br/>
                            {this.renderAppts()}
                        </Paper>
                    </Grid>
                    <Grid item xs={8} >
                        <Button onClick={this.showForm}>Book an Appointment</Button>
                    {this.state.form ?
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
                    : null}
                    </Grid>   
                    
                </Grid>
                
                </Grid>
            </Grid>
            
            <div className={classes.root}>
            <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                <Alert onClose={this.handleClose} severity="success">
                Your appointment has been scheduled!
                </Alert>
            </Snackbar>
            </div>
  );
        </div>

        : <Redirect to="mymeds"/> }
      </>
    )
    }
}

const msp = (state) => {
    return {patient: state.patient, patient_details: state.patient_details, apptDate: state.apptDate}
}


const mdp = (dispatch) => {
    return { updateAppts: (newDetails) => {
        dispatch(patientDetailsAction(newDetails, dispatch))
    }}
}

export default connect(msp, mdp)(withStyles(useStyles, { withTheme: true })(PtCalendarLanding))