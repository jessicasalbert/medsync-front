import React from 'react'
import useStyles from './PatientBlurbStyle'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core'
import { NavLink } from 'react-router-dom';


const PatientBlurb = (props) => {
    const classes = useStyles()

    return (
                <Grid item xs={3} >
                    <Typography component="span">
                        <Card className={classes.root}>
                        <CardContent className={classes.card}>
                            <p>{props.patient.name}</p>
                            <p>{props.patient.age} {props.patient.gender}</p>
                            <img className={classes.image} src={props.patient.image}/>
                            <NavLink to={`/patients/${props.patient.id}`}><Button> Patient Details</Button></NavLink>
                        </CardContent>
                        </Card>
                    </Typography>
                </Grid>
            )
}

export default PatientBlurb