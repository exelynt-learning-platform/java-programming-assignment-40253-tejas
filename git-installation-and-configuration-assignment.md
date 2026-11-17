# Assignment: Git Installation and Initial Configuration

**Name:** Tejas Rajendra Bhoite
**System:** Windows 11 Pro, Git for Windows (Git Bash)

All command output in this document is copied as text from Git Bash on my own machine. Lines starting with `$` are the commands I typed; the lines below them are what the terminal printed.

## 1. Install Git Successfully

Git is a distributed version control system used to track changes in source code and collaborate with other developers.

Steps I followed to install Git on Windows:

1. Opened the official Git website: https://git-scm.com/downloads
2. Selected **Windows** and downloaded the 64-bit installer.
3. Ran the installer and kept the default options in the setup wizard.
4. Finished the installation and opened **Git Bash** from the Windows Start menu.

### Evidence of the installation

Git was installed into `C:\Program Files\Git`. Listing that folder shows the installed files, including `git-bash.exe` (the Git Bash launcher) and `unins000.exe` (the uninstaller created by the installer):

```console
$ ls "/c/Program Files/Git"
LICENSE.txt
ReleaseNotes.html
bin
cmd
dev
etc
git-bash.exe
git-cmd.exe
tmp
ucrt64
unins000.dat
unins000.exe
unins000.msg
usr
```

The `where` command confirms that Windows can find the `git` program on the system PATH:

```console
$ where git
C:\Program Files\Git\ucrt64\bin\git.exe
C:\Program Files\Git\cmd\git.exe
```

Git Bash itself also starts and reports its own version:

```console
$ bash --version | head -1
GNU bash, version 5.3.15(2)-release (x86_64-pc-cygwin)
```

Because the files exist in `C:\Program Files\Git`, `git` is found on the PATH, and Git Bash opens and runs commands, the installation was successful.

## 2. Verify the Git Version

To confirm that Git works and to see which version is installed, I ran:

```console
$ git --version
git version 2.56.0.windows.1
```

**Explanation:** The installed version is **2.56.0**. The `.windows.1` suffix means it is the Git for Windows build. Since the command printed a version number instead of an error such as `command not found`, Git is installed correctly and ready to use.

## 3. Configure Global Username and Email

Git records a username and email address in every commit to identify its author. The `--global` option saves these settings for my Windows user account, so they apply to every repository on this machine.

Commands used to set my name and email (these commands print nothing when they succeed):

```console
$ git config --global user.name "Tejas Rajendra Bhoite"
$ git config --global user.email "tejas.bhoite@multigenesys.com"
```

### Verifying the configuration

Checking each value individually:

```console
$ git config --global user.name
Tejas Rajendra Bhoite

$ git config --global user.email
tejas.bhoite@multigenesys.com
```

Listing all global settings:

```console
$ git config --global --list
user.email=tejas.bhoite@multigenesys.com
user.name=Tejas Rajendra Bhoite
```

**Explanation:** Both `user.name` and `user.email` appear in the global list with the values I set, so the configuration is correct. These settings are stored in the file `C:\Users\Admin\.gitconfig`.

## 4. Demonstrate Git Bash/Terminal Usage

Git Bash provides a Linux-style command line on Windows. I used it to move between folders, create a practice project, and run Git commands.

### Check the current directory and list its files

`pwd` (print working directory) shows which folder I am in, and `ls` lists the files in it:

```console
$ pwd
/d/Repositorys/java-programming-assignment-40253-tejas

$ ls
README.md
git-installation-and-configuration-assignment.md
version-control-and-git-assignment.md
```

Git Bash writes the Windows path `D:\Repositorys\...` as `/d/Repositorys/...`.

### Create a project directory and move into it

`cd ..` moves up one folder, `mkdir` creates a new folder, and `cd` moves into it. `mkdir` and `cd` print nothing when they succeed, so I ran `pwd` afterwards to confirm the new location:

```console
$ cd ..

$ pwd
/d/Repositorys

$ mkdir git-practice

$ cd git-practice

$ pwd
/d/Repositorys/git-practice
```

### Initialize a Git repository

`git init` turns the folder into a Git repository by creating a hidden `.git` folder. `ls -a` lists hidden files too, which shows that `.git` now exists:

```console
$ git init
Initialized empty Git repository in D:/Repositorys/git-practice/.git/

$ ls -a
.
..
.git
```

### Check repository status

```console
$ git status
On branch master

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

The repository is new, so there are no commits and no files yet.

### Create a file and view it

`echo ... > hello.txt` writes text into a new file and `cat` prints the file's contents:

```console
$ echo "Hello Git" > hello.txt

$ ls
hello.txt

$ cat hello.txt
Hello Git
```

Git notices the new file and reports it as untracked:

```console
$ git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	hello.txt

nothing added to commit but untracked files present (use "git add" to track)
```

### Make the first commit

`git add` stages the file, `git commit` saves it into the repository history, and `git log --oneline` shows that history:

```console
$ git add hello.txt
warning: in the working copy of 'hello.txt', LF will be replaced by CRLF the next time Git touches it

$ git commit -m "Add hello.txt"
[master (root-commit) 2b762c8] Add hello.txt
 1 file changed, 1 insertion(+)
 create mode 100644 hello.txt

$ git log --oneline
2b762c8 Add hello.txt
```

The warning from `git add` is normal on Windows: Git is only saying that it will convert line endings to the Windows style. The commit succeeded without Git asking who I am, which also confirms that the username and email from section 3 are being used.

### Final listing and return to the starting folder

`ls -la` gives a detailed listing including hidden files:

```console
$ ls -la
total 9
drwxr-xr-x 1 Admin 197121  0 Nov 17 11:14 .
drwxr-xr-x 1 Admin 197121  0 Nov 17 11:14 ..
drwxr-xr-x 1 Admin 197121  0 Nov 17 11:14 .git
-rw-r--r-- 1 Admin 197121 10 Nov 17 11:14 hello.txt

$ cd ..

$ pwd
/d/Repositorys
```

### Commands used

| Command | Purpose |
| --- | --- |
| `pwd` | Show the current directory |
| `ls`, `ls -a`, `ls -la` | List files (with hidden files / with details) |
| `cd <folder>`, `cd ..` | Move into a folder / move up one folder |
| `mkdir <folder>` | Create a new folder |
| `echo "text" > file` | Write text into a file |
| `cat <file>` | Print a file's contents |
| `git init` | Create a new Git repository |
| `git status` | Show the state of the repository |
| `git add <file>` | Stage a file for the next commit |
| `git commit -m "message"` | Save staged changes to the history |
| `git log --oneline` | Show the commit history, one line per commit |

## 5. Summary

Git 2.56.0 for Windows was installed using the official installer, and the installation was confirmed by the files in `C:\Program Files\Git`, by `where git`, and by `git --version`. The global username and email were set with `git config --global` and verified with `git config --global --list`. Git Bash was then used to navigate folders, create a practice project, initialize a repository, and make a first commit.

This setup provides the environment needed to use Git for version control and software development.

## Submission Checklist

- [x] Git installed successfully.
- [x] Git version verified using `git --version`.
- [x] Global username configured.
- [x] Global email configured.
- [x] Username and email verified using Git configuration commands.
- [x] Git Bash/Terminal commands executed successfully.
- [x] Real terminal output pasted as text with clear explanations.
