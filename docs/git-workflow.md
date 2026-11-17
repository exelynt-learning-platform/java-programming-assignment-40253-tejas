# Git Workflow: How This Project Was Built

**Assignment:** Git & GitHub: Version Control Essentials for Developers
**Name:** Tejas Rajendra Bhoite
**System:** Windows 11 Pro, Git 2.56.0 for Windows (Git Bash), Node.js 24.21.0
**Branch:** `git-github-version-control-essentials-for-developers-week1-2`

This document records how the Grade Tracker project in this repository was built with Git, from an empty branch to a pushed, working program. All command output is copied as text from Git Bash, and the commits shown are the real history of this branch, so everything here can be checked on GitHub.

Notes on reading it:

- Lines starting with `$` are commands; the lines below are what the terminal printed.
- **The main line** means this assignment branch. In this course every assignment is submitted on a branch the platform creates, and that branch is merged into the repository's `main` branch by pull request after review. So here the assignment branch plays the role `main` plays in an ordinary project: feature branches are created from it and merged back into it.
- `warning: ... LF will be replaced by CRLF` is Git on Windows converting line endings. It is not an error.
- Commits carry a `Co-Authored-By` line (added with `--trailer`) because an AI coding assistant (Claude Code) was used to build this project.
- File edits were made in the editor between commands. They are described in words, and the `git diff` output shows exactly what changed where it matters.

## Summary

| Requirement | Where it is shown |
| --- | --- |
| Local and remote repository | Section 1 |
| Project folder structure | Section 2 |
| Meaningful commit messages, number of commits | Sections 3 and 8 |
| Branch created and used | Section 4 |
| Branch merged into the main line | Section 5 |
| Merge conflict handled | Section 6 |
| `.gitignore`, no unnecessary or sensitive files | Section 7 |
| Pushed to GitHub; public and accessible | Section 9 |
| README with overview and setup | [README.md](../README.md) |

## 1. Local and Remote Repository

The **remote** repository is on GitHub:

https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas

The **local** repository is the copy on my machine in `D:\Repositorys\java-programming-assignment-40253-tejas`. The two are connected through the remote named `origin`, and the local branch tracks the branch of the same name on GitHub:

```console
$ git status
On branch git-github-version-control-essentials-for-developers-week1-2
Your branch is up to date with 'origin/git-github-version-control-essentials-for-developers-week1-2'.

nothing to commit, working tree clean

$ git remote -v
origin	https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git (fetch)
origin	https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git (push)

$ git branch --show-current
git-github-version-control-essentials-for-developers-week1-2
```

GitHub's public API confirms the remote repository exists and is public:

```console
$ curl -s https://api.github.com/repos/exelynt-learning-platform/java-programming-assignment-40253-tejas | grep -E '^  "(full_name|html_url|private|visibility|created_at|default_branch|clone_url)"'
  "full_name": "exelynt-learning-platform/java-programming-assignment-40253-tejas",
  "private": false,
  "html_url": "https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas",
  "created_at": "2026-11-17T04:50:01Z",
  "clone_url": "https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git",
  "visibility": "public",
  "default_branch": "main",
```

The repository is owned by the course organization and my GitHub account, `TejasBhoite0707`, has push access to it. Because `visibility` is `public`, anyone can open the address above or clone it without signing in.

## 2. Project Folder Structure

```text
.
├── data/        input data          sample-grades.csv
├── docs/        documentation       git-workflow.md (this file)
├── src/         program code        csvReader.js, gradeCalculator.js, index.js
├── test/        tests               gradeCalculator.test.js
├── .gitignore
├── package.json
└── README.md
```

Each kind of file has one place: code in `src/`, tests in `test/`, data in `data/`, documentation in `docs/`. The files a visitor or a tool expects to find at the top (`README.md`, `.gitignore`, `package.json`) are at the top. Within `src/`, each file has one job: reading input, calculating, and printing.

