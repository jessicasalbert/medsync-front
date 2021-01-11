import React from 'react'
import { withStyles, Grid } from '@material-ui/core/';
import useStyles from './DoctorLandingStyle'
import { connect } from 'react-redux'
import Loading from '../../components/Loading/Loading'
import PatientBlurb from '../../components/PatientBlurb/PatientBlurb';
import { patientListAction, setMdAppointments } from '../../redux/actions' 

class DoctorLanding extends React.Component {
  
    state = {
        patients: []
    }

    componentDidUpdate(prevProps){
        if (this.props.doctor && prevProps !== this.props) {
            let token = localStorage.getItem("token")
            if (!token) {
                token = this.props.doctor.jwt
            }
            const configObj = {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            }
            fetch(`http://localhost:3000/api/v1/doctors/${this.props.doctor.user.id}`, configObj)
            .then(res => res.json())
            .then(res => this.setState({ patients : res.patients}, () => (this.props.setDetails(res))
            ))
        }
     
    }

    componentDidMount() {
        if (this.props.doctor) {
            const configObj = {
                method: "GET",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
            }
            fetch(`http://localhost:3000/api/v1/doctors/${this.props.doctor.user.id}`, configObj)
            .then(res => res.json())
            .then(res => this.setState({ patients : res.patients}, () => (this.props.setDetails(res))
            ))
        }
    }

    renderPatients = () => {
        return this.state.patients.map( pt => <PatientBlurb key={pt.id} patient={pt}/>)
    }

    render() {

        return (
    
            
            <div > 
                {this.props.doctor ? 
                    <Grid container spacing={3} align="center" justify="center" >
                        <Grid item xs={10} >
                            <Grid container spacing={2}>
                                {this.renderPatients()}
                            </Grid>
    
                    
                     </Grid>
                    </Grid>
    
                : <Loading/>}
            </div>
        
        )
    }
}

const msp = (state) => {
    return {doctor: state.doctor}
}

const mdp = (dispatch) => {
    return { setDetails: (res) => {
        dispatch(patientListAction(res.patients, dispatch))
        dispatch(setMdAppointments(res.appointments, dispatch))
    }
}
}

export default connect(msp, mdp)(withStyles(useStyles, { withTheme: true })(DoctorLanding))

