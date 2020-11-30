
import './App.css';
import React, { useEffect }from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from "react-router-dom"
import LandingPage from './containers/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import DoctorLogin from './components/DoctorLogin/DoctorLogin'
import PatientLogin from './components/PatientLogin/PatientLogin';
import DoctorLanding from './containers/DoctorLanding/DoctorLanding';
import PatientLanding from './containers/PatientLanding/PatientLanding';
import { sessionUserAction } from './redux/actions'
import PatientContainer from './containers/PatientsContainer/PatientContainer'
import PtMessages from './containers/PtMessages/PtMessages'
import MdMessages from './containers/MdMessages/MdMessages'
import PtCalendarLanding from './containers/PtCalendarLanding/PtCalendarLanding'
import MdCalendar from './components/MdCalendar/MdCalendar'
import MedInteractions from './containers/MedInteractions/MedInteractions';
import Diagnostic from './components/Diagnostic/Diagnostic';


function App(props) {

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userType = localStorage.getItem("user")
    const configObj = {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`}
    }
    if (token && userType === "doctor") {
      fetch("http://localhost:3000/api/v1/mdprofile", configObj)
      .then(res => res.json())
      .then(res => props.sessionUser(res))
    } else if (token && userType === "patient") {
      fetch("http://localhost:3000/api/v1/ptprofile", configObj)
      .then(res => res.json())
      .then(res => props.sessionUser(res))
    } else {
      console.log("no user logged")
    }
  })

  return (
    <>
    <NavBar/>
    <Switch>
      <Route path="/doctorlogin" render={() =>(<DoctorLogin/>)}/>
      <Route path="/patients" render={() => (<PatientContainer/>)}/>
      <Route path="/patientlogin" render={() =>(<PatientLogin/>)}/>
      <Route path="/mymeds" render={() => (<PatientLanding/>)}/>
      <Route path="/mdmessages" render={() => (<MdMessages/>)}/>
      <Route path="/ptmessages" render={() => (<PtMessages/>)}/>
      <Route path="/appointment" render={() => (<PtCalendarLanding/>)}/>
      <Route path="/calendar" render={() => (<MdCalendar/>)}/>
      <Route path="/interactions" render={() => (<MedInteractions/>)}/>
      <Route path="/diagnostic" render={() => (<Diagnostic/>)}/>
      <Route path="/" render={() =>(<LandingPage/>)}/>
    </Switch>
    
    </>
  );
}

const mdp = (dispatch) => {
  return { sessionUser: (user) => dispatch(sessionUserAction(user, dispatch))}
}


export default connect(null, mdp)(App)