## 3. Building the First Version in Small Commits

I built the program in six commits, each adding one complete piece. This is the pattern for every one of them: check with `git status`, stage specific files with `git add`, commit with a message that says what was added.

**Commit 1** was the `.gitignore`, before any other file, so that nothing unwanted could be staged later:

```console
$ git status --short
?? .gitignore

$ git add .gitignore
warning: in the working copy of '.gitignore', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Add .gitignore for dependencies, logs, secrets and editor files" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[git-github-version-control-essentials-for-developers-week1-2 f67662b] Add .gitignore for dependencies, logs, secrets and editor files
 1 file changed, 27 insertions(+)
 create mode 100644 .gitignore
```

**Commit 3** shows staging by name. `git status` reported two new folders, and I added exactly the two files that belonged to this step:

```console
$ git status --short
?? data/
?? src/

$ git add src/csvReader.js data/sample-grades.csv
warning: in the working copy of 'data/sample-grades.csv', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/csvReader.js', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Add CSV reader that parses student names and marks" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[git-github-version-control-essentials-for-developers-week1-2 f346aef] Add CSV reader that parses student names and marks
 2 files changed, 58 insertions(+)
 create mode 100644 data/sample-grades.csv
 create mode 100644 src/csvReader.js
```

After **commit 5** the program ran for the first time:

```console
$ node src/index.js
Student      Average   Grade
----------------------------
Asha           91.67   A
Rohan          74.67   C
Meera          61.00   C
Kabir          38.33   F
Isha           34.33   F
```

After **commit 6** (the README), the history read as a list of what the project contains, newest first:

```console
$ git log --oneline -7
7d401b8 Rewrite README with project overview and setup steps
df765bc Add command-line entry point that prints the grade report
53c2f2f Add grade calculator for averages and letter grades
f346aef Add CSV reader that parses student names and marks
f0c6468 Add package.json with start and test scripts
f67662b Add .gitignore for dependencies, logs, secrets and editor files
46509ef Merge pull request #1 from exelynt-learning-platform/understanding-version-control-git-and-github-week1-2
```

### Why the messages are written this way

- Each starts with an imperative verb (`Add`, `Rewrite`, `Document`, `Lower`, `Name`).
- Each says **what** was added or changed, specifically enough to find it later.
- Each describes one logical change, which is why the commits are small.

Compare `Add CSV reader that parses student names and marks` with `update` or `changes`: the first can be understood months later without opening the commit.

## 4. Creating and Using a Branch

The next feature, a class summary plus tests, was built on its own branch so the working version on the main line stayed untouched while it was in progress.

```console
$ git switch -c feature/class-summary
Switched to a new branch 'feature/class-summary'

$ git branch --show-current
feature/class-summary
```

`git switch -c` creates the branch and switches to it in one step. I then added two functions to `src/gradeCalculator.js` and made `src/index.js` print their results:

```console
$ git status --short
 M src/gradeCalculator.js
 M src/index.js

$ git diff --stat
warning: in the working copy of 'src/gradeCalculator.js', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/index.js', LF will be replaced by CRLF the next time Git touches it
 src/gradeCalculator.js | 19 ++++++++++++++++++-
 src/index.js           |  9 ++++++++-
 2 files changed, 26 insertions(+), 2 deletions(-)

$ git add src/gradeCalculator.js src/index.js
warning: in the working copy of 'src/gradeCalculator.js', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/index.js', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Add class average and top student to the report" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[feature/class-summary 747b644] Add class average and top student to the report
 2 files changed, 26 insertions(+), 2 deletions(-)
```

The commit output begins `[feature/class-summary ...]`, confirming it went onto the branch. A second commit on the same branch added the tests, which pass:

