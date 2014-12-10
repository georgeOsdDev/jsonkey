pkg = require './package.json'
gulp = require 'gulp'
clean = require 'gulp-clean'
mocha = require 'gulp-mocha'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'
jshint = require 'gulp-jshint'
stylish = require 'jshint-stylish'
browserify = require 'gulp-browserify'


gulp.task 'default', ->
  gulp.run 'build'

gulp.task 'clean', ->
  gulp.src 'dist/*', {read: false}
      .pipe clean()

gulp.task 'lint', ->
  gulp.src 'lib/jsonkey.js'
      .pipe jshint()
      .pipe jshint.reporter('jshint-stylish')
      .pipe jshint.reporter('fail')

gulp.task 'test', ->
  gulp.src 'test/test.js', {read: false}
      .pipe mocha {reporter: 'nyan'}

gulp.task 'compress', ->
  gulp.src './dist/jsonkey_bundle.js'
      .pipe uglify(mungle: true)
      .pipe rename("jsonkey_bundle.min.js")
      .pipe gulp.dest('./dist')

gulp.task 'bundle', ->
  gulp.src 'index.js'
      .pipe browserify()
      .pipe rename("jsonkey_bundle.js")
      .pipe gulp.dest('./dist')

gulp.task 'build', ['lint', 'test'], ->
  gulp.run 'clean', ->
    gulp.run 'bundle', ->
      gulp.run 'compress', ->
