// import React from 'react'
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import useStyles from './PatientLoginStyle'
// import { TextField } from '@material-ui/core'
  

// const PatientLogin = (props) => {

//     const state = {
//         username: "",
//         password: ""
//     }

//     const classes = useStyles()
//     return (
//         <div > 
//             <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                 <Grid container spacing={3} align="center" justify="center" >
//                     <Grid item xs={6} >
//                     <Paper className={classes.loginBox}>
//                     <Typography>
//                         <Card className={classes.root}>
//                         <CardContent>
//                             <h3>Log In: Patient </h3>
//                             <TextField className={classes.textField} label="email"/>
//                             <TextField className={classes.textField} type="password" label="password" ></TextField>
//                         </CardContent>
//                         </Card>
//                     </Typography>
//                     </Paper>
//                     </Grid>   
//                 </Grid>
                
//                 </Grid>
//             </Grid>
//             </div>
//     )
// }

// export default PatientLogin


import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from './PatientLoginStyle'
import { TextField } from '@material-ui/core'
import { Component } from 'react'
import { Button } from '@material-ui/core'
  


    class PatientLogin extends Component {

        state = {
            email: "",
            password: ""
        }
    
        // classes = useStyles()
    
        formEdit = (e) => {
            this.setState({
                [e.target.name] : e.target.value
            })
        }
    
        submitHandler = () => {
            this.props.loginHandler(this.state)
        }
        render() {
    
            return (
                <div > 
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                        <Grid container spacing={3} align="center" justify="center" >
                            <Grid item xs={6} >
                            <Paper >
                            {/* className={classes.loginBox} */}
                            <Typography>
                                <Card >
                                {/* className={classes.root} */}
                                <CardContent>
                                    <h3>Log In: Patient </h3>
                                    <input type="text" onChange={this.formEdit} name="email" value={this.state.email}/>
                                    <input type="password" onChange={this.formEdit} name="password" value={this.state.password}/>
                                    <Button onClick={this.submitHandler}>Log in</Button>
                                    {/* <TextField onChange={this.formEdit} name={email} className={classes.textField} label="email"/>
                                    <TextField onChange={this.formEdit} className={classes.textField} name={password} type="password" label="password" ></TextField> */}
                                </CardContent>
                                </Card>
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
    
    export default PatientLogin
    