```console
$ git add test/gradeCalculator.test.js
warning: in the working copy of 'test/gradeCalculator.test.js', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Add unit tests for grade calculator and CSV parsing" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[feature/class-summary 3e4d8ea] Add unit tests for grade calculator and CSV parsing
 1 file changed, 56 insertions(+)
 create mode 100644 test/gradeCalculator.test.js

$ npm test

> grade-tracker@1.0.0 test
> node --test

✔ average of several marks (0.9343ms)
✔ average is rounded to two decimals (0.1358ms)
✔ average of no marks is 0 (0.0987ms)
✔ letter grade boundaries (0.1388ms)
✔ class average is the average of student averages (0.9488ms)
✔ top student has the highest average (0.9959ms)
✔ top student of an empty class is null (0.1093ms)
✔ parseLine reads a name and its marks (0.2981ms)
✔ parseLine rejects a mark above 100 (0.5227ms)
✔ parseLine rejects a line without marks (0.7445ms)
ℹ tests 10
ℹ suites 0
ℹ pass 10
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 117.7162
```

### The branch is isolated

Switching back to the main line, the `test` folder is not there. The work exists only on the feature branch until it is merged:

```console
$ git switch git-github-version-control-essentials-for-developers-week1-2
Switched to branch 'git-github-version-control-essentials-for-developers-week1-2'
Your branch is ahead of 'origin/git-github-version-control-essentials-for-developers-week1-2' by 6 commits.
  (use "git push" to publish your local commits)

$ ls
README.md
data
package.json
src
version-control-and-git-assignment.md
```

While the feature branch was open, the main line moved on too. I added a section to the README there:

```console
$ git add README.md
warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Document the CSV input format in README" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[git-github-version-control-essentials-for-developers-week1-2 9a6c4a4] Document the CSV input format in README
 1 file changed, 11 insertions(+)
```

The graph shows the two lines of work splitting apart after `7d401b8`:

```console
$ git log --oneline --graph -9 git-github-version-control-essentials-for-developers-week1-2 feature/class-summary --not origin/git-github-version-control-essentials-for-developers-week1-2
* 9a6c4a4 Document the CSV input format in README
| * 3e4d8ea Add unit tests for grade calculator and CSV parsing
| * 747b644 Add class average and top student to the report
|/  
* 7d401b8 Rewrite README with project overview and setup steps
* df765bc Add command-line entry point that prints the grade report
* 53c2f2f Add grade calculator for averages and letter grades
* f346aef Add CSV reader that parses student names and marks
* f0c6468 Add package.json with start and test scripts
* f67662b Add .gitignore for dependencies, logs, secrets and editor files
```

## 5. Merging the Branch

A merge is run from the branch that receives the changes. I was on the main line and merged the feature branch into it:

```console
$ git merge feature/class-summary -m "Merge branch 'feature/class-summary' to add class summary and tests" -m "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
Merge made by the 'ort' strategy.
 src/gradeCalculator.js       | 19 ++++++++++++++-
 src/index.js                 |  9 ++++++-
 test/gradeCalculator.test.js | 56 ++++++++++++++++++++++++++++++++++++++++++++
 3 files changed, 82 insertions(+), 2 deletions(-)
 create mode 100644 test/gradeCalculator.test.js
```

**Why it merged automatically:** both lines had new commits, so Git made a merge commit to join them. There was no conflict because the two sides changed different files (the README on the main line; `src/` and `test/` on the branch).

The `test` folder is now on the main line, and the program prints the new summary:

```console
$ ls
README.md
data
package.json
src
test
version-control-and-git-assignment.md

$ npm start

> grade-tracker@1.0.0 start
> node src/index.js

Student      Average   Grade
----------------------------
Asha           91.67   A
Rohan          74.67   C
Meera          61.00   C
Kabir          38.33   F
Isha           34.33   F
----------------------------
Class average: 60.00
Top student:   Asha (91.67)

$ git log --oneline --graph -6
*   1a64294 Merge branch 'feature/class-summary' to add class summary and tests
|\  
| * 3e4d8ea Add unit tests for grade calculator and CSV parsing
| * 747b644 Add class average and top student to the report
* | 9a6c4a4 Document the CSV input format in README
|/  
* 7d401b8 Rewrite README with project overview and setup steps
* df765bc Add command-line entry point that prints the grade report
```

