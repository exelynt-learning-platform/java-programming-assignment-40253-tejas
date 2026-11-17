# Assignment: Git Repository Basics

**Name:** Tejas Rajendra Bhoite
**System:** Windows 11 Pro, Git 2.56.0 for Windows (Git Bash)

All command output in this document is copied as text from Git Bash. Lines starting with `$` are commands; the lines below them are what the terminal printed. The session was run in a new, empty folder, `D:\Repositorys\repo-basics-demo`, so that the repository could be created from nothing.

Two things appear in the output and are normal:

- `warning: ... LF will be replaced by CRLF` is Git on Windows saying it will convert line endings. It is not an error.
- Each commit command has a `--trailer "Co-Authored-By: ..."` option. It adds a credit line to the commit message because an AI coding assistant (Claude Code) was used for this practice session.

## 1. What a Git Repository Is

A Git repository is an ordinary project folder plus a hidden `.git` folder inside it. The project folder holds the files I work on (the **working directory**). The `.git` folder holds everything Git knows about the project: every saved version, the staging area, the branches and the settings.

So "making a repository" does not move or change my files. It only adds the `.git` folder next to them.

## 2. Initializing a Repository

### Before `git init`

I created an empty folder. At this point it is just a folder, and Git refuses to work in it:

```console
$ mkdir repo-basics-demo

$ cd repo-basics-demo

$ pwd
/d/Repositorys/repo-basics-demo

$ ls -a
.
..

$ git status
fatal: not a git repository (or any of the parent directories): .git
```

The error message itself names what is missing: a `.git` folder.

### Running `git init`

```console
$ git init
Initialized empty Git repository in D:/Repositorys/repo-basics-demo/.git/

$ ls -a
.
..
.git

$ git status
On branch master

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

**What changed:** `git init` created the `.git` folder (visible only with `ls -a`, because names starting with a dot are hidden). The same `git status` command that failed a moment ago now works and reports an empty repository on a branch called `master` with no commits.

Two more checks confirm the folder is now a repository and show where its data lives:

```console
$ git rev-parse --is-inside-work-tree
true

$ git rev-parse --git-dir
.git
```

## 3. The `.git` Folder

### What is inside it

```console
$ ls -F .git
HEAD
config
description
hooks/
info/
objects/
refs/
```

| Item | What it is for |
| --- | --- |
| `HEAD` | Points to the branch I am currently on |
| `config` | Settings that apply only to this repository |
| `description` | A name used by some Git web tools; not needed for normal work |
| `hooks/` | Optional scripts Git can run automatically, for example before a commit |
| `info/` | Extra local settings, such as ignore rules that are not shared |
| `objects/` | The database: every version of every file and every commit is stored here |
| `refs/` | Branches and tags, each one a small file holding a commit ID |
| `index` | The staging area. It does not exist yet; it appears after the first `git add` |

### Looking inside the important files

`HEAD` is a one-line text file saying which branch is current:

```console
$ cat .git/HEAD
ref: refs/heads/master
```

`config` holds this repository's own settings:

```console
$ cat .git/config
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
```

In a brand-new repository the database and the branch list are empty. `HEAD` mentions `master`, but the branch file does not exist yet because there is no commit for it to point to:

```console
$ ls .git/refs
heads
tags

$ ls .git/refs/heads

$ find .git/objects -type f | wc -l
0
```

### Watching `.git` change as I work

After staging one file (section 4), the `index` file appeared and the database gained its first object, the content of that file:

```console
$ ls -F .git
HEAD
config
description
hooks/
index
info/
objects/
refs/

$ git ls-files --stage
100644 4cedcba8e193a9ceebd14cd4465720534af079a0 0	README.md

$ find .git/objects -type f | wc -l
1
```

After the first commit, the `master` branch file was created. It contains nothing but the ID of the commit it points to, and that commit is an object in the database recording the author, date, message and the snapshot (`tree`) it saved:

```console
$ ls .git/refs/heads
master

$ cat .git/refs/heads/master
9d0c50ed60c224420e5263992aa5c07865e39148

$ git cat-file -t HEAD
commit

$ git cat-file -p HEAD
tree 147405b93b8fe199992b42e76d1bbed02e3afb55
author Tejas Rajendra Bhoite <tejas.bhoite@multigenesys.com> 1794894683 +0530
committer Tejas Rajendra Bhoite <tejas.bhoite@multigenesys.com> 1794894683 +0530

Add README describing the demo project

Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>

$ find .git/objects -type f | wc -l
3
```

The object count went from 1 to 3: the file content, the folder snapshot (tree) and the commit.

This shows that a branch is not a copy of the project. It is a 41-byte file with a commit ID in it.

### Proof that `.git` is the repository

To test what `.git` really means, I moved it out of the folder at the end of the session (after three commits) and then put it back:

```console
$ mv .git ../repo-basics-demo-git-backup

$ ls -a
.
..
.gitignore
README.md
debug.log
notes.txt

$ git status
fatal: not a git repository (or any of the parent directories): .git

$ mv ../repo-basics-demo-git-backup .git

$ git status
On branch master
nothing to commit, working tree clean

