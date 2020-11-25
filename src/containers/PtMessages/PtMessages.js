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
import useStyles from './PtMessagesStyle'
import { withRouter } from 'react-router-dom';

class PtMessages extends Component {

    state = {
        messages: ["Hello", "there"], 
        patient:  this.props.patient,
        content: ""
    }
    
    renderMessages = () => {
        return this.state.messages.map(msg => <Paper >{msg}</Paper>)
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
        .then(console.log)
    }

    messageContent = (e) => {
        this.setState({content: e.target.value})
    }

    render() {
        const { classes } = this.props
        return (
            <div > 
                
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Grid container spacing={3} align="center" justify="center" >
                        <Grid item xs={6} >
                        <Paper className={classes.loginBox} >
                        
                        <Typography component={'span'}>
                            <Card className={classes.root}>
                            
                            <CardContent>
                                <h3>Chat with Dr.  </h3>
                            </CardContent>
                            </Card>
                            {this.renderMessages()}
                            <Paper>
                                <form onSubmit={this.sendMessage}>
                                    <TextField onChange={this.messageContent} label="message" value={this.state.content}/>
                                    <Button type="submit">Send</Button>
                                </form>
                            </Paper>
                        </Typography>
                        </Paper>
                        </Grid>   
                    </Grid>
                    
                    </Grid>
                </Grid>
                </div>
        )
    }
}

const msp = (state) => {
    return {patient: state.patient}
}


export default connect(msp)(withStyles(useStyles, { withTheme: true })(withRouter(PtMessages)))
