import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

/**
 * ESLint flat config.
 *
 * The project shipped without one, which meant CI could not lint at all:
 * `next lint` prompts interactively to create a config when none exists, and
 * a prompt in CI hangs the job rather than failing it. That is why the lint
 * step was absent from the workflow.
 *
 * `next lint` is deprecated in Next 15.5, so the script calls the ESLint CLI
 * directly and this file supplies the Next rules through FlatCompat, which
 * bridges the older shareable-config format that eslint-config-next still uses.
 */
const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const config = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "next-env.d.ts",
      // Generated: rewritten by scripts/generate-image-variants.mjs.
      "src/lib/data/image-manifest.json",
    ],
  },

  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      /**
       * Unused code is a real defect, but an argument deliberately named and
       * ignored is not. The underscore prefix is the escape hatch.
       */
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      /**
       * This project deliberately does not use next/image for a handful of
       * cases (the OG card, brand marks in metadata). Where <img> does appear
       * it is a considered choice, so warn rather than error.
       */
      "@next/next/no-img-element": "warn",
    },
  },

  {
    // Build scripts are Node programs, not application code.
    files: ["scripts/**/*.mjs"],
    rules: {
      "no-console": "off",
    },
  },
];

export default config;
