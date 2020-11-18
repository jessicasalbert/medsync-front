import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LoginContainer from './LoginContainer'
import NavBar from '../components/NavBar'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  

const LandingPage = (props) => {

    const classes = useStyles()
    return (
        <div > 
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Grid container spacing={3} alignItems="center" justify="center" height="100%">
                    <Grid item xs={6} height="100%">
                    <Paper height="75%">
                    <Typography>
                        <Card className={classes.root}>
                        <CardContent>
                            Welcome to MedSync
                            <LoginContainer/>
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