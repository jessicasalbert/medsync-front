import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from './MdMedStyle'
import { withStyles } from "@material-ui/core/styles"
import { Button } from '@material-ui/core'
import { TextField } from '@material-ui/core'

class MdMed extends Component {

    state = {
        edit: false,
        med: this.props.med
    }

    editClick = () => {
        this.setState(prev => ({edit : !prev.edit}))
    }
   
    render() {

        const { classes } = this.props
        return (
            < > 
                {
                    this.state.edit ?
                    <form>
                        <TextField value={this.state.med.med.name} label="name"/>
                        <TextField value={this.state.med.med.image_url} label="image"/>
                        <TextField value={this.state.med.pill_count} label="#"/>
                        <TextField value={this.state.med.time} label="time"/>
                        <Button type="submit">Save</Button>
                    </form>
                    
                    
                    :
                <Paper variant="outlined">{this.props.med.med.name} : <img className={classes.image}src={this.props.med.med.image_url}/> : {this.props.med.pill_count} : {this.props.med.time} <Button onClick={this.editClick}>Edit</Button></Paper>
                }
            </>
        )
    }
}


export default (withStyles(useStyles, { withTheme: true })(MdMed))