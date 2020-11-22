import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import Loading from '../../components/Loading/Loading'
import { withStyles } from "@material-ui/core/styles"
import { Route, Switch } from "react-router-dom"
import PatientDetails from '../../components/PatientDetails/PatientDetails'
import DoctorLanding from '../DoctorLanding/DoctorLanding';


const PatientContainer = () => {

    
        return (
            <>
            <Switch>
             <Route path="/patients/:id" render={(routerProps) =>  {
                        let id = parseInt(routerProps.match.params.id)
                        return (
                            <>
                            {
                                <PatientDetails key={id} id={id}/> 
                            }
                            </>
                        )
                    }}/>

            <Route exact path="/patients" render={() =>  <DoctorLanding/>}/>
            </Switch>
            </>
        
        )
}

export default PatientContainer