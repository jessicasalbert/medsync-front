import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from './LoadingStyle'


const LandingPage = (props) => {

   

    const classes = useStyles()
    return (
        <div > 
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Grid container spacing={3} align="center" justify="center" >
                    <Grid item xs={6} >
                    <img className={classes.box} src="https://www.svgrepo.com/show/70469/loading.svg"/>
                    {/* <Paper className={classes.box}>
                    <Typography component="span">
                        <Card className={classes.root}>
                        <CardContent>
                            <p>Hello</p>
                        </CardContent>
                        </Card>
                    </Typography>
                    </Paper> */}
                    </Grid>   
                </Grid>
                
                </Grid>
            </Grid>
            </div>
    )
}


export default LandingPage