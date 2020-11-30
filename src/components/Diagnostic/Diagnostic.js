import { Button, Grid, Typography, Paper, RadioGroup, Radio, FormControl, FormControlLabel } from '@material-ui/core'
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
            age: {
                value: this.props.patient.age
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
        question: question,
        choice: null,
        no: false
    }

    postSymptoms = () => {
        const body = this.state.body
        body['evidence'] = this.state.evidence
        const config = {
            method: "POST",
            headers: {
                "App-Key" : "f66811ac68c7729ae0a15d1f11b3799c",
                "App-Id": "521b8b77", 
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
                this.setState({questions: res.question})
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
            null
         )
     }

     questionSubmitHandler = () => {
        let newAnswer
        if (this.state.question.type === "single") {
            if (this.state.no) {
                newAnswer = { id: this.state.choice, choice_id: "absent"}
            } else {
                newAnswer = { id: this.state.choice, choice_id: "present"}
            }
        } else {
            newAnswer = { id: this.state.choice, choice_id: "present"}
        }
        
     }

     formEdit = (e) => {
        this.setState({
            choice: e.target.value,
            no: null
        })
     }

    renderQuestion = () => {
        return (
            <>
            <form onSubmit={this.questionSubmitHandler()}>
            <FormControl component="fieldset">
                <RadioGroup aria-label="question" value={this.state.choice} name="choice" onChange={this.formEdit}>
            
            
            <p>{this.state.question.text}</p>
            {this.state.question.type === 'single' ? 
                
                <p>{this.createButtonsSingle()}</p>

            
        // <h1>single</h1> 
        :

        <p>{this.createButtonsMulti()}</p>
            
        }
                </RadioGroup>
            </FormControl>
            </form>
        </>
        )
    }
    
    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Grid container spacing={3} align="center" justify="center" >
                        <Grid item xs={6} >
                        <Paper  >
                        
                        <Typography component={'span'}>
                           {this.state.question? this.renderQuestion() : null }
                            <Button onClick={this.postSymptoms}>Click me</Button>
                        </Typography>
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
