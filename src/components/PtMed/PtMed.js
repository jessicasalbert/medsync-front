import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from './PtMedStyle'
import { withStyles } from "@material-ui/core/styles"
import { Button } from '@material-ui/core'
import { TextField, Select, MenuItem } from '@material-ui/core'


class PtMed extends Component {

    state = {
        med: this.props.med,
        taken: this.props.med.has_taken
    }


    patchHandler = () => {
        const ptMedId = this.state.med.id
        const body = {
                has_taken: !this.state.taken }
        
        const configObj = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                accept: "application/json", 
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        }
        fetch(`http://localhost:3000/api/v1/patient_meds/${ptMedId}`, configObj)
        .then(res => res.json())
        .then(res => this.setState({ taken: res.has_taken}))
    }

   
    render() {

        const { classes } = this.props
        return (
            < > 
                {
                   
                <Paper variant="outlined">{this.props.med.med.name} <br/> {this.props.med.pill_count} pills {this.props.med.notes}  {this.props.med.time}<br/> <Button className={this.state.taken? classes.taken : null} onClick={this.patchHandler}>{this.state.taken ? "I did not take this" : "I took this med" }</Button></Paper>
                }
            </>
        )
    }
}


export default (withStyles(useStyles, { withTheme: true })(PtMed))