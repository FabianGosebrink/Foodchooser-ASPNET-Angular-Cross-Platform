var gulp = require('gulp');
var runSeq = require('run-sequence');
var del = require('del');
var taskListing = require('gulp-task-listing');
var concat = require('gulp-concat');
var path = require('path');
var cssMinifier = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');

var buildConfig = require('../gulp.config');

gulp.task('build:web:prod', function(done) {
    runSeq(
        'web-clean-webapp',
        'web-copy-index-to-webapp-folder',
        'web-copy-images-to-webapp-folder',
        'web-copy-css-to-webapp-folder',
        'web-concat-uglify-and-copy-vendor-scripts',
        'web-copy-files-as-is-to-temp-folder',
        'web-copy-app',
        'web-inject-js-in-html',
        'web-inject-css-in-html',
        done);
});

gulp.task('web-clean-webapp', function(done) {
    del(buildConfig.targets.webAppOutputPath, { force: true }).then(function() {
        done();
    });
});

gulp.task('web-copy-index-to-webapp-folder', function(done) {
    return gulp.src(buildConfig.general.indexHtml)
        .pipe(gulp.dest(buildConfig.targets.webAppOutputPath));
});

gulp.task('web-copy-images-to-webapp-folder', function(done) {
    return gulp.src(buildConfig.sources.allAppImgFiles)
        .pipe(gulp.dest(buildConfig.targets.webAppOutputPath + "img"));
});

gulp.task('web-copy-css-to-webapp-folder', function(done) {
    return gulp.src(buildConfig.sources.allAppCssFiles)
        .pipe(gulp.dest(buildConfig.targets.webAppOutputPath + "css"));
});

gulp.task('web-copy-files-as-is-to-temp-folder', function(done) {

    return gulp.src(buildConfig.sources.filesToCopyAsIsWeb)
        //.pipe(concat(buildConfig.targets.vendorScriptsMinFileName))
        //.pipe(uglify())
        .pipe(gulp.dest(buildConfig.targets.webAppOutputPath + "scripts/"));
});


gulp.task('web-concat-uglify-and-copy-vendor-scripts', function(done) {
    return gulp.src(buildConfig.sources.vendorScripts)
        .pipe(concat(buildConfig.targets.vendorScriptsMinFileName))
        //.pipe(uglify())
        .pipe(gulp.dest(buildConfig.targets.scriptsOutputPath));
});

gulp.task('web-copy-vendor-scripts', function(done) {
    return gulp.src(buildConfig.sources.vendorScripts)
        .pipe(gulp.dest(buildConfig.targets.scriptsOutputPath));
});

gulp.task('web-copy-app', function(done) {
    var allsources = [].concat(buildConfig.sources.allAppJsFiles,
        buildConfig.sources.allAppHtmlFiles);

    return gulp.src(allsources)
        .pipe(gulp.dest(buildConfig.targets.webAppOutputPath + "app/"));
});


gulp.task('web-inject-js-in-html', function(done) {
    var target = gulp.src(
        path.join(buildConfig.targets.webAppOutputPath, "index.html"));

     var es6ShimPath = path.join(buildConfig.targets.webAppOutputPath, "scripts/",
        "es6-shim.min.js");

    var vendorMin = path.join(buildConfig.targets.webAppOutputPath, "scripts/",
        buildConfig.targets.vendorScriptsMinFileName);

    var systemJs = path.join(buildConfig.targets.webAppOutputPath, "scripts",
        "system.config.js");

    var sources = gulp.src([es6ShimPath, vendorMin, systemJs], {
        read: false
    });

    return target.pipe(inject(sources, {
        ignorePath: buildConfig.targets.webAppOutputPath,
        addRootSlash: false
    }))
        .pipe(gulp.dest(buildConfig.targets.webAppOutputPath));
});



gulp.task('web-inject-css-in-html', function(done) {
    var target = gulp.src(
        path.join(buildConfig.targets.webAppOutputPath, "index.html"));

    var sources = gulp.src([buildConfig.targets.cssOutputPath + "*.css"], {
        read: false
    });

    return target.pipe(inject(sources, {
        ignorePath: buildConfig.targets.webAppOutputPath,
        addRootSlash: false
    }))
        .pipe(gulp.dest(buildConfig.targets.webAppOutputPath));
});