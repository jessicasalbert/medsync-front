import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TableRow, TableCell, TableContainer, TableHead, Grid } from '@material-ui/core'

export class Test extends Component {

    state = {
        open: false
    }

    renderConditions = () => {
        return this.props.test.conditions.map(condition => {
        return (<p>{condition.name} - likelihood {condition.probability}</p>)
        })
    }

    renderSymptoms = () => {
        return this.props.test.answers.map( answer => {
            return (
                <TableRow>
                    <TableCell align="left">{answer.symptom}</TableCell>
                    <TableCell align="left">{answer.response}</TableCell>
                </TableRow>
            )
        })
    }

    render() {
        return (
            <>
                <h3 onClick={(prev)=> this.setState({open: !prev.open})}>{this.props.test.created_at}</h3>
                {this.state.open ? 
                <> 
                    <h4>Possible conditions:</h4>
                    <Grid container justify="flex-start" alignItems="flex-start">
                        <Grid item xs={12}>
                            {this.renderConditions()}

                        </Grid>
                    </Grid>
                    <TableContainer>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left"><h3>Question</h3></TableCell>
                                <TableCell align="left"><h3>Response</h3></TableCell>
                            </TableRow>
                        </TableHead>
                    {this.renderSymptoms()}
                    </TableContainer>
                </>
                : null}
            </>
        )
    }
}

export default (Test)
