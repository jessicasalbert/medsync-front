// import * as React from 'react';
// import Paper from '@material-ui/core/Paper';
// import { ViewState } from '@devexpress/dx-react-scheduler';
// import {
//   Scheduler,
//   WeekView,
//   MonthView,
//   TodayButton,
//   Appointments,
//   DateNavigator
// } from '@devexpress/dx-react-scheduler-material-ui';
// import { Toolbar } from '@devexpress/dx-react-scheduler';

// const currentDate = '2020-11-26';
// const schedulerData = [
//   { startDate: '2020-11-27T11:10', endDate: '2020-11-27T12:50', title: 'Meeting' },
//   { startDate: '2020-11-27T12:00', endDate: '2020-11-27T13:30', title: 'Go to a gym' },
// ];

// const MdCalendar = (props) => (
//   <Paper>
//       <Paper>
//         <Scheduler
//           data={schedulerData}
//         >
//           <ViewState
//             defaultCurrentDate={currentDate}
//           />
//           <MonthView />
//           <Toolbar />
//           <DateNavigator />
//           <TodayButton />
//           <Appointments />
//         </Scheduler>
//       </Paper>
//   </Paper>
// );

// export default MdCalendar

import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
  AppointmentTooltip
} from '@devexpress/dx-react-scheduler-material-ui';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import useStyles from './MdCalendarStyle'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const ExternalViewSwitcher = ({
  currentViewName,
  onChange,
}) => (
  <RadioGroup
    aria-label="Views"
    style={{ flexDirection: 'row' }}
    name="views"
    value={currentViewName}
    onChange={onChange}
  >
    <FormControlLabel value="Week" control={<Radio />} label="Week" />
    <FormControlLabel value="Work Week" control={<Radio />} label="Work Week" />
    <FormControlLabel value="Month" control={<Radio />} label="Month" />
  </RadioGroup>
);


class MdCalendar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.appointments ? props.appointments.map( appt => { 
          return {title: appt.title, startDate: appt.start_date, endDate: appt.end_date }}) : [],
      currentViewName: 'Month',
    };

    this.currentViewNameChange = (e) => {
      this.setState({ currentViewName: e.target.value });
    };
  }

  render() {
    const { data, currentViewName } = this.state;
    const { classes } = this.props

    return (
    <>
    {!this.props.appointments ? 
    <Redirect to="/mypatients"/> : 
      <React.Fragment>
        <ExternalViewSwitcher
          currentViewName={currentViewName}
          onChange={this.currentViewNameChange}
        />

        <Paper className={classes.root}>
          <Scheduler
            data={data}
            height={660}
          >
            <ViewState
              defaultCurrentDate="2020-11-28"
              currentViewName={currentViewName}
            />
            <WeekView
              startDayHour={8}
              endDayHour={17}
            />
            <WeekView
              name="Work Week"
              excludedDays={[0, 6]}
              startDayHour={8}
              endDayHour={17}
            />
            <MonthView />
            <Toolbar />
            <DateNavigator className={classes.root}/>
            <TodayButton />
            <Appointments />
            <AppointmentTooltip
            showCloseButton
            showOpenButton
          />
          </Scheduler>
        </Paper>
        
      </React.Fragment>
    }
    </>
    );
  }
}

const msp = (state) => {
    return {appointments: state.md_appointments}
}

export default connect(msp)(withStyles(useStyles, { withTheme: true })(MdCalendar))