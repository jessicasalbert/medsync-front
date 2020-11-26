import React from 'react'
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
import { TextField } from '@material-ui/core';
import PtCalendar from '../../components/PtCalendar/PtCalendar'



const PtCalendarLanding = (props) => {

    const classes = useStyles()

    if (!props.patient_details) {
        return (<Redirect to="mymeds"/> )}

    return (
      <>
        
        <div > 
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Grid container spacing={3} align="center" justify="center" >
                    <Grid item xs={6} >
                    <Paper className={classes.loginBox}>
                        <PtCalendar/>
                    </Paper>
                    </Grid>   
                </Grid>
                
                </Grid>
            </Grid>
        </div>
      </>
    )
}

const msp = (state) => {
    return {patient: state.patient, patient_details: state.patient_details}
}


export default connect(msp)(PtCalendarLanding)