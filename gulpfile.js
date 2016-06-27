'use strict';

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    plumber      = require('gulp-plumber'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    server       = require('browser-sync');

var del          = require('del'),
    mqpacker     = require('css-mqpacker'),
    minify       = require('gulp-csso'),
    rename       = require('gulp-rename'),
    imagemin     = require('gulp-imagemin'),
    svgmin       = require('gulp-svgmin'),
    svgstore     = require('gulp-svgstore'),
    run          = require('run-sequence');


// TASK STYLE

gulp.task('style', function() {
  return gulp.src('src/sass/style.scss')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postcss([
      autoprefixer({browsers: [
        'last 4 version',
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'last 2 Opera versions',
        'last 2 Edge versions'
      ]})
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify({
      restructure: false
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(server.reload({stream: true}));
});

// TASK IMAGEMIN

gulp.task('images', function() {
  return gulp.src('build/img/**/*.{jpg,png,gif}')
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3})
    ]))
    .pipe(gulp.dest('build/img'));
});

// TASK SYMBOLS

gulp.task('symbols', function() {
  return gulp.src('build/img/*.svg')
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('symbols.svg'))
    .pipe(gulp.dest('build/img'));
});


// TASK SERVE

gulp.task('serve', function() {
  server.init({
    server: 'build',
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch('src/sass/**/*.{scss,sass}', ['style']);
  gulp.watch('src/js/**/*.js', ['copy']).on('change', server.reload);
  gulp.watch('src/*.html', ['copy']).on('change', server.reload);
});

// TASK COPY

gulp.task('copy', function() {
  return gulp.src([
    'src/fonts/**/*.{woff,woff2}',
    'src/img/**/*.{jpg,png,gif,svg}',
    'src/js/**/*.js',
    'src/*.html'
    ], {
      base: 'src'
    })
    .pipe(gulp.dest('build'));
});

// TASK CLEAN

gulp.task('clean', function() {
  return del('build');
});

// TASK BUILD

gulp.task('build', function(fn) {
  run(
    'clean',
    'copy',
    'style',
    'images',
    'symbols',
    fn
  );
});
