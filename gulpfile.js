'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const minimist = require('minimist');

require('gulp-simple')(require('./gulp-config'), {
    minify: minimist(process.argv.slice(2)).release,
});

gulp.task('default', callback => runSequence(
    'gulp-simple-clean',
    'gulp-simple-build',
    callback
));

gulp.task('watch', callback => runSequence(
    'gulp-simple-clean',
    'gulp-simple-build',
    'gulp-simple-watch',
    callback
));