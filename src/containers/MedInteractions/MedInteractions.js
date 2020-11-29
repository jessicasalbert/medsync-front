import React, { Component } from 'react'
import { Grid, Paper, Card, MenuItem, TextField } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

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

    alert = () => {
        return(null
        )
    }
 
    render() {
        return (
            <Grid container spacing={3} align="center" justify="center" >
                <Grid item xs={9} m={4}>
                    <Paper>
        
                        <h2>Medication Interactions</h2>
                        <h4>Select a med below for details and drug interactions</h4>
                        <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        This is a warning alert — <strong>check it out!</strong>
        </Alert>
                      
                        {/* {this.renderMeds()} */}
                        <TextField onChange={this.formEdit} id="time" name="med" value={this.state.selectedMed} select>
                            {this.state.meds.map(med => <MenuItem value={med}>{med.name}</MenuItem>)}
                        </TextField><br/>
                    </Paper>
                    <br/>
                    {this.state.interaction ? 
                    this.state.interaction[0]['interactionType'][0]['interactionPair'].map( interact => this.alert)
                    : "No drug interaction data to display" }
                </Grid>
            </Grid>
        )
    }
}

export default MedInteractions
