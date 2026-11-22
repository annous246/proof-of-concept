---
name: init-arch
description: One-time project setup. Extracts my coding style from style/ and scaffolds the React project and git branches.
disable-model-invocation: true
---

Set up this project once, in this order. Stop and ask me if anything is unclear.

1. **Extract my style.** Read every file in `style/`. Write the concrete rules you see into `docs/react-style.md`: component structure, naming, props and state handling, hooks, styling approach (CSS modules, plain CSS, Tailwind...), imports order, folder layout, formatting. Only rules that the samples actually show, each with a tiny example from them. No generic best practices. Show me the file and wait for my OK.
2. **Scaffold.** In the repo root: Vite React + TypeScript with pnpm, then add Vitest, @testing-library/react, @testing-library/user-event and jsdom. Add `test` and `test:run` scripts. Keep the default files minimal and in my style.
3. **Git.** `git init` if needed, add a `.gitignore` (node_modules, dist, .env*), commit the setup following `docs/git-conventions.md`, then create the `dev` branch from `main`.
4. **Check the tools.** Confirm `pnpm test:run` works and the Playwright MCP server from `.mcp.json` responds (open the dev server once).
5. Report in 3 lines what is ready, then tell me to start with `/ship <feature>`.
