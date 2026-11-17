# Assignment: Branching and Merging

**Name:** Tejas Rajendra Bhoite
**System:** Windows 11 Pro, Git 2.56.0 for Windows (Git Bash)
**Branch:** `branching-merging-week1-2`

All command output in this document is copied as text from Git Bash, run inside this repository. Lines starting with `$` are commands; the lines below them are what the terminal printed. The files are in the [branching-merging-practice](branching-merging-practice/) folder, and the commits and merges shown here are the real history of this branch, so they can be checked on GitHub.

In this document, **the main line** means the assignment branch `branching-merging-week1-2`. The three feature branches were created from it and merged back into it.

Two things appear in the output and are normal:

- `warning: ... LF will be replaced by CRLF` is Git on Windows saying it will convert line endings. It is not an error.
- Each commit has a `Co-Authored-By: ...` line (added with `--trailer`, or a second `-m` for `git merge`). It is a credit line because an AI coding assistant (Claude Code) was used for this practice session.

## 1. What Branches and Merging Are

A **branch** is a separate line of work. Commits made on one branch do not affect any other branch, so new work can be tried without disturbing the version that already works. A branch is cheap: it is only a pointer to a commit.

**Merging** brings the commits from one branch into another. Git can usually do this automatically. When both branches changed the same lines, Git cannot choose and reports a **merge conflict** that a person has to resolve.

The example project is a small trip plan, used so that the changes are easy to follow.

## 2. Creating and Switching Branches

### Starting point

```console
$ git status
On branch branching-merging-week1-2
Your branch is up to date with 'origin/branching-merging-week1-2'.

nothing to commit, working tree clean

$ git branch
* branching-merging-week1-2
  git-installation-setup-week1-2
  git-repository-basics-week1-2
  main
  tracking-changes-with-git-week1-2
```

`git branch` lists the local branches. The `*` marks the one I am on.

I first committed a starting file on the main line, so the feature branches had something to build on:

```console
$ mkdir branching-merging-practice

$ cd branching-merging-practice

$ printf "Trip plan: Goa\nDates: 10 Dec to 14 Dec\nTravel: train\n" > trip-plan.txt

$ git add trip-plan.txt
warning: in the working copy of 'branching-merging-practice/trip-plan.txt', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Add trip plan with destination, dates and travel" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[branching-merging-week1-2 f870834] Add trip plan with destination, dates and travel
 1 file changed, 3 insertions(+)
 create mode 100644 branching-merging-practice/trip-plan.txt
```

### Creating a branch

`git branch <name>` creates a branch but does **not** switch to it. The `*` is still on the main line:

```console
$ git branch feature/packing-list

$ git branch
* branching-merging-week1-2
  feature/packing-list
  git-installation-setup-week1-2
  git-repository-basics-week1-2
  main
  tracking-changes-with-git-week1-2
```

### Switching to it

`git switch <name>` moves me onto the branch. The `*` has moved, and `git status` confirms it:

```console
$ git switch feature/packing-list
Switched to branch 'feature/packing-list'

$ git branch
  branching-merging-week1-2
* feature/packing-list
  git-installation-setup-week1-2
  git-repository-basics-week1-2
  main
  tracking-changes-with-git-week1-2

$ git status
On branch feature/packing-list
nothing to commit, working tree clean
```

(`git checkout <name>` does the same thing; `git switch` is the newer command made only for changing branches. Later I use `git switch -c <name>`, which creates and switches in one step.)

## 3. Making Changes in a Separate Branch

On `feature/packing-list` I added a new file in two commits:

