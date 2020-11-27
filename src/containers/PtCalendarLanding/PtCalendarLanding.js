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


    render() {
        const { classes } = this.props
    return (
      <>
      {this.props.patient_details ? 
        <div > 
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Grid container spacing={3} align="center" justify="center" >
                    <Grid item xs={10} >
                    <Paper className={classes.loginBox}>
                        <PtCalendar/>
                        <>
                        {!this.props.apptDate ? null
                        :
                        <>
                        
                        {this.props.apptDate.slice(0,3) === "Sat" || this.props.apptDate.slice(0,3) === "Sun" ? "Appointments available Monday-Friday" : 
                        <>
                        <Typography>Appointments available for {this.props.apptDate}:</Typography>
                        <TextField  id="time" name="time" select>
                            <MenuItem value="morning">Morning</MenuItem>
                            <MenuItem value="afternoon ">Afternoon</MenuItem>
                            <MenuItem value="evening ">Evening</MenuItem>
                        </TextField><br/><br/>
                        <TextField placeholder="Concerns"></TextField><br/><br/>
                        <Button variant="outlined" color="primary">Make Appointment</Button><br/>
                        </>
                        
                        
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