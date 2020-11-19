
import './App.css';
import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from "react-router-dom"
import LandingPage from './containers/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import DoctorLogin from './components/DoctorLogin/DoctorLogin'
import PatientLogin from './components/PatientLogin/PatientLogin';
import DoctorLanding from './containers/DoctorLanding/DoctorLanding';



function App(props) {

  return (
    <>
    <NavBar/>
    <Switch>
      <Route path="/doctorlogin" render={() =>(<DoctorLogin/>)}/>
      <Route path="/allpatients" render={() => (<DoctorLanding/>)}/>
      <Route path="/patientlogin" render={() =>(<PatientLogin/>)}/>
      <Route path="/" render={() =>(<LandingPage/>)}/>
    </Switch>
    
    </>
  );
}


export default App
