import React from 'react'
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import useStyles from "./LoginContainerStyle"


const LoginContainer = (props) => {

    const classes = useStyles()
    let history = useHistory();

    const mdClick = () => {
        localStorage.setItem("user", "doctor")
        history.push("/doctorlogin")
    }
    
    const ptClick = () => {
        localStorage.setItem("user", "patient")
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

export default LoginContainer