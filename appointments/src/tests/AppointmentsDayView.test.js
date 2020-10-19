import React from "react";
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import {
    Appointment,
    AppointmentsDayView
} from '../AppointmentsDayView';

describe('Appointment', () => {
    let container;
    let customer;

    beforeEach(() => {
        container = document.createElement('div');
    });

    const render = component => ReactDOM.render(component, container);

    it('고객의 퍼스트네임이 화면에 표시되는가?', () => {
        customer = {firstName: 'Ashley'};
        render(<Appointment customer={customer} />);
        expect(container.textContent).toMatch('Ashley');
    });
    it('또다른 고객의 퍼스트네임도 화면에 표시되는가?', () => {
        customer = {firstName: 'Jordan'};
        render(<Appointment customer={customer} />);
        expect(container.textContent).toMatch('Jordan');
    });
});

describe('AppointmentsDayView', () => {
    let container;
    const today = new Date();
    const appointments = [
        {
            startsAt: today.setHours(12, 0),
            customer: {firstName: 'Ashley'}
        },
        {
            startsAt: today.setHours(13, 0),
            customer: {firstName: 'Jordan'}
        }
    ];

    beforeEach(() => {
        container = document.createElement('div');
    });

    const render = component => ReactDOM.render(component, container);

    it('화면에 이 컴포넌트를 가리키는 id를 가진 div가 표시되는가?', () => {
        render(<AppointmentsDayView appointments={[]} />);
        expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
    });
    it('여러 개의 appointments가 ol 태그 안에 표시되는가?', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelector('ol')).not.toBeNull();
        expect(container.querySelector('ol').children).toHaveLength(2);
    });
    it('각각의 appointment가 li 태그 안에 존재하면서, 예약 시간을 제대로 화면에 표시하는가?', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelectorAll('li')).toHaveLength(2);
        expect(
            container.querySelectorAll('li')[0].textContent
        ).toEqual('12:00');
        expect(
            container.querySelectorAll('li')[1].textContent
        ).toEqual('13:00');
    });
    it('아직 예약한 내용이 하나도 없으면 예약이 없다는 메시지를 화면에 출력하는가?', () => {
        render(<AppointmentsDayView appointments={[]} />);
        expect(container.textContent).toMatch(
            'There are no appointments scheduled for today.'
        );
    });
    it('입력되어있는 예약 중에서 기본적으로 첫 번째 데이터가 선택되어 있는가?', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.textContent).toMatch('Ashley');
    });
    it('각 li 태그 엘리먼트에 button 엘리먼트가 들어 있는가?', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelectorAll('li > button')).toHaveLength(2);
        expect(container.querySelectorAll('li > button')[0].type).toEqual('button');
    });
    it('다른 예약을 선택했을 때 화면에 정보가 잘 표시되는가?', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        const button = container.querySelectorAll('button')[1];
        ReactTestUtils.Simulate.click(button);
        expect(container.textContent).toMatch('Jordan');
    });
});
