# Grade Tracker

A small command-line tool that reads student marks from a CSV file and prints each student's average and letter grade, followed by a class summary.

It is the project for the assignment **Git & GitHub: Version Control Essentials for Developers**. The program is deliberately small; the point of the repository is the way it was built: step by step, with meaningful commits, feature branches, merges and a resolved merge conflict. That process is documented, with the real terminal output, in [docs/git-workflow.md](docs/git-workflow.md).

## Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [Usage](#usage)
- [Input file format](#input-file-format)
- [Running the tests](#running-the-tests)
- [Project structure](#project-structure)
- [How the project was built](#how-the-project-was-built)
- [Author](#author)

## Features

- Reads any number of students and any number of marks per student from a CSV file.
- Prints each student's average (rounded to two decimals) and letter grade.
- Prints the class average and the top student.
- Skips invalid lines and reports them, instead of stopping.
- Has no dependencies beyond Node.js itself.

## Requirements

- [Node.js](https://nodejs.org) 18 or newer (developed and tested on Node.js 24)
- [Git](https://git-scm.com/downloads), to get the code

## Setup

```bash
# 1. Get the code
git clone https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git
cd java-programming-assignment-40253-tejas

# 2. Switch to the branch that holds this project
git switch git-github-version-control-essentials-for-developers-week1-2

# 3. Check that Node.js is installed
node --version
```

There is nothing to install: the project has no dependencies, so `npm install` is not needed.

## Usage

Run the report for the sample data:

```bash
npm start
```

```text
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

Run it for your own file by passing the path:

```bash
node src/index.js path/to/your-grades.csv
```

### Grade boundaries

| Average | Grade |
| --- | --- |
| 90 and above | A |
| 75 to 89.99 | B |
| 60 to 74.99 | C |
| 35 to 59.99 | D |
| Below 35 | F |

## Input file format

The first line is a header and is ignored. Every other line is a student name followed by one or more marks from 0 to 100:

```text
name,maths,science,english
Asha,92,88,95
```

Lines with a missing name or an invalid mark are skipped and reported:

```text
Skipped line 3: invalid mark "abc"
Skipped line 4: missing student name
```

If the file cannot be read, the program prints the reason and exits with status 1.

## Running the tests

The tests use the test runner built into Node.js.

```bash
npm test
```

Ten tests cover the average calculation, the grade boundaries, the class summary and CSV line parsing.

## Project structure

```text
.
├── data/
│   └── sample-grades.csv          # sample input
├── docs/
│   └── git-workflow.md            # how the project was built with Git, with real output
├── src/
│   ├── csvReader.js               # reads and validates the CSV file
│   ├── gradeCalculator.js         # averages, letter grades, class summary
│   └── index.js                   # command-line entry point
├── test/
│   └── gradeCalculator.test.js    # unit tests
├── .gitignore                     # files Git must not track
├── package.json                   # project name and the start/test scripts
├── README.md                      # this file
└── version-control-and-git-assignment.md   # earlier assignment, already in the repository
```

| Folder | Holds |
| --- | --- |
| `src/` | Program code only |
| `test/` | Tests only |
| `data/` | Input data |
| `docs/` | Documentation beyond this README |

## How the project was built

| Step | What happened |
| --- | --- |
| 1 | Six commits on the main line built the first working version |
| 2 | Branch `feature/class-summary` added the class summary and the tests, and was merged |
| 3 | Branch `feature/pass-mark` changed the pass mark, conflicted with a change on the main line, and the conflict was resolved |
| 4 | The result was pushed to GitHub |

The commands and their output for every step are in [docs/git-workflow.md](docs/git-workflow.md).

## Author

**Tejas Rajendra Bhoite** — [TejasBhoite0707](https://github.com/TejasBhoite0707) on GitHub
