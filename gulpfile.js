var gulp = require('gulp')

var browserify = require('browserify')
var watchify = require('watchify')
var babelify = require('babelify')

var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var merge = require('utils-merge')

var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')

/* nicer browserify errors */
var gutil = require('gulp-util')
var chalk = require('chalk')

var babelifyOptions = {
  presets: ['es2015', 'react']
}

function map_error (err) {
  if (err.fileName) {
    // regular error
    gutil.log(chalk.red(err.name) +
      ': ' +
      chalk.yellow(err.fileName.replace(__dirname + '/javascripts/src/', '')) +
      ': ' +
      'Line ' +
      chalk.magenta(err.lineNumber) +
      ' & ' +
      'Column ' +
      chalk.magenta(err.columnNumber || err.column) +
      ': ' +
      chalk.blue(err.description))
  } else {
    // browserify error..
    gutil.log(chalk.red(err.name) +
      ': ' +
      chalk.yellow(err.message))
  }

  this.end()
}
/* */

gulp.task('watchify', function () {
  var args = merge(watchify.args, { debug: true })
  var bundler = watchify(browserify('./javascripts/src/example.jsx', args)).transform(babelify, babelifyOptions)
  bundle_js(bundler)

  bundler.on('update', function () {
    bundle_js(bundler)
  })
})

function bundle_js (bundler) {
  return bundler.bundle()
    .on('error', map_error)
    .pipe(source('example.js'))
    .pipe(buffer())
    .pipe(gulp.dest('javascripts/out'))
    .pipe(rename('example.min.js'))
    .pipe(sourcemaps.init({ loadMaps: true }))
      // capture sourcemaps from transforms
      .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('javascripts/out'))
}

// Without watchify
gulp.task('browserify', function () {
  var bundler = browserify('./javascripts/src/example.jsx', { debug: true }).transform(babelify, babelifyOptions)

  return bundle_js(bundler)
})

// Without sourcemaps
gulp.task('browserify-production', function () {
  var bundler = browserify('./javascripts/src/example.jsx').transform(babelify, babelifyOptions)

  return bundler.bundle()
    .on('error', map_error)
    .pipe(source('example.js'))
    .pipe(buffer())
    .pipe(rename('example.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('javascripts/out'))
})
