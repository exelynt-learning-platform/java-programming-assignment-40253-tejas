'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { average, letterGrade, classAverage, topStudent } = require('../src/gradeCalculator');
const { parseLine } = require('../src/csvReader');

const students = [
  { name: 'Asha', marks: [90, 100] },
  { name: 'Rohan', marks: [60, 70] },
];

test('average of several marks', () => {
  assert.equal(average([80, 90, 100]), 90);
});

test('average is rounded to two decimals', () => {
  assert.equal(average([70, 75, 81]), 75.33);
});

test('average of no marks is 0', () => {
  assert.equal(average([]), 0);
});

test('letter grade boundaries', () => {
  assert.equal(letterGrade(90), 'A');
  assert.equal(letterGrade(89.99), 'B');
  assert.equal(letterGrade(75), 'B');
  assert.equal(letterGrade(60), 'C');
  assert.equal(letterGrade(40), 'D');
  assert.equal(letterGrade(39.99), 'F');
});

test('class average is the average of student averages', () => {
  assert.equal(classAverage(students), 80);
});

test('top student has the highest average', () => {
  assert.deepEqual(topStudent(students), { name: 'Asha', average: 95 });
});

test('top student of an empty class is null', () => {
  assert.equal(topStudent([]), null);
});

test('parseLine reads a name and its marks', () => {
  assert.deepEqual(parseLine('Asha, 92, 88'), { name: 'Asha', marks: [92, 88] });
});

test('parseLine rejects a mark above 100', () => {
  assert.throws(() => parseLine('Asha,101'), /invalid mark/);
});

test('parseLine rejects a line without marks', () => {
  assert.throws(() => parseLine('Asha'), /no marks given/);
});
