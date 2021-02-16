import React from 'react'
import { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import { withStyles } from "@material-ui/core/styles"
import useStyles from './MdMessagesStyle'
import { withRouter } from 'react-router-dom';
import Loading from '../../components/Loading/Loading'
import InboxAppMd from '../../components/TalkJsMd/TalkJsMd'

class MdMessages extends Component {

    state = {
        messages: [], 
        doctor:  this.props.doctor,
        patients: this.props.patient_list,
        content: "",
        conversation: null,
        current_patient: null
    }
    
    

    componentDidMount() {
        if (!this.props.patient_list) {
            this.props.history.push("/mypatients")
        } else {
        }
    }

    sendMessage = (e) => {
        e.preventDefault()
        const configObj = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                accept: "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                content: this.state.content,
                patient_id: this.state.current_patient.id,
                doctor_id: this.state.doctor.user.id,
                sender_type: "doctor"
            })
        }
        fetch("http://localhost:3000/api/v1/messages/", configObj)
        .then(res => res.json())
        .then(this.setState({content: ""}))
    }

    messageContent = (e) => {
        this.setState({content: e.target.value})
    }

    listPatientNames = () => {
        return this.props.patient_list.map(pt => <Paper onClick={this.fetchPtDetails} data-id={pt.id} key={pt.id}>{pt.name}</Paper>)
    }

    fetchPtDetails = (e) => {
        const configObj = {
            method: "GET",
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        }
        fetch(`http://localhost:3000/api/v1/patients/${e.target.dataset.id}`, configObj)
        .then(res => res.json())
        .then(res => this.setState({ conversation: res.conversation_id, current_patient: res }, () => (this.fetchMessages())))
    }

    fetchMessages = () => {
        const configObj = {
            method: "GET",
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        }
        fetch(`http://localhost:3000/api/v1/conversations/${this.state.conversation}`, configObj)
        .then(res => res.json())
        .then(res => this.setState({ messages: res.messages }))
    }

    render() {
 
        return (
            <div > 
                {this.props.patient_list ? 
                
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <InboxAppMd/>
                    </Grid>
                </Grid>
                : <Loading/>
                }
                </div>
        )
    }
}

const msp = (state) => {
    return {doctor: state.doctor, patient_list: state.patient_list}
}


export default connect(msp)(withStyles(useStyles, { withTheme: true })(withRouter(MdMessages)))
