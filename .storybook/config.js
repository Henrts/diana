import { configure } from "@storybook/react";
import initDefaultTheme from "../src/setup";

initDefaultTheme();

// automatically import all files ending in *.stories.js
configure(
  [
    require.context("../src/stories", true, /\.story\.tsx$/),
    require.context("../src/stories", true, /\.story\.mdx$/),
    require.context("../src/components", true, /\.story\.tsx$/),
    require.context("../src/components", true, /\.story\.mdx$/)
  ],
  module
);
