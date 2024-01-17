module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
    "plugin:sonarjs/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["node_modules", "dist", "**/*.cjs", "**/*.config.*"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
  },
  plugins: ["react-refresh"],
  rules: {
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
      },
    ],
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
};
