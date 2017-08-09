'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var rimraf = require('rimraf');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefixer = require('gulp-autoprefixer');
var rigger = require('gulp-rigger');

var config = {
  server: {
      baseDir: "./dist",
      routes: {
        "/bower_components": "bower_components"
      }
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
    grid: "./src/styles/bootstrap-grid/bootstrap.css",
    js: "./src/js/**/*.js",
    fonts: "./src/fonts/*.otf"
  },

  dist: {
    html: "./dist/",
    styles: "./dist/styles/",
    grid: "./dist/styles/bootstrap-grid/",
    js: "./dist/js/",
    fonts: "./dist/fonts/"
  },

  watch: {
    html: "./src/**/*.html",
    styles: "./src/styles/**/*.sass",
    js: "./src/js/**/*.js"
  },

  clear: "./dist"
};

gulp.task('clear', function (cb) {
  rimraf(path.clear, cb);
});

gulp.task('html', function () {
  return gulp.src(path.src.html)
    .pipe(rigger())
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

gulp.task('grid', function () {
  gulp.src(path.src.grid)
    .pipe(gulp.dest(path.dist.grid));
});

gulp.task('js', function () {
  gulp.src(path.src.js)
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('fonts', function () {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('server', ['compile'], function () {
  browserSync.init(config);

  gulp.watch([path.watch.html], ['html']).on('change', browserSync.reload);
  gulp.watch([path.watch.styles], ['styles']);
  gulp.watch([path.watch.js], ['js']).on('change', browserSync.reload);
});

gulp.task('compile', ['html', 'styles', 'grid', 'js', 'fonts']);
gulp.task('default', ['server']);
