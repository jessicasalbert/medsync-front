import React from 'react'
import { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from './PatientDetailsStyle'
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { ptLoginAction } from '../../redux/actions';
import { withRouter } from 'react-router-dom'
import Loading from '../Loading/Loading'
import MdMed from '../MdMed/MdMed'
import NewMedForm from '../NewMedForm/NewMedForm';

class PatientDetails extends Component {

    state = {
        patient_id: this.props.id,
        patient: null,
        add: false
    }

    

    componentDidMount() {
        const configObj = {
            method: "GET",
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        }
        fetch(`http://localhost:3000/api/v1/patients/${this.state.patient_id}`, configObj)
        .then(res => res.json())
        .then(res => this.setState({ patient: res }))

    }

    refreshMeds = (id) => {
        const updatePatient = {...this.state.patient}
        const updatedMeds = updatePatient.patient_meds.filter( med => med.id !== id)
        updatePatient['patient_meds'] = updatedMeds
        this.setState( {
            patient: updatePatient
        })
    }

    refreshMedsEdit = (id, body) => {
        const updatePatient = {...this.state.patient}
        const index = updatePatient.patient_meds.findIndex( med => med.id === id)
        updatePatient['patient_meds'][index].notes = body["notes"]
        updatePatient['patient_meds'][index].pill_count = body["pill_count"]
        updatePatient['patient_meds'][index].time = body["time"]
        this.setState( {
            patient: updatePatient
        })
    }

    clickAddForm = () => {
        this.setState(prev => ({ add: !prev.add}))
    }



    render() {
        const { classes } = this.props

        const renderMeds = () => {
            return this.state.patient.patient_meds.map(med => {
                return <MdMed key={med.id} refreshMedsEdit={this.refreshMedsEdit} refreshMeds={this.refreshMeds} med={med}/>
            })
        }
        return (
            < > 
                {this.state.patient ? 
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Grid container spacing={3} align="center" justify="center" >
                        <Grid item xs={9} >
                        <Paper className={classes.loginBox}>
                        <Typography component="span" className={classes.info}>
                            <h2>{this.state.patient.name}</h2>
                            <img src={this.state.patient.image}/>
                            <h3>Meds:</h3>
                            {renderMeds()}
                            <Button onClick={this.clickAddForm}>Add a med:</Button>
                            {
                                this.state.add ?
                                <NewMedForm/>
                                : null
                            }
                        </Typography>
                        </Paper>
                        </Grid>   
                    </Grid>
                    
                    </Grid>
                </Grid>
                : <Loading/>}
            </>
        )
    }
}

const msp = (state) => {
    return {doctor: state.doctor}
}

const mdp = (dispatch) => {
    return { patientLogin: (pt) => dispatch(ptLoginAction(pt, dispatch))}
}

export default connect(msp, mdp)(withStyles(useStyles, { withTheme: true })(withRouter(PatientDetails)))
