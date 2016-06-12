var gulp = require('gulp');
var runSeq = require('run-sequence');
var del = require('del');
var taskListing = require('gulp-task-listing');
var concat = require('gulp-concat');
var path = require('path');
var cssMinifier = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var webpack = require('webpack-stream');

var buildConfig = require('../gulp.config');

gulp.task('build:web:prod', function (done) {
    runSeq(
        'web-clean-temp-folder',
        'web-compile-with-webpack',
        'web-copy-index-to-webapp-temp-folder',
        'web-inject-in-html',
        'web-clean-dist-folder',
        'web-copy-to-dist',
        done);
});

gulp.task('web-clean-temp-folder', function (done) {
    del(buildConfig.temp.webapp, { force: true }).then(function () {
        done();
    });
});

gulp.task('web-clean-dist-folder', function (done) {
    del(buildConfig.targets.webAppOutputPath, { force: true }).then(function () {
        done();
    });
});

gulp.task('web-compile-with-webpack', function () {
    return gulp.src(buildConfig.sources.appEntryPoint)
        .pipe(webpack(require(buildConfig.sources.webpackConfig)))
        .pipe(gulp.dest(buildConfig.temp.webapp));
});

gulp.task('web-copy-index-to-webapp-temp-folder', function (done) {
    return gulp.src(buildConfig.general.indexHtml)
        .pipe(gulp.dest(buildConfig.temp.webapp));
});

gulp.task('web-inject-in-html', function (done) {
    var target = gulp.src(
        path.join(buildConfig.temp.webapp, "index.html"));

    var sourcesToInject = [];

    sourcesToInject.push(
        path.join(buildConfig.temp.webapp, "polyfills.bundle.js"),
        path.join(buildConfig.temp.webapp, "vendor.bundle.js"),
        path.join(buildConfig.temp.webapp, "app.bundle.js")
    );
    
    sourcesToInject.push(
        path.join(buildConfig.temp.webapp, "vendor.bundle.css"),
        path.join(buildConfig.temp.webapp, "app.bundle.css")
    );

    var sources = gulp.src(sourcesToInject, {
        read: false
    });

    return target.pipe(inject(sources, {
        ignorePath: buildConfig.temp.webapp,
        addRootSlash: false
    }))
        .pipe(gulp.dest(buildConfig.temp.webapp));
});


gulp.task('web-copy-to-dist', function () {
    var sourceFolder = path.join(buildConfig.temp.webapp, "**", '*.*');
    return gulp.src([sourceFolder])
        .pipe(gulp.dest(buildConfig.targets.webAppOutputPath));
});