```console
$ printf "Packing list\n\n- Clothes\n- Sunscreen\n" > packing-list.txt

$ git add packing-list.txt
warning: in the working copy of 'branching-merging-practice/packing-list.txt', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Add packing list with clothes and sunscreen" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[feature/packing-list 495337f] Add packing list with clothes and sunscreen
 1 file changed, 4 insertions(+)
 create mode 100644 branching-merging-practice/packing-list.txt

$ printf -- "- Phone charger\n- ID card\n" >> packing-list.txt

$ git add packing-list.txt
warning: in the working copy of 'branching-merging-practice/packing-list.txt', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Add charger and ID card to packing list" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[feature/packing-list f95e3dc] Add charger and ID card to packing list
 1 file changed, 2 insertions(+)
```

The commit output shows `[feature/packing-list ...]`, so both commits went onto the feature branch. On this branch the folder has two files and the history has three practice commits:

```console
$ ls
packing-list.txt
trip-plan.txt

$ git log --oneline -3
f95e3dc Add charger and ID card to packing list
495337f Add packing list with clothes and sunscreen
f870834 Add trip plan with destination, dates and travel
```

### Proof that the work is isolated

Switching back to the main line, `packing-list.txt` is gone from the folder and the two commits are not in the history:

```console
$ git switch branching-merging-week1-2
Switched to branch 'branching-merging-week1-2'
Your branch is ahead of 'origin/branching-merging-week1-2' by 1 commit.
  (use "git push" to publish your local commits)

$ ls
trip-plan.txt

$ git log --oneline -3
f870834 Add trip plan with destination, dates and travel
46509ef Merge pull request #1 from exelynt-learning-platform/understanding-version-control-git-and-github-week1-2
c694c0b Add files via upload
```

The file was not deleted. Git changed the working folder to match the branch I switched to, and the file is stored safely on `feature/packing-list`. This is what makes branches safe for experiments.

## 4. Merging Branches

To merge, I stand on the branch that should **receive** the changes and name the branch to bring in.

### Merge 1: fast-forward

```console
$ git merge feature/packing-list
Updating f870834..f95e3dc
Fast-forward
 branching-merging-practice/packing-list.txt | 6 ++++++
 1 file changed, 6 insertions(+)
 create mode 100644 branching-merging-practice/packing-list.txt

$ ls
packing-list.txt
trip-plan.txt

$ git log --oneline --graph -4
* f95e3dc Add charger and ID card to packing list
* 495337f Add packing list with clothes and sunscreen
* f870834 Add trip plan with destination, dates and travel
*   46509ef Merge pull request #1 from exelynt-learning-platform/understanding-version-control-git-and-github-week1-2
|\  
```

**Explanation:** Git says `Fast-forward`. The main line had no new commits since the branch was created, so there was nothing to combine. Git simply moved the main line's pointer forward to the feature branch's latest commit. No merge commit was made, and the graph is a straight line.

### Merge 2: a real merge commit

This time I made the two branches diverge. I created a second branch (using `git switch -c` to create and switch in one command) and committed a budget file there:

```console
$ git switch -c feature/budget
Switched to a new branch 'feature/budget'

$ printf "Budget\n\nTrain tickets: 1800\nStay: 6000\nFood: 3000\n" > budget.txt

$ git add budget.txt
warning: in the working copy of 'branching-merging-practice/budget.txt', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Add trip budget for tickets, stay and food" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[feature/budget dd7fa34] Add trip budget for tickets, stay and food
 1 file changed, 5 insertions(+)
 create mode 100644 branching-merging-practice/budget.txt
```

Then I went back to the main line and made a different commit there:

```console
$ git switch branching-merging-week1-2
Switched to branch 'branching-merging-week1-2'
Your branch is ahead of 'origin/branching-merging-week1-2' by 3 commits.
  (use "git push" to publish your local commits)

$ printf "Stay: beach hostel\n" >> trip-plan.txt

$ git add trip-plan.txt
warning: in the working copy of 'branching-merging-practice/trip-plan.txt', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Add accommodation to trip plan" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[branching-merging-week1-2 44da687] Add accommodation to trip plan
 1 file changed, 1 insertion(+)
```

