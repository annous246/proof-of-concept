# Git conventions

Replace the examples below with your own rules.

## Commits

Format:
(type): short message

- done this
- done this

Rules:

- Type in parentheses, then a colon. Several types are joined with `+`: `(feature+fix)`, `(feature+test+style)`
- Title: lowercase, imperative, no final period
- Body: one line per change, starting with `- `, lowercase, no final period
- Small one-change commits can skip the body

Types: feature, fix, test, style, refactor, docs, chore

Examples:
(feature): add mobile menu toggle

(feature+style): add responsive navbar

- add navbar with home, about and contact links
- collapse links into a burger menu under 768px
- style active link with brand color

(fix+test): close mobile menu on link click

- close menu when a link is clicked
- add functional test for menu closing

## Branches

- `main`: production
- `dev`: development
- `feat/<feature>-v<n>`: one variant of a feature while it is being built
- `fix/<short-name>`: bug fixes

## File naming

- One folder per component, camelCase: `navbar/`
- Inside it: the component in PascalCase `Navbar.tsx` and its `styles.module.css`
- Hooks: `src/hooks/useMenuToggle.ts`
- Tests next to the file they test: `navbar/Navbar.test.tsx`
- Integration tests in `src/__tests__/`
