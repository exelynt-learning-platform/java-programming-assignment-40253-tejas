# Java Programming Assignments — Tejas Rajendra Bhoite

Module-wise and week-wise assignment submissions for the Java programming course. Each assignment is written up as a Markdown document, with the real terminal output of the commands it describes.

## Contents

- [Assignments](#assignments)
- [Repository structure](#repository-structure)
- [Getting a copy](#getting-a-copy)
- [How work is submitted](#how-work-is-submitted)
- [Conventions](#conventions)
- [Author](#author)

## Assignments

Every assignment lives on its own branch. The write-up for an assignment is added on that branch and merged into `main` through a pull request after review.

### Module 1, Weeks 1–2: Version Control with Git and GitHub

| # | Assignment | Branch | Write-up |
| --- | --- | --- | --- |
| 1 | Understanding version control, Git and GitHub | `understanding-version-control-git-and-github-week1-2` (merged) | [version-control-and-git-assignment.md](version-control-and-git-assignment.md) |
| 2 | Git installation and configuration | `git-installation-setup-week1-2` | `git-installation-and-configuration-assignment.md` |
| 3 | Tracking changes with Git | `tracking-changes-with-git-week1-2` | `tracking-changes-with-git-assignment.md` |
| 4 | Git repository basics | `git-repository-basics-week1-2` | `git-repository-basics-assignment.md` |
| 5 | Branching and merging | `branching-merging-week1-2` | `branching-and-merging-assignment.md` |
| 6 | Working with remote repositories | `working-with-remote-repositories-week1-2` | `working-with-remote-repositories-assignment.md` |
| 7 | GitHub collaboration and best practices | `github-collaboration-best-practices-week1-2` | [github-collaboration-best-practices-assignment.md](github-collaboration-best-practices-assignment.md) |

Write-ups without a link are on their own branch until that branch is merged. To read one, switch to its branch:

```bash
git switch tracking-changes-with-git-week1-2
```

## Repository structure

This is the layout on the `github-collaboration-best-practices-week1-2` branch:

```text
.
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md            # form for reporting a problem
│   │   └── feature_request.md       # form for suggesting an improvement
│   └── pull_request_template.md     # checklist shown when opening a pull request
├── .gitignore                       # files Git must not track
├── CONTRIBUTING.md                  # workflow and rules for changing this repository
├── README.md                        # this file
├── github-collaboration-best-practices-assignment.md
└── version-control-and-git-assignment.md
```

| Path | Purpose |
| --- | --- |
| `README.md` | Front page: what the repository is and how to use it |
| `CONTRIBUTING.md` | How to make a change: branches, commits, pull requests |
| `.gitignore` | Keeps compiled files, editor settings, secrets and logs out of Git |
| `.github/` | Templates GitHub applies automatically to new issues and pull requests |
| `*-assignment.md` | One write-up per assignment |

## Getting a copy

Requirements: [Git](https://git-scm.com/downloads) 2.23 or newer.

```bash
# 1. Clone the repository
git clone https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git
cd java-programming-assignment-40253-tejas

# 2. See all assignment branches
git branch -r

# 3. Switch to the assignment you want to read
git switch github-collaboration-best-practices-week1-2
```

The write-ups are Markdown files. They can be read on GitHub directly, or in any editor with a Markdown preview (in VS Code: `Ctrl+Shift+V`).

## How work is submitted

1. The course platform creates a branch for the assignment.
2. The work is done and committed on that branch.
3. The branch is pushed to GitHub, where it is reviewed automatically.
4. A pull request merges the reviewed branch into `main`.

The full workflow, with the commands for each step, is in [CONTRIBUTING.md](CONTRIBUTING.md).

## Conventions

- **Branches:** one per assignment, named `<topic>-week<n>`.
- **Commits:** a short imperative summary of what changed, for example `Add .gitignore for Java build output`.
- **Evidence:** command output in the write-ups is pasted as text from a real terminal session, not typed by hand.
- **No generated or private files:** enforced by [.gitignore](.gitignore).

## Author

**Tejas Rajendra Bhoite**

Questions or corrections are welcome through a GitHub issue; the templates in [.github/ISSUE_TEMPLATE](.github/ISSUE_TEMPLATE) show what to include.
