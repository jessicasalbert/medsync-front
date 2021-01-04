import React, { Component } from 'react'
import { Card,
        CardContent,
        Typography,
        Paper,
        Grid,
        TextField,
        Button,
        withStyles } from '@material-ui/core/';
import useStyles from './PatientLoginStyle'
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
