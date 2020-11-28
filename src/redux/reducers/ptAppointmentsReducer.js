const defaultState = {
    pt_appointments: null
}

function ptAppointmentReducer(state=defaultState.pt_appointments, action) {
    switch (action.type) {
        case "SET_PT_APPTS":
            return action.payload
        default:
            return state;
    }
}

export { ptAppointmentReducer }