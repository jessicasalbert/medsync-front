import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from './MdMedStyle'
import { withStyles } from "@material-ui/core/styles"
import { Button } from '@material-ui/core'
import { TextField, Select, MenuItem } from '@material-ui/core'


class MdMed extends Component {

    state = {
        edit: false,
        med: this.props.med,
        notes: this.props.med.notes,
        pill_count: this.props.med.pill_count,
        time: this.props.med.time
    }

    editClick = () => {
        this.setState(prev => ({edit : !prev.edit}))
    }

    formEdit = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    patchHandler = (e) => {
        e.preventDefault()
        const ptMedId = this.state.med.id
        const body = {
                notes: this.state.notes,
                pill_count: this.state.pill_count,
                time: this.state.time}
        
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
        .then(res => this.setState({edit: false}, () => this.props.refreshMedsEdit(res.id, body)))
    }

    deleteHandler = () => {
        const ptMedId = this.state.med.id
        const configObj = {
            method: "DELETE",
            headers: {accept: "application/json", Authorization: `Bearer ${localStorage.getItem("token")}`}
        }
        fetch(`http://localhost:3000/api/v1/patient_meds/${ptMedId}`, configObj)
        .then(res => res.json())
        .then(res => this.props.refreshMeds(res.id))
    }
   
    render() {

        const { classes } = this.props
        return (
            < > 
                {
                    this.state.edit ?
                    <form onSubmit={this.patchHandler}>
                        {this.state.med.med.name}<br/> 
                        <TextField onChange={this.formEdit} type="number" min={1} name="pill_count" value={this.state.pill_count} label="# pills"/>
                        <TextField onChange={this.formEdit} value={this.state.notes} name="notes" label="notes"/>
                        <TextField onChange={this.formEdit} id="time" label="time" name="time" value={this.state.time} select>
                            <MenuItem value="morning">Morning</MenuItem>
                            <MenuItem value="afternoon ">Afternoon</MenuItem>
                            <MenuItem value="evening ">Evening</MenuItem>
                        </TextField>
                        
                        <br/>
                        <Button type="submit">Save</Button>
                    </form>
                    
                    
                    :
                <Paper variant="outlined">{this.props.med.med.name} <br/> {this.props.med.pill_count} pills {this.props.med.notes}  {this.props.med.time}<br/> <Button onClick={this.editClick}>Edit</Button> <Button onClick={this.deleteHandler}>Delete </Button></Paper>
                }
            </>
        )
    }
}


export default (withStyles(useStyles, { withTheme: true })(MdMed))