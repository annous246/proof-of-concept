# Team ALL-IN proof of concept

A small, elegant React website for Team ALL-IN (name, slogans). It is built feature by feature through the /ship workflow.
The architecture diagram is in docs/architecture.pdf.

## Before writing any code
1. Read @docs/react-style.md and follow it exactly.
2. If docs/react-style.md is still a placeholder, stop and ask me to run /init-arch first.
3. Follow @docs/git-conventions.md for every commit, branch and file name.

## Stack
React + TypeScript + Vite, pnpm, Vitest + Testing Library for tests, Playwright MCP for browser checks.
Use pnpm, never npm: the variant worktrees share one package store, so disk use stays low.

## Rules
- Keep code minimal. No extra abstractions, wrappers or files the feature doesn't need.
- Never push without my explicit DEV or PROD answer.
- Never force-push. Never commit secrets or .env files.
- `dev` = development branch, `main` = production branch.

## Workflow
Every feature goes through /ship (.claude/skills/ship/SKILL.md).
Agents: dev (builds and fixes), ui-tester (browser checks), test-writer (unit, functional, integration tests), git (commits and pushes).
The main session orchestrates: it is the only one that talks to me and it relays results between agents.
