import { combineReducers } from 'redux'
import { doctorLoginReducer } from './reducers/doctorLoginReducer'
import { patientLoginReducer } from './reducers/patientLoginReducer'
import { patientDetailsReducer } from './reducers/patientDetailsReducer'
import { patientListReducer } from './reducers/patientListReducer'
import { apptDateReducer } from './reducers/apptDateReducer'

const rootReducer = combineReducers({
    doctor: doctorLoginReducer,
    patient: patientLoginReducer,
    patient_details: patientDetailsReducer,
    patient_list: patientListReducer,
    apptDate: apptDateReducer,
})

export default rootReducer