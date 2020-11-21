import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LoginContainer from '../LoginContainer/LoginContainer'
import NavBar from '../../components/NavBar/NavBar'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useStyles from './DoctorLandingStyle'
import { connect } from 'react-redux'
import Loading from '../../components/Loading/Loading'
import PatientBlurb from '../../components/PatientBlurb/PatientBlurb';
import { withStyles } from "@material-ui/core/styles"
  

class DoctorLanding extends React.Component {
  
    state = {
        patients: []
    }

    componentDidUpdate(prevProps){
        if (this.props.doctor && prevProps !== this.props) {
            fetch(`http://localhost:3000/api/v1/doctors/${this.props.doctor.user.id}`)
            .then(res => res.json())
            .then(res => {
                this.setState({ patients : res.patients})
            })
         }
     }

    componentDidMount() {
        if (this.props.doctor) {
            fetch(`http://localhost:3000/api/v1/doctors/${this.props.doctor.user.id}`)
            .then(res => res.json())
            .then(res => {
                this.setState({ patients : res.patients})
            })
        }
        
    }

    renderPatients = () => {
        return this.state.patients.map( pt => <PatientBlurb key={pt.id} patient={pt}/>)
    }

    render() {
        const { classes } = this.props

        return (
    
            
            <div > 
                {this.props.doctor ? 
                    <Grid container spacing={3} align="center" justify="center" >
                        <Grid item xs={8} m={4}>
                            <Grid container spacing={3}>
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


export default connect(msp)(withStyles(useStyles, { withTheme: true })(DoctorLanding))

