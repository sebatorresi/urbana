// npm install --save-dev gulp browser-sync gulp-stylus gulp-data gulp-imagemin gulp-newer gulp-rucksack gulp-postcss gulp-cssnano gulp-sourcemaps autoprefixer gulp-plumber gulp-watch lost

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var lost = require('lost');
var rucksack = require('gulp-rucksack');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var data = require('gulp-data');
var stylus = require('gulp-stylus');

// Static Server + watching scss/html files
gulp.task('serve', ['stylus'], function() {

    browserSync.init({
        server: "./build"
    });

    gulp.watch("src/styles/**/*.styl", ['stylus']);
    gulp.watch("build/*.js").on('change', browserSync.reload);
    gulp.watch("build/*.html").on('change', browserSync.reload);
});

// Compile stylus into CSS & auto-inject into browsers
gulp.task('stylus', function() {
  return gulp.src("src/styles/*.styl")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(stylus())
    .pipe(postcss([
      lost(),
      autoprefixer({
        browsers: ['last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'ie 10', 'ie 11', 'edge 12', 'edge 13', 'edge 14',  'opera 12.1', 'ios 6', 'android 4'] }),
      // autoprefixer({ grid: true })
      ]))
    .pipe(rucksack())
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
