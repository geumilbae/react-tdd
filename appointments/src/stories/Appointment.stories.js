import React from "react";
import {storiesOf} from "@storybook/react";

import {Appointment, AppointmentsDayView} from '../Appointment';

export const customer = {
    firstName: "Ashley"
}

storiesOf('Appointment', module)
    .add('Appointment', () => <Appointment customer={customer} />)
    .add('AppointmentsDayView', () => <AppointmentsDayView />);