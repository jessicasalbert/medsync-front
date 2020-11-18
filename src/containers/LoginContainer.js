import React from 'react'
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";


const LoginContainer = (props) => {
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
            <Button variant="outlined" onClick={mdClick}>Doctor</Button>
            <Button variant="outlined" onClick={ptClick}>Patient </Button>
        </>
    )
}

export default LoginContainer