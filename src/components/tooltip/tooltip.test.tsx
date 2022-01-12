// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import tooltip from "./tooltip";
import { tooltipProps } from "./tooltip.types";

describe("Test Component", () => {
  let props: tooltipProps;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<tooltip {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "harvey was here";
    const { getByTestId } = renderComponent();

    const component = getByTestId("tooltip");

    expect(component).toHaveTextContent("harvey was here");
  });
});
