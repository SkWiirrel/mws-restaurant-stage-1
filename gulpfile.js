/*jshint esversion: 6 */
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const responsive = require('gulp-responsive-images');
const clean = require('gulp-clean');

gulp.task('default', ['copy-html-and-assets', 'styles', 'scripts'], function() {
  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch(['js/**/*.js', 'sw.js'], ['scripts']);
  gulp.watch('*.html', ['copy-html-and-assets']);
  gulp.watch('dist/*.html').on('change', browserSync.reload);

  browserSync.init({
    server: './dist'
  });
});

gulp.task('dist', [
  'copy-html-and-assets',
  'images',
  'styles',
  'scripts-dist'
]);

gulp.task('scripts', function() {
  gulp.src(['js/ServiceWorkerController.js', 'js/lib/*.js', 'js/dbhelper.js'])
    .pipe(concat('commons.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());

  gulp.src(['js/main.js', 'js/restaurant_info.js', 'js/polyfills/*.js'])
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());

  gulp.src('sw.js')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('scripts-dist', function() {

  const dest = 'dist/js';

  gulp.src(['js/ServiceWorkerController.js', 'js/lib/*.js', 'js/dbhelper.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(concat('commons.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest));

  gulp.src(['js/polyfills/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest(dest));

  gulp.src(['js/main.js', 'js/restaurant_info.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest));

  gulp.src('sw.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-html-and-assets', function() {
  gulp.src(['./*.html', './favicon.ico'])
    .pipe(gulp.dest('./dist'));

  gulp.src(['./manifest/*'])
    .pipe(gulp.dest('./dist/manifest'));
});


gulp.task('images', function() {

  const dest = 'dist/img';

  gulp.src(dest, {
    read: false
  }).pipe(clean());

  gulp.src('img/*')
    .pipe(responsive({
      '*': [{
        width: 550,
        suffix: '-550',
        quality: 65
      }, {
        width: 650,
        suffix: '-650',
        quality: 65
      }, {
        width: 800,
        suffix: '-800',
        quality: 65
      }]
    }))
    .pipe(gulp.dest(dest));

});


gulp.task('styles', function() {
  gulp.src('sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});
