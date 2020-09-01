import React from "react";
import {createContainer} from "./domManipulators";
import {CustomerForm} from "../CustomerForm";

describe("CustomerForm", () => {
    let render, container;

    beforeEach(() => {
        ({render, container} = createContainer());
    });

    const form = id => container.querySelector(`form[id="${id}"]`);
    const expectToBeInputFieldOfTypeText = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    };
    const firstNameField = () => form('customer').elements.firstName;

    it("폼이 렌더링 되는가?", () => {
        render(<CustomerForm />);
        expect(form('customer')).not.toBeNull();
    });
    it("텍스트 박스 형태로 퍼스트네임 입력 필드가 렌더링 되는가?", () => {
        render(<CustomerForm />);
        expectToBeInputFieldOfTypeText(firstNameField());
    });
    it("텍스트 필드에 기본 퍼스트네임이 포함되어 있는가?", () => {
        render(<CustomerForm firstName="Ashley" />);
        expect(firstNameField().value).toEqual('Ashley');
    });
});