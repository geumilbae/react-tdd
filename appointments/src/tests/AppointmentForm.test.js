import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import {createContainer} from "./domManipulators";
import {AppointmentForm} from '../AppointmentForm';
import App from "../App";

describe('AppointmentForm', () => {
    let render, container;

    beforeEach(() => {
        ({render, container} = createContainer());
    });

    const form = id => container.querySelector(`form[id="${id}"]`);
    const field = name => form('appointment').elements[name];
    const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);
    const findOption = (dropdownNode, textContent) => {
        const options = Array.from(dropdownNode.childNodes);
        return options.find(
            option => option.textContent === textContent
        );
    };

    it('폼이 렌더링 되는가?', () => {
        render(<AppointmentForm />);
        expect(form('appointment')).not.toBeNull();
    });

    describe('서비스 필드', () => {
        it('셀렉트 박스가 렌더링 되는가?', () => {
            render(<AppointmentForm />);
            expect(field('service')).not.toBeNull();
            expect(field('service').tagName).toEqual('SELECT');
        });
        it('처음에는 선택된 것이 없는 상태인가?', () => {
            render(<AppointmentForm />);
            const firstNode = field('service').childNodes[0];
            expect(firstNode.value).toEqual('');
            expect(firstNode.selected).toBeTruthy();
        });
        it('가용한 살롱 서비스가 모두 선택지에 있는가?', () => {
            const selectableServices = ['Cut', 'Blow-dry'];
            render(
                <AppointmentForm selectableServices={selectableServices} />
            );
            const optionNodes = Array.from(field('service').childNodes);
            // 배열.map((요소, 인덱스, 배열) => { return 요소 }); 형태로, 새로운 배열을 만듭니다.
            const renderedServices = optionNodes.map(node => node.textContent);
            expect(renderedServices).toEqual(expect.arrayContaining(selectableServices));
        });
        it('주어진 값을 미리 선택해두는 것이 가능한가?', () => {
            const services = ['Cut', 'Blow-dry'];
            // 주어진 서비스 리스트와 선택할 서비스명을 폼에 보냅니다.
            render(<AppointmentForm selectableServices={services} service="Blow-dry" />);
            // 서비스 리스트에서 Blow-dry 옵션 노드를 찾아서 기억합니다.
            const option = findOption(field('service'), 'Blow-dry');
            // 이 옵션이 화면상에 선택되어 있는지 확인합니다.
            expect(option.selected).toBeTruthy();
        });
        it('라벨이 렌더링 되는가?', () => {
            render(<AppointmentForm />);
            expect(labelFor('service')).not.toBeNull();
            expect(labelFor('service').textContent).toEqual('Salon service');
        });
        it('아이디가 라벨의 아이디와 같은가?', () => {
            render(<AppointmentForm />);
            expect(field('service').id).toEqual('service');
        });
        it('값을 제출했을 때 기존 값을 저장하는가?', async () => {
            expect.hasAssertions();
            render(
                <AppointmentForm
                    service="Blow-dry"
                    onSubmit={({service}) => expect(service).toEqual('Blow-dry')}
                />
            );
            await ReactTestUtils.Simulate.submit(form('appointment'));
        });
        it('값을 제출했을 때 새로운 값을 저장하는가?', async () => {
            expect.hasAssertions();
            render(
                <AppointmentForm
                    service="Blow-dry"
                    onSubmit={({service}) => expect(service).toEqual('Cut')}
                />
            );
            await ReactTestUtils.Simulate.change(field('service'), {
                target: {value: 'Cut', name: 'service'}
            });
            await ReactTestUtils.Simulate.submit(form('appointment'));
        });
    });

   const timeSlotTable = () => container.querySelector('table#time-slots');

    describe('타임 슬롯 테이블', () => {
        it('타임 슬롯 테이블이 렌더링 되는가?', () => {
            render(<AppointmentForm />);
            expect(timeSlotTable()).not.toBeNull();
        });
        it('개장시각과 폐장시각 사이 30분 간격으로 타임슬롯이 가장 왼쪽의 헤더 컬럼 형태로 렌더링 되는가?', () => {
            render(<AppointmentForm salonOpensAt={9} salonClosesAt={11} />);
            const timesOfDay = timeSlotTable().querySelectorAll('tbody >* th');
            expect(timesOfDay).toHaveLength(4);
            expect(timesOfDay[0].textContent).toEqual('09:00');
            expect(timesOfDay[1].textContent).toEqual('09:30');
            expect(timesOfDay[3].textContent).toEqual('10:30');
        });
        it('헤더 로우의 첫 번째 셀이 비어있는 채로 렌더링 되는가?', () => {
            render(<AppointmentForm />);
            const headerRow = timeSlotTable().querySelector('thead > tr');
            expect(headerRow.firstChild.textContent).toEqual('');
        });
        it('오늘을 기준으로 일주일간의 요일을 표시한 헤더 로우가 렌더링 되는가?', () => {
            const today = new Date(2018, 11, 1);
            render(<AppointmentForm today={today} />);
            const dates = timeSlotTable().querySelectorAll(
                'thead >* th:not(:first-child)'
            );
            expect(dates).toHaveLength(7);
            expect(dates[0].textContent).toEqual('Sat 01');
            expect(dates[1].textContent).toEqual('Sun 02');
            expect(dates[6].textContent).toEqual('Fri 07');
        });
    });
});