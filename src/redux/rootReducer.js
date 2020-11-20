import { combineReducers } from 'redux'
import { userTypeReducer } from './reducers/userTypeReducer'
import { doctorLoginReducer } from './reducers/doctorLoginReducer'

const rootReducer = combineReducers({
    user: userTypeReducer,
    doctor: doctorLoginReducer
})

export default rootReducer