# Assignment: Tracking Changes with Git

**Name:** Tejas Rajendra Bhoite
**System:** Windows 11 Pro, Git 2.56.0 for Windows (Git Bash)
**Branch:** `tracking-changes-with-git-week1-2`

All command output in this document is copied as text from Git Bash, run inside this repository. Lines starting with `$` are commands; the lines below them are what the terminal printed. The files created during the session are in the [tracking-changes-practice](tracking-changes-practice/) folder, and the commits shown here are the real commits on this branch.

Two things appear repeatedly in the output and are normal:

- `warning: ... LF will be replaced by CRLF` is Git on Windows saying it will convert line endings. It is not an error.
- Each commit command has a `--trailer "Co-Authored-By: ..."` option. It adds a credit line to the commit message because an AI coding assistant (Claude Code) was used for this practice session.

## 1. How Git Tracks Changes

A file moves through three areas before it becomes part of the history:

| Area | What it holds | Command that moves a change forward |
| --- | --- | --- |
| Working directory | Files as they are on disk right now | `git add` |
| Staging area (index) | Changes chosen for the next commit | `git commit` |
| Repository (history) | Saved commits | — |

`git status` reports where every change currently is. `git log` shows what has already been saved.

## 2. Using git status, git add and git commit

### Starting point

Before doing anything, `git status` shows a clean working tree:

```console
$ git status
On branch tracking-changes-with-git-week1-2
Your branch is up to date with 'origin/tracking-changes-with-git-week1-2'.

nothing to commit, working tree clean

$ mkdir tracking-changes-practice

$ cd tracking-changes-practice

$ pwd
/d/Repositorys/java-programming-assignment-40253-tejas/tracking-changes-practice
```

### Commit 1: a new (untracked) file

I created a cheat sheet file. Git reports it as **untracked**, meaning Git sees it but is not recording it yet. (The output shows `./` because the whole new folder is untracked.)

```console
$ printf "# Git Command Cheat Sheet\n\n## Tracking changes\n\n- git status : show which files are untracked, modified or staged\n- git add <file> : stage a file for the next commit\n- git commit -m \"message\" : save the staged changes to the history\n" > commands.md

$ git status
On branch tracking-changes-with-git-week1-2
Your branch is up to date with 'origin/tracking-changes-with-git-week1-2'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	./

nothing added to commit but untracked files present (use "git add" to track)
```

`git add` stages the file. `git status` now lists it under **Changes to be committed**:

```console
$ git add commands.md
warning: in the working copy of 'tracking-changes-practice/commands.md', LF will be replaced by CRLF the next time Git touches it

$ git status
On branch tracking-changes-with-git-week1-2
Your branch is up to date with 'origin/tracking-changes-with-git-week1-2'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   commands.md
```

`git commit` saves the staged change. Afterwards the working tree is clean again and the branch is one commit ahead of GitHub:

```console
$ git commit -m "Add Git cheat sheet covering status, add and commit" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[tracking-changes-with-git-week1-2 af0c60b] Add Git cheat sheet covering status, add and commit
 1 file changed, 7 insertions(+)
 create mode 100644 tracking-changes-practice/commands.md

$ git status
On branch tracking-changes-with-git-week1-2
Your branch is ahead of 'origin/tracking-changes-with-git-week1-2' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
```

### Commit 2: modifying a tracked file

I added a section to the same file. Because the file is already tracked, Git reports it as **modified** and **not staged**:

```console
$ printf "\n## Viewing history\n\n- git log : show full commit history\n- git log --oneline : show one line per commit\n- git log --stat : show which files each commit changed\n" >> commands.md

$ git status
On branch tracking-changes-with-git-week1-2
Your branch is ahead of 'origin/tracking-changes-with-git-week1-2' by 1 commit.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   commands.md

no changes added to commit (use "git add" and/or "git commit -a")
```

`git diff` shows exactly which lines changed (lines starting with `+` were added):

```console
$ git diff
warning: in the working copy of 'tracking-changes-practice/commands.md', LF will be replaced by CRLF the next time Git touches it
diff --git a/tracking-changes-practice/commands.md b/tracking-changes-practice/commands.md
index 17ab02d..d061d5e 100644
--- a/tracking-changes-practice/commands.md
+++ b/tracking-changes-practice/commands.md
@@ -5,3 +5,9 @@
 - git status : show which files are untracked, modified or staged
 - git add <file> : stage a file for the next commit
 - git commit -m "message" : save the staged changes to the history
+
+## Viewing history
+
+- git log : show full commit history
+- git log --oneline : show one line per commit
+- git log --stat : show which files each commit changed
```

