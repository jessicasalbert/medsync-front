import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LoginContainer from '../LoginContainer/LoginContainer'
import NavBar from '../../components/NavBar/NavBar'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from './PatientLandingStyle'
import { connect } from 'react-redux'
import Loading from '../../components/Loading/Loading'
  

const PatientLanding = (props) => {
    const classes = useStyles()

 
    
    return (

        
        <div > 
            {props.patient ? 
                <Grid container spacing={3} align="center" justify="center" >
                    <Grid item xs={8} m={4}>
                    <Paper className={classes.loginBox}>
                        <Grid container spacing={3}>
                            "Hello"
                        </Grid>
                    </Paper>

                
                </Grid>
            </Grid>

            : <Loading/>}
            </div>
    )
}

const msp = (state) => {
    return {patient: state.patient}
}


export default connect(msp)(PatientLanding)