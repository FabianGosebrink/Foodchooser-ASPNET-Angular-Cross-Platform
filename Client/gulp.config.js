'use strict';

module.exports = {
    general: {
        appName: "FoodChooserAppAngular2",
        rootFolder: "app/",
        indexHtml: "./index.html"
    },
    assets: {
        electron: "../assets/electron/",
        cordova: "../assets/cordova/"
    },
    sources: {
        sourceFolder: "src/",
        allAppJsFiles: [
            "./app/*.js",
            "./app/*/**/*.js",
        ],
        allAppHtmlFiles: [
            "./app/**/*.html"
        ],
        allVendorJsFiles: [
            "./js/*.js"
        ],
        allAppCssFiles: [
            "./node_modules/bootstrap/dist/css/bootstrap.min.css",
            "./css/*.css"
        ],
        allAppImgFiles: [
            "./img/*.*",
            "./img/windows/*.*"
        ],
        vendorScripts: [
            //"node_modules/es6-shim/es6-shim.min.js",
            "node_modules/systemjs/dist/system-polyfills.js",
            "node_modules/angular2/es6/dev/src/testing/shims_for_IE.js",
            "node_modules/angular2/bundles/angular2-polyfills.js",
            "node_modules/systemjs/dist/system.src.js",
            "node_modules/rxjs/bundles/Rx.js",
            "node_modules/angular2/bundles/angular2.dev.js",
            "node_modules/angular2/bundles/router.dev.js",
            "node_modules/angular2/bundles/http.dev.js",
            "node_modules/jquery/dist/jquery.js",
            "node_modules/bootstrap/dist/js/bootstrap.js"
        ],
        filesToCopyAsIsElectron: [
            "js/system.config.js",
            "node_modules/es6-shim/es6-shim.min.js"
        ],
        filesToCopyAsIsWeb: [
            "js/system.config.js",
            "node_modules/es6-shim/es6-shim.min.js"
        ],
        filesToCopyAsIsCordova: [
            "js/system.config.js",
            "js/winstore-jscompat.js",
            "node_modules/es6-shim/es6-shim.min.js"
        ]
    },
    temp: {
        electronTempFolder: "../.temp/electron/",
        cordova: "../.temp/cordova/",
        cordovaWww: "../.temp/cordova/www/",
    },
    targets: {
        vendorScriptsMinFileName: "vendor.min.js",
        webAppOutputPath: "../.dist/webapp/",
        electronOutputPath: "../.dist/electron/",
        cordovaOutputPath: "../.dist/cordova/",
        scriptsOutputPath: "../.dist/webapp/scripts/",
        cssOutputPath: "../.dist/webapp/css/"
    }
};