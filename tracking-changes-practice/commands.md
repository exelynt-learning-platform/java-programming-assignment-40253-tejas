# Git Command Cheat Sheet

## Tracking changes

- git status : show which files are untracked, modified or staged
- git add <file> : stage a file for the next commit
- git commit -m "message" : save the staged changes to the history

## Viewing history

- git log : show full commit history
- git log --oneline : show one line per commit
- git log --stat : show which files each commit changed

## Fixing mistakes

- git restore --staged <file> : unstage a file
- git commit --amend : fix the last commit
