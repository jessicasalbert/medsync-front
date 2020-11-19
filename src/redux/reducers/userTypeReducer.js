const defaultState = {
    user: localStorage.getItem("user")
}

function userTypeReducer(state=defaultState.user, action) {
    switch (action.type) {
        case "DOCTOR_USER":
            return "doctor"
            break;
        case "PATIENT_USER":
            return "patient"
        default: 
            return state;
            break;
    }
}

export { userTypeReducer }