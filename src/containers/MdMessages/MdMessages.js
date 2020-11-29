import React from 'react'
import { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { withStyles } from "@material-ui/core/styles"
import useStyles from './MdMessagesStyle'
import { withRouter } from 'react-router-dom';
import Loading from '../../components/Loading/Loading'
import consumer from '../../cable'
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
        console.log(this.props.patient_list)
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
        console.log(this.state.conversation)
        const configObj = {
            method: "GET",
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        }
        fetch(`http://localhost:3000/api/v1/conversations/${this.state.conversation}`, configObj)
        .then(res => res.json())
        .then(res => this.setState({ messages: res.messages }))

        const subscription = consumer.subscriptions.create({
            channel: "MessageFeedChannel",
            user_type: "doctor",
            doctor_id: this.state.doctor.id,
            conversation_id: this.state.conversation
        }
        , {
            connected: () => console.log("connected"),
            disconnected: () => console.log("disconnected"),
            received: data => this.setState((prev) => ({ messages: [...prev.messages, data] })
        )})
        
    }

    render() {
        const { classes } = this.props
        const renderMessages = () => {
            return this.state.messages.map(msg => <Paper className={msg.sender_type==="doctor" ? classes.sender : classes.receiver} >{msg.content}</Paper>)
        }
        return (
            <div > 
                {this.props.patient_list ? 
                
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <InboxAppMd/>
                    {/* <Grid container spacing={3} align="center" justify="center" >
                        <Grid item xs={6} >

                        <Paper>Start a conversation with...</Paper>
                        {this.listPatientNames()}
                        <Paper className={classes.loginBox} >

                        { this.state.current_patient ?
                        <Typography component={'span'}>
                            <Card className={classes.root}>
                            <CardContent>
                                <h3>Chat with {this.state.current_patient.name}  </h3>
                            </CardContent>
                            </Card>
                            {renderMessages()}
                            <Paper>
                                <form onSubmit={this.sendMessage}>
                                    <TextField onChange={this.messageContent} label="message" value={this.state.content}/>
                                    <Button type="submit">Send</Button>
                                </form>
                            </Paper>
                        </Typography>
                        : null
                        }
                        </Paper>
                        </Grid>   
                    </Grid> */}
                    
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