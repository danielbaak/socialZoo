var gulp = require('gulp')
var webserver = require('gulp-webserver')
var mainBowerFiles = require('main-bower-files')
var inject = require('gulp-inject')
var pako = require('gulp-pako')
var del = require('del')

var paths = {
  app: 'app/**/*.js',
  bower: 'bower_components/**/*',
  index: 'app/index.html',
  tmp: '.tmp',
  tmpVendor: '.tmp/vendor',
}

var tmpIndex

gulp.task('default', ['vendorFiles', 'files', 'serve', 'watch'])

gulp.task('vendorFiles', function () {
  tmpIndex = tmpIndex || gulp.src(paths.index).pipe(gulp.dest(paths.tmp))

  var tmpVendors = gulp.src(mainBowerFiles()).pipe(gulp.dest(paths.tmpVendor))

  tmpIndex.pipe(inject(tmpVendors, {
    relative: true,
    name: 'vendorInject'
  })).pipe(gulp.dest(paths.tmp))
})

gulp.task('files', function () {
  tmpIndex = tmpIndex || gulp.src(paths.index).pipe(gulp.dest(paths.tmp))

  var files = gulp.src(paths.app).pipe(gulp.dest(paths.tmp))

  tmpIndex.pipe(inject(files, {
    relative: true
  })).pipe(gulp.dest(paths.tmp))
})

gulp.task('watch', function () {
  gulp.watch(paths.app, ['files'])
  gulp.watch(paths.bower, ['vendorFiles'])
})

gulp.task('serve', function () {
  gulp.src(paths.tmp).pipe(webserver({
    host: '0.0.0.0',
    livereload: true,
    proxies: [{source: '/api', target: 'http://127.0.0.1:1337'}],
  }))
})

gulp.task('clean', function () {
  del(paths.tmp)
})
