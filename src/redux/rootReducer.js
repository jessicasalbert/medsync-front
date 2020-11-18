import { combineReducers } from 'redux'

const defaultState = {
    click: false
}

function clickReducer(state=defaultState.click, action) {
    switch (action.type) {
        case "FLIP_CLICKED":
            console.log("flipped")
            return !state
            break;
        default: 
            return state;
            break;
    }
}

const rootReducer = combineReducers({
    click: clickReducer
})

export default rootReducer