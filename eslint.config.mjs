/** @type {import('@eslint/js').Linter.FlatConfig[]} */

import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import parser from "@typescript-eslint/parser";
import esimport from "eslint-plugin-import";
import esjsxa11y from "eslint-plugin-jsx-a11y";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import esreact from "eslint-plugin-react";
import sonarjs from "eslint-plugin-sonarjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
});

const config = [
  ...compat.extends(
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser,
      parserOptions: {
        project: true,
        tsconfigDirName: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...esimport.configs["recommended"].rules,
      "import/order": [
        "error",
        {
          groups: ["external", "index", "internal", "builtin", "object", "type", "parent", "sibling"],
          "newlines-between": "always",
        },
      ],
      "import/prefer-default-export": "off",
      "react/function-component-definition": ["error", { namedComponents: "arrow-function" }],
    },
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
    plugins: { import: esimport, react: esreact, "jsx-a11y": esjsxa11y },
  },
  {
    ignores: [".next/*", "node_modules/*", "*.config.*", "dist/*", "*.cjs"],
  },
  sonarjs.configs.recommended,
  eslintPluginPrettierRecommended,
];

export default config;
