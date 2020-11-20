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
import { docLoginAction } from '../../redux/actions';
import { withStyles } from "@material-ui/core/styles"
import useStyles from './DoctorLoginStyle'
import { useHistory } from 'react-router-dom'

class DoctorLogin extends Component {

    state = {
        email: "",
        password: ""
    }
    

    formEdit = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    submitHandler = () => {
        this.props.doctorLogin(this.state)
        // history.push("/allpatients")
    }


    render() {
        const { classes } = this.props
        console.log(this.props.doctor)
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
                                <h3>Log In: Doctor </h3>
                                <TextField onChange={this.formEdit} className={classes.textField} value={this.state.email} name="email" type="text" label="email"/>
                                <TextField onChange={this.formEdit} className={classes.textField} value={this.state.password} name="password" type="password" label="password" ></TextField>
                                <br/><br/><Button onClick={this.submitHandler}>Log in</Button>
                            </CardContent>
                            </Card>
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
    return {doctor: state.doctor}
}

const mdp = (dispatch) => {
    return { doctorLogin: (doc) => dispatch(docLoginAction(doc, dispatch))}
}

export default connect(msp, mdp)(withStyles(useStyles, { withTheme: true })(DoctorLogin))
