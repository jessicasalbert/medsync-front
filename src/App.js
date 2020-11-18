
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './App.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux'
import Sample from './Sample'
import { sizing } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));



// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(4),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
// }));



function App(props) {

  const clickHandler = (e) => {
    console.log("click")
    props.flipCounter()
  }

  const classes = useStyles();
  console.log(props)
  return (
    <div > 
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <AppBar position="static" color="secondary">
          <Toolbar >
            <img onClick={clickHandler} src="https://i.ibb.co/sWByFCQ/output-onlinepngtools.png"/>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} >
              <Sample/>
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center" justify="center" height="100%">
            <Grid item xs={6} height="100%">
              <Paper height="75%">
              <Typography>
                Content
              </Typography>
              </Paper>
            </Grid>   
          </Grid>
          
        </Grid>
      </Grid>
    </div>
  );
}


const mdp = (dispatch) => {
  return {flipCounter: () => dispatch({type: "FLIP_CLICKED"})}
}


export default connect(null, mdp)(App)
