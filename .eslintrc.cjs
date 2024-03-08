module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:sonarjs/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["node_modules", "dist", "**/*.cjs", "**/*.config.*", "**/*.prepare.*"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  settings: {
    "import/resolver": {
      typescript: true,
    },
  },
  plugins: ["react-refresh", "formatjs"],
  rules: {
    "import/order": [
      "error",
      {
        groups: ["external", "index", "internal", "builtin", "object", "type", "parent", "sibling"],
        "newlines-between": "always",
      },
    ],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
      },
    ],
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
  },
};
