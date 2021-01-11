import React, { Component } from 'react'
import { Typography,
        Paper,
        Grid, 
        TableContainer,
        TableHead,
        TableRow, 
        TableCell,
        Button,
        withStyles,} from '@material-ui/core/';
import useStyles from './PatientDetailsStyle'
import { connect } from 'react-redux'
import { ptLoginAction } from '../../redux/actions';
import { withRouter } from 'react-router-dom'
import Loading from '../Loading/Loading'
import MdMed from '../MdMed/MdMed'
import NewMedForm from '../NewMedForm/NewMedForm';
import Test from '../../components/Test/Test'

class PatientDetails extends Component {

    state = {
        patient_id: this.props.id,
        patient: null,
        add: false,
        show_tests: false
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

    createPatientMed = (body) => {
        body.patient_id = this.state.patient_id
        const configObj = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "content-type": "application/json",
                accept: "application/json"
            },
            body: JSON.stringify(body)
        }
        fetch('http://localhost:3000/api/v1/patient_meds', configObj)
        .then(res => res.json())
        .then(res => this.refreshMedsAdd(res))
    }

    refreshMedsAdd = (pt_med) => {
        const updatePatient = {...this.state.patient}
        updatePatient.patient_meds.push(pt_med)
        this.setState( {
            patient: updatePatient,
            add: false
        })
        console.log(pt_med)
    }

    renderTests = () => {
        return( 
            <>
            {<svg 
                onClick={this.toggleTests} 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24">
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>
            </svg>}
            {this.state.patient.tests.map( test => <Test patient={this.state.patient} test={test}/>)}
         </>
        )
    }

    toggleTests = () => {
        this.setState( (prev) => ({ show_tests: !prev.show_tests}))
    }


    render() {
        const { classes } = this.props

        const renderMeds = () => {
           
            return this.state.patient.patient_meds.map(med => {
                return (
                <MdMed 
                    key={med.id} 
                    refreshMedsEdit={this.refreshMedsEdit} 
                    refreshMeds={this.refreshMeds} 
                    med={med}/>
                )
            })
        }
        return (
            < > 
                {this.state.patient ? 
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                    <Grid container spacing={3} align="center" justify="center" >
                        
                        <Grid item xs={9} >
                        <Paper className={classes.loginBox}>
                        {this.state.show_tests ? this.renderTests() : 
                        <Typography component="span" className={classes.info}>
                            <h2>{this.state.patient.name}</h2>
                            <Grid container direction="row">
                                <Grid item xs={4}>Height: {this.state.patient.height} in</Grid>
                                <Grid item xs={3}>Weight: {this.state.patient.weight} lbs</Grid>
                                <Grid item xs={3}>Age: {this.state.patient.age} years</Grid>
                                <Grid item xs={2}>Sex: {this.state.patient.gender} </Grid>
                            </Grid><br/>
                            <img src={this.state.patient.image} alt={this.state.patient.name}/>
                            <h3 onClick={this.toggleTests}>View symptom interviews <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg></h3>
                                
                            <h3>Meds:</h3>
                            <TableContainer>
                                <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell># pills</TableCell>
                                            <TableCell>Time</TableCell>
                                            <TableCell>Notes</TableCell>
                                        </TableRow>
                                </TableHead>
                                {renderMeds()}
                            </TableContainer>
                                
                            <Button 
                                className={classes.btn} 
                                color="primary"
                                variant="contained"
                                onClick={this.clickAddForm}>
                                Add a med:
                            </Button>
                            { this.state.add ?
                            <NewMedForm createPatientMed={this.createPatientMed}/>
                            : null}
                        </Typography>
                        }
                        </Paper>
                        </Grid>   
                    </Grid>
                    
                    </Grid>
                </Grid>
                : 
                <Loading/>}
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
