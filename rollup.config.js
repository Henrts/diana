import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import svgr from "@svgr/rollup";
import dts from "rollup-plugin-dts";

// eslint-disable-next-line import/extensions
import pkg from "./package.json";

const config = [
  {
    input: "src/index.ts",
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
      resolve({ preferBuiltins: true }),
      typescript({
        rollupCommonJSResolveHack: false,
        clean: true
      }),
      commonjs({
        namedExports: {
          // left-hand side can be an absolute path, a path
          // relative to the current directory, or the name
          // of a module in node_modules
          "rtl-css-js/core": ["convertProperty"]
        }
      })
    ],
    external: ["react-svg"]
  },
  {
    input: "./ydesign.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()]
  }
];

export default config;
