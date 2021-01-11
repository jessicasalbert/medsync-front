const defaultState = {
    doctor: null
}

function doctorLoginReducer(state=defaultState.doctor, action) {
    switch (action.type) {
        case "LOGIN_DOCTOR":
            if (action.payload.user) {
                return action.payload
            }
            return state
        case "LOGOUT":
            localStorage.clear()
            return null
        default:
            return state;
    }
}

export { doctorLoginReducer }