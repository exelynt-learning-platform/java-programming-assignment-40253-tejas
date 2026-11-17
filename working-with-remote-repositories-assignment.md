# Assignment: Working with Remote Repositories

**Name:** Tejas Rajendra Bhoite
**System:** Windows 11 Pro, Git 2.56.0 for Windows (Git Bash)
**Branch:** `working-with-remote-repositories-week1-2`

All command output in this document is copied as text from Git Bash. Lines starting with `$` are commands; the lines below them are what the terminal printed. Every `git push`, `git pull`, `git fetch` and `git clone` here was run against this repository on GitHub, so the commits shown are the real history of this branch. The files are in the [remote-repositories-practice](remote-repositories-practice/) folder.

To practise collaboration on my own, I used two copies of the repository on my machine:

| Copy | Folder | Role in this document |
| --- | --- | --- |
| My working copy | `D:\Repositorys\java-programming-assignment-40253-tejas` | "my copy" |
| A fresh clone | `D:\Repositorys\remote-practice-clone` | "the teammate copy", standing in for a second person or a second computer |

Two things appear in the output and are normal:

- `warning: ... LF will be replaced by CRLF` is Git on Windows saying it will convert line endings. It is not an error.
- Each commit command has a `--trailer "Co-Authored-By: ..."` option. It adds a credit line because an AI coding assistant (Claude Code) was used for this practice session.

## 1. Local and Remote Repositories

A **local repository** is the copy on my computer, where I edit and commit. A **remote repository** is a copy hosted somewhere else, here on GitHub, that everyone on the project can reach.

Committing only changes the local repository. Nothing reaches GitHub until I **push**, and nothing a teammate pushed reaches me until I **fetch** or **pull**.

| Command | Direction | What it does |
| --- | --- | --- |
| `git clone <url>` | remote → new local folder | Downloads the whole repository for the first time |
| `git push` | local → remote | Uploads my new commits |
| `git fetch` | remote → local (records only) | Downloads new commits but does not change my files |
| `git pull` | remote → local (files too) | `git fetch` followed by merging the new commits into my branch |

## 2. `origin` and `main`

### origin

`origin` is not a Git command or a special word. It is the **nickname for the remote repository's URL**, given automatically by `git clone`. It saves typing the full address every time.

```console
$ git remote -v
origin	https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git (fetch)
origin	https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git (push)
```

There are two lines because Git stores one address for downloading (fetch) and one for uploading (push). They are normally the same.

### main

`main` is the name of the **default branch**: the one a clone starts on and the one that holds the accepted version of the project. (Older repositories call it `master`.) `git remote show origin` reports it as the remote's `HEAD branch`:

```console
$ git remote show origin
* remote origin
  Fetch URL: https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git
  Push  URL: https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git
  HEAD branch: main
  Remote branches:
    branching-merging-week1-2                            tracked
    git-installation-setup-week1-2                       tracked
    git-repository-basics-week1-2                        tracked
    main                                                 tracked
    tracking-changes-with-git-week1-2                    tracked
    understanding-version-control-git-and-github-week1-2 tracked
    working-with-remote-repositories-week1-2             tracked
  Local branches configured for 'git pull':
    branching-merging-week1-2                merges with remote branching-merging-week1-2
    git-installation-setup-week1-2           merges with remote git-installation-setup-week1-2
    git-repository-basics-week1-2            merges with remote git-repository-basics-week1-2
    main                                     merges with remote main
    tracking-changes-with-git-week1-2        merges with remote tracking-changes-with-git-week1-2
    working-with-remote-repositories-week1-2 merges with remote working-with-remote-repositories-week1-2
  Local refs configured for 'git push':
    branching-merging-week1-2                pushes to branching-merging-week1-2                (up to date)
    git-installation-setup-week1-2           pushes to git-installation-setup-week1-2           (up to date)
    git-repository-basics-week1-2            pushes to git-repository-basics-week1-2            (up to date)
    main                                     pushes to main                                     (up to date)
    tracking-changes-with-git-week1-2        pushes to tracking-changes-with-git-week1-2        (up to date)
    working-with-remote-repositories-week1-2 pushes to working-with-remote-repositories-week1-2 (up to date)
```

### origin/main: three things with similar names

