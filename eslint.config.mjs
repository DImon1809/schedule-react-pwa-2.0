import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import eslintImportPrettier from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    plugins: {
      "simple-import-sort": eslintImportPrettier,
    },
  },

  {
    ignores: ["node_modules", "build"],
  },

  {
    presets: [["@babel/preset-react", { runtime: "automatic" }]],
  },
];
