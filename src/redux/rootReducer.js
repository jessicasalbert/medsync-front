import { combineReducers } from 'redux'
import { userTypeReducer } from './reducers/userTypeReducer'
import { doctorLoginReducer } from './reducers/doctorLoginReducer'
import { patientLoginReducer } from './reducers/patientLoginReducer'

const rootReducer = combineReducers({
    user: userTypeReducer,
    doctor: doctorLoginReducer,
    patient: patientLoginReducer
})

export default rootReducer