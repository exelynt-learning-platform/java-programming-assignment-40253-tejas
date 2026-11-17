# Assignment: GitHub Collaboration and Best Practices

**Name:** Tejas Rajendra Bhoite
**System:** Windows 11 Pro, Git 2.56.0 for Windows (Git Bash)
**Branch:** `github-collaboration-best-practices-week1-2`

This assignment is mostly the repository itself. On this branch I turned a two-line README into a documented, organized repository, and this document explains each part and the reasoning behind it.

All command output below is copied as text from Git Bash, run inside this repository. Lines starting with `$` are commands; the lines below them are what the terminal printed. `warning: ... LF will be replaced by CRLF` lines are Git on Windows converting line endings and are not errors. An AI coding assistant (Claude Code) was used for this work, which is why the commit carries a `Co-Authored-By` line.

## What was added on this branch

| File | What it is | Section |
| --- | --- | --- |
| [README.md](README.md) | Rewritten front page for the repository | 1 |
| [.gitignore](.gitignore) | Rules for files Git must not track | 2 |
| [CONTRIBUTING.md](CONTRIBUTING.md) | The workflow for making changes | 3 |
| [.github/ISSUE_TEMPLATE/bug_report.md](.github/ISSUE_TEMPLATE/bug_report.md) | Form for reporting a problem | 4 |
| [.github/ISSUE_TEMPLATE/feature_request.md](.github/ISSUE_TEMPLATE/feature_request.md) | Form for requesting an improvement | 4 |
| [.github/pull_request_template.md](.github/pull_request_template.md) | Checklist for pull requests | 4 |

## 1. README.md

### Why a README matters

The README is the first thing GitHub shows when someone opens a repository. If it does not answer "what is this, and how do I use it?", most visitors stop there. A repository without a useful README is like a book without a cover or contents page.

### Before and after

Before, the README was a title and one sentence:

```text
# java-programming-assignment-40253-tejas
Module &amp; Week Assignments - This repository contains module-wise and week-wise assignment submissions.
```

It did not say which assignments exist, where they are, or how to read them. The new [README.md](README.md) has these parts:

| Section | Question it answers |
| --- | --- |
| Title and one-line description | What is this repository? |
| Contents | Where do I find things in this file? |
| Assignments table | What work is here, and on which branch? |
| Repository structure | What is each file and folder for? |
| Getting a copy | Which commands do I run to use it? |
| How work is submitted | How does a change get into this repository? |
| Conventions | What rules does the content follow? |
| Author | Who do I contact? |

### What makes a README good

- It starts with what the project **is**, in one or two sentences.
- Commands are in code blocks so they can be copied exactly.
- It links to other files instead of repeating them (the workflow details are in `CONTRIBUTING.md`).
- It is kept up to date; a README that describes last month's project is worse than a short one.

## 2. .gitignore

### What it is for

Not every file in a project folder belongs in Git. A `.gitignore` file lists patterns, and Git behaves as if matching files do not exist: they do not show in `git status` and `git add .` skips them.

My rule for deciding: **commit what a person wrote; ignore what a tool generated and anything private.**

| Group in my [.gitignore](.gitignore) | Examples | Why it is ignored |
| --- | --- | --- |
| Compiled Java output | `*.class`, `*.jar`, `target/` | Rebuilt from source at any time; it bloats the repository and causes pointless conflicts |
| IDE and editor settings | `.idea/`, `.vscode/`, `*.iml` | Personal to each developer's machine |
| Operating system files | `Thumbs.db`, `.DS_Store` | Created by Windows/macOS, nothing to do with the project |
| Secrets and local configuration | `.env`, `*.key`, `*.pem` | Passwords and keys must never be published |
| Logs and temporary files | `*.log`, `*.tmp` | Change on every run and have no lasting value |

Pattern syntax used: `*.class` matches any file ending in `.class` in any folder; a trailing slash as in `target/` matches a whole folder; `#` starts a comment.

### Testing that it works

I did not want to assume the rules worked, so I created one sample file of each kind:

```console
$ echo "compiled bytecode" > Hello.class

$ mkdir target .idea

$ echo "packaged build" > target/app.jar

$ echo "editor settings" > .idea/workspace.xml

$ echo "DB_PASSWORD=example-only" > .env

$ echo "debug output" > debug.log

$ ls -a
.
..
.env
.git
.github
.gitignore
.idea
CONTRIBUTING.md
Hello.class
README.md
debug.log
target
version-control-and-git-assignment.md
```

