import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LoginContainer from '../LoginContainer/LoginContainer'
import NavBar from '../../components/NavBar/NavBar'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from './PatientLandingStyle'
import { connect, useEffect } from 'react-redux'
import Loading from '../../components/Loading/Loading'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import PtMed from '../../components/PtMed/PtMed'

class PatientLanding extends Component {
    
    state = {
        patient: null
    }


    componentDidUpdate(prevProps){
        if (this.props.patient && prevProps !== this.props) {
            let token = localStorage.getItem("token")
            if (!token) {
                token = this.props.patient.jwt
            }
            const configObj = {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            }
            fetch(`http://localhost:3000/api/v1/patients/${this.props.patient.user.id}`, configObj)
            .then(res => res.json())
            .then(res => this.setState({ patient: res }))
         }
     }

    componentDidMount() {
        if (this.props.patient) {
            const configObj = {
                method: "GET",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
            }
            fetch(`http://localhost:3000/api/v1/doctors/${this.props.patient.user.id}`, configObj)
            .then(res => res.json())
            .then(res => {
                this.setState({ patient : res})
            })
        }
    }

    render() {
        const { classes } = this.props
    return (
        
        <div > 
            {this.state.patient ? 
                <Grid container spacing={3} align="center" justify="center" >
                    <Grid item xs={8} m={4}>
                    <Paper className={classes.loginBox}>
                        <Grid container align="center" justify="center" spacing={3}>
                            <Grid item xs={12}><h2>Welcome back, {this.props.patient.user.name}</h2></Grid>
                            {this.state.patient.patient_meds.map(med => <Grid item xs={12}><PtMed key={med.id} med={med}/></Grid>)}
                        </Grid>
                    </Paper>

                
                </Grid>
            </Grid>

            : <Loading/> 
        }
            </div>
    )}
}

const msp = (state) => {
    return {patient: state.patient}
}


export default connect(msp)(withStyles(useStyles, { withTheme: true })(PatientLanding))