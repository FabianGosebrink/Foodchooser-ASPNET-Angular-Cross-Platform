var gulp = require('gulp');
var runSeq = require('run-sequence');
var del = require('del');
var path = require('path');

var buildConfig = require('../gulp.config');

gulp.task('copy:web:prod', function (done) {
    runSeq(
        'web-clean-dist-folder',
        'web-copy-to-dist',
        done);
});

gulp.task('web-clean-dist-folder', function (done) {
    del(buildConfig.targets.webAppOutputPath, { force: true }).then(function () {
        done();
    });
});

gulp.task('web-copy-to-dist', function () {
    var sourceFolder = path.join(buildConfig.temp.webapp, '**', '*.*');
    return gulp.src([sourceFolder])
        .pipe(gulp.dest(buildConfig.targets.webAppOutputPath));
});
