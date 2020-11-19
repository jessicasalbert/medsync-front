import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from './NavBarStyle'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";


const NavBar = (props) => {
    const history = useHistory();
    const classes = useStyles();

    const clickHandler = () => {
      history.push("/allpatients");
    }

    const redirectHome = () => {
      history.push("/")
    }

    return (
      <AppBar position="static" color="secondary" className={classes.navMargin}>
        <Toolbar >
          <img onClick={redirectHome} className={classes.logo} src="https://i.ibb.co/sWByFCQ/output-onlinepngtools.png"/>
          <Typography className={classes.title} >{props.user === "doctor" ? <Button color="inherit" onClick={clickHandler}>My Patients</Button> : null}
          </Typography>
          {localStorage.getItem("user") ? <Button color="inherit">Logout</Button> : null}
        </Toolbar>
      </AppBar>
    )
}

const msp = (state) => {
  return {user: state.user}
}

export default connect(msp)(NavBar)