All five are on disk, but `git status` does not mention any of them. It lists only the files I actually wrote:

```console
$ git status --short
 M README.md
?? .github/
?? .gitignore
?? CONTRIBUTING.md
```

Adding `--ignored` makes Git show what it is hiding, marked `!!`:

```console
$ git status --short --ignored
 M README.md
?? .github/
?? .gitignore
?? CONTRIBUTING.md
!! .env
!! .idea/
!! Hello.class
!! debug.log
!! target/
```

`git check-ignore -v` goes further and reports exactly **which line of which file** caused each one to be ignored. This is the command to use when a file is unexpectedly ignored or not ignored:

```console
$ git check-ignore -v Hello.class target/app.jar .idea/workspace.xml .env debug.log
.gitignore:6:*.class	Hello.class
.gitignore:9:target/	target/app.jar
.gitignore:15:.idea/	.idea/workspace.xml
.gitignore:28:.env	.env
.gitignore:34:*.log	debug.log
```

For a file that should be tracked, the same command prints nothing, meaning no rule matches it:

```console
$ git check-ignore -v README.md
```

The real proof is `git add .`, the command that most often commits junk by accident. With the `.gitignore` in place it staged only the six intended files and none of the five sample files:

```console
$ git add .
warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of '.github/ISSUE_TEMPLATE/bug_report.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of '.github/ISSUE_TEMPLATE/feature_request.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of '.github/pull_request_template.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of '.gitignore', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'CONTRIBUTING.md', LF will be replaced by CRLF the next time Git touches it

$ git status --short
A  .github/ISSUE_TEMPLATE/bug_report.md
A  .github/ISSUE_TEMPLATE/feature_request.md
A  .github/pull_request_template.md
A  .gitignore
A  CONTRIBUTING.md
M  README.md
```

Afterwards I deleted the sample files, since they were only there for the test:

```console
$ rm -r Hello.class target .idea .env debug.log

$ git status --short --ignored
A  .github/ISSUE_TEMPLATE/bug_report.md
A  .github/ISSUE_TEMPLATE/feature_request.md
A  .github/pull_request_template.md
A  .gitignore
A  CONTRIBUTING.md
M  README.md
```

### Points that are easy to get wrong

- **`.gitignore` only affects untracked files.** If a file was committed before the rule was added, Git keeps tracking it. It has to be removed from tracking with `git rm --cached <file>` (the file stays on disk), then committed.
- **Add `.gitignore` first.** It is best created at the start of a project, before the first `git add .`.
- **`.gitignore` itself is committed**, so everyone on the team ignores the same files.
- **Ignoring is not a way to remove a secret that was already pushed.** Once a password is in the history, it must be treated as leaked and changed.

## 3. The GitHub Workflow

### The steps

The workflow most teams follow is known as GitHub Flow. I wrote it up with commands in [CONTRIBUTING.md](CONTRIBUTING.md); in short:

```text
 issue  -->  branch  -->  commits  -->  push  -->  pull request  -->  review  -->  merge  -->  delete branch
 (what)     (where)      (the work)   (share)     (propose)        (check)      (accept)     (clean up)
```

| Step | Command or action | Why |
| --- | --- | --- |
| 1. Open an issue | On GitHub | Agree on what needs doing before doing it |
| 2. Update and branch | `git switch main`, `git pull`, `git switch -c fix/...` | Start from the latest code; keep `main` untouched |
| 3. Commit | `git status`, `git add`, `git commit -m "..."` | Record the work in small, explained steps |
| 4. Push | `git push -u origin <branch>` | Put the branch on GitHub so others can see it |
| 5. Open a pull request | On GitHub | Ask for the branch to be merged, and start the review |
| 6. Review | Comments, further commits | Catch mistakes before they reach `main` |
| 7. Merge | On GitHub | The change becomes part of `main` |
| 8. Clean up | `git switch main`, `git pull`, `git branch -d <branch>` | Remove the finished branch |

The key idea is that **`main` always holds working, reviewed content**. Nothing goes into it directly; everything arrives through a pull request.

### How this assignment followed it

