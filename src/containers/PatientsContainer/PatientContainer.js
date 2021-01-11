import React from 'react'
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