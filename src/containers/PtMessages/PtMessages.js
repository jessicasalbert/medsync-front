import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from "@material-ui/core/styles"
import useStyles from './PtMessagesStyle'
import { withRouter } from 'react-router-dom';
import consumer from '../../cable'
import { Message } from 'react-chat-ui'


class PtMessages extends Component {

    state = {
        messages: [], 
        patient:  this.props.patient,
        content: "",
        chatMsgs: [
            new Message({
              id: 1,
              message: "I'm the recipient! (The person you're talking to)",
            }), 
            new Message({ id: 0, message: "I'm you -- the blue bubble!" }), 
          ]
    }
    
    

    componentDidMount() {
        if (!this.props.patient_details) {
            this.props.history.push("/mymeds")
        } else {
            const configObj = {
                method: "GET",
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            }
            fetch(`http://localhost:3000/api/v1/conversations/${this.props.patient_details.conversation_id}`, configObj)
            .then(res => res.json())
            .then(res => this.setState({ messages: res.messages }), () => {
                
            })

            consumer.subscriptions.create({
                channel: "MessageFeedChannel",
                user_type: "patient",
                doctor_id: this.props.patient.user.doctor_id,
                conversation_id: this.props.patient_details.conversation_id
            }, {
                connected: () => console.log("connected"),
                disconnected: () => console.log("disconnected"),
                received: data => this.setState((prev) => ({ messages: [...prev.messages, data] })
                )
            })
            
        }
    }


    sendMessage = (e) => {
        e.preventDefault()
        console.log(this.state.content)
        const configObj = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                accept: "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                content: this.state.content,
                patient_id: this.state.patient.user.id,
                doctor_id: this.state.patient.user.doctor_id,
                sender_type: "patient"
            })
        }
        fetch("http://localhost:3000/api/v1/messages/", configObj)
        .then(res => res.json())
        .then(this.setState({content: ""}))
    }

    messageContent = (e) => {
        this.setState({content: e.target.value})
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.talkJs} > 
            </div>
        )
    }
}

const msp = (state) => {
    return {patient: state.patient, patient_details: state.patient_details}
}


export default connect(msp)(withStyles(useStyles, { withTheme: true })(withRouter(PtMessages)))