- The work was done on a dedicated branch, `github-collaboration-best-practices-week1-2`, not on `main`.
- I checked `git status` before staging and read the list of staged files before committing (output in section 2).
- The staged change was reviewed with `git diff --cached --stat` to confirm its size and contents:

```console
$ git diff --cached --stat
 .github/ISSUE_TEMPLATE/bug_report.md      |  34 ++++++++++
 .github/ISSUE_TEMPLATE/feature_request.md |  25 ++++++++
 .github/pull_request_template.md          |  23 +++++++
 .gitignore                                |  37 +++++++++++
 CONTRIBUTING.md                           |  77 ++++++++++++++++++++++
 README.md                                 | 102 +++++++++++++++++++++++++++++-
 6 files changed, 296 insertions(+), 2 deletions(-)
```

- The work was then committed with a descriptive message and pushed to the branch on GitHub with `git push`, where the automatic review runs. (This document was staged after the listing above was captured, and is part of the same commit.)
- Merging into `main` happens through a pull request after the review, as it did for the first assignment (shown in the next section).

## 4. Issues and Pull Requests

### Issues

An **issue** is a tracked discussion about one piece of work: a bug, a request, a question or a task. Each has a number (`#7`), a title, a description, labels (such as `bug` or `enhancement`), an assignee, and an open/closed state.

Issues are useful because they keep the *reason* for a change next to the change. Months later, anyone can follow a commit back to the issue and see why it was made.

A good issue lets someone else act without asking follow-up questions. My two templates build that in:

| Template | Sections it asks for |
| --- | --- |
| [bug_report.md](.github/ISSUE_TEMPLATE/bug_report.md) | What happened, what was expected, steps to reproduce, evidence (pasted output), environment |
| [feature_request.md](.github/ISSUE_TEMPLATE/feature_request.md) | What should change, why it is needed, a "done when" checklist |

Because they are in `.github/ISSUE_TEMPLATE/`, GitHub offers them automatically when someone clicks **New issue**. The lines at the top of each file between `---` markers set the template's name, default title and label.

### Pull requests

A **pull request** (PR) is a request to merge one branch into another. It is where collaboration actually happens, because it shows:

- the exact lines added and removed,
- the list of commits,
- a discussion thread, including comments on individual lines,
- the result of automatic checks,
- and a **Merge** button, enabled once the change is approved.

Despite the name, a pull request is not the `git pull` command. It means "please pull my branch into yours".

My [pull_request_template.md](.github/pull_request_template.md) pre-fills every new PR with a summary, the related issue, the list of changes, how they were checked, and a checklist.

### How issues and pull requests connect

Writing `Closes #12` in a pull request description links the two. When the PR is merged, GitHub closes issue 12 automatically. The chain is then complete and traceable: **issue (why) → branch and commits (how) → pull request (review) → merge (done)**.

| | Issue | Pull request |
| --- | --- | --- |
| Is about | A problem or an idea | A proposed solution |
| Contains | Description and discussion | Code changes, commits and discussion |
| Ends when | It is closed | It is merged or closed |
| Typical order | Comes first | Comes second, and closes the issue |

### A real pull request in this repository

This repository's history already contains a merged pull request. The first assignment was done on its own branch and merged into `main` through PR #1:

```console
$ git log --oneline --merges
46509ef Merge pull request #1 from exelynt-learning-platform/understanding-version-control-git-and-github-week1-2

$ git log -1 --format="%h%nParents: %p%nSubject: %s" 46509ef
46509ef
Parents: ccfd5cf c694c0b
Subject: Merge pull request #1 from exelynt-learning-platform/understanding-version-control-git-and-github-week1-2

$ git log --oneline --graph -5
*   46509ef Merge pull request #1 from exelynt-learning-platform/understanding-version-control-git-and-github-week1-2
|\  
| * c694c0b Add files via upload
* | ccfd5cf Delete version-control-and-git-assignment.md
* | a07608a Add files via upload
|/  
* c8222d3 Initial commit
```

**Reading this:** merging a pull request creates a merge commit with two parents. `ccfd5cf` was the tip of `main` and `c694c0b` was the tip of the assignment branch. In the graph, the right-hand line is the branch, and it joins `main` at `46509ef`. The message GitHub wrote records the PR number and the branch it came from.

This history also shows a practice I would now avoid. The commits named `Add files via upload` were made with GitHub's upload button. The message says nothing about what the files are, which is exactly the problem meaningful commit messages solve.

