import React, { Component } from 'react'
import useStyles from './PtMedStyle'
import { withStyles, Grid, Button } from "@material-ui/core/"


class PtMed extends Component {

    state = {
        med: this.props.med,
        taken: this.props.med.has_taken,
        
    }

    componentDidMount() {
        this.isPastDue()
    }

    isPastDue = () => {
        const time = new Date
        const hour = time.getHours()
        if (this.props.med.time === "morning") {
            if (hour > 11 && !this.props.med.has_taken) {
                console.log("hi")
                this.setState({ past_due: true }) 
            }
        } else if (this.props.med.time === "afternoon ") {
            if (hour > 16 && !this.props.med.has_taken) {
                this.setState({ past_due: true }) 
            }
        } else if (this.props.med.time === "evening ") {
            if (hour > 22 && !this.props.med.has_taken) {
                this.setState({ past_due: true }) 
            }
        } else {
            this.setState( { past_due: false})
        }
        
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
        .then(res => this.setState({ taken: res.has_taken}, this.isPastDue))
    }

   
    render() {

        const { classes } = this.props
        return (
            < > 

                {
                <Grid container 
                    className=
                        {this.state.taken ? 
                        classes.taken : 
                        this.state.past_due ? 
                        classes.past_due : 
                        null }  
                    xs={12} >

                    <Grid item xs={5}> 
                        <img 
                            className={this.state.taken ? 
                            classes.image_taken : 
                            classes.image} 
                            src={this.props.med.med.image_url}
                            alt="Medication"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        {this.props.med.med.name} <br/> 
                        <strong>
                            {this.props.med.pill_count}
                            pill(s) 
                            {this.props.med.med.pill_color}, 
                            {this.props.med.med.pill_shape} 
                            SHAPE 
                        </strong>  
                        <br/> 
                        {this.props.med.notes ? 
                        <>
                            <em>MD notes: {this.props.med.notes} </em><br/>
                        </> 
                        : null} <br/> 
                        <Button 
                            variant="outlined"  
                            onClick={this.patchHandler}>
                            {this.state.taken ? "Undo" : "Mark as taken" }
                        </Button>
                    </Grid>
                </Grid>
                }
            </>
        )
    }
}


export default (withStyles(useStyles, { withTheme: true })(PtMed))