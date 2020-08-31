import React from "react";
import {storiesOf} from "@storybook/react";

import {CustomerForm} from "../CustomerForm";

storiesOf('CustomerForm', module)
    .add('CustomerForm', () => <CustomerForm />);