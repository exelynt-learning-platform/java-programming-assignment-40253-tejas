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

/** Returns the average of the averages of all students. */
function classAverage(students) {
  return average(students.map((student) => average(student.marks)));
}

/** Returns the student with the highest average, or null for an empty list. */
function topStudent(students) {
  let best = null;
  for (const student of students) {
    const studentAverage = average(student.marks);
    if (best === null || studentAverage > best.average) {
      best = { name: student.name, average: studentAverage };
    }
  }
  return best;
}

module.exports = { average, letterGrade, classAverage, topStudent };