| Name | What it is | Where it lives |
| --- | --- | --- |
| `main` | My local branch | On my computer; moves when I commit |
| `main` on origin | The real branch on GitHub | On GitHub; moves when someone pushes |
| `origin/main` | A **remote-tracking branch**: my computer's record of where GitHub's `main` was the last time I fetched | On my computer; moves only on fetch, pull or push |

`git branch -r` lists the remote-tracking branches. Every one starts with `origin/`:

```console
$ git branch -r
  origin/HEAD -> origin/main
  origin/branching-merging-week1-2
  origin/git-installation-setup-week1-2
  origin/git-repository-basics-week1-2
  origin/main
  origin/tracking-changes-with-git-week1-2
  origin/understanding-version-control-git-and-github-week1-2
  origin/working-with-remote-repositories-week1-2
```

This is why the full form of the commands is `git push origin main` and `git pull origin main`: "send to / get from the remote called `origin`, the branch called `main`".

In this course each assignment is submitted on its own branch instead of `main`, so in the rest of this document the branch is `working-with-remote-repositories-week1-2`. The idea is identical: my local branch is linked ("set up to track") the branch of the same name on `origin`, so plain `git push` and `git pull` already know where to go.

## 3. `git push`: Sending Commits to the Remote

Starting in sync:

```console
$ git status
On branch working-with-remote-repositories-week1-2
Your branch is up to date with 'origin/working-with-remote-repositories-week1-2'.

nothing to commit, working tree clean
```

I made a commit in my copy:

```console
$ mkdir remote-repositories-practice

$ printf "Project notes\n\n- Repository is hosted on GitHub.\n- Local copy is on my laptop.\n" > remote-repositories-practice/project-notes.txt

$ git add remote-repositories-practice/project-notes.txt
warning: in the working copy of 'remote-repositories-practice/project-notes.txt', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Add project notes about local and remote copies" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[working-with-remote-repositories-week1-2 94c05ca] Add project notes about local and remote copies
 1 file changed, 4 insertions(+)
 create mode 100644 remote-repositories-practice/project-notes.txt
```

The commit exists only on my computer. `git status` says so, and I can list exactly which commits GitHub does not have yet:

```console
$ git status
On branch working-with-remote-repositories-week1-2
Your branch is ahead of 'origin/working-with-remote-repositories-week1-2' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean

$ git log --oneline origin/working-with-remote-repositories-week1-2..HEAD
94c05ca Add project notes about local and remote copies
```

Pushing uploads it:

```console
$ git push
To https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git
   46509ef..94c05ca  working-with-remote-repositories-week1-2 -> working-with-remote-repositories-week1-2

$ git status
On branch working-with-remote-repositories-week1-2
Your branch is up to date with 'origin/working-with-remote-repositories-week1-2'.

nothing to commit, working tree clean
```

**Reading the push output:** `46509ef..94c05ca` means the branch on GitHub moved from commit `46509ef` to `94c05ca`. The part `local-branch -> remote-branch` shows which branch was sent where.

### Proof that local and remote are in sync

Three commands, three sources, one identical commit ID. The first is my local branch, the second is my record of the remote, and the third (`git ls-remote`) asks GitHub directly over the network:

```console
$ git rev-parse HEAD
94c05ca425e9327ea2bd15b79a2c00b4176f7091

$ git rev-parse origin/working-with-remote-repositories-week1-2
94c05ca425e9327ea2bd15b79a2c00b4176f7091

$ git ls-remote origin refs/heads/working-with-remote-repositories-week1-2
94c05ca425e9327ea2bd15b79a2c00b4176f7091	refs/heads/working-with-remote-repositories-week1-2
```

## 4. `git clone`: Getting a Copy of a Remote Repository

To act as a teammate, I cloned the repository into a second folder:

```console
$ cd /d/Repositorys

$ git clone https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git remote-practice-clone
Cloning into 'remote-practice-clone'...

$ cd remote-practice-clone

$ pwd
/d/Repositorys/remote-practice-clone

$ ls
README.md
version-control-and-git-assignment.md
```

`git clone` did four things in one command: created the folder, downloaded the full history, set up the `origin` nickname, and checked out the default branch `main`. I did not have to run `git init` or add a remote myself:

