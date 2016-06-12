var gulp = require('gulp');
var runSeq = require('run-sequence');
var electron = require('gulp-atom-electron');
var symdest = require('gulp-symdest');
var taskListing = require('gulp-task-listing');
var concat = require('gulp-concat');
var path = require('path');
var sh = require('shelljs');
var del = require('del');
var cssMinifier = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var webpack = require('webpack-stream');

var buildConfig = require('../gulp.config');

gulp.task('build:apps', function (done) {
    runSeq(
        'cordova-clean-temp',
        'cordova-copy-config-to-temp',
        'cordova-copy-winstore-to-temp',
        'cordova-copy-index-to-temp-folder',
        'cordova-copy-images-to-temp-folder',
        'cordova-compile-with-webpack',
        'cordova-inject-in-html',
        'cordova-build-windows',
        //  'cordova-build-android',
        'cordova-clean-dist',
        'cordova-copy-to-dist',
        done);
});

gulp.task('cordova-clean-temp', function (done) {
    return del(buildConfig.temp.cordova, { force: true }, done);
});

gulp.task('cordova-clean-dist', function (done) {
    return del(buildConfig.targets.cordovaOutputPath, { force: true }, done);
});

gulp.task('cordova-copy-config-to-temp', function () {
    var configFile = path.join(buildConfig.assets.cordova, "config.xml");

    return gulp.src([
        configFile
    ])
        .pipe(gulp.dest(buildConfig.temp.cordova));
});


gulp.task('cordova-copy-winstore-to-temp', function () {
    var winStore = path.join(buildConfig.assets.cordova, "winstore-jscompat.js");

    return gulp.src([
        winStore
    ])
        .pipe(gulp.dest(buildConfig.temp.cordovaWww));
});

gulp.task('cordova-inject-in-html', function (done) {
    var target = gulp.src(
        path.join(buildConfig.temp.cordovaWww, "index.html"));

    var sourcesToInject = [];

    sourcesToInject.push(
        path.join(buildConfig.temp.cordovaWww, "winstore-jscompat.js")
    );

    sourcesToInject.push(
        path.join(buildConfig.temp.cordovaWww, "polyfills.bundle.js"),
        path.join(buildConfig.temp.cordovaWww, "vendor.bundle.js"),
        path.join(buildConfig.temp.cordovaWww, "app.bundle.js")
    );

    sourcesToInject.push(
        path.join(buildConfig.temp.cordovaWww, "vendor.bundle.css"),
        path.join(buildConfig.temp.cordovaWww, "app.bundle.css")
    );

    var sources = gulp.src(sourcesToInject, {
        read: false
    });

    return target.pipe(inject(sources, {
        ignorePath: buildConfig.temp.cordovaWww,
        addRootSlash: false
    }))
        .pipe(gulp.dest(buildConfig.temp.cordovaWww));
});

gulp.task('cordova-compile-with-webpack', function () {
    return gulp.src(buildConfig.sources.appEntryPoint)
        .pipe(webpack(require(buildConfig.sources.webpackConfig)))
        .pipe(gulp.dest(buildConfig.temp.cordovaWww));
});

gulp.task('cordova-copy-index-to-temp-folder', function (done) {
    return gulp.src(buildConfig.general.indexHtml)
        .pipe(gulp.dest(buildConfig.temp.cordovaWww));
});

gulp.task('cordova-copy-images-to-temp-folder', function (done) {
    return gulp.src(buildConfig.sources.allAppImgFiles)
        .pipe(gulp.dest(buildConfig.temp.cordovaWww + "img"));
});

gulp.task('cordova-copy-files-as-is-to-temp-folder', function (done) {

    var filesToCopy = [];

    filesToCopy.push(buildConfig.assets.shared + "system.config.js");
    filesToCopy = filesToCopy.concat(buildConfig.sources.filesToCopyAsIsCordova);

    return gulp.src(filesToCopy)
        .pipe(gulp.dest(buildConfig.temp.cordovaWww + "scripts/"));
});

gulp.task('cordova-build-windows', function (done) {
    sh.cd(buildConfig.temp.cordova);
    sh.exec('cordova platform add windows');
    sh.exec('cordova build windows');
    sh.cd('..');
    done();
});

gulp.task('cordova-build-android', function (done) {
    sh.cd(buildConfig.temp.cordova);
    sh.exec('cordova platform add android');
    sh.exec('cordova build android');
    sh.cd('..');
    done();
});

gulp.task('cordova-copy-to-dist', function () {
    var sourceFolder = path.join(buildConfig.temp.cordova, 'platforms', "**", '*.*');
    return gulp.src([sourceFolder])
        .pipe(gulp.dest(buildConfig.targets.cordovaOutputPath));
});