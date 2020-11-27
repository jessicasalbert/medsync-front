const defaultState = {
    apptDate: null
}

function apptDateReducer(state=defaultState.apptDate, action) {
    switch (action.type) {
        case "SET_APPT_DATE":
            return action.payload
        default:
            return state;
    }
}

export { apptDateReducer }