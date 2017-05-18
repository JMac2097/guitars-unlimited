var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var clean = require('gulp-clean');
var concat = require('gulp-concat');

var SOURCEPATH = {
    sassSource: 'src/scss/*.scss',
    htmlSource: 'src/*.html',
    jsSource: 'src/js/*.js'
};
var appPATH = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js'
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
    return gulp.src(SOURCEPATH.sassSource)
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(appPATH.css));
});

gulp.task('scripts', ['clean-scripts'], function() {
    gulp.src(SOURCEPATH.jsSource)
    .pipe(concat('main.js'))
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

gulp.task('watch', ['serve', 'sass', 'copy', 'clean-html', 'clean-scripts', 'scripts'], function() {
    gulp.watch([SOURCEPATH.sassSource], ['sass']);
    gulp.watch([SOURCEPATH.htmlSource], ['copy']);
    gulp.watch([SOURCEPATH.jsSource], ['scripts']);
});

gulp.task('default', ['watch']);