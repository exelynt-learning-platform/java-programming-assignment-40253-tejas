# Contributing

This file describes how changes are made in this repository. It follows the standard GitHub workflow: issue → branch → commits → pull request → review → merge.

## The workflow

### 1. Start from an issue

Every change begins with an issue that says what is wrong or what is wanted. Use the templates in [.github/ISSUE_TEMPLATE](.github/ISSUE_TEMPLATE). An issue gives the change a number (for example `#12`) that the branch, commits and pull request can refer to.

### 2. Get the latest code and create a branch

Never work directly on `main`.

```bash
git switch main
git pull
git switch -c fix/readme-broken-link
```

Branch names say what the branch is for:

| Prefix | Use for | Example |
| --- | --- | --- |
| `feature/` | New content or functionality | `feature/add-week3-assignment` |
| `fix/` | Correcting a mistake | `fix/readme-broken-link` |
| `docs/` | Documentation-only changes | `docs/explain-branch-naming` |

Assignment branches are created by the course platform and are named `<topic>-week<n>`.

### 3. Make small, focused commits

```bash
git status                 # check what changed
git add README.md          # stage only the files that belong to this change
git commit -m "Fix broken link to installation assignment in README"
```

Commit message rules:

- Start with an imperative verb: `Add`, `Fix`, `Update`, `Remove`.
- Say what changed, in about 50 characters.
- One logical change per commit.
- Mention the issue when relevant: `Fix broken README link (#12)`.

### 4. Push the branch and open a pull request

```bash
git pull --rebase origin main      # pick up anything merged since the branch was created
git push -u origin fix/readme-broken-link
```

Then open a pull request on GitHub from the branch into `main`. The [pull request template](.github/pull_request_template.md) is filled in automatically. Write `Closes #12` in the description so the issue closes when the pull request is merged.

### 5. Review

- The reviewer reads the changes and leaves comments or approves.
- Requested changes are made as new commits on the same branch and pushed; the pull request updates by itself.
- A pull request is merged only after approval and passing checks.

### 6. Merge and clean up

After the merge on GitHub:

```bash
git switch main
git pull
git branch -d fix/readme-broken-link
```

## Rules

- Do not commit directly to `main`.
- Do not use `git push --force` on a branch other people use.
- Do not commit generated files, editor settings, logs or secrets. [.gitignore](.gitignore) covers the common ones; extend it when a new kind appears.
- Run `git status` before every commit and read what is staged.
- Pull before you push.
