import React from "react";
import {storiesOf} from "@storybook/react";

import {Appointment, AppointmentsDayView} from '../AppointmentsDayView';

export const customer = {
    firstName: "Ashley"
}

const today = new Date()

export const appointments = [
    {
        startsAt: today.setHours(12, 0),
        customer: {firstName: 'Ashley'}
    },
    {
        startsAt: today.setHours(13, 0),
        customer: {firstName: 'Jordan'}
    }
];

storiesOf('Appointment', module)
    .add('Appointment', () => <Appointment customer={customer} />)
    .add('AppointmentsDayView', () => <AppointmentsDayView appointments={appointments} />);