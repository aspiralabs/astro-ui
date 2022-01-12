// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import form from "./form";
import { formProps } from "./form.types";

describe("Test Component", () => {
  let props: formProps;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<form {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "harvey was here";
    const { getByTestId } = renderComponent();

    const component = getByTestId("form");

    expect(component).toHaveTextContent("harvey was here");
  });
});
