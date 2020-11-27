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
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import useStyles from './MdCalendarStyle'
import { withStyles } from '@material-ui/core'

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
      data: [{ startDate: '2020-11-27T11:10', endDate: '2020-11-27T12:50', title: 'Meeting', details: "heie" },
        { startDate: '2020-11-27T12:00', endDate: '2020-11-27T13:30', title: 'Go to a gym' }

      ],
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
              defaultCurrentDate="2020-11-25"
              currentViewName={currentViewName}
            />
            <WeekView
              startDayHour={10}
              endDayHour={19}
            />
            <WeekView
              name="Work Week"
              excludedDays={[0, 6]}
              startDayHour={9}
              endDayHour={19}
            />
            <MonthView />
            <Toolbar />
            <DateNavigator className={classes.root}/>
            <TodayButton />
            <Appointments />
          </Scheduler>
        </Paper>
        
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(MdCalendar)