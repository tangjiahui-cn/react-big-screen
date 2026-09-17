#!/usr/bin/env tsx
/**
 * Verifies and re-records the bilingual doc pairing manifests. See docs/i18n/README.md:
 * every {name}.md / {name}.zh.md pair is registered by the {name}.i18n.yaml sitting next to it,
 * which records the content hash of both sides.
 *
 *   tsx script/verifyTranslationPairing.ts                    verify every registered pair, exit 1 when out-of-sync
 *   tsx script/verifyTranslationPairing.ts --staged           verify only the pairs staged for commit
 *   tsx script/verifyTranslationPairing.ts --write <path>...  re-record the given pair(s)
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join, relative, resolve, sep } from "node:path";

const USAGE = [
  "Usage:",
  "  pnpm run verify-translation-pairing                    verify every registered pair",
  "  pnpm run verify-translation-pairing --staged           verify only the pairs staged for commit",
  "  pnpm run verify-translation-pairing --write <path>...  re-record the given pair(s)",
].join("\n");

/** Repository root; every path is resolved relative to it. */
const root = execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();

function git(args: string[]): string {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}

/** `git` with stderr silenced, for probes where a non-zero exit is an expected answer, not an error. */
function gitQuiet(args: string[]): string {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

/**
 * Where a run reads a file from. `--staged` reads the index, so it judges exactly what the pending
 * commit would store; every other run reads the working tree, dirty files included. Reading the
 * index is what makes a staged deletion visible: the file is still on disk, but no longer staged.
 */
type Source = {
  /** Wording for an absent side, as in `docs/a.zh.md is missing`. */
  absent: string;
  exists: (file: string) => boolean;
  hash: (file: string) => string;
  read: (file: string) => string;
};

const workingTree: Source = {
  absent: "missing",
  exists: (file) => existsSync(join(root, file)),
  hash: (file) => git(["hash-object", "--", file]),
  read: (file) => readFileSync(join(root, file), "utf8"),
};

const index: Source = {
  absent: "not staged",
  exists: (file) => {
    try {
      gitQuiet(["cat-file", "-e", `:${file}`]);
      return true;
    } catch {
      return false;
    }
  },
  hash: (file) => git(["rev-parse", `:${file}`]),
  read: (file) => git(["show", `:${file}`]),
};

/** docs/a.md, docs/a.zh.md and docs/a.i18n.yaml all reduce to docs/a. */
function baseOf(path: string): string {
  for (const suffix of [".i18n.yaml", ".zh.md", ".md"]) {
    if (path.endsWith(suffix)) return path.slice(0, -suffix.length);
  }
  throw new Error(`${path} is neither a .md doc nor a pairing manifest`);
}

/** Reduce a newline-separated path list to the sorted, de-duplicated set of base names behind it. */
function toBases(paths: string): string[] {
  return [...new Set(paths.split("\n").filter(Boolean).map(baseOf))].sort();
}

/** Every base name carrying a {base}.md, a {base}.zh.md or a {base}.i18n.yaml in the working tree. */
function listBases(): string[] {
  return toBases(
    git(["ls-files", "--cached", "--others", "--exclude-standard", "--", "*.md", "*.i18n.yaml"]),
  );
}

/**
 * Every base name the index carries a change for, so the check covers what the pending commit
 * actually alters rather than the whole repository. Renames are left decomposed into a delete and
 * an add, which keeps the base name they vacate in the set.
 */
function listStagedBases(): string[] {
  return toBases(
    git(["diff", "--cached", "--name-only", "--no-renames", "--", "*.md", "*.i18n.yaml"]),
  );
}

/** The `filename: hash` entries of a manifest; keys are file names relative to the manifest's own directory. */
function readManifest(file: string, source: Source): Map<string, string> {
  const entries = new Map<string, string>();

  source
    .read(file)
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

/** `docs/a.md is missing`, `docs/a.md and docs/a.zh.md are not staged`, or null when both are present. */
function missingSides(en: string, zh: string, source: Source): string | null {
  const absent = [en, zh].filter((file) => !source.exists(file));
  if (!absent.length) return null;

  return `${absent.join(" and ")} ${absent.length > 1 ? "are" : "is"} ${source.absent}`;
}

function abort(message: string): never {
  console.error(`[ERROR] ${message}\n\n${USAGE}`);
  process.exit(1);
}

const args = process.argv.slice(2);
const writing = args.includes("--write");
const staged = args.includes("--staged");
const inputs = args.filter((arg) => arg !== "--write" && arg !== "--staged");

const unknownOptions = inputs.filter((input) => input.startsWith("--"));
if (unknownOptions.length) abort(`unknown option ${unknownOptions.join(", ")}`);
if (writing && staged) abort("--write and --staged cannot be combined");
if (!writing && inputs.length) {
  abort(
    staged
      ? `--staged takes no file paths, got ${inputs.join(", ")}`
      : `verification takes no arguments, got ${inputs.join(", ")}`,
  );
}
if (writing && !inputs.length) abort("--write needs at least one file path");

/** The pairs this run is responsible for: the named ones, the staged ones, or every one. */
function selectBases(): string[] {
  if (writing) return [...new Set(inputs.map(toBase))].sort();

  return staged ? listStagedBases() : listBases();
}

/** `--write` names its targets one by one, so it only ever runs against the working tree. */
const source = staged ? index : workingTree;

const problems: string[] = [];
const bases = selectBases();

for (const base of bases) {
  const en = `${base}.md`;
  const zh = `${base}.zh.md`;
  const manifest = `${base}.i18n.yaml`;

  const hasEn = source.exists(en);
  const hasZh = source.exists(zh);
  const hasManifest = source.exists(manifest);

  if (writing) {
    const missing = missingSides(en, zh, source);
    if (missing) {
      problems.push(`${base} cannot be recorded, ${missing}`);
      continue;
    }

    const content = [
      `${basename(en)}: ${source.hash(en)}`,
      `${basename(zh)}: ${source.hash(zh)}`,
    ].join("\n");
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
  const missing = missingSides(en, zh, source);
  if (missing) {
    problems.push(`${manifest} is registered, but ${missing}`);
    continue;
  }

  let entries: Map<string, string>;
  try {
    entries = readManifest(manifest, source);
  } catch (error) {
    problems.push(`${manifest} could not be read: ${(error as Error).message}`);
    continue;
  }

  const expected = [basename(en), basename(zh)];

  for (const file of [en, zh]) {
    const key = basename(file);
    const recorded = entries.get(key);
    const actual = source.hash(file);

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
