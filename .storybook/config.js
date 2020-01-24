import { configure } from "@storybook/react";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";
import { initDefaultTheme } from "../src/setup";

initDefaultTheme();

configure(
  [
    require.context("../src/stories", true, /\.story\.tsx$/),
    require.context("../src/stories", true, /\.story\.mdx$/),
    require.context("../src/modules", true, /\.story\.tsx$/),
    require.context("../src/modules", true, /\.story\.mdx$/)
  ],
  module
);
