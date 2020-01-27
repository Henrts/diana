module.exports = {
  parserOptions: {
    project: "./tsconfig.json",
    extraFileExtensions: [".mdx"],
    ecmaFeatures: { jsx: true }
  },
  extends: [
    "plugin:mdx/recommended",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint"
  ],
  rules: {
    "no-trailing-spaces": "error",
    "comma-dangle": ["error", "never"],
    "arrow-parens": ["error", "as-needed"],
    "import/extensions": [2, { commonjs: true }],
    "import/no-unresolved": "off",
    "import/no-named-as-default": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/interface-name-prefix": [
      "error",
      { prefixWithI: "always" }
    ],
    "react/prop-types": [0],
    "react/destructuring-assignment": "off",
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [".storybook/**", "**/**/*.mdx"]
      }
    ]
  }
};
