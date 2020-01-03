import React from "react";
import { cleanup, render, RenderResult } from "@testing-library/react";
import initDefaultTheme from "../../setup";
import BaseButton from "./BaseButton";

initDefaultTheme();

afterEach(cleanup);

describe("<BaseButton />", () => {
  let container: RenderResult | any = null;
  beforeEach(() => {
    container = render(<BaseButton>Base</BaseButton>);
  });

  test("should render component", () => {
    expect(container).toBeTruthy();
  });

  test("should render children", () => {
    const { getByText } = container;
    getByText("Base");
  });
});
