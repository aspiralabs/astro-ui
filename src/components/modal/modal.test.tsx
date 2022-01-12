// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import modal from "./modal";
import { modalProps } from "./modal.types";

describe("Test Component", () => {
  let props: modalProps;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<modal {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "harvey was here";
    const { getByTestId } = renderComponent();

    const component = getByTestId("modal");

    expect(component).toHaveTextContent("harvey was here");
  });
});
