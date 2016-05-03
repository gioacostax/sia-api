'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babel = require('gulp-babel');

gulp.task('build:browser', () => {
  return browserify({ entries: 'src/sia', standalone: 'sia' })
    .transform('babelify')
    .external('node-fetch')
    .bundle()
    .pipe(source('sia.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('build/browser'));
});

gulp.task('build:npm', () => {
  return gulp.src('src/sia/**/*.js')
    .pipe(babel())
		.pipe(gulp.dest('build/npm'));
});

gulp.task('build:docs', () => {
  return gulp.src('docs/**/*')
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['build:npm', 'build:browser', 'build:docs']);
