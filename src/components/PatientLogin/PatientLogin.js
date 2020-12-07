import React from 'react'
import { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from './PatientLoginStyle'
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { ptLoginAction } from '../../redux/actions';
import { withRouter } from 'react-router-dom'



class PatientLogin extends Component {

    state = {
        email: "",
        password: ""
    }


    formEdit = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.patientLogin(this.state)
        this.props.history.push("/mymeds")
        
    }


    render() {
        const { classes } = this.props
        return (
            <div > 
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Grid container spacing={3} align="center" justify="center" >
                        <Grid item xs={6} >
                        <Paper className={classes.loginBox}>
                        <Typography component="span">
                            <Card className={classes.root}>
                            <CardContent>
                                <h3>Log In: Patient </h3>
                                <form>
                                <TextField onChange={this.formEdit} className={classes.textField} value={this.state.email} name="email" type="text" label="email"/>
                                <TextField onChange={this.formEdit} className={classes.textField} value={this.state.password} name="password" type="password" label="password" ></TextField>
                                <br/><br/><Button type="submit" onClick={this.submitHandler}>Log in</Button>
                                </form>
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
    return {patient: state.patient}
}

const mdp = (dispatch) => {
    return { patientLogin: (pt) => dispatch(ptLoginAction(pt, dispatch))}
}

export default connect(msp, mdp)(withStyles(useStyles, { withTheme: true })(withRouter(PatientLogin)))
