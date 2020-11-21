import React from 'react'
import useStyles from './PatientBlurbStyle'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const PatientBlurb = (props) => {
    const classes = useStyles()

    return (
                <Grid item xs={3} >
                    <Typography>
                        <Card className={classes.root}>
                        <CardContent className={classes.card}>
                            <p>{props.name}</p>
                            <img className={classes.image} src="https://thispersondoesnotexist.com/image"/>
                        </CardContent>
                        </Card>
                    </Typography>
                </Grid>
            )
}

export default PatientBlurb