## 6. Handling a Merge Conflict

### How the conflict came about

Two changes were made to the same line of `src/gradeCalculator.js`, on two branches.

On a new branch, `feature/pass-mark`, the pass mark was lowered from 40 to 35, in the code and in its test:

```console
$ git switch -c feature/pass-mark
Switched to a new branch 'feature/pass-mark'

$ git diff
warning: in the working copy of 'src/gradeCalculator.js', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'test/gradeCalculator.test.js', LF will be replaced by CRLF the next time Git touches it
diff --git a/src/gradeCalculator.js b/src/gradeCalculator.js
index 3a9291e..306f085 100644
--- a/src/gradeCalculator.js
+++ b/src/gradeCalculator.js
@@ -14,7 +14,7 @@ function letterGrade(averageMark) {
   if (averageMark >= 90) return 'A';
   if (averageMark >= 75) return 'B';
   if (averageMark >= 60) return 'C';
-  if (averageMark >= 40) return 'D';
+  if (averageMark >= 35) return 'D';
   return 'F';
 }
 
diff --git a/test/gradeCalculator.test.js b/test/gradeCalculator.test.js
index 3ee6ee3..bd41c06 100644
--- a/test/gradeCalculator.test.js
+++ b/test/gradeCalculator.test.js
@@ -27,8 +27,8 @@ test('letter grade boundaries', () => {
   assert.equal(letterGrade(89.99), 'B');
   assert.equal(letterGrade(75), 'B');
   assert.equal(letterGrade(60), 'C');
-  assert.equal(letterGrade(40), 'D');
-  assert.equal(letterGrade(39.99), 'F');
+  assert.equal(letterGrade(35), 'D');
+  assert.equal(letterGrade(34.99), 'F');
 });
 
 test('class average is the average of student averages', () => {

$ git add src/gradeCalculator.js test/gradeCalculator.test.js
warning: in the working copy of 'src/gradeCalculator.js', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'test/gradeCalculator.test.js', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Lower the pass mark from 40 to 35" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[feature/pass-mark c9ddd51] Lower the pass mark from 40 to 35
 2 files changed, 3 insertions(+), 3 deletions(-)
```

Meanwhile on the main line, the same line was tidied up by giving the number 40 a name:

```console
$ git switch git-github-version-control-essentials-for-developers-week1-2
Switched to branch 'git-github-version-control-essentials-for-developers-week1-2'
Your branch is ahead of 'origin/git-github-version-control-essentials-for-developers-week1-2' by 10 commits.
  (use "git push" to publish your local commits)

$ git diff
warning: in the working copy of 'src/gradeCalculator.js', LF will be replaced by CRLF the next time Git touches it
diff --git a/src/gradeCalculator.js b/src/gradeCalculator.js
index 3a9291e..f76e4ba 100644
--- a/src/gradeCalculator.js
+++ b/src/gradeCalculator.js
@@ -1,5 +1,8 @@
 'use strict';
 
+/** Lowest average that still counts as a pass. */
+const PASS_MARK = 40;
+
 /** Returns the average of a list of marks, rounded to two decimals. */
 function average(marks) {
   if (!Array.isArray(marks) || marks.length === 0) {
@@ -14,7 +17,7 @@ function letterGrade(averageMark) {
   if (averageMark >= 90) return 'A';
   if (averageMark >= 75) return 'B';
   if (averageMark >= 60) return 'C';
-  if (averageMark >= 40) return 'D';
+  if (averageMark >= PASS_MARK) return 'D';
   return 'F';
 }
 

$ git add src/gradeCalculator.js
warning: in the working copy of 'src/gradeCalculator.js', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Name the pass mark as a constant" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[git-github-version-control-essentials-for-developers-week1-2 2ae0a5e] Name the pass mark as a constant
 1 file changed, 4 insertions(+), 1 deletion(-)
```

