import { combineReducers } from 'redux'
import { userTypeReducer } from './reducers/userTypeReducer'

const rootReducer = combineReducers({
    user: userTypeReducer
})

export default rootReducer