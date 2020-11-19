import React from 'react'
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import useStyles from "./LoginContainerStyle"
import { connect } from 'react-redux'


const LoginContainer = (props) => {

    const classes = useStyles()
    const history = useHistory();

    const mdClick = () => {
        localStorage.setItem("user", "doctor")
        props.addMdUser()
        history.push("/doctorlogin")
    }
    
    const ptClick = () => {
        localStorage.setItem("user", "patient")
        props.addPtUser()
        history.push("/patientlogin")
    }

    return (
        <>
            <p>Log in as...</p>
            <Button className={classes.button} variant="outlined" onClick={mdClick}>Doctor</Button>
            <Button className={classes.button} variant="outlined" onClick={ptClick}>Patient </Button>
        </>
    )
}


const mdp = (dispatch) => {
    return {
        addMdUser: () => dispatch({type: "DOCTOR_USER"}),
        addPtUser: () => dispatch({type: "PATIENT_USER"})
    }
  }
  
  export default connect(null, mdp)(LoginContainer)