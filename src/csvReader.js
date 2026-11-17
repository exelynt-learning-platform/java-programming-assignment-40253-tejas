'use strict';

const fs = require('node:fs');

/**
 * Parses one CSV line of the form "name,mark,mark,...".
 * Returns { name, marks } or throws an Error that says what is wrong.
 */
function parseLine(line) {
  const parts = line.split(',').map((part) => part.trim());
  const name = parts[0];
  if (!name) {
    throw new Error('missing student name');
  }
  if (parts.length < 2) {
    throw new Error('no marks given');
  }
  const marks = parts.slice(1).map((value) => {
    const mark = Number(value);
    if (value === '' || !Number.isFinite(mark) || mark < 0 || mark > 100) {
      throw new Error(`invalid mark "${value}"`);
    }
    return mark;
  });
  return { name, marks };
}

/**
 * Reads a CSV file whose first line is a header.
 * Returns the valid students and a list of the lines that were skipped.
 */
function readStudents(filePath) {
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  const students = [];
  const skipped = [];

  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    if (lineNumber === 1 || line.trim() === '') {
      return;
    }
    try {
      students.push(parseLine(line));
    } catch (error) {
      skipped.push({ line: lineNumber, reason: error.message });
    }
  });

  return { students, skipped };
}

module.exports = { parseLine, readStudents };
