pkg = require './package.json'
gulp = require 'gulp'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'
jshint = require 'gulp-jshint'
stylish = require 'jshint-stylish'

gulp.task 'default', ->
  console.log "Hello, please inplement gulp tasks"

gulp.task 'lint', ->
  gulp.src('lib/jsonkey.js')
    .pipe jshint()
    .pipe jshint.reporter('jshint-stylish')
    .pipe jshint.reporter('fail')

gulp.task 'compress', ->
  gulp.src 'jsonkey.js'
      .pipe uglify(mungle: true)
      .pipe rename("jsonkey.min.js")
      .pipe gulp.dist('./')

gulp.task 'test', ->