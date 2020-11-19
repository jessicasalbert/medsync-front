
import './App.css';
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from "react-router-dom"
import LandingPage from './containers/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import DoctorLogin from './components/DoctorLogin/DoctorLogin'
import PatientLogin from './components/PatientLogin/PatientLogin';
import DoctorLanding from './containers/DoctorLanding/DoctorLanding';
import PatientLanding from './containers/PatientLanding/PatientLanding';


// function App(props) {

//   return (
//     <>
//     <NavBar/>
//     <Switch>
//       <Route path="/doctorlogin" render={() =>(<DoctorLogin/>)}/>
//       <Route path="/allpatients" render={() => (<DoctorLanding/>)}/>
//       <Route path="/patientlogin" render={() =>(<PatientLogin/>)}/>
//       <Route path="/" render={() =>(<LandingPage/>)}/>
//     </Switch>
    
//     </>
//   );
// }


class App extends Component {

  state = {
    doctor: null,
    patient: null
  }

  loginHandler = (doc) => {
    console.log(doc)
    const config = {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify( {user: doc} )
    }
    fetch('http://localhost:3000/api/v1/login', config)
    .then(res => res.json())
    .then(res =>{ 
      this.setState({ doctor: res})
      console.log(res)
      localStorage.setItem("token", res.jwt)
    })
  }

  ptLoginHandler = (pt) => {
    const config = {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify( {user: pt} )
    }
    fetch('http://localhost:3000/api/v1/patientlogin', config)
    .then(res => res.json())
    .then(res =>{ 
      this.setState({ patient: res})
      console.log(res)
      localStorage.setItem("token", res.jwt)
    })
  }

  render() {
    return (
      <>
     <NavBar/>
     <Switch>
       <Route path="/doctorlogin" render={() =>(<DoctorLogin loginHandler={this.loginHandler}/>)}/>
       <Route path="/allpatients" render={() => (<DoctorLanding doctor={this.state.doctor}/>)}/>
       <Route path="/patientlogin" render={() =>(<PatientLogin loginHandler={this.ptLoginHandler}/>)}/>
       <Route path="/mymeds" render={() => (<PatientLanding/>)}/>
       <Route path="/" render={() =>(<LandingPage/>)}/>
     </Switch>
    
     </>
    )
  }
}

export default App