### The conflict

```console
$ git merge feature/pass-mark
Auto-merging src/gradeCalculator.js
CONFLICT (content): Merge conflict in src/gradeCalculator.js
Automatic merge failed; fix conflicts and then commit the result.

$ git status
On branch git-github-version-control-essentials-for-developers-week1-2
Your branch is ahead of 'origin/git-github-version-control-essentials-for-developers-week1-2' by 11 commits.
  (use "git push" to publish your local commits)

You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Changes to be committed:
	modified:   test/gradeCalculator.test.js

Unmerged paths:
  (use "git add <file>..." to mark resolution)
	both modified:   src/gradeCalculator.js
```

**Reading `git status`:** the merge stopped partway. The test file merged cleanly and is already staged, because only one branch had changed it. `src/gradeCalculator.js` is `both modified`: each branch rewrote the same line in a different way, and Git will not guess which is right.

`git diff` shows the disputed lines with the markers Git inserted into the file:

```console
$ git diff
diff --cc src/gradeCalculator.js
index f76e4ba,306f085..0000000
--- a/src/gradeCalculator.js
+++ b/src/gradeCalculator.js
@@@ -17,7 -14,7 +17,11 @@@ function letterGrade(averageMark) 
    if (averageMark >= 90) return 'A';
    if (averageMark >= 75) return 'B';
    if (averageMark >= 60) return 'C';
++<<<<<<< HEAD
 +  if (averageMark >= PASS_MARK) return 'D';
++=======
+   if (averageMark >= 35) return 'D';
++>>>>>>> feature/pass-mark
    return 'F';
  }
  
```

| Marker | Meaning |
| --- | --- |
| `<<<<<<< HEAD` | Start of the main line's version |
| `=======` | Divider |
| `>>>>>>> feature/pass-mark` | End of the incoming branch's version |

### Resolving it

Neither side could simply be chosen:

- Taking the main line's version (`PASS_MARK`, still 40) would silently throw away the decision to lower the pass mark, and the merged test, which now expects 35, would fail.
- Taking the branch's version (`35`) would leave the new `PASS_MARK` constant defined but unused.

The two changes had different purposes, one about the *value* and one about the *style*, and both were wanted. So I edited the file to keep the constant on the disputed line, changed the constant's value to 35, and deleted the three marker lines. A search confirms the result and that no markers are left:

```console
$ grep -n -E 'PASS_MARK|<<<<<<<|=======|>>>>>>>' src/gradeCalculator.js
4:const PASS_MARK = 35;
20:  if (averageMark >= PASS_MARK) return 'D';
```

Before marking the conflict as resolved I ran the tests, because a file with no markers is not necessarily a correct file:

```console
$ npm test

> grade-tracker@1.0.0 test
> node --test

✔ average of several marks (0.8438ms)
✔ average is rounded to two decimals (0.2483ms)
✔ average of no marks is 0 (0.1685ms)
✔ letter grade boundaries (0.216ms)
✔ class average is the average of student averages (1.0418ms)
✔ top student has the highest average (1.545ms)
✔ top student of an empty class is null (0.1313ms)
✔ parseLine reads a name and its marks (0.2197ms)
✔ parseLine rejects a mark above 100 (0.5121ms)
✔ parseLine rejects a line without marks (0.2814ms)
ℹ tests 10
ℹ suites 0
ℹ pass 10
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 127.4733
```

Then `git add` to mark it resolved and `git commit` to finish the merge:

