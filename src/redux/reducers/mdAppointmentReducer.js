const defaultState = {
    md_appointments: null
}

function mdAppointmentReducer(state=defaultState.md_appointments, action) {
    switch (action.type) {
        case "SET_MD_APPTS":
            return action.payload
        default:
            return state;
    }
}

export { mdAppointmentReducer }