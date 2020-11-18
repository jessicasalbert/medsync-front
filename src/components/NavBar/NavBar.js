import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from './NavBarStyle'






const NavBar = () => {
    const classes = useStyles()
    return (
      <AppBar position="static" color="secondary" className={classes.navMargin}>
        <Toolbar >
          <img  src="https://i.ibb.co/sWByFCQ/output-onlinepngtools.png"/>
          <Typography variant="h6" className={classes.title} >
          </Typography>
          {localStorage.getItem("user") ? <Button color="inherit">Logout</Button> : null}
        </Toolbar>
      </AppBar>
    )
}

export default NavBar