Then I staged and committed the change:

```console
$ git add commands.md
warning: in the working copy of 'tracking-changes-practice/commands.md', LF will be replaced by CRLF the next time Git touches it

$ git diff --staged --stat
 tracking-changes-practice/commands.md | 6 ++++++
 1 file changed, 6 insertions(+)

$ git commit -m "Document git log commands in cheat sheet" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[tracking-changes-with-git-week1-2 fb5d875] Document git log commands in cheat sheet
 1 file changed, 6 insertions(+)
```

### Commit 3: several files in one commit

Two related files can be staged together and saved as one commit. `git status --short` is a compact view; `A` means "added to the staging area":

```console
$ printf "Git workflow notes\n\n1. Edit files in the working directory.\n2. Stage the changes with git add.\n3. Save them with git commit.\n" > workflow-notes.txt

$ printf "Practice to-do list\n\n[x] Create a file and commit it\n[x] Modify a file and commit the change\n[ ] View the history with git log\n" > todo.txt

$ git status
On branch tracking-changes-with-git-week1-2
Your branch is ahead of 'origin/tracking-changes-with-git-week1-2' by 2 commits.
  (use "git push" to publish your local commits)

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	todo.txt
	workflow-notes.txt

nothing added to commit but untracked files present (use "git add" to track)

$ git add workflow-notes.txt todo.txt
warning: in the working copy of 'tracking-changes-practice/todo.txt', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'tracking-changes-practice/workflow-notes.txt', LF will be replaced by CRLF the next time Git touches it

$ git status --short
A  todo.txt
A  workflow-notes.txt

$ git commit -m "Add workflow notes and practice to-do list" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[tracking-changes-with-git-week1-2 ffa6bc9] Add workflow notes and practice to-do list
 2 files changed, 10 insertions(+)
 create mode 100644 tracking-changes-practice/todo.txt
 create mode 100644 tracking-changes-practice/workflow-notes.txt
```

## 3. Beginner Mistakes: What Went Wrong and How to Fix It

The three mistakes below were made on purpose during the session so that the real error output and the real fix could be recorded.

### Mistake 1: committing without staging first

I edited a file and ran `git commit` straight away, skipping `git add`.

```console
$ printf "4. Check the result with git status and git log.\n" >> workflow-notes.txt

$ git commit -m "Add fourth step to workflow notes"
On branch tracking-changes-with-git-week1-2
Your branch is ahead of 'origin/tracking-changes-with-git-week1-2' by 3 commits.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   workflow-notes.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

**Why it happened:** `git commit` only saves what is in the staging area. The edit was still in the working directory, so there was nothing to commit and **no commit was created**. This is easy to miss because Git prints a status report instead of a clear "error".

**Fix:** stage the file, then commit.

```console
$ git add workflow-notes.txt
warning: in the working copy of 'tracking-changes-practice/workflow-notes.txt', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Add fourth workflow step about checking status and log" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[tracking-changes-with-git-week1-2 2d5df81] Add fourth workflow step about checking status and log
 1 file changed, 1 insertion(+)
```

### Mistake 2: staging a file that should not be committed

I had a temporary file in the folder and used `git add .`, which stages everything.

```console
$ echo "temporary scratch data" > scratch.tmp

$ printf "[x] View the history with git log\n" >> todo.txt

$ git add .
warning: in the working copy of 'tracking-changes-practice/todo.txt', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'tracking-changes-practice/workflow-notes.txt', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'tracking-changes-practice/scratch.tmp', LF will be replaced by CRLF the next time Git touches it

$ git status
On branch tracking-changes-with-git-week1-2
Your branch is ahead of 'origin/tracking-changes-with-git-week1-2' by 4 commits.
  (use "git push" to publish your local commits)

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   scratch.tmp
	modified:   todo.txt
```

**Why it happened:** `git add .` stages every new and changed file in the folder, including ones I did not mean to share. Running `git status` before committing is what caught it: `scratch.tmp` is listed under "Changes to be committed".

**Fix:** unstage the file with `git restore --staged`. The file stays on disk but leaves the staging area:

```console
$ git restore --staged scratch.tmp

