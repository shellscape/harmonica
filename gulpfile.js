'use strict';

const eslint = require('gulp-eslint');
const gulp = require('gulp');

gulp.task('lint', () => {
  const glob = [
    '**/*.js',
    '!node_modules'
  ];

  return gulp.src(glob)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint']);
