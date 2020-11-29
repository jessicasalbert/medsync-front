import React, { Component } from 'react'
import { Grid, Paper, Card } from '@material-ui/core'

export class MedInteractions extends Component {

    state = {
        meds: [],
        interaction: null
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


    render() {
        return (
            <Grid container spacing={3} align="center" justify="center" >
                <Grid item xs={9} m={4}>
                    <Paper>
                        {this.state.interaction ? <><h1>Interaction</h1> {console.log(this.state.interaction[0]['interactionType'][0]['interactionPair'])}</>: null}
                        {this.renderMeds()}
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default MedInteractions
