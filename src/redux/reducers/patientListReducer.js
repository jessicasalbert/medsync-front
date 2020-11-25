const defaultState = {
    patient_list: null
}

function patientListReducer(state=defaultState.patient_list, action) {
    switch (action.type) {
        case "ADD_PATIENT_LIST":
            return action.payload
        default:
            return state;
    }
}

export { patientListReducer }