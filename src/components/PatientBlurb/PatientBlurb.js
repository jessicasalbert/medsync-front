import React from 'react'
import useStyles from './PatientBlurbStyle'
import { Card, 
        CardContent, 
        Typography, 
        Grid,
        Button } from '@material-ui/core/';
import { NavLink } from 'react-router-dom';


const PatientBlurb = (props) => {
    const classes = useStyles()

    return (
                <Grid item xs={3} >
                    <Typography component="span">
                        <Card className={classes.root}>
                        <CardContent className={classes.card}>
                            <h4>{props.patient.name}</h4>
                            <hr/>
                            <p>{props.patient.age} • {props.patient.gender}</p>
                            <img className={classes.image} alt="Patient picture"src={props.patient.image}/>
                            <NavLink to={`/patients/${props.patient.id}`}>
                                <Button> Patient Details</Button></NavLink>
                        </CardContent>
                        </Card>
                    </Typography>
                </Grid>
            )
}

export default PatientBlurb