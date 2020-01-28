import { addParameters } from "@storybook/react";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";
import { initDefaultTheme } from "../src/setup";
import "loki/configure-react";

initDefaultTheme();

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage
  }
});
