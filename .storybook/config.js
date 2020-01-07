import { configure } from "@storybook/react";
import { initDefaultTheme } from "../src/setup";

initDefaultTheme();

// automatically import all files ending in *.stories.js

if (module.hot) {
  module.hot.accept();
}

configure(
  [
    require.context("../src/stories", true, /\.story\.tsx$/),
    require.context("../src/stories", true, /\.story\.mdx$/),
    require.context("../src/modules", true, /\.story\.tsx$/),
    require.context("../src/modules", true, /\.story\.mdx$/)
  ],
  module
);
