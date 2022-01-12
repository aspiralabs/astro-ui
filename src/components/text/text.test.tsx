// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import text from "./text";
import { textProps } from "./text.types";

describe("Test Component", () => {
  let props: textProps;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<text {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "harvey was here";
    const { getByTestId } = renderComponent();

    const component = getByTestId("text");

    expect(component).toHaveTextContent("harvey was here");
  });
});