$ git status
On branch tracking-changes-with-git-week1-2
Your branch is ahead of 'origin/tracking-changes-with-git-week1-2' by 4 commits.
  (use "git push" to publish your local commits)

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   todo.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	scratch.tmp
```

**Preventing it next time:** a `.gitignore` file tells Git to ignore matching files completely. After adding `*.tmp` to it, `scratch.tmp` no longer appears in `git status` at all:

```console
$ echo "*.tmp" > .gitignore

$ git add .gitignore todo.txt
warning: in the working copy of 'tracking-changes-practice/todo.txt', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'tracking-changes-practice/.gitignore', LF will be replaced by CRLF the next time Git touches it

$ git status
On branch tracking-changes-with-git-week1-2
Your branch is ahead of 'origin/tracking-changes-with-git-week1-2' by 4 commits.
  (use "git push" to publish your local commits)

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   .gitignore
	modified:   todo.txt

$ git commit -m "Ignore temporary files and add history task to to-do list" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[tracking-changes-with-git-week1-2 cc22d14] Ignore temporary files and add history task to to-do list
 2 files changed, 2 insertions(+)
 create mode 100644 tracking-changes-practice/.gitignore
```

### Mistake 3: a meaningless commit message

I committed with a rushed message that also had a typo.

```console
$ printf "\n## Fixing mistakes\n\n- git restore --staged <file> : unstage a file\n- git commit --amend : fix the last commit\n" >> commands.md

$ git add commands.md
warning: in the working copy of 'tracking-changes-practice/commands.md', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "updte" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[tracking-changes-with-git-week1-2 74d3d14] updte
 1 file changed, 5 insertions(+)

$ git log --oneline -3
74d3d14 updte
cc22d14 Ignore temporary files and add history task to to-do list
2d5df81 Add fourth workflow step about checking status and log
```

**Why it is a problem:** "updte" says nothing about what changed or why. In the history it is useless next to the other messages, and anyone reading the log later would have to open the commit to find out what it did.

**Fix:** `git commit --amend` replaces the most recent commit with a corrected one. The log shows the message is fixed, and the commit ID changed from `74d3d14` to `49de7c9` because an amended commit is a new commit:

```console
$ git commit --amend -m "Add commands for fixing mistakes to cheat sheet" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[tracking-changes-with-git-week1-2 49de7c9] Add commands for fixing mistakes to cheat sheet
 Date: Tue Nov 17 11:18:11 2026 +0530
 1 file changed, 5 insertions(+)

$ git log --oneline -3
49de7c9 Add commands for fixing mistakes to cheat sheet
cc22d14 Ignore temporary files and add history task to to-do list
2d5df81 Add fourth workflow step about checking status and log
```

**Caution:** `--amend` should only be used on a commit that has not been pushed yet. This one was still local, so amending it was safe.

### Other common beginner mistakes

| Mistake | Why it is a problem | How to avoid it |
| --- | --- | --- |
| Not running `git status` before committing | Wrong or missing files end up in the commit | Run `git status` before every `git add` and `git commit` |
| Putting many unrelated changes in one commit | The history is hard to read and hard to undo | Make one commit per logical change |
| Running `git commit` without `-m` | Git opens a text editor, which is confusing the first time | Use `git commit -m "message"`, or type the message in the editor, save and close it |
| Forgetting that editing a file after `git add` needs another `git add` | The commit contains the old staged version, not the latest edit | Run `git add` again after further edits |
| Committing passwords or generated files | They stay in the history even if deleted later | List them in `.gitignore` before the first commit |

## 4. Writing Meaningful Commit Messages

The messages used in this assignment follow these rules:

- Start with a verb in the imperative form: "Add", "Document", "Ignore".
- Say **what** changed specifically, not just that something changed.
- Keep the first line short (under about 50–60 characters).
- One message describes one logical change.

| Poor message | Meaningful message used here |
| --- | --- |
| `first commit` | `Add Git cheat sheet covering status, add and commit` |
| `changes` | `Document git log commands in cheat sheet` |
| `new files` | `Add workflow notes and practice to-do list` |
| `updte` | `Add commands for fixing mistakes to cheat sheet` |

## 5. Viewing the Commit History

### One line per commit

`git log --oneline` gives a short overview: the abbreviated commit ID and the message, newest first. The top six commits are the ones created in this assignment; the five below them already existed in the repository.

```console
$ git log --oneline
49de7c9 Add commands for fixing mistakes to cheat sheet
cc22d14 Ignore temporary files and add history task to to-do list
2d5df81 Add fourth workflow step about checking status and log
ffa6bc9 Add workflow notes and practice to-do list
fb5d875 Document git log commands in cheat sheet
af0c60b Add Git cheat sheet covering status, add and commit
46509ef Merge pull request #1 from exelynt-learning-platform/understanding-version-control-git-and-github-week1-2
c694c0b Add files via upload
ccfd5cf Delete version-control-and-git-assignment.md
a07608a Add files via upload
c8222d3 Initial commit
```

(The commit that adds this document was made afterwards, so it is not in this listing.)

### Full details

`git log` shows the full commit ID, author, date and message. `-3` limits it to the last three commits. The author name and email come from my global Git configuration.

```console
$ git log -3
commit 49de7c9c183ca1702178a59fbf5aaa2b2ca7c774
Author: Tejas Rajendra Bhoite <tejas.bhoite@multigenesys.com>
Date:   Tue Nov 17 11:18:11 2026 +0530

    Add commands for fixing mistakes to cheat sheet
    
    Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>

