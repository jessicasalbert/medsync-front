import { combineReducers } from 'redux'
import { doctorLoginReducer } from './reducers/doctorLoginReducer'
import { patientLoginReducer } from './reducers/patientLoginReducer'
import { patientDetailsReducer } from './reducers/patientDetailsReducer'
import { patientListReducer } from './reducers/patientListReducer'
import { apptDateReducer } from './reducers/apptDateReducer'
import { mdAppointmentReducer } from './reducers/mdAppointmentReducer'
import { ptAppointmentReducer } from './reducers/ptAppointmentsReducer'

const rootReducer = combineReducers({
    doctor: doctorLoginReducer,
    patient: patientLoginReducer,
    patient_details: patientDetailsReducer,
    patient_list: patientListReducer,
    apptDate: apptDateReducer,
    md_appointments: mdAppointmentReducer,
    pt_appointments: ptAppointmentReducer
})

export default rootReducer