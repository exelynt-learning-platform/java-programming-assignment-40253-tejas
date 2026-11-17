'use strict';

/** Returns the average of a list of marks, rounded to two decimals. */
function average(marks) {
  if (!Array.isArray(marks) || marks.length === 0) {
    return 0;
  }
  const total = marks.reduce((sum, mark) => sum + mark, 0);
  return Math.round((total / marks.length) * 100) / 100;
}

/** Converts an average mark (0-100) into a letter grade. */
function letterGrade(averageMark) {
  if (averageMark >= 90) return 'A';
  if (averageMark >= 75) return 'B';
  if (averageMark >= 60) return 'C';
  if (averageMark >= 40) return 'D';
  return 'F';
}

module.exports = { average, letterGrade };