commit cc22d146d2b9fda76387e1ecbd00899d04cc987b
Author: Tejas Rajendra Bhoite <tejas.bhoite@multigenesys.com>
Date:   Tue Nov 17 11:18:11 2026 +0530

    Ignore temporary files and add history task to to-do list
    
    Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>

commit 2d5df81dd8c7a31a8fd573f2d23040499e186868
Author: Tejas Rajendra Bhoite <tejas.bhoite@multigenesys.com>
Date:   Tue Nov 17 11:18:10 2026 +0530

    Add fourth workflow step about checking status and log
    
    Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>
```

### Which files each commit changed

`--stat` adds a summary of the files touched and the number of lines added or removed:

```console
$ git log --oneline --stat -3
49de7c9 Add commands for fixing mistakes to cheat sheet
 tracking-changes-practice/commands.md | 5 +++++
 1 file changed, 5 insertions(+)
cc22d14 Ignore temporary files and add history task to to-do list
 tracking-changes-practice/.gitignore | 1 +
 tracking-changes-practice/todo.txt   | 1 +
 2 files changed, 2 insertions(+)
2d5df81 Add fourth workflow step about checking status and log
 tracking-changes-practice/workflow-notes.txt | 1 +
 1 file changed, 1 insertion(+)
```

### History of a single file

Adding `-- <file>` shows only the commits that changed that file:

```console
$ git log --oneline -- todo.txt
cc22d14 Ignore temporary files and add history task to to-do list
ffa6bc9 Add workflow notes and practice to-do list
```

### The exact lines changed in a commit

`-p` (patch) shows the actual content of the change:

```console
$ git log -p -1 --oneline
49de7c9 Add commands for fixing mistakes to cheat sheet
diff --git a/tracking-changes-practice/commands.md b/tracking-changes-practice/commands.md
index d061d5e..1900305 100644
--- a/tracking-changes-practice/commands.md
+++ b/tracking-changes-practice/commands.md
@@ -11,3 +11,8 @@
 - git log : show full commit history
 - git log --oneline : show one line per commit
 - git log --stat : show which files each commit changed
+
+## Fixing mistakes
+
+- git restore --staged <file> : unstage a file
+- git commit --amend : fix the last commit
```

### Final state

After all commits the working tree is clean, and the branch is six commits ahead of GitHub, ready to push:

```console
$ git status
On branch tracking-changes-with-git-week1-2
Your branch is ahead of 'origin/tracking-changes-with-git-week1-2' by 6 commits.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
```

## 6. Summary

| Command | What it does |
| --- | --- |
| `git status` | Shows untracked, modified and staged files |
| `git status --short` | The same information in a compact form |
| `git add <file>` | Stages a file for the next commit |
| `git diff` / `git diff --staged` | Shows unstaged / staged changes line by line |
| `git commit -m "message"` | Saves the staged changes as a commit |
| `git restore --staged <file>` | Removes a file from the staging area |
| `git commit --amend` | Replaces the last (unpushed) commit |
| `git log`, `--oneline`, `--stat`, `-p` | Shows the commit history at different levels of detail |

In this assignment I created six commits with descriptive messages, checked `git status` at each stage of the add–commit cycle, made and corrected three typical beginner mistakes, and inspected the resulting history with several forms of `git log`.

## Submission Checklist

- [x] `git status`, `git add` and `git commit` used correctly, with real output.
- [x] Commit messages are meaningful.
- [x] Multiple commits created.
- [x] Commit history viewed with `git log`.
- [x] Beginner mistakes identified, explained and fixed.
