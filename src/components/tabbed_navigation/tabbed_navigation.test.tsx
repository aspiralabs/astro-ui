// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import tabbed_navigation from "./tabbed_navigation";
import { tabbed_navigationProps } from "./tabbed_navigation.types";

describe("Test Component", () => {
  let props: tabbed_navigationProps;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<tabbed_navigation {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "harvey was here";
    const { getByTestId } = renderComponent();

    const component = getByTestId("tabbed_navigation");

    expect(component).toHaveTextContent("harvey was here");
  });
});
