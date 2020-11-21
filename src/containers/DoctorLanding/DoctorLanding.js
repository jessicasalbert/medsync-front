import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LoginContainer from '../LoginContainer/LoginContainer'
import NavBar from '../../components/NavBar/NavBar'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useStyles from './DoctorLandingStyle'
import { connect } from 'react-redux'
import Loading from '../../components/Loading/Loading'
import PatientBlurb from '../../components/PatientBlurb/PatientBlurb';
  

const DoctorLanding = (props) => {
    console.log(props)
    const classes = useStyles()

    const renderPatients = () => {
        // fetch('http://localhost:3000/api/v1/doctors/1')
        // .then(res => res.json())
        // .then(res => {
        //     return res['patients'].map(num=> {
        //         console.log(num)

        //         return (
        //             <h1>{num["name"]}</h1>
        //             // <Grid item xs={3} >
        //             //                 <Typography>
        //             //                     <Card className={classes.root}>
        //             //                     <CardContent className={classes.card}>
        //             //                         <p>Welcome to MedSync</p>
        //             //                         <img className={classes.image} src="https://thispersondoesnotexist.com/image"/>
        //             //                     </CardContent>
        //             //                     </Card>
        //             //                 </Typography>
        //             //             </Grid>
        //         )  
        //     })
            
        // })
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map( num => <PatientBlurb name={"hello"}/>)
    }

    
    return (

        
        <div > 
            {props.doctor ? 
                <Grid container spacing={3} align="center" justify="center" >
                    <Grid item xs={8} m={4}>
                        <Grid container spacing={3}>
                            {renderPatients()}
                        </Grid>

                
                </Grid>
            </Grid>

            : <Loading/>}
            </div>
    )
}

const msp = (state) => {
    return {doctor: state.doctor}
}


export default connect(msp)(DoctorLanding)