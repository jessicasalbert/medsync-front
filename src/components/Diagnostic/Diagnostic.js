import { Button, List, ListItem, Grid, Typography, Paper, TextField, RadioGroup, Radio, FormControl, FormControlLabel } from '@material-ui/core'
import { SignalCellularNullRounded } from '@material-ui/icons'
import React, { Component } from 'react'
import { connect } from 'react-redux'

const question= {
    items: [
        {
            choices: [
                {
                    id: "present",
                    label: "Yes"
                },
                {
                    id: "absent",
                    label: "No"
                },
                {
                    id: "unknown",
                    label: "Don't know"
                }
            ],
            id: "s_1762",
            name: "Headache"
        }
    ], 
    text: "Are your heachaches triggered...",
    type: "single"
}

const questionGroupSingle= {
    items: [
        {
            choices: [
                {
                    id: "present",
                    label: "Yes"
                },
                {
                    id: "absent",
                    label: "No"
                },
                {
                    id: "unknown",
                    label: "Don't know"
                }
            ],
            id: "s_1762",
            name: "Back of head"
        },
        {
            choices: [
                {
                    id: "present",
                    label: "Yes"
                },
                {
                    id: "absent",
                    label: "No"
                },
                {
                    id: "unknown",
                    label: "Don't know"
                }
            ],
            id: "s_201",
            name: "All over head"
        }
    ], 
    text: "Are your heachaches triggered...",
    type: "single"
}

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
            {
              "id": "s_1193",
              "choice_id": "present",
              "source": "initial"
            },
            {
              "id": "s_488",
              "choice_id": "present"
            },
            {
              "id": "s_418",
              "choice_id": "present"
            }
          ],
        question: null,
        choice: null,
        id: null,
        search: "",
        symptoms: [],
        searchSymptons: []
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
            console.log(res)
            if (res.should_stop) {
                console.log(res.conditions)
            } else {
                console.log(res.question)
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
        if (this.state.question.type === "single") {
            if (this.state.choice === "absent") {
                newAnswer = { id: this.state.id, choice_id: "absent"}
            } else {
                newAnswer = { id: this.state.id, choice_id: "present"}
            }
        } else {
            newAnswer = { id: this.state.choice, choice_id: "present"}
        }
        const body = { ...this.state.body }
        body['evidence'] = [...this.state.evidence, newAnswer]
        this.setState({ body: body, evidence: [...this.state.evidence, newAnswer] }, () => {

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
                console.log(res)
                if (res.should_stop) {
                    console.log(res.conditions)
                    this.setState({
                        question: null
                    })
                } else {
                    console.log(res.question)
                    this.setState({
                        question: res.question,
                        id: res.question.type === "single" ? res.question.items[0].id : null
                    })
                }
            })
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
            <Button onClick={this.questionSubmitHandler}>Submit</Button>
            </FormControl>
            {/* </form> */}
        </>
        )
    }

    symptomSearchHandler = () => {
        configObj = {
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
    
    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Grid container spacing={3} align="center" justify="center" >
                        <Grid item xs={10} >
                        <Paper>
                            <Typography>Condition Diagnostic Form </Typography>
                            <TextField onChange={this.searchForm} value={this.state.search} />
                            
                            <Button onClick={this.symptomSearchHandler}>Search</Button>
                        </Paper>
                        <>
                        {/* {this.state.searchSymptoms.length > 0 ? this.state.searchSymptoms.map({ symp => {
                            return (<Paper></Paper>)
                        }}) : null} */}
                        </>
                        <Paper>
                        <Typography component={'span'}>
                           {this.state.question? this.renderQuestion() : null }
                            {!this.state.question ? <Button onClick={this.postSymptoms}>Click me</Button> : null}
                        </Typography>
                        </Paper>
                        <Paper>
                            {!this.state.question ?
                            <Typography>Symptoms noted:<br/>
                                {this.state.symptoms.map( symp => <>symp <Button size="small">Remove</Button></>)}
                            </Typography>
                            : null}
                        </Paper>
                        </Grid>   
                    </Grid>
                    
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const msp = (state) => {
    return {patient: state.patient_details }
}

export default connect(msp)(Diagnostic)


let configObj = {
    method: "POST",
    headers: {
        "App-Key" : "f66811ac68c7729ae0a15d1f11b3799c",
        "App-Id": "521b8b77", 
        accept: "application/json",
        "content-type": "application/json"
    },
    body: JSON.stringify(
        {
            "sex": "male",
            "age": {
              "value": 30
            },
            //"extras": {"disable_groups": true},
            "evidence": [
              {
                "id": "s_1193",
                "choice_id": "present",
                "source": "initial"
              },
              {
                "id": "s_488",
                "choice_id": "present"
              },
              {
                "id": "s_418",
                "choice_id": "present"
              }, 
              {
                  "id": "s_98",
                  "choice_id": "absent"
              },
              {
                  "id": "s_1535",
                  "choice_id": "present"
              }, 
              {
                  "id": "s_1912",
                  "choice_id": "absent"
              }, 
              {
                  "id": "s_1868",
                  "choice_id": "present"
              }, 
              {
                  "id": "s_23",
                  "choice_id": "present"
              }, 
              {
                  "id": "s_25",
                  "choice_id": "absent"
              },
              {
                  "id": "s_25",
                  "choice_id": "absent"
              },
              {
                  "id": "s_22",
                  "choice_id": "absent"
              }, 
              {
                  "id": "s_1762",
                  "choice_id": "present"
              }, {
                  "id": "s_1911",
                  "choice_id": "present"
              }, {
                  "id": "s_799",
                  "choice_id": "absent"
              },
              {
                  "id": "s_625",
                  "choice_id": "absent"
              }
            ]
          }
    )
}
