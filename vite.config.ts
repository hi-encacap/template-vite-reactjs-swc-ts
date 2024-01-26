/// <reference types="vitest" />

import eslintPlugin from "@nabla/vite-plugin-eslint";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import webfontDownload from "vite-plugin-webfont-dl";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), webfontDownload(), tsconfigPaths(), eslintPlugin()],
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.prepare.ts",
    include: ["./src/**/*.spec.tsx"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json"],
      reportsDirectory: "./test/coverage",
      extension: [".ts", ".tsx"],
    },
  },
});
