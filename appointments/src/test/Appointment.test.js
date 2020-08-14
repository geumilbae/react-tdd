import React from "react";
import ReactDOM from 'react-dom';

import {Appointment} from '../Appointment';

describe('Appointment', () => {
    it('renders the customer first name', () => {
        const customer = {firstName: 'Ashley'};
        const container = document.createElement('div');
        document.body.appendChild(container);

        ReactDOM.render(<Appointment customer={customer}/>, container);

        expect(document.body.textContent).toMatch('Ashley');
    });
    it('renders another customer first name', () => {
        const customer = {firstName: 'Jordan'};
        const container = document.createElement('div');
        document.body.appendChild(container);

        ReactDOM.render(<Appointment customer={customer}/>, container);

        expect(document.body.textContent).toMatch('Jordan');
    });
});