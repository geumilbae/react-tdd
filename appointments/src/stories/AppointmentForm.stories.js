import React from "react";
import {storiesOf} from "@storybook/react";

import {AppointmentForm} from '../AppointmentForm';

storiesOf('AppointmentForm', module)
    .add('default', () => <AppointmentForm />)
    .add('service selected', () => <AppointmentForm service="Blow-dry" />)

