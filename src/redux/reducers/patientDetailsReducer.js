const defaultState = {
    patient_details: null
}

function patientDetailsReducer(state=defaultState.patient_details, action) {
    switch (action.type) {
        case "UPDATE_PT_DETAILS":
            return action.payload
        default:
            return state;
    }
}

export { patientDetailsReducer }