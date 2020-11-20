import { TrafficOutlined, TrendingUpRounded } from "@material-ui/icons";

const defaultState = {
    doctor: null
}

function doctorLoginReducer(state=defaultState.doctor, action) {
    switch (action.type) {
        case "LOGIN_DOCTOR":
            console.log("action", action)
            if (action.payload.user) {
                return action.payload
            }
            return state
            break;
        default:
            return state;
            break;
    }
}

export { doctorLoginReducer }