```console
$ git add src/gradeCalculator.js
warning: in the working copy of 'src/gradeCalculator.js', LF will be replaced by CRLF the next time Git touches it

$ git status
On branch git-github-version-control-essentials-for-developers-week1-2
Your branch is ahead of 'origin/git-github-version-control-essentials-for-developers-week1-2' by 11 commits.
  (use "git push" to publish your local commits)

All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)

Changes to be committed:
	modified:   src/gradeCalculator.js
	modified:   test/gradeCalculator.test.js

$ git commit -m "Merge branch 'feature/pass-mark', keeping the constant with the new pass mark of 35" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[git-github-version-control-essentials-for-developers-week1-2 43b5cf1] Merge branch 'feature/pass-mark', keeping the constant with the new pass mark of 35
```

The effect is visible in the program's output. Kabir's average of 38.33 was an F under the old pass mark and is now a D:

```console
$ npm start

> grade-tracker@1.0.0 start
> node src/index.js

Student      Average   Grade
----------------------------
Asha           91.67   A
Rohan          74.67   C
Meera          61.00   C
Kabir          38.33   D
Isha           34.33   F
----------------------------
Class average: 60.00
Top student:   Asha (91.67)
```

### The steps for any conflict

1. `git status` to see which files are in conflict.
2. Open each file and find the `<<<<<<<`, `=======`, `>>>>>>>` markers.
3. Decide what the content should be. This may be one side, the other, or a combination.
4. Edit the file to that content and delete the markers.
5. Run the program or its tests.
6. `git add <file>`, then `git commit`.
7. At any point before the commit, `git merge --abort` returns everything to the state before the merge.

## 7. .gitignore and Keeping the Repository Clean

The [.gitignore](../.gitignore) covers five groups of files that should never be committed:

| Group | Patterns | Reason |
| --- | --- | --- |
| Dependencies | `node_modules/` | Downloaded by a tool; can be thousands of files |
| Generated output | `coverage/`, `reports/`, `*.log` | Recreated on every run |
| Secrets | `.env`, `.env.*`, `*.key`, `*.pem` | Passwords and keys must not be published |
| Editor settings | `.vscode/`, `.idea/`, `*.iml` | Personal to each developer |
| OS and temporary files | `Thumbs.db`, `.DS_Store`, `*.tmp`, `*.bak` | Not part of the project |

### Testing it

To check the rules instead of assuming they work, I created one sample file from four of the groups: `node_modules/placeholder.js`, `.env`, `debug.log` and `reports/report.txt`. Plain `git status` showed nothing at all, as if the files did not exist:

```console
$ git status --short
```

With `--ignored`, Git lists what it is hiding (`!!` means ignored), and `git check-ignore -v` names the exact line of `.gitignore` responsible for each:

```console
$ git status --short --ignored
!! .env
!! debug.log
!! node_modules/
!! reports/

$ git check-ignore -v node_modules/placeholder.js .env debug.log reports/report.txt
.gitignore:2:node_modules/	node_modules/placeholder.js
.gitignore:10:.env	.env
.gitignore:7:*.log	debug.log
.gitignore:6:reports/	reports/report.txt
```

I deleted the sample files afterwards, leaving nothing ignored and nothing untracked:

```console
$ git status --short --ignored
```

### What the repository contains

`git ls-files` lists every file Git tracks. At this point (before this document and the final README were added):

```console
$ git ls-files
.gitignore
README.md
data/sample-grades.csv
package.json
src/csvReader.js
src/gradeCalculator.js
src/index.js
test/gradeCalculator.test.js
version-control-and-git-assignment.md
```

Every file is something a person wrote and the project needs. There are no dependencies, build output, logs, editor folders, passwords or keys. The sample data contains invented names and marks only.

## 8. Complete History

