import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";


export default defineConfig([
  { files: ["src/**/*.{js,mjs,cjs,ts}"] },
  { files: ["src/**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
  tseslint.configs.recommended,
]);