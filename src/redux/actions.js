import { useHistory } from "react-router-dom";


export function docLoginAction(doc, dispatch) {
    return function(){
        const config = {
        method: "POST",
        headers: {
            accepts: "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify( {user: doc} )
        }
        fetch('http://localhost:3000/api/v1/login', config)
        .then(res => res.json())
        .then(res =>{ 
        dispatch({ type: "LOGIN_DOCTOR", payload: res})
        localStorage.setItem("token", res.jwt)
        localStorage.setItem("user", "doctor")
        // history.push("/allpatients")
        })
    }
}

export function ptLoginAction(pt, dispatch) {
    return function(){
        const config = {
        method: "POST",
        headers: {
            accepts: "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify( {user: pt} )
        }
        fetch('http://localhost:3000/api/v1/patientlogin', config)
        .then(res => res.json())
        .then(res =>{ 
        console.log(res)
        dispatch({ type: "LOGIN_PATIENT", payload: res})
        localStorage.setItem("token", res.jwt)
        localStorage.setItem("user", "patient")
        })
    }

}
