import { Button, List, ListItem, MenuItem, Grid, Typography, Paper, TextField, RadioGroup, Radio, FormControl, FormControlLabel } from '@material-ui/core'
import { SignalCellularNullRounded } from '@material-ui/icons'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'



export class Diagnostic extends Component {

    state = {
        body: {
            sex: this.props.patient.gender === "M" ? "male" : "female",
            //sex: "male",
            age: {
                value: this.props.patient.age
                //value: 30
            }
        },
        "extras": {"disable_groups": true},
        evidence: [
          ],
        question: null,
        choice: null,
        id: null,
        search: "",
        symptoms: [],
        searchSymptoms: [],
        selection: null,
        interview: false,
        complete: false,
        evidence4Doc: []
    }

    postSymptoms = () => {
        const body = this.state.body
        body['evidence'] = this.state.evidence
        const config = {
            method: "POST",
            headers: {
                "App-Key" : process.env.REACT_APP_INFERM_APP_KEYS,
                "App-Id": process.env.REACT_APP_INFERM_APP_ID, 
                accept: "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        }
        fetch('https://api.infermedica.com/v2/diagnosis', config)
        .then(res=>res.json())
        .then(res => {
            if (res.should_stop) {
                console.log(res.conditions)
            } else {
                this.setState({
                    question: res.question,
                    id: res.question.type === "single" ? res.question.items[0].id : null
                })
            }
        })
    }

    createButtonsSingle = () => {
       return( 
       
        <>
        {this.state.question.items[0].choices.map( choice => {

            return (
                <FormControlLabel value={choice.id} control={<Radio />} label={choice.label} />
            )})}
    </>
        )
    }


     createButtonsMulti = () => {
         return (
            <>
                {this.state.question.items.map ( item => {
                    return (
                        <FormControlLabel value={item.id} control={<Radio />} label={item.name} />
                    )
                })}
            </>
         )
     }

     questionSubmitHandler = (e) => {
        e.preventDefault()
        let newAnswer
        let newDocAnswer
        if (this.state.question.type === "single") {
            if (this.state.choice === "absent") {
                newAnswer = { id: this.state.id, choice_id: "absent" }
                newDocAnswer = { id: this.state.id, choice_id: "absent", answer: this.state.question.items[0].name, question: this.state.question.text }
            } else {
                newAnswer = { id: this.state.id, choice_id: "present" }
                newDocAnswer = { id: this.state.id, choice_id: "present", answer: this.state.question.items[0].name, question: this.state.question.text}
            }
        } else {
            newDocAnswer = { id: this.state.choice, choice_id: "present", question: this.state.question.text, answer: this.state.question.items.filter( item => item.id === this.state.choice )}
            newAnswer = { id: this.state.choice, choice_id: "present" }
        }
        const body = { ...this.state.body }
        body['evidence'] = [...this.state.evidence, newAnswer]
        this.setState({ body: body, evidence: [...this.state.evidence, newAnswer], evidence4Doc: [...this.state.evidence4Doc, newDocAnswer] }, () => {

            const config = {
                method: "POST",
                headers: {
                    "App-Key" : process.env.REACT_APP_INFERM_APP_KEYS,
                    "App-Id": process.env.REACT_APP_INFERM_APP_ID, 
                    accept: "application/json",
                    "content-type": "application/json"
                },
                body: JSON.stringify(body)
            }
            fetch('https://api.infermedica.com/v2/diagnosis', config)
            .then(res=>res.json())
            .then(res => {
                //console.log(res)
                if (res.should_stop) {
                    //console.log(res.conditions)
                    this.createTest(res)
                    this.setState({
                        question: null,
                        complete: true
                    })
                    
                } else {
                    this.setState({
                        question: res.question,
                        id: res.question.type === "single" ? res.question.items[0].id : null
                    })
                }
            })
        })
     }

     createTest = (response) => {
        const configObj = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ patient_id: this.props.patient.id })
        }
        fetch(`http://localhost:3000/api/v1/tests`, configObj)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            this.createConditions(res.id, response.conditions)
            this.createAnswers(res.id)
        })
     }

     createConditions = (testId, conditions) => {
        conditions.map( condition => {
            const configObj = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    name: condition.name, test_id: testId, probability: condition.probability
                })
            }
            fetch(`http://localhost:3000/api/v1/conditions`, configObj)
            .then(res => res.json())
            //.then(console.log)
        })
     }

     createAnswers = (testId) => {
        this.state.evidence4Doc.map(evidence => {
            let body
            if (evidence.name) {
                body = {
                    symptom: evidence.name,
                    response: evidence.choice_id,
                    test_id: testId
                }
            } else if (typeof evidence.answer !== "string") {
                body = {
                    symptom: evidence.question,
                    response: evidence.answer[0].name,
                    test_id: testId
                } 
            } else {
                body = {
                    symptom: evidence.answer,
                    response: evidence.choice_id,
                    test_id: testId
                }
            }
            const configObj = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(body)
            }
            fetch(`http://localhost:3000/api/v1/answers`, configObj)
            .then(res => res.json())
            .then(console.log)
        })
     }

     formEdit = (e) => {
        this.setState({
            choice: e.target.value
        })
     }

     searchForm = (e) => {
         this.setState({
             search: e.target.value
         })
     }

    renderQuestion = () => {
        return (
            <>
            {/* <form onSubmit={this.questionSubmitHandler}> */}
            <FormControl component="fieldset" >
                <RadioGroup aria-label="question" value={this.state.choice} name="choice" onChange={this.formEdit}>
                
            
            
            <p>{this.state.question.text}</p>
            {this.state.question.type === 'single' ? 
                
                <p>{this.createButtonsSingle()}</p>
        :

                <p>{this.createButtonsMulti()}</p>
            
        }
                </RadioGroup>
            <Button onClick={this.questionSubmitHandler}>Next</Button>
            </FormControl>
            {/* </form> */}
        </>
        )
    }

    addSymp = (symp) => {
        const updatedSymps = [...this.state.symptoms, symp]
        const newEvidence = [...this.state.evidence]
        const newEvidence4Doc = [...this.state.evidence4Doc]
        if (newEvidence.length === 0) {
            newEvidence.push( {
                source: "initial",
                id: symp.id,
                choice_id: "present"
            })
            newEvidence4Doc.push( {
                source: "initial",
                id: symp.id,
                choice_id: "present",
                name: symp.label
            })
        } else {
            newEvidence.push({
                choice_id: "present",
                id: symp.id
            })
            newEvidence4Doc.push({
                choice_id: "present",
                id: symp.id,
                name: symp.label
            })
        }
        this.setState({ symptoms: updatedSymps, evidence: newEvidence, evidence4Doc: newEvidence4Doc, search: "", searchSymptoms: []})
    }

    symptomSearchHandler = () => {
        const configObj = {
            method: "GET",
            headers: {
                "App-Key" : process.env.REACT_APP_INFERM_APP_KEYS,
                "App-Id": process.env.REACT_APP_INFERM_APP_ID, 
                accept: "application/json",
                "Dev-Mode": true
            }
        }
        fetch(`https://api.infermedica.com/v2/search?phrase=${this.state.search}&sex=${this.props.patient.gender === "M" ? "male" : "female"}&age.value=${this.props.patient.age}&age.unit=year&type=symptom`, configObj)
        .then(res => res.json())
        .then(res => this.setState({searchSymptoms: res}))
    }

    updateSymptoms = () => {
        const newSyms = [...this.state.symptoms]
        this.setState( {symptoms: newSyms})
    }
    
    render() {
        return (
            <>
            {!this.props.patient ? <Redirect to="/mymeds"/> :
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Grid container spacing={3} align="center" justify="center" >
                        <Grid item xs={10} >
                        {this.state.complete ? <><Typography>Interview complete!</Typography><p>Your doctor will receive the results.</p>
                        <br/> <Link to="/mymeds"><Button>Back to Profile</Button></Link></>: 
                        <>
                        <Paper >
                            <Typography>Symptoms Interview Form </Typography><br/>
                            {!this.state.question && !this.state.complete ? <div>
                            <p>Please enter symptoms you're experiencing below:</p><br/>
                            {this.state.interview? null :<TextField onChange={this.searchForm} value={this.state.search} />}
                            {/* {this.state.searchSymptoms.length === 0 ? <TextField onChange={this.searchForm} value={this.state.search} /> : 
                            <TextField onChange={this.updateSymptoms} value={this.state.search} select>
                                {this.state.searchSymptoms.map(symp => {
                                    return( <MenuItem  value={symp}>{symp.name}</MenuItem> )

                                })}
                            </TextField> }
                             */}
                            <Button onClick={this.symptomSearchHandler} color="primary">Search Symptoms</Button><br/>
                            </div> : null}
                        
                        <>
                        {this.state.searchSymptoms.length > 0 ? <Typography>Select...</Typography> : null}
                        {this.state.searchSymptoms.length > 0 ? this.state.searchSymptoms.map( symp => {
                            return (<div onClick={() => this.addSymp(symp)}>{symp.label}</div>)
                        }) : null}
                        <br/>
                        </>
                        
                        {/* <Paper> */}
                            {!this.state.question ?
                            <Typography>{this.state.symptoms.length > 0 ? "Symptoms Noted" : null}<br/>
                  
                                {this.state.symptoms.map( symp => <>-{symp.label}<br/> </>)}
  
                            </Typography>
                            : null}
                        {/* </Paper> */}
                        <br/>
                        {/* <Paper> */}
                        <Typography component={'span'}>
                           {this.state.question && !this.state.complete? this.renderQuestion() : null }
                           
                            {!this.state.question && !this.state.complete ? <Button variant="outlined"onClick={this.postSymptoms}>Begin interview</Button> : null}
                        </Typography>
                        {/* </Paper> */}
                        
                        </Paper>
                        </>
                        }
                        </Grid>   
                    </Grid>
                    
                    </Grid>
                </Grid>
            </div>
            }
            </>
        )
    }
}

const msp = (state) => {
    return {patient: state.patient_details }
}

export default connect(msp)(Diagnostic)

