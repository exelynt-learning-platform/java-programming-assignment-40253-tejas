# Assignment: Introduction to GitHub

**Name:** Tejas Rajendra Bhoite
**GitHub account:** [TejasBhoite0707](https://github.com/TejasBhoite0707)
**System:** Windows 11 Pro, Git 2.56.0 for Windows (Git Bash)
**Branch:** `introduction-to-github-week1-2`

All command output in this document is copied as text from Git Bash on my machine. Lines starting with `$` are commands; the lines below them are what the terminal printed. The commands that contact GitHub (`curl`, `git ls-remote`, `git fetch`, `git push`) were run against the live site. An AI coding assistant (Claude Code) was used for this work, which is why the commit carries a `Co-Authored-By` line.

## 1. Git and GitHub Are Different Things

| | Git | GitHub |
| --- | --- | --- |
| What it is | A version control program | A website that hosts Git repositories |
| Where it runs | On my computer | On GitHub's servers, reached through the internet |
| Needs an account | No | Yes |
| Works offline | Yes | No |
| Main job | Record the history of a project | Store a shared copy and let people collaborate on it |

Git can be used with no GitHub at all. GitHub adds a place to keep a copy of the repository online, so it is backed up, visible to others, and reachable from any computer. A repository on my machine is a **local** repository; the copy on GitHub is a **remote** repository.

## 2. GitHub Account

### How an account is created

1. Go to https://github.com and choose **Sign up**.
2. Enter an email address, a password and a username. The username becomes part of every repository address: `github.com/<username>/<repository>`.
3. Complete the verification puzzle and enter the code GitHub sends by email.
4. Sign in. The profile page is then live at `github.com/<username>`.

### Evidence that my account exists

My account is `TejasBhoite0707`. Git on this machine is signed in to GitHub with it. Git Credential Manager, which is installed with Git for Windows and stores the GitHub login, lists it:

```console
$ git credential-manager github list
TejasBhoite0707
```

GitHub's public API confirms the account exists, is a user account, and when it was created:

```console
$ curl -s https://api.github.com/users/TejasBhoite0707 | grep -E '"(login|html_url|type|created_at)"'
  "login": "TejasBhoite0707",
  "html_url": "https://github.com/TejasBhoite0707",
  "type": "User",
  "created_at": "2023-04-15T13:11:47Z",
```

And the profile page answers with HTTP status `200`, meaning "found":

```console
$ curl -s -o /dev/null -w '%{http_code}\n' https://github.com/TejasBhoite0707
200
```

**Explanation:** `curl` fetches a web address from the command line. `api.github.com/users/<name>` returns public information about an account in JSON form, and `grep` keeps only the four lines of interest. The `created_at` value shows the account has existed since 15 April 2023.

## 3. Remote Repository

### How a repository is created on GitHub

1. Sign in and click **+** (top right) → **New repository**.
2. Choose the **owner** (a personal account or an organization) and type a **repository name**.
3. Optionally add a description, and choose **Public** (anyone can see it) or **Private**.
4. Optionally tick **Add a README file**. Leave it unticked when an existing local repository is going to be pushed, so that the remote starts empty.
5. Click **Create repository**. GitHub shows the repository's address, ending in `.git`.

### The remote repository for this assignment

The repository used for this course is:

**https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas**

It is hosted under the course organization `exelynt-learning-platform`, which is the owner, and my account has access to push to it. GitHub's API shows that it exists and gives its details:

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

| Field | Meaning |
| --- | --- |
| `full_name` | Owner and repository name, in the form `owner/repository` |
| `visibility: public` | Anyone can view it; only people with permission can push |
| `created_at` | When the repository was created on GitHub |
| `clone_url` | The address Git uses to reach it; this is what gets connected to a local repository |
| `default_branch: main` | The branch a visitor or a fresh clone sees first |

Git can also query the remote directly, with no local repository involved. `git ls-remote --heads <url>` lists the branches that exist on GitHub and the commit each one points to:

```console
$ git ls-remote --heads https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git
6ef990bed6ae0485c3bad5b6d6a82882db7eecae	refs/heads/branching-merging-week1-2
3ba7b4e4996ec52cf2cef46109b5b94438047fa8	refs/heads/git-installation-setup-week1-2
7069606b6a99313528c1158c5920d595e5a70ca8	refs/heads/git-repository-basics-week1-2
0a8ae4d7d91bc2703842298d31b5d0de07d0df1c	refs/heads/github-collaboration-best-practices-week1-2
46509ef15805fb63bdc384df08244105b6e0b2d0	refs/heads/introduction-to-github-week1-2
46509ef15805fb63bdc384df08244105b6e0b2d0	refs/heads/main
e287e384190ea4233f9f8b9db8dbdf405847935f	refs/heads/tracking-changes-with-git-week1-2
e941774fbcfc5475d5af1dfb7fafa18ad1c444b9	refs/heads/understanding-version-control-git-and-github-week1-2
7eccc16b3afad298de5d99ccdd678d73c473aaac	refs/heads/working-with-remote-repositories-week1-2
```

This is the remote repository answering over the internet, which proves it exists and is reachable from my machine.

## 4. Connecting a Local Repository to GitHub

My usual working copy of this repository was made with `git clone`, which connects local and remote automatically. To show the connection being made by hand, I started again from an empty folder.

### Step 1: create a local repository with no connection

```console
$ cd /d/Repositorys

$ mkdir intro-github-demo

$ cd intro-github-demo

$ git init
Initialized empty Git repository in D:/Repositorys/intro-github-demo/.git/

$ git remote -v
```

`git remote -v` prints nothing. This repository exists only on my computer and knows nothing about GitHub.

### Step 2: add the remote

```console
$ git remote add origin https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git

$ git remote -v
origin	https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git (fetch)
origin	https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git (push)
```

**Explanation of `git remote add origin <url>`:**

| Part | Meaning |
| --- | --- |
| `git remote add` | Register a new remote repository |
| `origin` | The nickname I am giving it. `origin` is the conventional name for the main remote, but it is only a label |
| `<url>` | The repository's address on GitHub (its `clone_url`) |

The command prints nothing on success. `git remote -v` now shows the address twice: once for downloading (`fetch`) and once for uploading (`push`).

The connection is simply two lines saved in this repository's own configuration file:

```console
$ git config --get remote.origin.url
https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git

$ cat .git/config
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
[remote "origin"]
	url = https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git
	fetch = +refs/heads/*:refs/remotes/origin/*
```

The `[remote "origin"]` section is what `git remote add` wrote. At this point nothing has been sent or received. Adding a remote only records an address.

### Step 3: use the connection

`git fetch origin` is the first command that actually contacts GitHub. It downloaded every branch, which shows that the address is right and that my machine can reach the repository:

```console
$ git fetch origin
From https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas
 * [new branch]      branching-merging-week1-2 -> origin/branching-merging-week1-2
 * [new branch]      git-installation-setup-week1-2 -> origin/git-installation-setup-week1-2
 * [new branch]      git-repository-basics-week1-2 -> origin/git-repository-basics-week1-2
 * [new branch]      github-collaboration-best-practices-week1-2 -> origin/github-collaboration-best-practices-week1-2
 * [new branch]      introduction-to-github-week1-2 -> origin/introduction-to-github-week1-2
 * [new branch]      main       -> origin/main
 * [new branch]      tracking-changes-with-git-week1-2 -> origin/tracking-changes-with-git-week1-2
 * [new branch]      understanding-version-control-git-and-github-week1-2 -> origin/understanding-version-control-git-and-github-week1-2
 * [new branch]      working-with-remote-repositories-week1-2 -> origin/working-with-remote-repositories-week1-2
```

Each line reads "branch on GitHub `->` my local record of it". The records are named `origin/<branch>`.

### Step 4: link a local branch to its branch on GitHub

```console
$ git switch introduction-to-github-week1-2
Switched to a new branch 'introduction-to-github-week1-2'
branch 'introduction-to-github-week1-2' set up to track 'origin/introduction-to-github-week1-2'.

$ git status
On branch introduction-to-github-week1-2
Your branch is up to date with 'origin/introduction-to-github-week1-2'.

nothing to commit, working tree clean

$ git branch -vv
* introduction-to-github-week1-2 46509ef [origin/introduction-to-github-week1-2] Merge pull request #1 from exelynt-learning-platform/understanding-version-control-git-and-github-week1-2
```

**Explanation:** "set up to track" means the local branch is now linked to the branch of the same name on `origin`. This link is called the **upstream**. `git branch -vv` shows it in square brackets. Because of it, `git status` can compare the two, and plain `git push` and `git pull` know where to send and fetch without being told.

The files from GitHub are now in the folder that was empty a minute ago:

```console
$ ls
README.md
version-control-and-git-assignment.md

$ git log --oneline -3
46509ef Merge pull request #1 from exelynt-learning-platform/understanding-version-control-git-and-github-week1-2
c694c0b Add files via upload
ccfd5cf Delete version-control-and-git-assignment.md
```

### Step 5: verify the connection in both directions

Download was proven by `git fetch`. For upload, `git push --dry-run` contacts GitHub and goes through the push checks without changing anything. It reports that there is nothing new to send, rather than an address or permission error:

```console
$ git push --dry-run
Everything up-to-date
```

Finally, the commit my local branch points to is identical to the one GitHub reports for the same branch:

```console
$ git rev-parse HEAD
46509ef15805fb63bdc384df08244105b6e0b2d0

$ git ls-remote origin refs/heads/introduction-to-github-week1-2
46509ef15805fb63bdc384df08244105b6e0b2d0	refs/heads/introduction-to-github-week1-2
```

The local repository is connected to GitHub correctly: the address is registered, data can be downloaded, the branch is linked to its upstream, and both sides are on the same commit.

### The same check in my normal working copy

The working copy I use for the assignments (made with `git clone`) has the same connection:

```console
$ cd /d/Repositorys/java-programming-assignment-40253-tejas

$ git remote -v
origin	https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git (fetch)
origin	https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git (push)

$ git status
On branch introduction-to-github-week1-2
Your branch is up to date with 'origin/introduction-to-github-week1-2'.

nothing to commit, working tree clean

$ git remote show origin | head -4
* remote origin
  Fetch URL: https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git
  Push  URL: https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git
  HEAD branch: main
```

This document was then committed in that working copy and uploaded with `git push`. The proof of that final push is the document's presence on the `introduction-to-github-week1-2` branch on GitHub.

## 5. Two Ways to Connect, Compared

| | Starting from GitHub | Starting from my computer |
| --- | --- | --- |
| Situation | The repository already exists on GitHub | I have a local project and a new, empty GitHub repository |
| Commands | `git clone <url>` | `git init`, `git remote add origin <url>`, `git push -u origin main` |
| Who sets up `origin` | `git clone`, automatically | I do, with `git remote add` |
| Who sets the upstream | `git clone`, automatically | The `-u` in the first push |

For the second case, with a brand-new empty repository on GitHub, the full sequence is:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<username>/<repository>.git
git push -u origin main
```

`git branch -M main` renames the local branch to `main` to match GitHub's default. In `git push -u origin main`, the `-u` (short for `--set-upstream`) records the link between the local and remote branch, so later pushes need only `git push`. In section 4 the upstream was set for me by `git switch`, because the branch already existed on GitHub.

## 6. Signing In from Git

GitHub does not accept an account password for Git commands. Access is granted in one of these ways:

| Method | How it works |
| --- | --- |
| Git Credential Manager (used here) | The first push opens a browser window to sign in to GitHub; the login is then stored securely by Windows |
| Personal access token | A long generated code used in place of a password |
| SSH key | A key pair; the public half is added to the GitHub account, and the address has the form `git@github.com:owner/repo.git` |

The `git credential-manager github list` output in section 2 shows the first method in use on this machine. This is why the commands in this document ran without asking for a username or password.

## 7. Command Summary

| Command | What it does |
| --- | --- |
| `git remote -v` | Lists the remotes connected to this repository and their addresses |
| `git remote add origin <url>` | Connects the local repository to a remote, under the name `origin` |
| `git config --get remote.origin.url` | Prints the address stored for `origin` |
| `git ls-remote <url or remote>` | Asks the remote which branches and commits it has |
| `git fetch origin` | Downloads the remote's branches and commits |
| `git switch <branch>` | Switches to a branch, linking it to the remote branch of the same name |
| `git branch -vv` | Shows each local branch and its upstream |
| `git push -u origin <branch>` | Uploads a branch and sets its upstream |
| `git push --dry-run` | Runs through a push without changing the remote |
| `git clone <url>` | Downloads a repository and connects it in one step |

## 8. What I Learned

- Git is the tool and GitHub is a hosting service for it. One works without the other, but together they give backup and collaboration.
- A GitHub repository address has the form `github.com/<owner>/<repository>`, and the owner can be a person or an organization.
- "Connecting" a local repository means saving the remote's address under a nickname. `git remote add` does only that, and contacts nothing.
- `origin` is a convention, not a keyword.
- The connection is only proven when a command that uses the network, such as `git fetch`, `git ls-remote` or `git push`, succeeds.
- The upstream link is what lets `git status` report "up to date" and lets `git push` work without arguments.

## Submission Checklist

- [x] GitHub account exists, shown with real output.
- [x] Remote repository exists on GitHub, shown with real output.
- [x] Local repository connected to GitHub with `git remote add origin` and verified.
- [x] All commands ran without errors.
- [x] Each command and result explained.
