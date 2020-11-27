import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = '2020-11-26';
const schedulerData = [
  { startDate: '2020-11-27T11:10', endDate: '2020-11-27T12:50', title: 'Meeting' },
  { startDate: '2020-11-27T12:00', endDate: '2020-11-27T13:30', title: 'Go to a gym' },
];

const MdCalendar = () => (
  <Paper>
    <Scheduler
      data={schedulerData}
    >
      <ViewState
        currentDate={currentDate}
      />
      <WeekView
        startDayHour={9}
        endDayHour={14}
      />
      <Appointments />
    </Scheduler>
  </Paper>
);

export default MdCalendar