import React, { Component } from 'react'
import useStyles from './NewMedFormStyle'
import { withStyles } from "@material-ui/core/styles"
import { TextField, MenuItem } from '@material-ui/core'

export class NewMedForm extends Component {

    state = {
        meds: [],
        notes: "",
        time: "morning",
        pill_count: 1,
        med: null
    }

    componentDidMount() {
        const configObj = {
            method: "GET",
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        }

        fetch(`http://localhost:3000/api/v1/meds`, configObj)
        .then(res => res.json())
        .then(res => this.setState({ meds: res}))
    }

    formEdit = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        return (
            <>
            {this.state.meds.length > 0 ?
            <>
            <br/>
            <TextField onChange={this.formEdit} type="number" min={1} name="pill_count" value={this.state.pill_count} label="# pills"/>
            <TextField onChange={this.formEdit} value={this.state.notes} name="notes" label="notes"/>
            <TextField onChange={this.formEdit} id="time" label="time" name="time" value={this.state.time} select>
                <MenuItem value="morning">Morning</MenuItem>
                <MenuItem value="afternoon ">Afternoon</MenuItem>
                <MenuItem value="evening ">Evening</MenuItem>
            </TextField>
            <TextField onChange={this.formEdit} id="time" label="med" name="med" value={this.state.med ? this.state.med : null} select>
                {this.state.meds.map(med => <MenuItem value={med.id}>{med.name}</MenuItem>)}
            </TextField>
            </>
            : null}
            </>
        )
    }
}

export default withStyles(useStyles, { withTheme: true })(NewMedForm)
