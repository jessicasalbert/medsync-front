import React from 'react'
import { connect } from 'react-redux'

const Sample = (props) => {
    return(
    <div>{props.clicked ? "true" : "false"}</div>
    )
}

const msp = (state) => {
    return {clicked: state.click}
}

export default connect(msp)(Sample)