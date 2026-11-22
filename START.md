# How to start

1. Unzip this folder into your WSL home, not /mnt/c (much faster):
   `cd ~ && unzip /mnt/c/Users/Lenovo/Downloads/team-all-in-poc.zip -d team-all-in-poc && cd team-all-in-poc`
2. Install pnpm once: `npm install -g pnpm` (or `corepack enable pnpm`), and Chromium for Playwright: `npx playwright install chromium`.
3. Put samples of your own React/CSS code in `style/`, and edit `docs/git-conventions.md` to match your commit style.
4. Run `claude` in this folder and approve the Playwright MCP server when asked.
5. Type `/init-arch`. Claude reads style/, writes docs/react-style.md (you approve it), scaffolds the React project and creates `develop`.
6. Type `/ship responsive navbar with <your buttons>` and follow the workflow.

Before the first DEV/PROD push, create the GitHub repo and add it as `origin` (`gh repo create` or `git remote add origin <url>`).

Files:
- CLAUDE.md: always loaded, points to everything else
- docs/react-style.md, docs/git-conventions.md: your style rules
- .claude/skills/init-arch, .claude/skills/ship: the /init-arch and /ship commands
- .claude/agents/: dev, ui-tester, test-writer, git
- .claude/settings.json: blocks force-push and hard reset, asks before any push
- .mcp.json: Playwright browser for ui-tester
- docs/architecture.pdf: the diagram