```console
$ git remote -v
origin	https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git (fetch)
origin	https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git (push)

$ git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean

$ git branch -a
* main
  remotes/origin/HEAD -> origin/main
  remotes/origin/branching-merging-week1-2
  remotes/origin/git-installation-setup-week1-2
  remotes/origin/git-repository-basics-week1-2
  remotes/origin/main
  remotes/origin/tracking-changes-with-git-week1-2
  remotes/origin/understanding-version-control-git-and-github-week1-2
  remotes/origin/working-with-remote-repositories-week1-2
```

Only `main` exists as a local branch, but the clone knows about all the others as `remotes/origin/...`. Switching to one creates the local branch and links it to the remote one automatically. The commit I pushed in section 3 is already there, which confirms the push really reached GitHub:

```console
$ git switch working-with-remote-repositories-week1-2
Switched to a new branch 'working-with-remote-repositories-week1-2'
branch 'working-with-remote-repositories-week1-2' set up to track 'origin/working-with-remote-repositories-week1-2'.

$ ls remote-repositories-practice
project-notes.txt

$ git log --oneline -2
94c05ca Add project notes about local and remote copies
46509ef Merge pull request #1 from exelynt-learning-platform/understanding-version-control-git-and-github-week1-2
```

Then the "teammate" committed and pushed a new file:

```console
$ printf "Teammate notes\n\n- Cloned the repository into a second folder.\n" > remote-repositories-practice/teammate-notes.txt

$ git add remote-repositories-practice/teammate-notes.txt
warning: in the working copy of 'remote-repositories-practice/teammate-notes.txt', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Add teammate notes from the cloned copy" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[working-with-remote-repositories-week1-2 c9bfa1e] Add teammate notes from the cloned copy
 1 file changed, 3 insertions(+)
 create mode 100644 remote-repositories-practice/teammate-notes.txt

$ git push
To https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git
   94c05ca..c9bfa1e  working-with-remote-repositories-week1-2 -> working-with-remote-repositories-week1-2
```

## 5. `git fetch` and `git pull`: Getting Changes from the Remote

Back in my copy, the teammate's file is not there. More surprisingly, `git status` still claims I am up to date:

```console
$ cd /d/Repositorys/java-programming-assignment-40253-tejas

$ ls remote-repositories-practice
project-notes.txt

$ git status
On branch working-with-remote-repositories-week1-2
Your branch is up to date with 'origin/working-with-remote-repositories-week1-2'.

nothing to commit, working tree clean
```

**Why:** `git status` does not contact GitHub. It compares my branch with `origin/...`, my last *recorded* position of the remote, and that record is now out of date. "Up to date" really means "up to date as of my last fetch".

`git fetch` refreshes the record. After it, `git status` tells the truth, and I can inspect the incoming commit before accepting it:

```console
$ git fetch
From https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas
   94c05ca..c9bfa1e  working-with-remote-repositories-week1-2 -> origin/working-with-remote-repositories-week1-2

$ git status
On branch working-with-remote-repositories-week1-2
Your branch is behind 'origin/working-with-remote-repositories-week1-2' by 1 commit, and can be fast-forwarded.
  (use "git pull" to update your local branch)

nothing to commit, working tree clean

$ git log --oneline HEAD..origin/working-with-remote-repositories-week1-2
c9bfa1e Add teammate notes from the cloned copy
```

Fetching changed nothing in my folder. `git pull` is what brings the commit into my branch and my files:

```console
$ git pull
Updating 94c05ca..c9bfa1e
Fast-forward
 remote-repositories-practice/teammate-notes.txt | 3 +++
 1 file changed, 3 insertions(+)
 create mode 100644 remote-repositories-practice/teammate-notes.txt

$ ls remote-repositories-practice
project-notes.txt
teammate-notes.txt
```

In sync again, checked against GitHub directly:

```console
$ git rev-parse HEAD
c9bfa1ee7b130367c52433f1035530a0dd5892f7

$ git ls-remote origin refs/heads/working-with-remote-repositories-week1-2
c9bfa1ee7b130367c52433f1035530a0dd5892f7	refs/heads/working-with-remote-repositories-week1-2
```

## 6. A Rejected Push: When Two People Push to the Same Branch

