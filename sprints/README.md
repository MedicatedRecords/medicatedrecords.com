# Sprints

This folder is the planning system **and** agentic memory store for the site. Agents and
humans pick up work from the **active sprint**, log new ideas to the **backlog**, and create
new sprints from the **template**.

## Files

- **`_template.md`** — copy this to start a new sprint (`sprint-NN-name.md`).
- **`backlog.md`** — running, prioritized list of features/ideas not yet scheduled.
- **`sprint-NN-name.md`** — a focused unit of work with goal, scope, tasks, and acceptance.

## Workflow

1. **Active sprint** = the highest-numbered sprint file whose Status is `Active`.
2. Work tasks top-to-bottom; check them off as `- [x]` and add notes under **Log**.
3. New ideas mid-sprint go to `backlog.md` (don't expand the current sprint's scope).
4. When all acceptance criteria pass, set Status to `Done` and record outcomes.
5. Start the next sprint by copying `_template.md` and pulling items from `backlog.md`.

## Conventions

- Keep sprints small and shippable.
- Each task should be concrete enough to act on without re-deciding scope.
- Reference content/design rules in [../AGENTS.md](../AGENTS.md) rather than restating them.
