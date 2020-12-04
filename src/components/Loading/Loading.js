import React from 'react'
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
                    </Grid>   
                </Grid>
                
                </Grid>
            </Grid>
            </div>
    )
}


export default LandingPage