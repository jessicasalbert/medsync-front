import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LoginContainer from '../LoginContainer/LoginContainer'
import NavBar from '../../components/NavBar/NavBar'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from './LandingPageStyle'
  

const LandingPage = (props) => {

    const classes = useStyles()
    return (
        <div > 
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Grid container spacing={3} align="center" justify="center" >
                    <Grid item xs={6} >
                    <Paper className={classes.loginBox}>
                    <Typography>
                        <Card className={classes.root}>
                        <CardContent>
                            Welcome to MedSync
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
    )
}


export default LandingPage