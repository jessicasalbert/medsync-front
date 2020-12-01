import { Button, List, ListItem, MenuItem, Grid, Typography, Paper, TextField, RadioGroup, Radio, FormControl, FormControlLabel } from '@material-ui/core'
import { SignalCellularNullRounded } from '@material-ui/icons'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// const question= {
//     items: [
//         {
//             choices: [
//                 {
//                     id: "present",
//                     label: "Yes"
//                 },
//                 {
//                     id: "absent",
//                     label: "No"
//                 },
//                 {
//                     id: "unknown",
//                     label: "Don't know"
//                 }
//             ],
//             id: "s_1762",
//             name: "Headache"
//         }
//     ], 
//     text: "Are your heachaches triggered...",
//     type: "single"
// }

// const questionGroupSingle= {
//     items: [
//         {
//             choices: [
//                 {
//                     id: "present",
//                     label: "Yes"
//                 },
//                 {
//                     id: "absent",
//                     label: "No"
//                 },
//                 {
//                     id: "unknown",
//                     label: "Don't know"
//                 }
//             ],
//             id: "s_1762",
//             name: "Back of head"
//         },
//         {
//             choices: [
//                 {
//                     id: "present",
//                     label: "Yes"
//                 },
//                 {
//                     id: "absent",
//                     label: "No"
//                 },
//                 {
//                     id: "unknown",
//                     label: "Don't know"
//                 }
//             ],
//             id: "s_201",
//             name: "All over head"
//         }
//     ], 
//     text: "Are your heachaches triggered...",
//     type: "single"
// }

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
                console.log(res)
                if (res.should_stop) {
                    console.log(res.conditions)
                    this.setState({
                        question: null,
                        complete: true
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

    addSymp = (symp) => {
        console.log(symp)
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
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Grid container spacing={3} align="center" justify="center" >
                        <Grid item xs={10} >
                        {this.state.complete ? <><Typography>Interview complete!</Typography><p>Your doctor will receive the results.</p>
                        <br/> <Link to="/mymeds"><Button>Back to Profile</Button></Link></>: 
                        <>
                        <Paper>
                            <Typography>Condition Diagnostic Form </Typography><br/>
                            {this.state.interview? null :<TextField onChange={this.searchForm} value={this.state.search} />}
                            {/* {this.state.searchSymptoms.length === 0 ? <TextField onChange={this.searchForm} value={this.state.search} /> : 
                            <TextField onChange={this.updateSymptoms} value={this.state.search} select>
                                {this.state.searchSymptoms.map(symp => {
                                    return( <MenuItem  value={symp}>{symp.name}</MenuItem> )

                                })}
                            </TextField> }
                             */}
                            <Button onClick={this.symptomSearchHandler}>Search Symptoms</Button>
                        </Paper>
                        <>
                        {this.state.searchSymptoms.length > 0 ? this.state.searchSymptoms.map( symp => {
                            return (<Paper onClick={() => this.addSymp(symp)}>{symp.label}</Paper>)
                        }) : null}
                        <br/>
                        </>
                        
                        <Paper>
                            {!this.state.question ?
                            <Typography>Symptoms indicated:<br/>
                  
                                {this.state.symptoms.map( symp => <>-{symp.label}<br/> </>)}
  
                            </Typography>
                            : null}
                        </Paper>
                        <br/>
                        <Paper>
                        <Typography component={'span'}>
                           {this.state.question && !this.state.complete? this.renderQuestion() : null }
                           
                            {!this.state.question && !this.state.complete ? <Button variant="outlined"onClick={this.postSymptoms}>Begin interview</Button> : null}
                        </Typography>
                        </Paper>
                        
                        </>
                        }
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


// let configObj = {
//     method: "POST",
//     headers: {
//         "App-Key" : "f66811ac68c7729ae0a15d1f11b3799c",
//         "App-Id": "521b8b77", 
//         accept: "application/json",
//         "content-type": "application/json"
//     },
//     body: JSON.stringify(
//         {
//             "sex": "male",
//             "age": {
//               "value": 30
//             },
//             //"extras": {"disable_groups": true},
//             "evidence": [
//               {
//                 "id": "s_1193",
//                 "choice_id": "present",
//                 "source": "initial"
//               },
//               {
//                 "id": "s_488",
//                 "choice_id": "present"
//               },
//               {
//                 "id": "s_418",
//                 "choice_id": "present"
//               }, 
//               {
//                   "id": "s_98",
//                   "choice_id": "absent"
//               },
//               {
//                   "id": "s_1535",
//                   "choice_id": "present"
//               }, 
//               {
//                   "id": "s_1912",
//                   "choice_id": "absent"
//               }, 
//               {
//                   "id": "s_1868",
//                   "choice_id": "present"
//               }, 
//               {
//                   "id": "s_23",
//                   "choice_id": "present"
//               }, 
//               {
//                   "id": "s_25",
//                   "choice_id": "absent"
//               },
//               {
//                   "id": "s_25",
//                   "choice_id": "absent"
//               },
//               {
//                   "id": "s_22",
//                   "choice_id": "absent"
//               }, 
//               {
//                   "id": "s_1762",
//                   "choice_id": "present"
//               }, {
//                   "id": "s_1911",
//                   "choice_id": "present"
//               }, {
//                   "id": "s_799",
//                   "choice_id": "absent"
//               },
//               {
//                   "id": "s_625",
//                   "choice_id": "absent"
//               }
//             ]
//           }
//     )
// }
