import React, { Component } from 'react'
import { Grid, Paper, Card, MenuItem, TextField, Typography } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { withStyles } from "@material-ui/core/styles"
import useStyles from './MedInteractionsStyle'

export class MedInteractions extends Component {

    state = {
        meds: [],
        interaction: null, 
        selectedMed: null
    }

    componentDidMount() {
        const configObj = {
            method: "GET",
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        }

        fetch(`http://localhost:3000/api/v1/meds`, configObj)
        .then(res => res.json())
        .then(res => this.setState({ meds: res}, () => {this.setState({med: this.state.meds[0].id})}))
    }

    getInteractions = (med) => {
        fetch(`https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=${med}&sources=ONCHigh`)
        .then(res => res.json())
        .then(res => this.setState({interaction: (res['interactionTypeGroup'])}))
        //console.log(med)
    }

    renderMeds = () => {
        return this.state.meds.map( med => <Card onClick={() => this.getInteractions(med.rxcui)}>{med.name}</Card>)
    }

    formEdit = (e) => {
        this.setState({ selectedMed: e.target.value}, () => this.getInteractions(e.target.value.rxcui))
    }

    alert = (interaction) => {
        console.log(interaction)
        return(
        <>
        <Alert severity="warning">
        {/* <AlertTitle></AlertTitle> */}
        <strong>{interaction.interactionConcept[1].minConceptItem.name}</strong> - {interaction.description}
        </Alert>
        <br/>
        </>
        )
    }
 
    render() {
        const { classes } = this.props
        return (
            <Grid container spacing={3} align="center" justify="center" >
                <Grid item xs={8} m={4}>
                    <Paper>
                        <h4>Select a medication below for details and drug interactions</h4>
                        
                      
                        {/* {this.renderMeds()} */}
                        <TextField onChange={this.formEdit} id="time" name="med" value={this.state.selectedMed} select>
                            {this.state.meds.map(med => <MenuItem value={med}>{med.name}</MenuItem>)}
                        </TextField><br/>
                    </Paper>
                    <br/>
                    
                    </Grid>
                    {this.state.selectedMed ? 
                    <Paper>
                        <img className={classes.image} src={this.state.selectedMed.image_url}/>
                        <Typography>
                
                        {this.state.selectedMed.pill_color} {this.state.selectedMed.pill_shape} <br/><br/>
       
                        </Typography>
                    </Paper>
                    :null}
                <Grid item xs={10}>
                    {this.state.interaction ? 
                    this.state.interaction[0]['interactionType'][0]['interactionPair'].map( interact => this.alert(interact))
                    : null}
                </Grid>
            </Grid>
        )
    }
}

export default (withStyles(useStyles, { withTheme: true })(MedInteractions))