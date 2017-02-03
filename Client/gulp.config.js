'use strict';

module.exports = {
    general: {
        appName: 'FoodChooserAppAngular',
        rootFolder: 'app/',
        indexHtml: './index.html'
    },
    assets: {
        electron: '../assets/electron/',
        cordova: '../assets/cordova/'
    },
    sources: {
        allAppImgFiles: [
            './img/*.*',
            './img/windows/*.*'
        ]
    },
    temp: {
        electronTempFolder: '.temp/electron/',
        cordova: '.temp/cordova/',
        webapp: '.temp/web/',
    },
    targets: {
        webAppOutputPath: '../.dist/web/',
        electronOutputPath: '../.dist/electron/',
        cordovaOutputPath: '../.dist/cordova/'
    }
};