import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from './DoctorLoginStyle'
import { TextField } from '@material-ui/core'
  

const DoctorLogin = (props) => {

    const state = {
        username: "",
        password: ""
    }

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
                            <h3>Log In: Doctor </h3>
                            <TextField className={classes.textField} label="email"/>
                            <TextField className={classes.textField} type="password" label="password" InputAdornment></TextField>
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

export default DoctorLogin
