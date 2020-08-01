module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: "module",
    ecmaVersion: 2018,
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "prettier",
    "jsx-a11y",
    "react-hooks",
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "prettier/react",
    "prettier/standard",
    "prettier/@typescript-eslint",
  ],
  rules: {
    // overrides
    "no-case-declarations": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "react/jsx-no-undef": [2, { allowGlobals: true }],
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      { accessibility: "no-public" },
    ],
    // '@typescript-eslint/semi': [2, 'always'],
    "@typescript-eslint/member-delimiter-style": [
      2,
      {
        multiline: {
          delimiter: "none",
          requireLast: false,
        },
        singleline: {
          delimiter: "semi",
          requireLast: true,
        },
      },
    ],
    "prettier/prettier": [
      "error",
      {
        printWidth: 100,
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        bracketSpacing: true,
        arrowParens: "always",
        trailingComma: "es5",
      },
    ],
    "no-console": 0,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
