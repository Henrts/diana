import { addParameters } from "@storybook/react";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";
import { initDefaultTheme } from "../src/setup";

initDefaultTheme();

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage
  }
});
