const plugins = [
  [
    "inline-react-svg",
    {
      svgo: {
        plugins: [
          {
            removeAttrs: { attrs: "(data-name)" }
          },
          {
            cleanupIDs: true
          }
        ]
      }
    }
  ]
];

const presets = [
  [
    "@babel/preset-typescript",
    {
      isTSX: true,
      allExtensions: true
    }
  ],
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1"
      }
    }
  ],
  "@babel/preset-react"
];

module.exports = {
  presets,
  plugins
};
