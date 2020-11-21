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
  

const PatientLanding = (props) => {
    const classes = useStyles()

    const renderPatients = () => {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map( num => {
            return (
                <Grid item xs={3} >
                                <Typography>
                                    <Card className={classes.root}>
                                    <CardContent className={classes.card}>
                                        <p>Welcome to MedSync</p>
                                    </CardContent>
                                    </Card>
                                </Typography>
                            </Grid>
            )
        })
    }

    
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

            : "no patient sry"}
            </div>
    )
}

const msp = (state) => {
    return {patient: state.patient}
}


export default connect(msp)(PatientLanding)