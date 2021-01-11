import React from 'react'
import { Card,
        CardContent,
        Typography,
        Paper,
        Grid } from '@material-ui/core/';
import LoginContainer from '../LoginContainer/LoginContainer'
import useStyles from './LandingPageStyle'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


const LandingPage = (props) => {

   

    const classes = useStyles()
    return (
      <>
        {props.doctor ? <Redirect to="/patients"/> : null}
        {props.patient ? <Redirect to='/mymeds'/> : null}
        <div className={classes.background}> 
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Grid container spacing={3} align="center" justify="center" >
                    <Grid item xs={6} >
                      <Paper className={classes.loginBox}>
                        <Typography component="span">
                            <Card className={classes.root}>
                              <CardContent>
                                  <p><strong>Welcome to MedSync</strong></p>
                                  <LoginContainer />
                              </CardContent>
                            </Card>
                        </Typography>
                      </Paper>
                    </Grid>   
                </Grid>
                
                </Grid>
            </Grid>
        </div>
      </>
    )
}

const msp = (state) => {
  return {doctor: state.doctor, patient: state.patient}
}

export default connect(msp)(LandingPage)