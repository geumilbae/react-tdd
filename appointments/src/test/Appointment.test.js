import React from "react";
import ReactDOM from 'react-dom';

import {Appointment} from '../Appointment';

describe('Appointment', () => {
    let container;
    let customer;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    const render = component => ReactDOM.render(component, container);

    it('renders the customer first name', () => {
        customer = {firstName: 'Ashley'};
        render(<Appointment customer={customer}/>);
        expect(document.body.textContent).toMatch('Ashley');
    });
    it('renders another customer first name', () => {
        customer = {firstName: 'Jordan'};
        render(<Appointment customer={customer}/>);
        expect(document.body.textContent).toMatch('Jordan');
    });
});