'use strict';

const path = require('node:path');
const { readStudents } = require('./csvReader');
const { average, letterGrade, classAverage, topStudent } = require('./gradeCalculator');

const DEFAULT_FILE = path.join(__dirname, '..', 'data', 'sample-grades.csv');

function formatRow(name, averageMark, grade) {
  return `${name.padEnd(12)} ${averageMark.toFixed(2).padStart(7)}   ${grade}`;
}

function main() {
  const filePath = process.argv[2] || DEFAULT_FILE;

  let result;
  try {
    result = readStudents(filePath);
  } catch (error) {
    console.error(`Could not read "${filePath}": ${error.message}`);
    process.exitCode = 1;
    return;
  }

  console.log('Student      Average   Grade');
  console.log('----------------------------');
  for (const student of result.students) {
    const averageMark = average(student.marks);
    console.log(formatRow(student.name, averageMark, letterGrade(averageMark)));
  }

  if (result.students.length > 0) {
    const top = topStudent(result.students);
    console.log('----------------------------');
    console.log(`Class average: ${classAverage(result.students).toFixed(2)}`);
    console.log(`Top student:   ${top.name} (${top.average.toFixed(2)})`);
  }

  for (const problem of result.skipped) {
    console.warn(`Skipped line ${problem.line}: ${problem.reason}`);
  }
}

main();