The graph now shows two lines splitting apart after `f95e3dc`. (The extra options on this command limit the graph to my local, not-yet-pushed commits.)

```console
$ git log --oneline --graph --all -6 --branches --not --remotes
* 44da687 Add accommodation to trip plan
| * dd7fa34 Add trip budget for tickets, stay and food
|/  
* f95e3dc Add charger and ID card to packing list
* 495337f Add packing list with clothes and sunscreen
* f870834 Add trip plan with destination, dates and travel
```

Merging:

```console
$ git merge feature/budget -m "Merge branch 'feature/budget' to add the trip budget" -m "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
Merge made by the 'ort' strategy.
 branching-merging-practice/budget.txt | 5 +++++
 1 file changed, 5 insertions(+)
 create mode 100644 branching-merging-practice/budget.txt

$ ls
budget.txt
packing-list.txt
trip-plan.txt

$ git log --oneline --graph -7
*   bf3c054 Merge branch 'feature/budget' to add the trip budget
|\  
| * dd7fa34 Add trip budget for tickets, stay and food
* | 44da687 Add accommodation to trip plan
|/  
* f95e3dc Add charger and ID card to packing list
* 495337f Add packing list with clothes and sunscreen
* f870834 Add trip plan with destination, dates and travel
*   46509ef Merge pull request #1 from exelynt-learning-platform/understanding-version-control-git-and-github-week1-2
|\  
```

**Explanation:** a fast-forward was not possible because both branches had their own new commit. Git combined them and created a new **merge commit** (`bf3c054`) that joins the two lines in the graph. It succeeded automatically because the branches changed different files (`budget.txt` on one, `trip-plan.txt` on the other).

| | Fast-forward merge | Merge commit |
| --- | --- | --- |
| When it happens | The receiving branch has no new commits | Both branches have new commits |
| What Git does | Moves the branch pointer forward | Creates a new commit with two parents |
| History shape | Straight line | Two lines that join |

## 5. Merge Conflicts

### Creating the conflict

A conflict happens when two branches change **the same line** in different ways. To cause one, I changed the dates line on a new branch:

```console
$ git switch -c feature/change-dates
Switched to a new branch 'feature/change-dates'

$ sed -i 's/Dates: 10 Dec to 14 Dec/Dates: 12 Dec to 16 Dec/' trip-plan.txt

$ cat trip-plan.txt
Trip plan: Goa
Dates: 12 Dec to 16 Dec
Travel: train
Stay: beach hostel

$ git add trip-plan.txt
warning: in the working copy of 'branching-merging-practice/trip-plan.txt', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Move trip dates to 12-16 Dec" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[feature/change-dates 1e9e607] Move trip dates to 12-16 Dec
 1 file changed, 1 insertion(+), 1 deletion(-)
```

and then changed the same line differently on the main line:

```console
$ git switch branching-merging-week1-2
Switched to branch 'branching-merging-week1-2'
Your branch is ahead of 'origin/branching-merging-week1-2' by 6 commits.
  (use "git push" to publish your local commits)

$ sed -i 's/Dates: 10 Dec to 14 Dec/Dates: 10 Dec to 15 Dec/' trip-plan.txt

$ cat trip-plan.txt
Trip plan: Goa
Dates: 10 Dec to 15 Dec
Travel: train
Stay: beach hostel

$ git add trip-plan.txt
warning: in the working copy of 'branching-merging-practice/trip-plan.txt', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Extend trip by one day to 15 Dec" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[branching-merging-week1-2 1aaaa9d] Extend trip by one day to 15 Dec
 1 file changed, 1 insertion(+), 1 deletion(-)
```

### The conflict

