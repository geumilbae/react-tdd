import React from "react";
import {createContainer} from "./domManipulators";
import {CustomerForm} from "../CustomerForm";

describe("CustomerForm", () => {
    let render, container;

    beforeEach(() => {
        ({render, container} = createContainer());
    });

    it("폼이 렌더링 되는가?", () => {
        render(<CustomerForm />);
        expect(
            container.querySelector('form[id="customer"]')
        ).not.toBeNull();
    });
});