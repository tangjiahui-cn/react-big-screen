#!/usr/bin/env tsx
/**
 * Verifies and re-records the bilingual doc pairing manifests. See docs/i18n/README.md:
 * every {name}.md / {name}.zh.md pair is registered by the {name}.i18n.yaml sitting next to it,
 * which records the content hash of both sides.
 *
 *   tsx script/verifyTranslationPairing.ts              verify every registered pair, exit 1 when out-of-sync
 *   tsx script/verifyTranslationPairing.ts --write <path>...  re-record the given pair(s)
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join, relative, resolve, sep } from "node:path";

const USAGE = [
  "Usage:",
  "  pnpm run verify-translation-pairing                    verify every registered pair",
  "  pnpm run verify-translation-pairing --write <path>...  re-record the given pair(s)",
].join("\n");

/** Repository root; every path is resolved relative to it. */
const root = execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();

function git(args: string[]): string {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}

/** Content hash of a file: the blob hash git would store for it. */
function hashOf(file: string): string {
  return git(["hash-object", "--", file]);
}

/** docs/a.md, docs/a.zh.md and docs/a.i18n.yaml all reduce to docs/a. */
function baseOf(path: string): string {
  for (const suffix of [".i18n.yaml", ".zh.md", ".md"]) {
    if (path.endsWith(suffix)) return path.slice(0, -suffix.length);
  }
  throw new Error(`${path} is neither a .md doc nor a pairing manifest`);
}

/** Every base name carrying a {base}.md, a {base}.zh.md or a {base}.i18n.yaml in the working tree. */
function listBases(): string[] {
  const out = git([
    "ls-files",
    "--cached",
    "--others",
    "--exclude-standard",
    "--",
    "*.md",
    "*.i18n.yaml",
  ]);

  return [...new Set(out.split("\n").filter(Boolean).map(baseOf))].sort();
}

/** The `filename: hash` entries of a manifest; keys are file names relative to the manifest's own directory. */
function readManifest(file: string): Map<string, string> {
  const entries = new Map<string, string>();

  readFileSync(join(root, file), "utf8")
    .split("\n")
    .forEach((line, index) => {
      const text = line.trim();
      if (!text || text.startsWith("#")) return;

      const matched = /^([^:]+):\s*(\S+)$/.exec(text);
      if (!matched) {
        throw new Error(`line ${index + 1} is not a valid manifest entry: ${text}`);
      }
      entries.set(matched[1].trim(), matched[2]);
    });

  return entries;
}

/** Resolve a command line argument, absolute or relative to the caller's cwd, to a repo-relative base. */
function toBase(input: string): string {
  return baseOf(relative(root, resolve(input)).split(sep).join("/"));
}

/** `docs/a.md is missing`, `docs/a.md and docs/a.zh.md are missing`, or null when both sides are present. */
function missingSides(en: string, zh: string): string | null {
  const absent = [en, zh].filter((file) => !existsSync(join(root, file)));
  if (!absent.length) return null;

  return `${absent.join(" and ")} ${absent.length > 1 ? "are" : "is"} missing`;
}

function abort(message: string): never {
  console.error(`[ERROR] ${message}\n\n${USAGE}`);
  process.exit(1);
}

const args = process.argv.slice(2);
const writing = args.includes("--write");
const inputs = args.filter((arg) => arg !== "--write");

const unknownOptions = inputs.filter((input) => input.startsWith("--"));
if (unknownOptions.length) abort(`unknown option ${unknownOptions.join(", ")}`);
if (!writing && inputs.length) abort(`verification takes no arguments, got ${inputs.join(", ")}`);
if (writing && !inputs.length) abort("--write needs at least one file path");

const problems: string[] = [];
const bases = writing ? [...new Set(inputs.map(toBase))].sort() : listBases();

for (const base of bases) {
  const en = `${base}.md`;
  const zh = `${base}.zh.md`;
  const manifest = `${base}.i18n.yaml`;

  const hasEn = existsSync(join(root, en));
  const hasZh = existsSync(join(root, zh));
  const hasManifest = existsSync(join(root, manifest));

  if (writing) {
    const missing = missingSides(en, zh);
    if (missing) {
      problems.push(`${base} cannot be recorded, ${missing}`);
      continue;
    }

    const content = [`${basename(en)}: ${hashOf(en)}`, `${basename(zh)}: ${hashOf(zh)}`].join("\n");
    writeFileSync(join(root, manifest), `${content}\n`);
    continue;
  }

  // Unregistered: a complete pair must be recorded, a single-language doc is left alone.
  if (!hasManifest) {
    if (hasEn && hasZh) {
      problems.push(
        `${en} and ${zh} form a pair but are not registered, re-record it with \`--write ${en}\``,
      );
    }
    continue;
  }

  // Registered: both sides must exist, whatever the index still remembers.
  const missing = missingSides(en, zh);
  if (missing) {
    problems.push(`${manifest} is registered, but ${missing}`);
    continue;
  }

  let entries: Map<string, string>;
  try {
    entries = readManifest(manifest);
  } catch (error) {
    problems.push(`${manifest} could not be read: ${(error as Error).message}`);
    continue;
  }

  const expected = [basename(en), basename(zh)];

  for (const file of [en, zh]) {
    const key = basename(file);
    const recorded = entries.get(key);
    const actual = hashOf(file);

    if (recorded === undefined) {
      problems.push(`${manifest} does not register ${key}`);
    } else if (recorded !== actual) {
      problems.push(
        `${manifest} records ${key}, but the content differs\n        recorded ${recorded}\n        actual   ${actual}`,
      );
    }
  }

  // A manifest must not list anything beyond its own pair.
  for (const key of entries.keys()) {
    if (!expected.includes(key)) {
      problems.push(`${manifest} registers an unrelated ${key}`);
    }
  }
}

if (problems.length) {
  problems.forEach((problem) => console.error(`[ERROR] ${problem}`));
  console.error(
    "\n[ERROR] Translation pairing is out-of-sync. Make both sides of the pair agree, then re-record it with `pnpm run verify-translation-pairing --write <file>`.",
  );
  process.exit(1);
}

console.log(writing ? "[SUCCESS] Re-recorded successfully." : "[SUCCESS] All checks passed.");