```console
$ git log --oneline --graph -14
*   43b5cf1 Merge branch 'feature/pass-mark', keeping the constant with the new pass mark of 35
|\  
| * c9ddd51 Lower the pass mark from 40 to 35
* | 2ae0a5e Name the pass mark as a constant
|/  
*   1a64294 Merge branch 'feature/class-summary' to add class summary and tests
|\  
| * 3e4d8ea Add unit tests for grade calculator and CSV parsing
| * 747b644 Add class average and top student to the report
* | 9a6c4a4 Document the CSV input format in README
|/  
* 7d401b8 Rewrite README with project overview and setup steps
* df765bc Add command-line entry point that prints the grade report
* 53c2f2f Add grade calculator for averages and letter grades
* f346aef Add CSV reader that parses student names and marks
* f0c6468 Add package.json with start and test scripts
* f67662b Add .gitignore for dependencies, logs, secrets and editor files
*   46509ef Merge pull request #1 from exelynt-learning-platform/understanding-version-control-git-and-github-week1-2
|\  
```

That is **13 commits** for this project at this point: 11 ordinary commits and 2 merge commits, on top of the repository's earlier history (`46509ef`). Two further commits, which complete the README and add this document, were made afterwards and so are not in this listing.

Reading the graph from the bottom: six commits in a straight line, then a branch that splits off and joins again (the class summary), then a second branch that splits off and joins again (the pass mark, where the conflict was resolved).

With both branches merged, their names were no longer needed. `git branch -d` only deletes branches whose work is already merged, so nothing can be lost:

```console
$ git branch --merged
  feature/class-summary
  feature/pass-mark
* git-github-version-control-essentials-for-developers-week1-2
  main

$ git branch -d feature/class-summary feature/pass-mark
Deleted branch feature/class-summary (was 3e4d8ea).
Deleted branch feature/pass-mark (was c9ddd51).
```

## 9. Pushing to GitHub

Throughout the work, `git status` reported the local branch as "ahead of origin" by a growing number of commits: everything so far existed only on my machine. After the README and this document were committed, the whole history was uploaded with a single command:

```bash
git push
```

Because the local branch tracks the branch of the same name on `origin` (section 1), no further arguments are needed. The evidence that the push succeeded is that this document, the code and the full commit history above are visible on the branch on GitHub:

https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas/tree/git-github-version-control-essentials-for-developers-week1-2

The repository is public (section 1), so that address opens without signing in, and the setup steps in the [README](../README.md) work for anyone.

## 10. The Workflow in One Picture

```text
   main line   o---o---o---o---o---o---o-------M---o-------M---o---o   --git push-->  GitHub
                                    \         /     \     /
   feature/class-summary             o---o---+       \   /
   feature/pass-mark                                  o-+   (conflict resolved in the merge)
```

| Stage | Commands | Purpose |
| --- | --- | --- |
| Check | `git status`, `git diff` | Know what changed before recording it |
| Record | `git add <files>`, `git commit -m "..."` | Save one logical change with an explanation |
| Isolate | `git switch -c feature/...` | Build something new without disturbing working code |
| Combine | `git merge <branch>` | Bring finished work into the main line |
| Resolve | edit, test, `git add`, `git commit` | Decide the outcome when two changes overlap |
| Clean up | `git branch -d <branch>` | Remove branches that are finished |
| Share | `git push` | Publish the commits to GitHub |
| Inspect | `git log --oneline --graph` | Read the history |

## 11. What I Learned

- Committing in small steps turns the history into a description of the project. Each of the first six commits can be read as "this is when that part arrived".
- Adding `.gitignore` first is easier than cleaning up afterwards, and its rules can be tested with `git status --ignored` and `git check-ignore -v`.
- A branch costs nothing and protects the working version. The `test` folder simply was not on the main line until the merge.
- Git merges automatically when changes do not overlap, and stops when they do. A conflict is a question, not a failure.
- Resolving a conflict means understanding what each side was trying to achieve. Here the right answer was neither side as written, but a combination of both.
- Tests make a merge trustworthy. They passed after the resolution, and they would have failed had the wrong side been chosen.
- Commits are local until pushed. `git status` kept count of how far ahead of GitHub the local branch was.
