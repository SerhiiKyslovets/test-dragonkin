'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var rimraf = require('rimraf');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefixer = require('gulp-autoprefixer');

var config = {
  server: {
      baseDir: "./dist"
  },

  online: false,
  tunel: true,
  host: 'localhost',
  port: 9000,
  open: 'local'
};

var path = {
  src: {
    html: "./src/*.html",
    styles: "./src/styles/main.sass",
    img: "./src/img/**/*.*"
  },

  dist: {
    html: "./dist/",
    styles: "./dist/styles/",
    img: "./dist/img/"
  },

  watch: {
    html: "./src/**/*.html",
    styles: "./src/styles/**/*.sass",
    img: "./src/img/**/*.*"
  },

  clear: "./dist"
};

gulp.task('clear', function (cb) {
  rimraf(path.clear, cb);
});

gulp.task('html', function () {
  return gulp.src(path.src.html)
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('styles', function () {
  return gulp.src(path.src.styles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefixer('last 2 versions'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.styles))
    .pipe(browserSync.stream());
});

gulp.task('img', function () {
  gulp.src(path.src.img)
    .pipe(gulp.dest(path.dist.img));
})

gulp.task('server', ['compile'], function () {
  browserSync.init(config);

  gulp.watch([path.watch.html], ['html']).on('change', browserSync.reload);
  gulp.watch([path.watch.styles], ['styles']);
  gulp.watch([path.watch.img], ['img'])
});

gulp.task('compile', ['html', 'styles', 'img']);
gulp.task('default', ['server']);
