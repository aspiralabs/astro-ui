// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import badge from "./badge";
import { badgeProps } from "./badge.types";

describe("Test Component", () => {
  let props: badgeProps;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<badge {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "harvey was here";
    const { getByTestId } = renderComponent();

    const component = getByTestId("badge");

    expect(component).toHaveTextContent("harvey was here");
  });
});
