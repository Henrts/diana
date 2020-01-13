const createCompiler = require("@storybook/addon-docs/mdx-compiler-plugin");
const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = async ({ config }) => {
  config.resolve = {
    extensions: [".tsx", ".ts", ".js", ".json"]
  };
  config.module.rules.push({
    // "oneOf" will traverse all following loaders until one will
    // match the requirements. When no loader matches it will fall
    // back to the "file" loader at the end of the loader list.
    oneOf: [
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(stories|story)\.mdx$/,
        use: [
          {
            loader: "babel-loader",
            // may or may not need this line depending on your app's setup
            options: {
              plugins: ["@babel/plugin-transform-react-jsx"]
            }
          },
          {
            loader: "@mdx-js/loader",
            options: {
              compilers: [createCompiler({})]
            }
          }
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve("awesome-typescript-loader")
          },
          // Optional
          {
            loader: require.resolve("react-docgen-typescript-loader")
          }
        ]
      },

      // This loader is used since importing .md files via ES6 modules turn out
      // in default markdown parse and this causes some problems when rendering
      // it again in storybook info. This has to remain this way till
      // storybook releases storybook-info v4.0.0
      {
        test: /\.md.storybook$/,
        use: "raw-loader"
      },
      {
        // Exclude `js` files to keep "css" loader working as it injects
        // its runtime that would otherwise processed through "file" loader.
        // Also exclude `html` and `json` extensions so they get processed
        // by webpacks internal loaders.
        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.ejs$/, /\.json$/],
        loader: require.resolve("file-loader"),
        options: {
          name: "static/media/[name].[hash:8].[ext]"
        }
      }
    ]
  });
  return config;
};
