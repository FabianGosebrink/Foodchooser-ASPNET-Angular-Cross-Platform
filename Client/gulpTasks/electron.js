var gulp = require('gulp');
var runSeq = require('run-sequence');
var electron = require('gulp-atom-electron');
var symdest = require('gulp-symdest');
var taskListing = require('gulp-task-listing');
var concat = require('gulp-concat');
var path = require('path');
var del = require('del');
var taskListing = require('gulp-task-listing');
var cssMinifier = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var webpack = require('webpack-stream');

var buildConfig = require('../gulp.config');

gulp.task('build:electron:prod', function (done) {
    runSeq(
        'electron-clean-temp',
        'electron-compile-with-webpack',
        'electron-copy-index-to-temp-folder',
        'electron-inject-in-html',
        'electron-copy-assets-to-temp-folder',
        'electron-build-win',
        done);
});

gulp.task('electron-clean-temp', function (done) {
    return del(buildConfig.temp.electronTempFolder, { force: true }, done);
});

gulp.task('electron-compile-with-webpack', function () {
    return gulp.src(buildConfig.sources.appEntryPoint)
        .pipe(webpack(require(buildConfig.sources.webpackConfig)))
        .pipe(gulp.dest(buildConfig.temp.electronTempFolder));
});

gulp.task('electron-copy-index-to-temp-folder', function (done) {
    return gulp.src(buildConfig.general.indexHtml)
        .pipe(gulp.dest(buildConfig.temp.electronTempFolder));
});

gulp.task('electron-inject-in-html', function (done) {
    var target = gulp.src(
        path.join(buildConfig.temp.electronTempFolder, "index.html"));

    var sourcesToInject = [];

    sourcesToInject.push(
        path.join(buildConfig.temp.electronTempFolder, "polyfills.bundle.js"),
        path.join(buildConfig.temp.electronTempFolder, "vendor.bundle.js"),
        path.join(buildConfig.temp.electronTempFolder, "app.bundle.js")
    );
    
    sourcesToInject.push(
        path.join(buildConfig.temp.electronTempFolder, "vendor.bundle.css"),
        path.join(buildConfig.temp.electronTempFolder, "app.bundle.css")
    );

    var sources = gulp.src(sourcesToInject, {
        read: false
    });

    return target.pipe(inject(sources, {
        ignorePath: buildConfig.temp.electronTempFolder,
        addRootSlash: false
    }))
        .pipe(gulp.dest(buildConfig.temp.electronTempFolder));
});

gulp.task('electron-copy-assets-to-temp-folder', function (done) {
    return gulp.src(buildConfig.assets.electron + "*.*")
        .pipe(gulp.dest(buildConfig.temp.electronTempFolder));
});

gulp.task('electron-build-win', function (done) {
    return gulp.src(path.join(buildConfig.temp.electronTempFolder, '**', '*'))
        .pipe(electron({
            version: '1.2.7',
            platform: 'win32',
            arch: 'x64',
            companyName: 'Offering Solutions',
            linuxExecutableName: 'ASPNETAngularJS2Example',
        }))
        .pipe(symdest(buildConfig.targets.electronOutputPath + 'win'));
});

