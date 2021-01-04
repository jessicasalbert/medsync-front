import { Typography, Button } from '@material-ui/core'
import React, { Component } from 'react'
import { patientDetailsAction } from '../../redux/actions'
import { connect } from 'react-redux'


export class PtAppt extends Component {


    deleteHandler = () => {
        const configObj = {
            method: "DELETE",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        fetch(`http://localhost:3000/api/v1/appointments/${this.props.appt.id}`, configObj)
        .then(res => res.json())
        .then(res => {
            const newDetails = {...this.props.patient_details}
            const index = newDetails['appointments'].findIndex( appt => appt.id === res.id)
            newDetails['appointments'].splice(index, 1)
            this.props.updateAppts(newDetails)
            this.props.cancelSnack()
        })
        
    }
    render() {
        return (
            <div>
                <Typography>
                    {this.props.appt.formatted_time} on {this.props.appt.formatted_date}
                </Typography>
                <Button 
                    onClick={this.deleteHandler} 
                    size="small" 
                    variant="outlined" 
                    color="primary">
                    Cancel
                </Button>
            </div>
            
        )
        
    }
}

const msp = (state) => {
    return { patient_details: state.patient_details }
}

const mdp = (dispatch) => {
    return { updateAppts: (newDetails) => {
        dispatch(patientDetailsAction(newDetails, dispatch))
    }}
}

export default connect(msp, mdp)(PtAppt)
