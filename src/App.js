
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './App.css';
import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from "react-router-dom"
import LandingPage from './containers/LandingPage';
import NavBar from './components/NavBar';
import DoctorLogin from './components/DoctorLogin'
import PatientLogin from './components/PatientLogin';




function App(props) {

  const clickHandler = (e) => {
    console.log("click")
    props.flipCounter()
  }


  
  return (
    <>
    <NavBar/>
    <Switch>
      <Route path="/doctorlogin" render={() =>(<DoctorLogin/>)}/>
      <Route path="/patientlogin" render={() =>(<PatientLogin/>)}/>
      <Route path="/" render={() =>(<LandingPage/>)}/>
    </Switch>
    
    </>
  );
}


const mdp = (dispatch) => {
  return {flipCounter: () => dispatch({type: "FLIP_CLICKED"})}
}


export default connect(null, mdp)(App)