```console
$ git merge feature/change-dates
Auto-merging branching-merging-practice/trip-plan.txt
CONFLICT (content): Merge conflict in branching-merging-practice/trip-plan.txt
Automatic merge failed; fix conflicts and then commit the result.

$ git status
On branch branching-merging-week1-2
Your branch is ahead of 'origin/branching-merging-week1-2' by 7 commits.
  (use "git push" to publish your local commits)

You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
	both modified:   trip-plan.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

**Explanation:** the merge stopped halfway. One branch says the dates are 10–15 Dec and the other says 12–16 Dec. Both are valid edits of the same line, and Git has no way to know which one I want, so it asks me. `git status` names the file as `both modified` and lists the two ways forward: fix it, or abort.

Git marked the disputed part inside the file:

```console
$ cat trip-plan.txt
Trip plan: Goa
<<<<<<< HEAD
Dates: 10 Dec to 15 Dec
=======
Dates: 12 Dec to 16 Dec
>>>>>>> feature/change-dates
Travel: train
Stay: beach hostel
```

| Marker | Meaning |
| --- | --- |
| `<<<<<<< HEAD` | Start of the version on the branch I am on (the main line) |
| `=======` | Divider between the two versions |
| `>>>>>>> feature/change-dates` | End of the version from the branch being merged in |

The lines outside the markers (`Trip plan`, `Travel`, `Stay`) merged without any problem. Only the one disputed line needs a decision.

### Option A: cancel the merge

`git merge --abort` puts everything back exactly as it was before the merge started. This is the safe way out if I am not ready to resolve the conflict:

```console
$ git merge --abort

$ git status
On branch branching-merging-week1-2
Your branch is ahead of 'origin/branching-merging-week1-2' by 7 commits.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean

$ cat trip-plan.txt
Trip plan: Goa
Dates: 10 Dec to 15 Dec
Travel: train
Stay: beach hostel
```

### Option B: resolve the conflict

I started the merge again and got the same conflict:

```console
$ git merge feature/change-dates
Auto-merging branching-merging-practice/trip-plan.txt
CONFLICT (content): Merge conflict in branching-merging-practice/trip-plan.txt
Automatic merge failed; fix conflicts and then commit the result.
```

Resolving means editing the file so that it contains the final text I want and **none of the marker lines**. I did not simply pick one side. The feature branch's intent was a later start (12 Dec) and the main line's intent was one extra day, so the correct result keeps both ideas: 12 Dec to 17 Dec.

```console
$ printf "Trip plan: Goa\nDates: 12 Dec to 17 Dec\nTravel: train\nStay: beach hostel\n" > trip-plan.txt

$ cat trip-plan.txt
Trip plan: Goa
Dates: 12 Dec to 17 Dec
Travel: train
Stay: beach hostel
```

`git add` tells Git the file is resolved. `git status` then confirms the conflict is fixed and that the merge still has to be concluded with a commit:

```console
$ git add trip-plan.txt
warning: in the working copy of 'branching-merging-practice/trip-plan.txt', LF will be replaced by CRLF the next time Git touches it

$ git status
On branch branching-merging-week1-2
Your branch is ahead of 'origin/branching-merging-week1-2' by 7 commits.
  (use "git push" to publish your local commits)

All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)

Changes to be committed:
	modified:   trip-plan.txt

$ git commit -m "Merge branch 'feature/change-dates', keeping new start date and extra day" --trailer "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>"
[branching-merging-week1-2 543277e] Merge branch 'feature/change-dates', keeping new start date and extra day