This is the most common problem in real team work, so I reproduced it. The teammate pushed another commit:

```console
$ cd /d/Repositorys/remote-practice-clone

$ printf -- "- Pushed a commit from the clone.\n" >> remote-repositories-practice/teammate-notes.txt

$ git add remote-repositories-practice/teammate-notes.txt
warning: in the working copy of 'remote-repositories-practice/teammate-notes.txt', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Record that the clone pushed a commit" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[working-with-remote-repositories-week1-2 e2e441a] Record that the clone pushed a commit
 1 file changed, 1 insertion(+)

$ git push
To https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git
   c9bfa1e..e2e441a  working-with-remote-repositories-week1-2 -> working-with-remote-repositories-week1-2
```

Meanwhile, in my copy, I committed without pulling first and tried to push:

```console
$ cd /d/Repositorys/java-programming-assignment-40253-tejas

$ printf -- "- Changes are shared with git push and git pull.\n" >> remote-repositories-practice/project-notes.txt

$ git add remote-repositories-practice/project-notes.txt
warning: in the working copy of 'remote-repositories-practice/project-notes.txt', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Note how changes are shared with push and pull" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[working-with-remote-repositories-week1-2 46c6c63] Note how changes are shared with push and pull
 1 file changed, 1 insertion(+)

$ git push
To https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git
 ! [rejected]        working-with-remote-repositories-week1-2 -> working-with-remote-repositories-week1-2 (fetch first)
error: failed to push some refs to 'https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally. This is usually caused by another repository pushing to
hint: the same ref. If you want to integrate the remote changes, use
hint: 'git pull' before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

**Why it was rejected:** GitHub has the teammate's commit `e2e441a`, which my copy has never seen. If GitHub accepted my push as it was, the teammate's commit would be dropped from the branch. Git refuses to lose work, so it rejects the push and tells me to get the remote changes first. This is a protection, not a fault.

**Wrong fix:** `git push --force` would overwrite the branch on GitHub and delete the teammate's commit. It should not be used on a shared branch.

**Correct fix:** pull first, then push. I used `git pull --rebase`, which downloads the teammate's commit and then re-applies my commit on top of it:

```console
$ git pull --rebase
From https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas
   c9bfa1e..e2e441a  working-with-remote-repositories-week1-2 -> origin/working-with-remote-repositories-week1-2
Rebasing (1/1)Successfully rebased and updated refs/heads/working-with-remote-repositories-week1-2.

$ git log --oneline --graph -5
* 76f220f Note how changes are shared with push and pull
* e2e441a Record that the clone pushed a commit
* c9bfa1e Add teammate notes from the cloned copy
* 94c05ca Add project notes about local and remote copies
*   46509ef Merge pull request #1 from exelynt-learning-platform/understanding-version-control-git-and-github-week1-2
|\  
```

My commit now sits after the teammate's. Its ID changed from `46c6c63` to `76f220f` because re-applying a commit on a new base creates a new commit. A plain `git pull` would also have worked; it would have joined the two lines with a merge commit instead of keeping the history straight. The pull succeeded without a conflict because the two commits edited different files.

Now the push is accepted:

```console
$ git push
To https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git
   e2e441a..76f220f  working-with-remote-repositories-week1-2 -> working-with-remote-repositories-week1-2

$ git status
On branch working-with-remote-repositories-week1-2
Your branch is up to date with 'origin/working-with-remote-repositories-week1-2'.

nothing to commit, working tree clean
```

## 7. Final State: All Three Copies in Sync

My copy matches GitHub:

```console
$ git rev-parse HEAD
76f220f38de68de265370cce882427c53eeb4eca

$ git ls-remote origin refs/heads/working-with-remote-repositories-week1-2
76f220f38de68de265370cce882427c53eeb4eca	refs/heads/working-with-remote-repositories-week1-2
```

The teammate copy pulls and reaches the same commit:

```console
$ cd /d/Repositorys/remote-practice-clone

$ git pull
From https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas
   e2e441a..76f220f  working-with-remote-repositories-week1-2 -> origin/working-with-remote-repositories-week1-2
Updating e2e441a..76f220f
Fast-forward
 remote-repositories-practice/project-notes.txt | 1 +
 1 file changed, 1 insertion(+)

