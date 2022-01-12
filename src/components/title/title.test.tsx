// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import title from "./title";
import { titleProps } from "./title.types";

describe("Test Component", () => {
  let props: titleProps;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<title {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "harvey was here";
    const { getByTestId } = renderComponent();

    const component = getByTestId("title");

    expect(component).toHaveTextContent("harvey was here");
  });
});
