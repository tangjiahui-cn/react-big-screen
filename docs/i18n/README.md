# Bilingual documentation

[简体中文](./README.zh.md) | English

The documentation in this repository is read by people and agents both within and outside China, so every document in scope is maintained in both an English and a Simplified Chinese version.
English is the default language: a plain `{name}.md` is the English version, and Simplified Chinese carries the `{name}.zh.md` suffix.
This page defines the pairing contract, the checks, how references are handled, and the scope rules; [terminology.md](terminology.md) is the source of truth for terminology.

## Editing contract

When updating any md in scope, you must update its counterpart language version in the same change;
if the counterpart version does not exist, create it in that change.
When adding or modifying a bilingual md, you must also update its `{name}.i18n.yaml` in the same change.

File naming:
- English (default): {name}.md
- Simplified Chinese: {name}.zh.md
- Pairing manifest: {name}.i18n.yaml

For example, when updating `README.md`, update `README.zh.md` and `README.i18n.yaml` in the same change; if they do not exist, create them.

## Pairing manifest

Each pair is registered in a `{name}.i18n.yaml` sitting next to it, recording the content hash of both sides:

```yaml
README.md: 9f89db3d4502dea4a0d181799164f304d4976740
README.zh.md: aa66ef1d24a5e2165859e9337273d807dff3d070
```

The key is the file name relative to the manifest's own directory, and the value is the content hash git would store for that file (`git hash-object`).
The manifest is machine-maintained: re-record it with the command below rather than computing hashes by hand.

```
pnpm run verify-translation-pairing                      verify every pair
pnpm run verify-translation-pairing --staged             verify only the pairs staged for commit
pnpm run verify-translation-pairing --write <path>...    re-record the given pair(s)
```

Verification is wired into the pre-commit hook with `--staged`, so a pair whose two sides drifted apart fails the commit while pairs the commit does not touch are not re-checked.
`--staged` reads the index on both sides, so it judges the content the commit would actually store — including a side staged for deletion, which has left the index while still sitting on disk.
A passing verification prints nothing and exits 0; only a failure writes to stderr, and only re-recording reports back.
Re-recording always names its targets explicitly: there is no "regenerate everything", so the manifest can never be updated without someone deciding to.

## What is governed

- A pair is **registered** when its `{name}.i18n.yaml` exists.
- Registered: both sides must exist and both hashes must match.
- A complete pair with no manifest is an error — it must be registered.
- A `.md` with no counterpart and no manifest is a single-language doc, and is left alone.

Because a single-language doc is defined by the absence of a counterpart rather than by a list, there is no exemption file to maintain.

## Re-recording is a checkpoint, not a proof

- Both hashes are written together, so re-recording always produces a manifest that verifies;
- The gate is the step before it: you cannot commit a changed pair without naming it, which is the moment to confirm both sides actually agree;
- Never wire re-recording into a hook — it would turn verification into a no-op.

## Language checks

- Every registered pair has both an English and a Chinese md.
- Every document provides a Chinese/English switcher at the top.
- The current language is not linked; the other language is.

## Handling references

- When a paired document references another md, it points to the version matching the referencing document's language;
- if that language's version does not exist, it points to an existing language version.

For example, `README.md` points to `docs/architecture.md`, and `README.zh.md` points to `docs/architecture.zh.md`.

## Scope

- Every registered pair, plus any complete `{name}.md` / `{name}.zh.md` pair in the working tree, is in scope;
- `--staged` narrows a run to the pairs the index carries a change for, changing how much of that scope a run covers but never the rules applied to it;
- A `.md` with no counterpart is a single-language document and is left alone;
- [terminology.md](terminology.md) is the terminology source of truth, maintained in a single language and deliberately not paired.

For example, `AGENTS.md` and `CHANGELOG.md` are the current single-language documents.
