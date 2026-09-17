# Bilingual documentation

[简体中文](./README.md) | English

The documentation in this repository is read by people and agents both within and outside China, so every document in scope is maintained in both an English and a Simplified Chinese version.
This page defines the pairing contract, the checks, how references are handled, and the scope rules; [terminology.md](terminology.md) is the source of truth for terminology.

## Editing contract

When updating any md in scope, you must update its counterpart language version in the same change;
if the counterpart version does not exist, create it in that change.

File naming:
- Chinese: {name}.md
- English: {name}.en.md

For example, when updating `README.md`, update `README.en.md` in the same change; if `README.en.md` does not exist, create it.

## Language checks

- Every document in scope has both a Chinese and an English md.
- Every document provides a Chinese/English switcher at the top.

## Handling references

When a paired document references another md, it points to the version matching the referencing document's language;
if that language's version does not exist, point to an existing language version.

For example, `README.en.md` points to `docs/architecture.en.md`.

## Scope

In scope: `.md` files under the project.
Never process: `terminology.md` (the terminology source of truth, maintained in a single language and not part of pairing).
