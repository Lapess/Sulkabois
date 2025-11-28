module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  plugins: ["@typescript-eslint", "unused-imports", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // integrates Prettier
    "next/core-web-vitals",
  ],
  rules: {
    // Disable default unused vars
    "no-unused-vars": "off",

    // Remove unused imports automatically
    "unused-imports/no-unused-imports": "error",

    // Warn on unused variables
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],

    // Prettier formatting
    "prettier/prettier": "error",
  },
};
