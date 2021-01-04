import React, { Component } from 'react'
import { TableRow, 
        TableCell, 
        TableContainer, 
        TableHead, 
        Grid } from '@material-ui/core'

export class Test extends Component {

    state = {
        open: false
    }

    renderConditions = () => {
        return this.props.test.conditions.map(condition => {
        return (
            <TableRow>
                <TableCell>{condition.name}</TableCell>
                <TableCell><strong>{condition.probability}</strong></TableCell>
            </TableRow>)
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
                    <Grid container justify="left" alignItems="left">
                        <Grid item xs={12}>
                            <TableContainer >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left"><h3>Condition</h3></TableCell>
                                        <TableCell align="left"><h3>Probability</h3></TableCell>
                                    </TableRow>
                                </TableHead>
                                {this.renderConditions()}
                            </TableContainer>

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
