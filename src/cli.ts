#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { formatMarkdown, formatReport, lintMarkdown } from "./index.js";

const args = process.argv.slice(2);
const flags = new Set(args.filter((arg) => arg.startsWith("--")));
const file = args.find((arg) => !arg.startsWith("--"));
const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8")
) as { version: string };

if (flags.has("--version")) {
  console.log(packageJson.version);
  process.exit(0);
}

if (!file || flags.has("--help")) {
  console.log(`Usage: docu-lint <file> [--fix] [--json]

Options:
  --fix   Rewrite the file with safe automatic formatting fixes.
  --json  Print the lint result as JSON.
  --version  Print the installed version.
`);
  process.exit(file ? 0 : 1);
}

const filename = resolve(file);
const source = readFileSync(filename, "utf8");
const result = lintMarkdown(source, { filename: file });

if (flags.has("--fix")) {
  writeFileSync(filename, formatMarkdown(source));
}

if (flags.has("--json")) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(formatReport(result));

  if (flags.has("--fix")) {
    console.log("\nfixed: spacing, punctuation, and brand capitalization");
  }
}

process.exit(result.ok ? 0 : 1);
