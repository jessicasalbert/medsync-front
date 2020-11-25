import { combineReducers } from 'redux'
import { doctorLoginReducer } from './reducers/doctorLoginReducer'
import { patientLoginReducer } from './reducers/patientLoginReducer'
import { patientDetailsReducer } from './reducers/patientDetailsReducer'

const rootReducer = combineReducers({
    doctor: doctorLoginReducer,
    patient: patientLoginReducer,
    patient_details: patientDetailsReducer
})

export default rootReducer