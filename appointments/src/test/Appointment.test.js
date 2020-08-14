import React from "react";
import ReactDOM from 'react-dom';

import {Appointment} from '../Appointment';

describe('Appointment', () => {
    let container;
    let customer;

    beforeEach(() => {
        container = document.createElement('div');
    });

    const render = component => ReactDOM.render(component, container);

    it('renders the customer first name', () => {
        customer = {firstName: 'Ashley'};
        document.body.appendChild(container);

        render(<Appointment customer={customer}/>);

        expect(document.body.textContent).toMatch('Ashley');
    });
    it('renders another customer first name', () => {
        customer = {firstName: 'Jordan'};
        document.body.appendChild(container);

        render(<Appointment customer={customer}/>);

        expect(document.body.textContent).toMatch('Jordan');
    });
});