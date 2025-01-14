module.exports = {
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true,
  },
  extends: ["plugin:react/recommended", "prettier"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  // http://eslint.cn/docs/rules/
  rules: {
    // react
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/no-children-prop": "off",

    // base
    quotes: ["error", "double"],
    "no-console": "off",
    "no-debugger": "error",
    "react/display-name": "off",
  },
};