$ git status
On branch branching-merging-week1-2
Your branch is ahead of 'origin/branching-merging-week1-2' by 9 commits.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
```

The merge commit has two parents, one from each branch, which is what makes it a merge:

```console
$ git log -1 --format="%h has parents: %p"
543277e has parents: 1aaaa9d 1e9e607
```

### Steps to resolve any conflict

1. Run `git status` to see which files are in conflict.
2. Open each file and find the `<<<<<<<`, `=======` and `>>>>>>>` markers.
3. Edit the file to the final wanted text and delete all three marker lines.
4. Run `git add <file>` to mark it resolved.
5. Run `git commit` to finish the merge.
6. If unsure at any point, run `git merge --abort` to go back to the state before the merge.

### How to reduce conflicts

- Keep branches short-lived and merge them often.
- Bring the latest main line into a branch before finishing work on it.
- Make small, focused commits so that fewer lines overlap.
- Agree with teammates on who is editing which file.

## 6. Final History and Cleanup

The complete graph shows all three merges: the straight fast-forward section at the bottom, then two places where a branch splits off and joins again.

```console
$ git log --oneline --graph -11
*   543277e Merge branch 'feature/change-dates', keeping new start date and extra day
|\  
| * 1e9e607 Move trip dates to 12-16 Dec
* | 1aaaa9d Extend trip by one day to 15 Dec
|/  
*   bf3c054 Merge branch 'feature/budget' to add the trip budget
|\  
| * dd7fa34 Add trip budget for tickets, stay and food
* | 44da687 Add accommodation to trip plan
|/  
* f95e3dc Add charger and ID card to packing list
* 495337f Add packing list with clothes and sunscreen
* f870834 Add trip plan with destination, dates and travel
*   46509ef Merge pull request #1 from exelynt-learning-platform/understanding-version-control-git-and-github-week1-2
|\  
| * c694c0b Add files via upload

$ git log --oneline --merges -2
543277e Merge branch 'feature/change-dates', keeping new start date and extra day
bf3c054 Merge branch 'feature/budget' to add the trip budget
```

(The commit that adds this document was made afterwards, so it is not in this listing.)

Once a branch is merged, its commits are part of the main line and the branch name is no longer needed. `git branch --merged` lists branches that are safe to delete, and `git branch -d` deletes them. The `-d` option refuses to delete a branch that has unmerged work, so it cannot lose commits.

```console
$ git branch --merged
* branching-merging-week1-2
  feature/budget
  feature/change-dates
  feature/packing-list
  main

$ git branch -d feature/packing-list feature/budget feature/change-dates
Deleted branch feature/packing-list (was f95e3dc).
Deleted branch feature/budget (was dd7fa34).
Deleted branch feature/change-dates (was 1e9e607).

$ git branch
* branching-merging-week1-2
  git-installation-setup-week1-2
  git-repository-basics-week1-2
  main
  tracking-changes-with-git-week1-2

$ ls
budget.txt
packing-list.txt
trip-plan.txt
```

The branch names are gone, but all three files and every commit remain.

## 7. Command Summary

| Command | What it does |
| --- | --- |
| `git branch` | Lists local branches; `*` marks the current one |
| `git branch <name>` | Creates a branch without switching to it |
| `git switch <name>` | Switches to an existing branch |
| `git switch -c <name>` | Creates a branch and switches to it |
| `git merge <name>` | Merges the named branch into the current branch |
| `git merge --abort` | Cancels a merge that is in conflict |
| `git log --oneline --graph` | Shows the history as a graph of branches and merges |
| `git branch --merged` | Lists branches already merged into the current one |
| `git branch -d <name>` | Deletes a merged branch |

## 8. What I Learned

- A branch keeps work separate: a file committed on one branch is not even visible in the folder after switching to another.
- A merge is always run from the branch that receives the changes.
- Git chooses between a fast-forward and a merge commit by itself, depending on whether the receiving branch has moved on.
- A conflict is not an error in Git. It is Git declining to guess between two edits of the same line.
- Resolving a conflict is a decision about what the content should be, followed by `git add` and `git commit`.
- `git merge --abort` means a conflict can always be backed out safely.

## Submission Checklist

- [x] Branches created (`git branch`, `git switch -c`) and switched (`git switch`) correctly.
- [x] Changes committed on separate branches and shown to be isolated.
- [x] Branches merged successfully (one fast-forward, one merge commit).
- [x] Merge conflict created, explained, aborted once, then resolved.
- [x] All commands shown with their real output.
