// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import astro from "./astro";
import { astroProps } from "./astro.types";

describe("Test Component", () => {
  let props: astroProps;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<astro {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "harvey was here";
    const { getByTestId } = renderComponent();

    const component = getByTestId("astro");

    expect(component).toHaveTextContent("harvey was here");
  });
});
