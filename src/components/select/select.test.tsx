// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import select from "./select";
import { selectProps } from "./select.types";

describe("Test Component", () => {
  let props: selectProps;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<select {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "harvey was here";
    const { getByTestId } = renderComponent();

    const component = getByTestId("select");

    expect(component).toHaveTextContent("harvey was here");
  });
});
