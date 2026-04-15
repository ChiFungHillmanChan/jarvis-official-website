@AGENTS.md

# Git workflow

- **NEVER push directly to `main`.** No exceptions, even for tiny changes.
- Always create a new branch off `main` for any change: `git checkout -b <type>/<short-desc>` (e.g. `fix/mobile-hero`, `feat/i18n-fr`).
- Push the branch to origin and open a PR targeting `main` via `gh pr create`.
- Do not merge the PR yourself unless the user explicitly asks — let the user review and merge.
- If you find yourself already on `main` with local changes, stash or branch off before committing; never commit straight to `main`.
