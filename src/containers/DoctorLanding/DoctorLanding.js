import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import useStyles from './DoctorLandingStyle'
import { connect } from 'react-redux'
import Loading from '../../components/Loading/Loading'
import PatientBlurb from '../../components/PatientBlurb/PatientBlurb';
import { withStyles } from "@material-ui/core/styles"
import { Route, Switch } from "react-router-dom"
  

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
            .then(res => {
                this.setState({ patients : res.patients})
            })
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

