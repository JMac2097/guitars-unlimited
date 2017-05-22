var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var merge = require('merge-stream');
var newer = require('gulp-newer');
var imageMin = require('gulp-imagemin');

var SOURCEPATH = {
    sassSource: 'src/scss/*.scss',
    htmlSource: 'src/*.html',
    jsSource: 'src/js/*.js',
    imgSource: 'src/img/**'
};
var appPATH = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js',
    fonts: 'app/fonts',
    img: 'app/img'
};

gulp.task('clean-html', function() {
    return gulp.src(appPATH.root + '/*.html', {read: false, force: true})
    .pipe(clean());
});

gulp.task('clean-scripts', function() {
    return gulp.src(appPATH.js + '/*.js', {read: false, force: true})
    .pipe(clean());
});


gulp.task('sass', function() {
    var bootstrapCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css');
    var sassFiles;
    sassFiles = gulp.src(SOURCEPATH.sassSource)
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    return merge(bootstrapCSS, sassFiles)
        .pipe(concat('app.css'))
        .pipe(gulp.dest(appPATH.css));
});

gulp.task('images', function() {
    return gulp.src(SOURCEPATH.imgSource)
    .pipe(newer(appPATH.img))
    .pipe(imageMin())
    .pipe(gulp.dest(appPATH.img));
});

gulp.task('move-fonts', function() {
    gulp.src('./node_modules/bootstrap/dist/fonts/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest(appPATH.fonts));
});

gulp.task('scripts', ['clean-scripts'], function() {
    gulp.src(SOURCEPATH.jsSource)
    .pipe(concat('main.js'))
    .pipe(browserify())
    .pipe(gulp.dest(appPATH.js));
});

gulp.task('copy', ['clean-html'], function() {
    gulp.src(SOURCEPATH.htmlSource)
    .pipe(gulp.dest(appPATH.root));
});

gulp.task('serve', ['sass'], function() {
    browserSync.init([appPATH.css + '/*.css', appPATH.root + '/*.html', appPATH.js + '/*.js'], {
        server: {
            baseDir : appPATH.root
        }
    });
});

gulp.task('watch', ['serve', 'sass', 'copy', 'clean-html', 'clean-scripts', 'scripts', 'move-fonts', 'images'], function() {
    gulp.watch([SOURCEPATH.sassSource], ['sass']);
    gulp.watch([SOURCEPATH.htmlSource], ['copy']);
    gulp.watch([SOURCEPATH.jsSource], ['scripts']);
});

gulp.task('default', ['watch']);