$ git log --oneline
8619a92 Add notes and ignore log files
20b7cc4 Explain file states in README
9d0c50e Add README describing the demo project
```

**What this shows:** without `.git`, my files were all still there but the folder stopped being a repository and the history was unreachable. With `.git` back, the full history returned. The lesson is that deleting `.git` deletes the whole history, and that files inside `.git` should not be edited by hand.

## 4. File States

Every file in a repository is in one of these states. `git status` shows the state in words, and `git status --short` shows it as a two-character code: the first character is the staging area, the second is the working directory.

| State | Meaning | Short code |
| --- | --- | --- |
| Untracked | A new file Git has never been told about | `??` |
| Staged | Marked to go into the next commit | `A ` (new) or `M ` (changed) |
| Committed (unmodified) | Saved in the history and unchanged since | not listed |
| Modified | Tracked, but changed since the last commit and not staged | ` M` |
| Ignored | Deliberately excluded by `.gitignore` | `!!` |

The normal cycle is:

```text
untracked --git add--> staged --git commit--> committed --edit--> modified --git add--> staged --> ...
```

### Untracked

A new file starts as untracked. Git sees it but will not save it until told to:

```console
$ printf "# Repo Basics Demo\n\nA small project for learning how a Git repository works.\n" > README.md

$ git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	README.md

nothing added to commit but untracked files present (use "git add" to track)

$ git status --short
?? README.md
```

### Staged

`git add` copies the file's current content into the staging area:

```console
$ git add README.md
warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it

$ git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   README.md

$ git status --short
A  README.md
```

### Committed

`git commit` saves what is staged as a permanent snapshot. The file is now tracked and unchanged, so `git status` has nothing to report:

```console
$ git commit -m "Add README describing the demo project" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[master (root-commit) 9d0c50e] Add README describing the demo project
 1 file changed, 3 insertions(+)
 create mode 100644 README.md

$ git status
On branch master
nothing to commit, working tree clean
```

### Modified

Editing a committed file makes it modified. Note the code is ` M` with the `M` in the second column, meaning the change is only in the working directory:

```console
$ printf "\n## File states\n\nUntracked, staged, committed and modified.\n" >> README.md

$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")

$ git status --short
 M README.md
```

### Staged and modified at the same time

A file can be in two states at once. I staged the change and then edited the file again. The first edit is staged; the second is not:

```console
$ git add README.md
warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it

$ git status --short
M  README.md

$ printf "\nIgnored files are a fifth case.\n" >> README.md

$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   README.md

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   README.md

$ git status --short
MM README.md
```

This happens because `git add` stages the content as it was at that moment, not the file name. Committing now would have left the second edit out, so I ran `git add` again before committing:

```console
$ git add README.md
warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Explain file states in README" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[master 20b7cc4] Explain file states in README
 1 file changed, 6 insertions(+)
```

### From modified back to committed

A modification can also be thrown away. `git restore` replaces the file with the last committed version, so the state goes back to unmodified:

```console
$ echo "accidental line" >> README.md

$ git status --short
 M README.md

$ git restore README.md

$ git status --short

$ git status
On branch master
nothing to commit, working tree clean
```

### Ignored

Some files should never be tracked, such as logs. A pattern in `.gitignore` puts them in the ignored state. Plain `git status` hides `debug.log` completely; adding `--ignored` shows it with the code `!!`:

```console
$ echo "debug output" > debug.log

$ echo "Ideas for the next practice session" > notes.txt

$ echo "*.log" > .gitignore

$ git status --short
?? .gitignore
?? notes.txt

$ git status --short --ignored
?? .gitignore
?? notes.txt
!! debug.log
```

After committing the other two files, `debug.log` is still on disk but is not among the files Git tracks:

```console
$ git add .gitignore notes.txt
warning: in the working copy of '.gitignore', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'notes.txt', LF will be replaced by CRLF the next time Git touches it

$ git status --short
A  .gitignore
A  notes.txt

$ git commit -m "Add notes and ignore log files" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[master 8619a92] Add notes and ignore log files
 2 files changed, 2 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 notes.txt

$ git status --short --ignored
!! debug.log

$ git ls-files
.gitignore
README.md
notes.txt
```

## 5. Steps Followed

1. Created an empty folder and confirmed Git did not treat it as a repository.
2. Ran `git init` and confirmed the `.git` folder was created.
3. Listed the contents of `.git` and read `HEAD` and `config`.
4. Created a file and observed it as untracked.
5. Staged it with `git add` and saw the `index` file appear in `.git`.
6. Committed it and saw the branch file appear in `.git/refs/heads`.
7. Edited the file to observe the modified state, and the staged-plus-modified state.
8. Discarded an unwanted edit with `git restore`.
9. Added a `.gitignore` to observe the ignored state.
10. Moved `.git` away and back to confirm that it is what makes the folder a repository.

The final history of the demo repository:

```console
$ git log --oneline
8619a92 Add notes and ignore log files
20b7cc4 Explain file states in README
9d0c50e Add README describing the demo project
```

## 6. What I Learned

- A repository is a normal folder with a `.git` folder in it. `git init` creates only that folder and touches nothing else.
- `.git` is the repository. My project files are just the latest copy; the history lives in `.git/objects`.
- A branch is a tiny file containing a commit ID, and `HEAD` is a tiny file naming the current branch.
- The staging area is a real file, `.git/index`, which is why it only appears after the first `git add`.
- `git add` stages content, not a file name, so a file edited after staging is both staged and modified.
- `git status` is the command that answers "what state is each file in?", and it also suggests the command for the next step.

## Submission Checklist

- [x] Repository initialized with `git init` and verified.
- [x] `.git` folder located, its contents listed and explained.
- [x] File states (untracked, staged, committed, modified, ignored) demonstrated with real output.
- [x] Steps followed in order and recorded.
- [x] Explanations written in my own words.
