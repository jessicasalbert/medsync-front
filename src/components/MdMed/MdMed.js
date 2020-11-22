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
                        {this.state.med.med.name}<br/> 
                        {/* <TextField value={this.state.med.med.image_url} label="image"/> */}
                        <TextField type="number" value={this.state.med.pill_count} label="# pills"/>
                        <TextField value={this.state.med.notes} label="notes"/>
                        <TextField id="time" label="time" value={this.props.med.time} select>
                            <MenuItem value="morning">Morning</MenuItem>
                            <MenuItem value="afternoon ">Afternoon</MenuItem>
                            <MenuItem value="evening ">Evening</MenuItem>
                        </TextField>
                        
                        <br/>
                        <Button type="submit">Save</Button>
                    </form>
                    
                    
                    :
                <Paper variant="outlined">{this.props.med.med.name} <br/> {this.props.med.pill_count} pills {this.props.med.notes}  {this.props.med.time}<br/> <Button onClick={this.editClick}>Edit</Button></Paper>
                }
            </>
        )
    }
}


export default (withStyles(useStyles, { withTheme: true })(MdMed))