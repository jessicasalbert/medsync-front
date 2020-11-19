const defaultState = {
    user: localStorage.getItem("user")
}

function userTypeReducer(state=defaultState.user, action) {
    switch (action.type) {
        case "DOCTOR_USER":
            console.log('doc')
            return "doctor"
            break;
        case "PATIENT_USER":
            console.log('patient')
            return "patient"
        default: 
            return state;
            break;
    }
}

export { userTypeReducer }