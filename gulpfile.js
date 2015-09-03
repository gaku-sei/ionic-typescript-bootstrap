var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');
var sh = require('shelljs');

var paths = {
  src: {
    root: 'src',
    all: ['src/**/*', '!src/{scss,scss/**}', '!src/{js,js/**}'],
    sass: 'src/scss/**/*.scss',
    ts: 'src/js/**/*.ts'
  },
  www: 'www'
};

var project = ts.createProject({
  typescript: require('typescript'),
  module: 'system',
  experimentalAsyncFunctions: true
});

gulp.task('copy', function() {
  return gulp.src(paths.src.all)
    .pipe(gulp.dest(paths.www));
});

gulp.task('sass', ['copy'], function() {
  return gulp.src(paths.src.sass)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest(paths.www + '/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(paths.www + '/css/'));
});

gulp.task('typescript', ['copy'], function() {
  return gulp.src(paths.src.ts)
    .pipe(ts(project))
    .pipe(rename({extname: '.js'}))
    .pipe(gulp.dest(paths.www + '/js'));
});

gulp.task('watch', ['copy', 'sass', 'typescript'], function() {
  gulp.watch(paths.src.sass, ['sass']);
  gulp.watch(paths.src.all, ['copy']);
  gulp.watch(paths.src.ts, ['typescript']);
});

gulp.task('default', ['watch']);

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});
