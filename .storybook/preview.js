import { addParameters } from "@storybook/react";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";
import { themes } from "@storybook/theming";
import { initDefaultTheme } from "../modules/base/setup";
import "loki/configure-react";

initDefaultTheme();

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
    theme: themes.dark
  }
});
