# Project Guidelines

EasyMusicNotes is a static web app (vanilla HTML/CSS/JS) for learning musical notes.
It is a **fork** of the upstream repository `Danimo2109/EasyMusicNotes`.


## Project Layout
- `index.html` — main page; loads the scripts and styles below.
- `js/` — game logic (`action_cards.js`, `score-display.js`).
- `css/` — styling (`layout.css`, `score-display.css`).
- `cards/`, `Tasten/`, `icons/`, `images/` — note, key, and logo image assets.

There is no build step or test runner; changes are plain static files served directly.
Preview by opening `index.html` in a browser (or any local static server).

## Contribution Workflow (fork → upstream)

This repository is a fork. Work flows from the **upstream** repo into this fork, and
contributions flow back out as pull requests to upstream.

Remotes:
- `origin` — this fork (`eugen-eugen/EasyMusicNotes`). Push feature branches here.
- `upstream` — the canonical repo (`Danimo2109/EasyMusicNotes`). Source of issues; target for PRs.

If the `upstream` remote is not configured yet, add it once:
```bash
git remote add upstream https://github.com/Danimo2109/EasyMusicNotes.git
```

### 1. Look after issues in the upstream repository
New work is driven by open issues on **upstream**, not this fork. Check them first:
```bash
gh issue list --repo Danimo2109/EasyMusicNotes --state open
```
Pick an issue to work on and note its number (e.g. `#15`).

### 2. Sync the fork with upstream
Before starting, bring this fork up to date so branches start from current code:
```bash
git fetch upstream
git checkout master          # or the default branch you build from
git merge upstream/master    # resolve conflicts, then push to origin if needed
```

### 3. Create a feature branch
Branch off the synced base, using a short kebab-case name prefixed by type:
`feat/`, `fix/`, or `chore/`. Name it after the issue, e.g. `fix/core-game-logic`
for upstream issue #15:
```bash
git checkout -b fix/core-game-logic master
```

### 4. Implement and commit
Make focused changes, then commit with a clear message that references the issue:
```bash
git add -A
git commit -m "Fix broken core game logic (closes #15)"
```

### 5. Push the branch to this fork
Push feature branches to `origin` (the fork), never directly to upstream:
```bash
git push -u origin fix/core-game-logic
```

### 6. Open a pull request against upstream
Create the PR from your fork branch into the **upstream** default branch:
```bash
gh pr create --repo Danimo2109/EasyMusicNotes \
  --head eugen-eugen:fix/core-game-logic \
  --base master \
  --title "Fix broken core game logic" \
  --body "Closes #15. ..."
```

### 7. Iterate on review and merge
Address review feedback with additional commits to the same branch (re-push as in step 5).
Once merged upstream, sync again and delete the local branch:
```bash
git fetch upstream && git checkout master && git merge upstream/master
git branch -d fix/core-game-logic
```

## Conventions
- Branch names: `feat/…`, `fix/…`, or `chore/…` in kebab-case.
- Commit messages: imperative, specific; reference the upstream issue number when relevant.
- Keep changes minimal and scoped to one concern per branch/PR.
