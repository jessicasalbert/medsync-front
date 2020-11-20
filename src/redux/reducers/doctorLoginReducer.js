const defaultState = {
    doctor: null
}

function doctorLoginReducer(state=defaultState.doctor, action) {
    switch (action.type) {
        case "LOGIN_DOCTOR":
            return true
            break;
        default:
            return state;
            break;
    }
}

export { doctorLoginReducer }