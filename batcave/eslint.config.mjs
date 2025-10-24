import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";
// Note: plugin imported for potential future rules; not used currently
// import prettierPlugin from "eslint-plugin-prettier";
import prettier from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Disable stylistic rules that conflict with Prettier
  eslintConfigPrettier,
  // Prettier handled via eslint-config-prettier; no plugin rules enforced to avoid noise
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