## 5. Git Best Practices

Each practice below is one I applied during these assignments, with the reason for it.

### Commits

| Practice | Reason |
| --- | --- |
| Commit small, related changes together | Small commits are easy to review, and easy to undo without losing other work |
| Write messages that say what changed: `Add .gitignore for Java build output`, not `update` | The history becomes a readable record of the project |
| Start messages with an imperative verb (`Add`, `Fix`, `Remove`) | Consistent, and matches Git's own messages such as `Merge branch ...` |
| Run `git status` and review what is staged before committing | Prevents committing the wrong files |
| Commit working states, not half-finished ones | Every point in the history can then be returned to safely |

### Branches

| Practice | Reason |
| --- | --- |
| Never commit directly to `main` | `main` stays stable and reviewed |
| One branch per task, with a descriptive name (`fix/readme-broken-link`) | Unrelated work does not get mixed, and the name explains the purpose |
| Keep branches short-lived | The longer a branch lives, the further it drifts and the more conflicts it causes |
| Delete branches after merging | The branch list stays readable |

### Working with others

| Practice | Reason |
| --- | --- |
| Pull before starting work and again before pushing | Avoids rejected pushes and reduces conflicts |
| Never `git push --force` on a shared branch | It deletes commits other people have pushed |
| Use pull requests and reviews for every change | A second person catches what the author missed |
| Link pull requests to issues (`Closes #12`) | Keeps the reason for each change traceable |

### What goes in the repository

| Practice | Reason |
| --- | --- |
| Add a `.gitignore` before the first commit | Stops generated files and secrets from ever entering the history |
| Never commit passwords, API keys or `.env` files | Git history is permanent and often public; a leaked secret must be replaced, not just deleted |
| Keep the README current | It is the entry point for every new reader |
| Do not commit large generated or binary files | They make every clone slower, permanently |

## 6. Repository Structure

After this assignment, Git tracks the following files on this branch (plus this document):

```console
$ git ls-files
.github/ISSUE_TEMPLATE/bug_report.md
.github/ISSUE_TEMPLATE/feature_request.md
.github/pull_request_template.md
.gitignore
CONTRIBUTING.md
README.md
version-control-and-git-assignment.md
```

```text
.
├── .github/                         GitHub-specific files
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── pull_request_template.md
├── .gitignore                       what Git must not track
├── CONTRIBUTING.md                  how to make a change
├── README.md                        what the repository is
├── github-collaboration-best-practices-assignment.md
└── version-control-and-git-assignment.md
```

The reasoning behind the layout:

- **Standard names in standard places.** `README.md`, `CONTRIBUTING.md` and `.gitignore` are at the top level because that is where GitHub and other developers look for them. GitHub links `CONTRIBUTING.md` automatically when someone opens an issue or pull request.
- **`.github/` holds only GitHub configuration.** Templates there are picked up by GitHub without any further setup, and they stay out of the way of the content.
- **One clear purpose per file.** The README introduces, CONTRIBUTING instructs, `.gitignore` excludes. None of them repeats another; they link to each other instead.
- **Consistent naming.** Assignment write-ups are lowercase, hyphen-separated and end in `-assignment.md`, so they sort together and their content is obvious from the name.
- **Nothing generated or private is tracked,** which section 2 verified.

## 7. What I Learned

- A repository is more than its files. The README, the ignore rules and the templates are what make it usable by someone else.
- `.gitignore` should be tested, not assumed. `git status --ignored` and `git check-ignore -v` show exactly what is ignored and why.
- `.gitignore` cannot un-track a file that is already committed, and cannot recall a secret that was already pushed.
- An issue records why a change is needed; a pull request proposes the change and is where it is reviewed. Linking them keeps the history explainable.
- Merging a pull request leaves a merge commit, so the workflow is visible in `git log --graph`.
- Most best practices come down to two aims: keep `main` trustworthy, and make the history understandable to the next reader.

## Submission Checklist

- [x] `README.md` created with proper documentation.
- [x] `.gitignore` added, explained and tested with real output.
- [x] GitHub workflow described and followed on a dedicated branch.
- [x] Issues and pull requests explained, with templates and a real merged PR from the history.
- [x] Git best practices listed with reasons.
- [x] Repository structure organized and explained.
