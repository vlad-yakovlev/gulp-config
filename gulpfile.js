'use strict';

const gulp = require('gulp');
const gulpSimple = require('gulp-simple');
const runSequence = require('run-sequence');
const minimist = require('minimist');
const browserSync = require('browser-sync').create();

const config = require('./gulp-config');

gulp.task('server', callback => {
    browserSync.init({
        server: config.dest,
        snippetOptions: {
            rule: {
                match: /$/,
                fn: snippet => snippet,
            },
        },
        logLevel: "info",
        port: 8000,
    }, callback);

    gulpSimple.pipes.forEach(pipe => pipe.pipe(browserSync.stream()));
    gulpSimple.onWatch = browserSync.reload;
});

gulpSimple.prefix = 'source_';
gulpSimple.minify = minimist(process.argv.slice(2)).release;
gulpSimple.init(config);

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