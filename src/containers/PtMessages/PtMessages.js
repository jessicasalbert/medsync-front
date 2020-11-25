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
        messages: ["Hello", "there"]
    }
    
    renderMessages = () => {
        return this.state.messages.map(msg => <Paper >{msg}</Paper>)
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
                                <form>
                                    <TextField label="message"/>
                                    <Button>Send</Button>
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
