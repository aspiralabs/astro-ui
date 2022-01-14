// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import table from "./table";
import { tableProps } from "./table.types";

describe("Test Component", () => {
  let props: tableProps;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<table {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "harvey was here";
    const { getByTestId } = renderComponent();

    const component = getByTestId("table");

    expect(component).toHaveTextContent("harvey was here");
  });
});
