import React, { Component } from 'react'
import { Card, 
        CardContent,
        Typography, 
        Paper,
        Grid, 
        TextField,
        Button,
        withStyles, 
} from '@material-ui/core';
import { connect } from 'react-redux'
import { docLoginAction } from '../../redux/actions';
import useStyles from './DoctorLoginStyle'
import { withRouter } from 'react-router-dom';

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

    submitHandler = (e) => {
        e.preventDefault()
        this.props.doctorLogin(this.state)
        if (localStorage.getItem("token") !== "undefined") {
            this.props.history.push("/patients")
        }
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
                                <h3>Log In: Doctor </h3>
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
    return {doctor: state.doctor}
}

const mdp = (dispatch) => {
    return { doctorLogin: (doc) => dispatch(docLoginAction(doc, dispatch))}
}

export default connect(msp, mdp)(withStyles(useStyles, { withTheme: true })(withRouter(DoctorLogin)))
