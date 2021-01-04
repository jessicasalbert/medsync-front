import * as React from 'react';
import { Paper, Radio, RadioGroup, FormControlLabel, withStyles } from '@material-ui/core/';
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
import useStyles from './MdCalendarStyle'
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
      data: this.props.appointments ? 
        props.appointments.map( appt => { 
          return {title: appt.title, startDate: appt.start_date, endDate: appt.end_date }
        }) : [],
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
              defaultCurrentDate="2020-12-04"
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