import React, { Component } from 'react'
import { Button } from '@material-ui/core/';
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
import { Redirect, Link } from 'react-router-dom'
import { withStyles, TableRow, TableCell, TableHead, TableContainer } from '@material-ui/core'
import PtMed from '../../components/PtMed/PtMed'
import { FormatListNumberedRtlOutlined } from '@material-ui/icons';
import { patientDetailsAction, setPtAppointmentsAction } from '../../redux/actions'

class PatientLanding extends Component {
    
    state = {
        patient: null
    }


    componentDidUpdate(prevProps){
        console.log(this.props.patient)
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
            .then(res => {
                this.setState({ patient : res}, () => 
                {this.props.patientDetails(res)
               })
            })
         }
     }

    componentDidMount() {
        if (this.props.patient) {
            const configObj = {
                method: "GET",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
            }
            fetch(`http://localhost:3000/api/v1/patients/${this.props.patient.user.id}`, configObj)
            .then(res => res.json())
            .then(res => {
                this.setState({ patient : res}, () => (this.props.patientDetails(res)))
            })
        }
    }

    filterTime = (time) => {
        return this.state.patient.patient_meds.filter(med => med.time === time)
    }




    render() {
        const { classes } = this.props
    return (
        
        < > 
            {this.state.patient ? 
                <Grid container spacing={0} align="center" justify="center" >
                    <Grid item xs={8} m={4}>
                    <br/><Typography>Feeling ill? Take our symptoms survey <Link to="/diagnostic"><Button size="small" variant="contained">Go</Button></Link></Typography>
                    <Paper className={classes.loginBox}>
                        <Grid container align="center" justify="center" spacing={1}>
                        
                            <Typography><h2 className={classes.name}>Patient Summary: {this.state.patient.name}</h2></Typography>
                            <Grid item xs={12}><Typography><p className={classes.title}>Doctor: {this.state.patient.doctor.name}; {this.state.patient.doctor.email}</p></Typography></Grid>
                            {/* <Grid container direction="row">
                                <Grid item xs={4}>Height: {this.props.patient.user.height} in</Grid>
                                <Grid item xs={3}>Weight: {this.props.patient.user.weight} lbs</Grid>
                                <Grid item xs={3}>Age: {this.props.patient.user.age} years</Grid>
                                <Grid item xs={2}>Sex: {this.props.patient.user.gender} </Grid>
                            </Grid> */}
                            <Grid item xs={12}>
                             <TableContainer className={classes.table}>
                            <TableHead>
                            <TableRow>
                                    <TableCell align="left"><p>Age</p></TableCell>
                                    <TableCell align="left"><p>Sex</p></TableCell>
                                    <TableCell align="left"><p>Height</p></TableCell>
                                    <TableCell align="left"><p>Weight</p></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableRow>
                                    <TableCell align="left"><p>{this.props.patient.user.age}</p></TableCell>
                                    <TableCell align="left"><p>{this.props.patient.user.gender}</p></TableCell>
                                    <TableCell align="left"><p>{this.props.patient.user.height} in.</p></TableCell>
                                    <TableCell align="left"><p>{this.props.patient.user.weight} lbs.</p></TableCell>
                                </TableRow>
                        </TableContainer>
                        </Grid><br/>
                            
                            
                           <div className={classes.meds}>
                            <>{this.filterTime("morning").length > 0 ?
                                <>
                                {/* <Grid item xs={12}><Typography><strong>Medication schedule</strong></Typography></Grid> */}
                                <Typography className={classes.medLabel}> <strong>Morning Meds:</strong></Typography> 
                                {this.filterTime("morning").map(med => <Grid item xs={12}><PtMed key={med.med.id} med={med}/></Grid>)}
                                </>
                            : null
                            }</>
                            <>{this.filterTime("afternoon ").length > 0 ?
                                <>
                                <Typography className={classes.medLabel}> <strong>Afternoon Meds:</strong></Typography> 
                                {this.filterTime("afternoon ").map(med => <Grid item xs={12}><PtMed key={med.med.id} med={med}/></Grid>)}
                                </>
                            : null
                            }</>
                            <>{this.filterTime("evening ").length > 0 ?
                                <>
                                <Typography className={classes.medLabel}> <strong>Evening Meds:</strong></Typography> 
                                {this.filterTime("evening ").map(med => <Grid item xs={12}><PtMed key={med.med.id} med={med}/></Grid>)}
                                </>
                            : null
                            }</>
                            </div>
                        </Grid>
                    </Paper>

                
                </Grid>
            </Grid>

            : <Loading/> 
        }
            </>
    )}
}

const msp = (state) => {
    return {patient: state.patient, appointments: state.appointments}
}

const mdp = (dispatch) => {
    return { patientDetails: (details) => {
        dispatch(patientDetailsAction(details, dispatch))
        // dispatch(setPtAppointmentsAction(details.appointments, dispatch))
    }}
}

export default connect(msp, mdp)(withStyles(useStyles, { withTheme: true })(PatientLanding))