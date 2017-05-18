var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var SOURCEPATH = {
    sassSource: 'src/scss/*.scss',
    htmlSource: 'src/*.html'
};
var appPATH = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js'
};


gulp.task('sass', function() {
    return gulp.src(SOURCEPATH.sassSource)
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(appPATH.css));
});

gulp.task('copy', function() {
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

gulp.task('watch', ['serve', 'sass', 'copy'], function() {
    gulp.watch([SOURCEPATH.sassSource], ['sass']);
    gulp.watch([SOURCEPATH.htmlSource], ['copy']);
});

gulp.task('default', ['watch']);