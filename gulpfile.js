var gulp        = require('gulp'),
    argv        = require('yargs').argv,
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    prefix      = require('gulp-autoprefixer'),
    minify      = require('gulp-minify-css'),
    rename      = require('gulp-rename'),
    imgMin      = require('gulp-imagemin'),
    combMed     = require('gulp-combine-media-queries'),
    
    input       = {
      'sassAll': 'src/sass/**/*.sass',
      'sassMaster' : 'src/sass/master.sass',
      'jsCustom': 'src/js/custom/*.js',
      'jsVendor' : 'src/js/vendor/*.js',
      'jsAll' : 'src/js/**/*.js',
      'images' : 'src/img/**/*.*'
    },
    output      = {
      production: {
        'css' : 'public/css',
        'js' : 'public/js',
        'images' : 'public/img'
      },
      dev: {
        'css' : 'dev/css',
        'js' : 'dev/js',
        'images' : 'dev/img'
      }
    };



// this is used in both dev and production, so link all of your images to <?php echo get_stylesheet_directory_uri(); ?>/public/img/

gulp.task('imgMin', function () {
  return gulp.src(input.images)
    .pipe(imgMin({
      progressive: true
    }))
    .pipe(gulp.dest(output.production.images));
});



// Production tasks, assets will be minified.

gulp.task('prodCss', function() {
  return gulp.src(input.sassMaster)
    .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: 'expanded' }))
      .pipe(prefix({
        browsers : ["last 3 versions", "> 1%", "ie 8", "ie 7", "ie 6"],
        cascade: false
      }))
      .pipe(combMed())
      .pipe(rename('style.full.css'))
      .pipe(gulp.dest(output.production.css))
      .pipe(minify())
      .pipe(rename('style.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(output.production.css));
});

gulp.task('prodJsVendor', function() {
  return gulp.src(input.jsVendor)
    .pipe(sourcemaps.init())
      .pipe(concat('vendor.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(output.production.js));
});

gulp.task('prodJsCustom', function() {
  return gulp.src(input.jsCustom)
    .pipe(sourcemaps.init())
      .pipe(concat('custom.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(output.production.js));
});

gulp.task('prodWatch', function() {
  gulp.watch(input.jsCustom, ['jshint', 'prodJsCustom']);
  gulp.watch(input.jsVendor, ['prodJsWatch']);
  gulp.watch(input.sassAll, ['prodCss']);
  gulp.watch(input.images, ['imgMin']);
});


// Dev tasks, assets will be concatenated, but not minified.

gulp.task('devCss', function() {
  return gulp.src(input.sassMaster)
    .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: 'expanded' }))
      .pipe(prefix({
        browsers : ["last 3 versions", "> 1%", "ie 8", "ie 7", "ie 6"],
        cascade : true
      }))
      .pipe(rename('style.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(output.dev.css));
});

gulp.task('devJsVendor', function() {
  return gulp.src(input.jsVendor)
    .pipe(sourcemaps.init())
      .pipe(concat('vendor.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(output.dev.js));
});

gulp.task('devJsCustom', function() {
  return gulp.src(input.jsCustom)
    .pipe(sourcemaps.init())
      .pipe(concat('custom.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(output.dev.js));
});

gulp.task('devWatch', function() {
  gulp.watch(input.jsCustom, ['jshint', 'devJsCustom']);
  gulp.watch(input.jsVendor, ['devJsWatch']);
  gulp.watch(input.sassAll, ['devCss']);
  gulp.watch(input.images, ['imgMin']);
});


gulp.task('jshint', function() {
  return gulp.src(input.jsCustom)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});


gulp.task('default', function() {
  console.log("WARNING:");
  console.log("You need to specify a task, use either 'gulp prod' to generate a production build, or 'gulp dev' to generate a dev build, or 'gulp dev --watch' to build and also start the watch task.");
  console.log("REMINDER:");
  console.log("Remember to add 'define(\"WP_DEBUG\", true);' to your WP installation's wp-config.php in order to use the un-minified css/js.");
});

gulp.task('prod', argv.watch == 1 ? ['prodCss', 'prodJsVendor', 'prodJsCustom', 'imgMin', 'prodWatch'] : ['prodCss', 'prodJsVendor', 'prodJsCustom', 'imgMin']);
gulp.task('dev', argv.watch == 1 ? ['devCss', 'devJsVendor', 'jshint', 'devJsCustom', 'imgMin', 'devWatch'] : ['devCss', 'devJsVendor', 'jshint', 'devJsCustom', 'imgMin']);