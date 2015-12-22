var gulp = require('gulp')

var browserify = require('browserify')
var watchify = require('watchify')
var babelify = require('babelify')

var source = require('vinyl-source-stream')
var merge = require('utils-merge')

/* nicer browserify errors */
var gutil = require('gulp-util')
var chalk = require('chalk')

var babelifyOptions = {
  presets: ['react']
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
}
/* */

gulp.task('example-watchify', function () {
  var args = merge(watchify.args, { debug: true })
  var bundler = watchify(browserify('./example/javascripts/src/example.jsx', args)).transform(babelify, babelifyOptions)
  bundle_js(bundler)

  bundler.on('update', function () {
    bundle_js(bundler)
  })
})

function bundle_js (bundler) {
  return bundler.bundle()
    .on('error', map_error)
    .pipe(source('example.js'))
    .pipe(gulp.dest('example/javascripts/out'))
}

// Without watchify
gulp.task('example-browserify', function () {
  var bundler = browserify('./example/javascripts/src/example.jsx', { debug: true }).transform(babelify, babelifyOptions)

  return bundle_js(bundler)
})
