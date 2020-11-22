import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from './MdMedStyle'
import { withStyles } from "@material-ui/core/styles"


const MdMed = (props) => {

   

    const classes = useStyles()
    return (
        < > 
            <Paper >{props.med.med.name} : <img className={classes.image}src={props.med.med.image_url}/> : {props.med.pill_count} : {props.med.time} </Paper>
            </>
    )
}


export default (withStyles(useStyles, { withTheme: true })(MdMed))