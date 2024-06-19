/** @type {import('@eslint/js').Linter.FlatConfig[]} */

import { fixupPluginRules } from "@eslint/compat";
import eslint from "@eslint/js";
import * as reactQueryPlugin from "@tanstack/eslint-plugin-query";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import prettierPluginRecommended from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import sonarjs from "eslint-plugin-sonarjs";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  eslint.configs.recommended,
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: true,
        ecmaVersion: "latest",
        tsconfigDirName: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: fixupPluginRules(reactPlugin),
      "react-hooks": fixupPluginRules(reactHooksPlugin),
      "@tanstack/query": fixupPluginRules(reactQueryPlugin),
      "react-refresh": reactRefreshPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...reactQueryPlugin.configs.recommended.rules,
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    ignores: [".next/*", "node_modules/*", "*.config.*", "dist/*", "*.cjs", "*.prepare.*"],
  },
  ...tseslint.configs.recommended,
  sonarjs.configs.recommended,
  prettierPluginRecommended,
];
