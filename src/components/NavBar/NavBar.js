import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './NavBarStyle'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";


const NavBar = (props) => {
    const history = useHistory();
    const classes = useStyles();

    const clickHandler = () => {
      history.push("/allpatients");
    }

    const messageClickHandler = () => {
      history.push("/ptmessages")
    }

    const redirectMyMeds = () => {
      history.push("/mymeds")
    }

    const docMessageHandler = () => {
      history.push("/mdmessages")
    }

    const redirectHome = () => {
      history.push("/")
    }

    const clearUser = () => {
      props.logout()
      redirectHome()
    }

    return (
      <AppBar position="static" color="secondary" className={classes.navMargin}>
        <Toolbar >
          <img className={classes.logo} src="https://i.ibb.co/sWByFCQ/output-onlinepngtools.png"/>
          <Typography className={classes.title} >{props.doctor ? <> <Button color="inherit" onClick={clickHandler}>My Patients</Button><Button color="inherit" onClick={docMessageHandler}>Message</Button></> : null }</Typography>
          <Typography className={classes.title} >{props.patient ? <><Button color="inherit" onClick={redirectMyMeds}>My Meds</Button> <Button color="inherit" onClick={messageClickHandler}>Message</Button></> : null}</Typography>
          {props.doctor || props.patient ? <Button onClick={clearUser} color="inherit">Logout</Button> : null}
        </Toolbar>
      </AppBar>
    )
}

const msp = (state) => {
  return {doctor: state.doctor, patient: state.patient}
}

const mdp = (dispatch) => {
  return { logout: () => dispatch({type: "LOGOUT"})}
}



export default connect(msp, mdp)(NavBar)
