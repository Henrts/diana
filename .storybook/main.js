const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

module.exports = {
  stories: [
    '../modules/**/*.story.(tsx|mdx)',
    '../stories/**/*.story.(tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs/register',
  ],
  webpackFinal: async config => {
    config.resolve = {
      extensions: ['.tsx', '.ts', '.js', '.json'],
    };
    config.module.rules.push({
      oneOf: [
        {
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(stories|story)\.mdx$/,
          use: [
            {
              loader: 'babel-loader',
              // may or may not need this line depending on your app's setup
              options: {
                plugins: ['@babel/plugin-transform-react-jsx'],
              },
            },
            {
              loader: '@mdx-js/loader',
              options: {
                compilers: [createCompiler({})],
              },
            },
          ],
        },
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: require.resolve('awesome-typescript-loader'),
            },
            // Optional
            {
              loader: require.resolve('react-docgen-typescript-loader'),
            },
          ],
        },
        {
          test: /\.md.storybook$/,
          use: 'raw-loader',
        },
        {
          // Exclude `js` files to keep "css" loader working as it injects
          // its runtime that would otherwise processed through "file" loader.
          // Also exclude `html` and `json` extensions so they get processed
          // by webpacks internal loaders.
          exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.ejs$/, /\.json$/],
          loader: require.resolve('file-loader'),
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ],
    });
    return config;
  },
};
