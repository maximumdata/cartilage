var gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    prefix      = require('gulp-autoprefixer'),
    minify      = require('gulp-minify-css'),
    rename      = require('gulp-rename'),
    
    input       = {
      'sassAll': 'dev/sass/**/*.sass',
      'sassMaster' : 'dev/sass/master.sass',
      'js': 'dev/js/**/*.js'
    },
    output      = {
      'css' : '',
      'js' : 'public/js'
    };
    
gulp.task('default', ['jshint','build-js','build-css','watch']);

gulp.task('jshint', function() {
  return gulp.src(input.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-css', function() {
  return gulp.src(input.sassMaster)
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(prefix("last 3 versions", "> 1%", "ie 8", "ie 7", "ie 6"))
      .pipe(minify())
      .pipe(rename('style.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(output.css));
});

gulp.task('build-js', function() {
  return gulp.src(input.js)
    .pipe(sourcemaps.init())
      .pipe(concat('compiled.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(output.js));
});

gulp.task('watch', function() {
  gulp.watch(input.js, ['jshint', 'build-js']);
  gulp.watch(input.sassAll, ['build-css']);
});