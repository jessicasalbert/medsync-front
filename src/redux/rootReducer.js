import { combineReducers } from 'redux'
import { doctorLoginReducer } from './reducers/doctorLoginReducer'
import { patientLoginReducer } from './reducers/patientLoginReducer'

const rootReducer = combineReducers({
    doctor: doctorLoginReducer,
    patient: patientLoginReducer
})

export default rootReducer