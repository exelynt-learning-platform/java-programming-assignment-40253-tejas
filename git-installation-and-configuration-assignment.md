# Assignment: Git Installation and Initial Configuration

## 1. Install Git Successfully

Git is a distributed version control system used to track changes in source code and collaborate with other developers.

To install Git on Windows:

1. Visit the official Git website: https://git-scm.com/downloads
2. Select **Windows** and download the installer.
3. Run the downloaded installer.
4. Follow the setup wizard. The default installation options are suitable for most users.
5. Complete the installation.

After installation, open **Git Bash** from the Windows Start menu.

**Screenshot 1: Git installation**

_Add a screenshot showing the Git installer completing successfully, or Git Bash opened after installation._

## 2. Verify the Git Version

To confirm that Git has been installed correctly, open Git Bash or a terminal and run:

```bash
git --version
```

The command displays the installed Git version. For example:

```text
git version 2.x.x
```

The exact version number may be different depending on the version installed.

If the command displays a Git version, the installation is successful.

**Screenshot 2: Git version verification**

_Add a screenshot of Git Bash or Terminal showing the `git --version` command and its output._

## 3. Configure Global Username and Email

Git uses a username and email address to identify the author of commits.

Configure your name with:

```bash
git config --global user.name "Your Name"
```

Configure your email address with:

```bash
git config --global user.email "your-email@example.com"
```

Replace the example name and email with your own details. If you use GitHub, you can use the email associated with your GitHub account or a GitHub-provided noreply email address.

To verify the configuration, run:

```bash
git config --global user.name
git config --global user.email
```

You can also view all global Git settings with:

```bash
git config --global --list
```

The configured username and email should appear in the output.

**Screenshot 3: Global username and email configuration**

_Add a screenshot showing the configuration commands and their verified output. You may hide your email address in a screenshot if you do not want to share it publicly._

## 4. Demonstrate Git Bash/Terminal Usage

Git Bash provides a command-line environment for running Git commands on Windows. You can use it to navigate folders and perform Git operations.

Try these basic commands:

### Check the current directory

```bash
pwd
```

Displays the path of the current working directory.

### List files and folders

```bash
ls
```

Displays the files and folders in the current directory.

### Create a project directory

```bash
mkdir git-practice
```

Creates a folder named `git-practice`.

### Move into the project directory

```bash
cd git-practice
```

Changes the current directory to `git-practice`.

### Initialize a Git repository

```bash
git init
```

Initializes a new Git repository in the current directory.

### Check repository status

```bash
git status
```

Displays the current status of the repository.

These commands demonstrate that Git Bash is installed and can be used to run terminal and Git commands.

**Screenshot 4: Git Bash/Terminal usage**

_Add a screenshot showing some of the commands above being executed successfully._

## 5. Summary

Git was installed using the official installer and its version was checked using the `git --version` command. The global username and email were configured using `git config --global`. Git Bash was then used to execute basic terminal commands and initialize a practice repository.

This setup provides the basic environment needed to start using Git for version control and software development.

## Submission Checklist

Before submitting this assignment, make sure you have completed each item and added your own screenshots.

- [ ] Git installed successfully.
- [ ] Git version verified using `git --version`.
- [ ] Global username configured.
- [ ] Global email configured.
- [ ] Username and email verified using Git configuration commands.
- [ ] Git Bash/Terminal commands executed successfully.
- [ ] Relevant screenshots added with clear explanations.
