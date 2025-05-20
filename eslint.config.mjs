import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react/no-children-prop": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", ignoreRestSiblings: true },
      ],
      "no-unused-vars": "off",
    },
  },
];

export default eslintConfig;
