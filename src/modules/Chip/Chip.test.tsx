import React from "react";
import { cleanup, render, RenderResult } from "@testing-library/react";
import initDefaultTheme from "../../setup";
import BaseChip from "./BaseChip";

initDefaultTheme();

afterEach(cleanup);

describe("<BaseChip />", () => {
  let container: RenderResult | any = null;
  beforeEach(() => {
    container = render(<BaseChip>Chip</BaseChip>);
  });

  test("should render component", () => {
    expect(container).toBeTruthy();
  });

  test("should render children", () => {
    const { getByText } = container;
    getByText("Chip");
  });
});
