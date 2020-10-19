import {addDecorator} from "@storybook/react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const {jsxDecorator} = require("storybook-addon-jsx");

addDecorator(jsxDecorator);