import typescript from "rollup-plugin-typescript2";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import url from "rollup-plugin-url";
import svgr from "@svgr/rollup";

// eslint-disable-next-line import/extensions
import pkg from "./package.json";

export default {
  input: "src/index.ts",
  external: ["react-svg"],
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    url(),
    svgr(),
    resolve({
      browser: true
    }),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    babel({
      babelrc: false,
      exclude: ["node_modules/**"],
      ignore: ["**/*.scss"],
      presets: [["es2015", { modules: false }], "stage-0", "react"],
      plugins: ["external-helpers"]
    }),
    commonjs({
      include: "node_modules/**",
      exclude: ["**/*.stories.js"],
      namedExports: {
        "../../node_modules/react/index.js": [
          "React",
          "cloneElement",
          "createElement",
          "PropTypes",
          "Children",
          "Component"
        ]
      }
    })
  ]
};
