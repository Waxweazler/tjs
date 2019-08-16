process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
    config.set({
        browsers: ['ChromeHeadless', 'IE'],
        files: ['src/*', 'test/*'],
        frameworks: ['jasmine', 'jquery-3.4.0'],
        plugins: ['karma-chrome-launcher', 'karma-ie-launcher', 'karma-jasmine', 'karma-jquery', 'karma-verbose-reporter'],
        reporters: ['verbose'],
        singleRun: true
    })
};
