'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const minimist = require('minimist');
const browserSync = require('browser-sync').create();

const config = require('./gulp-config');

gulp.task('server', callback => {
	browserSync.init({
        server: config.dest,
        logLevel: "silent",
        port: 8000,
    }, callback);
});

require('gulp-simple')(config, {
	prefix: 'source_',
    minify: minimist(process.argv.slice(2)).release,
    onWatch: browserSync.reload,
});

gulp.task('default', callback => runSequence(
    'source_clean',
    'source_build',
    callback
));

gulp.task('watch', callback => runSequence(
    'source_clean',
    'source_build',
    'server',
    'source_watch',
    callback
));