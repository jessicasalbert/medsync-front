import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Test extends Component {

    state = {
        open: false
    }

    renderConditions = () => {
        return this.props.test.conditions.map(condition => {
        return <p>{condition.name} - likelihood {condition.probability}</p>
        })
    }

    renderSymptoms = () => {
        return this.props.test.answers.map( answer => {
            return (
                <tr>
                    <td>{answer.symptom}</td>
                    <td>{answer.response}</td>
                </tr>
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
                    {this.renderConditions()}
                    <table>
                        <tr>
                            <th>Symptom/question</th>
                            <th>Response</th>
                        </tr>
                    </table>
                    {this.renderSymptoms()}
                </>
                : null}
            </>
        )
    }
}

export default (Test)
