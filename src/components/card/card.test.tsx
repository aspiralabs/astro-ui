// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import card from "./card";
import { cardProps } from "./card.types";

describe("Test Component", () => {
  let props: cardProps;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<card {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "harvey was here";
    const { getByTestId } = renderComponent();

    const component = getByTestId("card");

    expect(component).toHaveTextContent("harvey was here");
  });
});
