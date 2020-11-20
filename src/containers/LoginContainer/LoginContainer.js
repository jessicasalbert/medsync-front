import React from 'react'
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import useStyles from "./LoginContainerStyle"
import { connect } from 'react-redux'


const LoginContainer = (props) => {

    const classes = useStyles()
    const history = useHistory();

    const mdClick = () => {
        history.push("/doctorlogin")
    }
    
    const ptClick = () => {
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