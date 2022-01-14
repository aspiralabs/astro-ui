// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import sidebar from "./sidebar";
import { sidebarProps } from "./sidebar.types";

describe("Test Component", () => {
  let props: sidebarProps;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<sidebar {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "harvey was here";
    const { getByTestId } = renderComponent();

    const component = getByTestId("sidebar");

    expect(component).toHaveTextContent("harvey was here");
  });
});
