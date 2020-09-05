import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import {createContainer} from "./domManipulators";
import {CustomerForm} from "../CustomerForm";

describe("CustomerForm", () => {
    let render, container;

    beforeEach(() => {
        ({render, container} = createContainer());
    });

    const form = id => container.querySelector(`form[id="${id}"]`);
    const field = name => form('customer').elements[name];
    const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);

    it("폼이 렌더링 되는가?", () => {
        render(<CustomerForm />);
        expect(form('customer')).not.toBeNull();
    });

    it("서브밋 버튼이 있는가?", () => {
        render(<CustomerForm />);
        const submitButton = container.querySelector(
            'input[type="submit"]'
        );
        expect(submitButton).not.toBeNull();
    });

    const expectToBeInputFieldOfTypeText = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    };

    const itRendersAsTextBox = (fieldName) =>
        it("텍스트 박스 형태로 입력 필드가 렌더링 되는가?", () => {
            render(<CustomerForm />);
            expectToBeInputFieldOfTypeText(field(fieldName));
        });

    const itIncludesTheExistingValue = (fieldName) =>
        it("텍스트 필드에 기본값이 포함되어 있는가?", () => {
            render(<CustomerForm {...{[fieldName]: 'value'}} />);
            expect(field(fieldName).value).toEqual('value');
        });

    const itRendersALabel = (fieldName, text) =>
        it("필드에 라벨이 렌더링 되는가?", () => {
            render(<CustomerForm />);
            expect(labelFor(fieldName)).not.toBeNull();
            expect(labelFor(fieldName).textContent).toEqual(text);
        });

    const itAssignsAnIdThatMatchesTheLabelId = (fieldName) =>
        it("필드의 id가 라벨의 id와 같도록 설정되었는가?", () => {
            render(<CustomerForm />);
            expect(field(fieldName).id).toEqual(fieldName);
        });

    const itSubmitsExistingValue = (fieldName, value) =>
        it("서브밋을 했을 때 기존값을 저장하는가?", async () => {
            expect.hasAssertions();
            render(
                <CustomerForm
                    {...{[fieldName]: value}}
                    onSubmit={props => expect(props[fieldName]).toEqual(value)}
                />
            );
            await ReactTestUtils.Simulate.submit(form('customer'));
        });

    const itSubmitsNewValue = (fieldName, value) =>
        it("서브밋을 했을 때 새로운 값을 저장하는가?", async () => {
            expect.hasAssertions();
            render(
                <CustomerForm
                    {...{[fieldName]: 'existingValue'}}
                    onSubmit={props => expect(props[fieldName]).toEqual(value)}
                />
            );
            await ReactTestUtils.Simulate.change(
                field(fieldName),
                {
                    target: {value: 'newValue', name: fieldName}
                });
            await ReactTestUtils.Simulate.submit(form('customer'));
        });

    describe("퍼스트네임(firstName) 필드", () => {
        itRendersAsTextBox('firstName');
        itIncludesTheExistingValue('firstName');
        itRendersALabel('firstName', 'First name');
        itAssignsAnIdThatMatchesTheLabelId('firstName');
        itSubmitsExistingValue('firstName', 'value');
        itSubmitsNewValue('firstName', 'newValue');
    });
    describe("라스트네임(lastName) 필드", () => {
        itRendersAsTextBox('lastName');
        itIncludesTheExistingValue('lastName');
        itRendersALabel('lastName', 'Last name');
        itAssignsAnIdThatMatchesTheLabelId('lastName');
        itSubmitsExistingValue('lastName', 'value');
        itSubmitsNewValue('lastName', 'newValue');
    });
    describe("폰넘버(phoneNumber) 필드", () => {
        itRendersAsTextBox('phoneNumber');
        itIncludesTheExistingValue('phoneNumber');
        itRendersALabel('phoneNumber', 'Phone number');
        itAssignsAnIdThatMatchesTheLabelId('phoneNumber');
        itSubmitsExistingValue('phoneNumber', 'value');
        itSubmitsNewValue('phoneNumber', 'newValue');
    });
});
