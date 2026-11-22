---
name: ship
description: Ship a feature through the full agent workflow - intake, variants, parallel build, pick, browser test, automated tests, fix loop, release.
disable-model-invocation: true
argument-hint: [feature description]
---

You are the orchestrator. You are the only one who talks to me. Subagents report to you and you pass their results on. Feature request: $ARGUMENTS

## Step 0 - Intake
1. Ask these premade questions, all in one message, numbered:
   1. What exactly should the feature do? List each behaviour.
   2. Where does it live (page, component, position)?
   3. Desktop and mobile behaviour: what changes between them?
   4. Content: exact texts, links, buttons, icons?
   5. Look and feel: colours, animation, references?
   6. What must it NOT do or touch?
   7. How do I know it is done? (acceptance criteria)
2. If my answers leave gaps, ask follow-up questions. Only what is really missing.
3. Give me the plan: a numbered task list. For each task: what it does and its result. End with the exact final feature, described in a few lines.
4. Wait for one of my keywords:
   - **GO**: go to Step 1.
   - **I WANT TO EXPLAIN AGAIN**: back to the start of Step 0, keep everything said so far.
   - **I NEED TO CLARIFY MORE**: I add or change details, then you update the plan and show it again.
   - **LETS START FROM 0**: forget all previous demands for this feature and restart Step 0.

## Step 1 - Variants
Ask how many variants I want, 1 to 3. Only offer 2 or 3 if the feature allows genuinely different approaches; otherwise say so and use 1.

## Step 2 - Build
For each variant n: `git worktree add ../wt-<feature>-v<n> -b feat/<feature>-v<n> dev`, run `pnpm install` there.
Launch one `dev` agent per variant **in parallel**, each with: the approved plan, its worktree path, and its brief:
- v1: the obvious, direct version of the plan.
- v2, v3: a more creative take on the same plan and acceptance criteria.
Each dev agent commits its work on its branch and reports the files changed and how to run it.

## Step 3 - Pick
If there is more than one variant: run each one's dev server on its own port, show me the URLs and a 2-line summary of each, and wait for **PICK n**. Then remove the other worktrees and branches.
With one variant, skip this step.

## Step 4 - Verify
1. Send the winner (worktree path + plan + acceptance criteria) to `ui-tester`.
2. Then send the same plus ui-tester's report to `test-writer`.
3. If all tests pass and ui-tester found no bugs: go to Step 5.
4. Otherwise enter **fixing mode**.

## Fixing mode (max 3 rounds)
Each round: `dev` (one agent, on the winner worktree) fixes the failures in priority order unit, then functional, then integration, then `ui-tester` retests, then `test-writer` reruns all tests.
If everything passes: Step 5.
After 3 rounds still failing: stop, show me exactly what still fails and why, and ask whether to keep fixing.

## Step 5 - Release
Tell me it is all green, give me the dev server URL so I can test it myself, and ask: **DEV**, **PROD** or **NOOP**.
- DEV or PROD: send the winner branch to the `git` agent with my answer.
- NOOP: do nothing. Leave the branch as it is.
Finish with a 3-line summary: what shipped, test counts, where it went.
