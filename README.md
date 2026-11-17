# Grade Tracker

A small command-line tool that reads student marks from a CSV file and prints each student's average and letter grade.

## Setup

Requirements: [Node.js](https://nodejs.org) 18 or newer. There are no other dependencies.

```bash
git clone https://github.com/exelynt-learning-platform/java-programming-assignment-40253-tejas.git
cd java-programming-assignment-40253-tejas
git switch git-github-version-control-essentials-for-developers-week1-2
```

## Usage

```bash
npm start
```

## Input file format

The first line is a header and is ignored. Every other line is a student name followed by one or more marks from 0 to 100:

```text
name,maths,science,english
Asha,92,88,95
```

Lines with a missing name or an invalid mark are skipped and reported.
