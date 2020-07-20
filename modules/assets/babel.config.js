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
      modules: process.env.MODULE || false
    }
  ],
  "@babel/preset-react"
];

module.exports = {
  presets,
  plugins
};