$ git log --oneline -1
76f220f Note how changes are shared with push and pull
```

And the history in my copy contains the commits from both copies, in order:

```console
$ cd /d/Repositorys/java-programming-assignment-40253-tejas

$ git log --oneline -6
76f220f Note how changes are shared with push and pull
e2e441a Record that the clone pushed a commit
c9bfa1e Add teammate notes from the cloned copy
94c05ca Add project notes about local and remote copies
46509ef Merge pull request #1 from exelynt-learning-platform/understanding-version-control-git-and-github-week1-2
c694c0b Add files via upload
```

My copy, the teammate copy and GitHub all point at `76f220f`. (The commit that adds this document was made and pushed afterwards, so it is not in these listings.)

## 8. The Collaboration Workflow

Putting the pieces together, this is the routine a team follows. Each step is one I carried out above.

```text
              git clone (once)
   GitHub  ------------------->  my computer
  (origin)                           |
     ^                               | 1. git pull        get the latest work
     |                               | 2. edit files
     |                               | 3. git add + git commit
     |          4. git pull          |
     | <---------------------------- |    (again, in case others pushed meanwhile)
     |          5. git push          |
     +-------------------------------+
```

1. **Clone once.** `git clone <url>` gives a new team member the full project with `origin` already set up.
2. **Pull before starting work.** `git pull` makes sure I am building on the latest version, not an old one.
3. **Work locally.** Edit, `git add`, `git commit`. Commits are private until pushed, so I can commit as often as I like.
4. **Pull again before pushing.** If a teammate pushed while I was working, this brings their commits in. Skipping this step is what caused the rejected push in section 6.
5. **Push.** `git push` shares my commits. Teammates receive them with their next `git pull`.
6. **Repeat.** Small, frequent pull–commit–push cycles keep everyone close together and make conflicts rare and small.

On larger teams the same cycle is used with one addition: each person works on their own branch, pushes that branch, and opens a **pull request** on GitHub so that others can review the changes before they are merged into `main`. The repository history above shows this: commit `46509ef` is "Merge pull request #1", where an earlier assignment branch was merged into `main`.

### Common problems and what to do

| Situation | What Git shows | What to do |
| --- | --- | --- |
| Push rejected | `! [rejected] ... (fetch first)` | `git pull`, then `git push` again |
| Not sure if the remote changed | `git status` says "up to date" | `git fetch`, then `git status` |
| Pull reports a conflict | `CONFLICT ... Automatic merge failed` | Edit the file, `git add`, then `git commit` (or `git rebase --continue`) |
| Tempted to use `git push --force` | — | Don't, on a shared branch; it deletes other people's commits |

## 9. Command Summary

| Command | What it does |
| --- | --- |
| `git remote -v` | Shows the remote nicknames and their URLs |
| `git remote show origin` | Shows details of the remote, including its default branch |
| `git branch -r` / `git branch -a` | Lists remote-tracking branches / all branches |
| `git clone <url> [folder]` | Copies a remote repository to a new local folder |
| `git push` | Uploads local commits to the tracked remote branch |
| `git fetch` | Downloads new commits without changing local files |
| `git pull` | Fetches and merges new commits into the current branch |
| `git pull --rebase` | Fetches and re-applies local commits on top of the new ones |
| `git ls-remote origin <ref>` | Asks the remote directly which commit a branch points to |

## 10. What I Learned

- `origin` is only a nickname for a URL, and `main` is only the name of the default branch. Neither is a special Git keyword.
- `origin/main` is a third thing: my computer's saved record of the remote branch, which can be out of date.
- `git status` never talks to the server. I have to `git fetch` to find out whether the remote has moved.
- `git pull` is `git fetch` plus a merge. Fetching alone is safe and changes no files.
- A rejected push is Git protecting someone else's commit. The answer is to pull, not to force.
- "In sync" can be checked exactly: the local commit ID and the one reported by `git ls-remote` must be the same.

## Submission Checklist

- [x] `git push`, `git pull` and `git clone` used correctly, with real output.
- [x] Local and remote repositories shown to be in sync by matching commit IDs.
- [x] `origin` and `main` explained.
- [x] Collaboration workflow explained and carried out with two copies.
- [x] All commands executed against the real GitHub repository.
